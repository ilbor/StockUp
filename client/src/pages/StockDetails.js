import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { moment } from "moment";
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
                    const arrayOfTickers = data.tickers.map(a => a.name);
                    console.log(data);
                    setFollowedStocks(arrayOfTickers);
                })
                .catch(err => console.error("error: " + err));
        }
    }, [isAuthenticated])

    useEffect( () => {
        fetch(`https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&datatype=json`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
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
    
    return(
        followedStocks &&
        stock.length !== 0 &&
        <Wrapper>
            <SymbolContainer>
            <h2>{stock.symbol} {stock.price}$</h2>
                {!followedStocks.includes(stock.symbol) && <FollowStock currentStock={stock.symbol} email={user.email}/>}
            </SymbolContainer>
            <HistoryContainer>
                {Object.keys(stock.history).slice(0, 10).map((item) => {
                    return(
                        <>
                        <Date>{item}</Date>
                        <Price>{parseFloat(stock.history[item]["4. close"]).toFixed(2)} $</Price>
                        </>
                    )
                })}
            </HistoryContainer>
        </Wrapper>
    )
}

const Wrapper = styled.div`
margin-left: 10vw;
`;

const SymbolContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
margin-bottom: 16px;
gap: 16px;

h2 {
    color: var(--color-pale);
    font-weight: bolder;
    font-size: 24px;
}
`;

const Date = styled.p`
color: var(--color-white);
font-weight: bold;
`;

const Price = styled.p`
color: var(--color-pale);
`;

const HistoryContainer = styled.div`
display: flex;
flex-direction: column;
flex-wrap: wrap;
height: 19vh;
width: 20vw;
`;

export default StockDetails;