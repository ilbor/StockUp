import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

import FollowStock from "../components/FollowStock";

const StockDetails = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
const [followedStocks, setFollowedStocks] = useState(null);
let params = useParams();
const [stock, setStock] = useState([]);
const ticker = params.stock;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '38669421cdmshdd11693b89a68fbp1994e4jsn0497ae53db5c',
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
        }
    };

    useEffect( () => {
        if (isAuthenticated === true) {
            const usedEmail = user.email;
            fetch(`/api/followed-tickers/${usedEmail}`)
                .then(response => response.json())
                .then(data => {
                    setFollowedStocks(data.arrayOfTickers);
                })
                .catch(err => console.error("error: " + err));
        }
    }, [isAuthenticated])

    useEffect( () => {
        fetch(`https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&datatype=json`, options)
            .then(response => response.json())
            .then(response => {
                const lastKey = Object.keys(response["Time Series (Daily)"])[0];
                const data = {  information: response["Meta Data"]["1. Information"],
                    symbol: response["Meta Data"]["2. Symbol"],
                    lastRefreshed: response["Meta Data"]["3. Last Refreshed"],
                    outputSize: response["Meta Data"]["4. Output Size"],
                    timeZone: response["Meta Data"]["5. Time Zone"],
                    price: parseFloat(response["Time Series (Daily)"][lastKey]["4. close"]).toFixed(2),
                    history: response["Time Series (Daily)"],
                    }
                setStock(data);
            })
            .catch(err => console.error(err));
    }, [ticker]);
    
if (followedStocks !== null) {
    console.log(followedStocks.includes(stock.symbol));
}
    return(
        followedStocks &&
        stock.length !== 0 &&
        <Wrapper>
            <Container>
            <h2>{stock.symbol} {stock.price}$</h2>
                {!followedStocks.includes(stock.symbol) && <FollowStock currentStock={stock.symbol} email={user.email}/>}
            </Container>
            {Object.keys(stock.history).map((item) => {
                return(
                    <>
                    <p>{item}</p>
                    <p>{stock.history[item]["4. close"]}</p>
                    </>
                )
            })}
        </Wrapper>
    )
}

const Wrapper = styled.div`
`;

const Container = styled.div`
display: flex;
flex-direction: row;
`;

export default StockDetails;