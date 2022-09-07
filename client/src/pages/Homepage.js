import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import { StocksContext } from "../components/StocksContext";

const Homepage = () => {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '38669421cdmshdd11693b89a68fbp1994e4jsn0497ae53db5c',
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
        }
    };

//FETCH MULTI TICKERS
const [stocks, setStocks] = useState([]);

const tickers = ['AAPL', 'GOOG', 'META', 'AMZN', 'TSLA'];

useEffect(() => {
  const fetchTickers = async () => {
    let forArr = [];
    for (const ticker of tickers) {
      const response = await fetch(
        `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&datatype=json`,
        options
      );
      const json = await response.json();

        const lastKey = Object.keys(json["Time Series (Daily)"])[0];
        const data = {  information: json["Meta Data"]["1. Information"],
                        symbol: json["Meta Data"]["2. Symbol"],
                        lastRefreshed: json["Meta Data"]["3. Last Refreshed"],
                        outputSize: json["Meta Data"]["4. Output Size"],
                        timeZone: json["Meta Data"]["5. Time Zone"],
                        price: parseFloat(json["Time Series (Daily)"][lastKey]["4. close"]).toFixed(2),
                    }

      forArr = [...forArr, data];
      //stored it in the variable above and then pushed it into the state after the function ran so the state would catch all of the objects.

    }
    setStocks(forArr);
  };
  fetchTickers();
}, []);

console.log(stocks);

    return(
        stocks &&
        <Wrapper>
            <h1>Welcome to Stock Up!</h1>
            <Container>
            <Header>Movers:</Header>
            {stocks.map( (ticker) => {
                return(
                    <StyledLink to={`/stock-details/${ticker.symbol}`} >
                        <p>{ticker.symbol} {ticker.price}$</p>
                    </StyledLink>
                )
            })}
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
h1{
    color: var(--color-white);
}
`;

const StyledLink = styled(Link)`
color: var(--color-white);
text-decoration: none;
width: max-content;
margin-bottom: 4px;

&:hover {
    color: var(--color-pale);
    transition: 0.3s;
}

p {
    width: max-content;
}
`;

const Container = styled.div`
margin-left: 5.5vw;
`;

const Header = styled.p`
color: var(--color-pale);
margin-bottom: 16px;
margin-left: 16px;
`;

export default Homepage;