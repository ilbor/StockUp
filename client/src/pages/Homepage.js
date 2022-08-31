import {useEffect, useState} from "react";
import styled from "styled-components";

const Homepage = () => {
const [aapl, setAapl] = useState(null);
const [goog, setGoog] = useState(null);
const [meta, setMeta] = useState(null);
const [amzn, setAmzn] = useState(null);
const [tsla, setTsla] = useState(null);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '38669421cdmshdd11693b89a68fbp1994e4jsn0497ae53db5c',
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
        }
    };

useEffect( () => {
    fetch('https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=AAPL&outputsize=compact&datatype=json', options)
        .then(response => response.json())
        .then(response => {
            const lastKey = Object.keys(response["Time Series (Daily)"])[0];
            const data = {  information: response["Meta Data"]["1. Information"],
                symbol: response["Meta Data"]["2. Symbol"],
                lastRefreshed: response["Meta Data"]["3. Last Refreshed"],
                outputSize: response["Meta Data"]["4. Output Size"],
                timeZone: response["Meta Data"]["5. Time Zone"],
                price: parseFloat(response["Time Series (Daily)"][lastKey]["4. close"]).toFixed(2),
                }
            setAapl(data);
        })
        .catch(err => console.error(err));
}, []);

useEffect( () => {
    fetch('https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=GOOG&outputsize=compact&datatype=json', options)
        .then(response => response.json())
        .then(response => {
            const lastKey = Object.keys(response["Time Series (Daily)"])[0];
            const data = {  information: response["Meta Data"]["1. Information"],
                symbol: response["Meta Data"]["2. Symbol"],
                lastRefreshed: response["Meta Data"]["3. Last Refreshed"],
                outputSize: response["Meta Data"]["4. Output Size"],
                timeZone: response["Meta Data"]["5. Time Zone"],
                price: parseFloat(response["Time Series (Daily)"][lastKey]["4. close"]).toFixed(2),
                }
            setGoog(data);
        })
        .catch(err => console.error(err));
}, []);

useEffect( () => {
    fetch('https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=META&outputsize=compact&datatype=json', options)
        .then(response => response.json())
        .then(response => {
            const lastKey = Object.keys(response["Time Series (Daily)"])[0];
            const data = {  information: response["Meta Data"]["1. Information"],
                symbol: response["Meta Data"]["2. Symbol"],
                lastRefreshed: response["Meta Data"]["3. Last Refreshed"],
                outputSize: response["Meta Data"]["4. Output Size"],
                timeZone: response["Meta Data"]["5. Time Zone"],
                price: parseFloat(response["Time Series (Daily)"][lastKey]["4. close"]).toFixed(2),
                }
            setMeta(data);
        })
        .catch(err => console.error(err));
}, []);

useEffect( () => {
    fetch('https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=AMZN&outputsize=compact&datatype=json', options)
        .then(response => response.json())
        .then(response => {
            const lastKey = Object.keys(response["Time Series (Daily)"])[0];
            const data = {  information: response["Meta Data"]["1. Information"],
                symbol: response["Meta Data"]["2. Symbol"],
                lastRefreshed: response["Meta Data"]["3. Last Refreshed"],
                outputSize: response["Meta Data"]["4. Output Size"],
                timeZone: response["Meta Data"]["5. Time Zone"],
                price: parseFloat(response["Time Series (Daily)"][lastKey]["4. close"]).toFixed(2),
                }
            setAmzn(data);
        })
        .catch(err => console.error(err));
}, []);

useEffect( () => {
    fetch('https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=TSLA&outputsize=compact&datatype=json', options)
        .then(response => response.json())
        .then(response => {
            const lastKey = Object.keys(response["Time Series (Daily)"])[0];
            const data = {  information: response["Meta Data"]["1. Information"],
                symbol: response["Meta Data"]["2. Symbol"],
                lastRefreshed: response["Meta Data"]["3. Last Refreshed"],
                outputSize: response["Meta Data"]["4. Output Size"],
                timeZone: response["Meta Data"]["5. Time Zone"],
                price: parseFloat(response["Time Series (Daily)"][lastKey]["4. close"]).toFixed(2),
                }
            setTsla(data);
        })
        .catch(err => console.error(err));
}, []);

    return(
        aapl && goog && meta && amzn && tsla &&
        <Wrapper>
            <h1>Welcome to Stock Up!</h1>
            <p>{aapl.symbol} {aapl.price}$</p>
            <p>{goog.symbol} {goog.price}$</p>
            <p>{meta.symbol} {meta.price}$</p>
            <p>{amzn.symbol} {amzn.price}$</p>
            <p>{tsla.symbol} {tsla.price}$</p>
        </Wrapper>
    )
}

const Wrapper = styled.div`
`;

export default Homepage;