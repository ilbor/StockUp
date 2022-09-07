import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";


const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

const [formData, setFormData] = useState(null);
const [followedStocks, setFollowedStocks] = useState(null);
const [stocks, setStocks] = useState([]);
const [total, setTotal] = useState(0);

const handleChange = (key, value) => {
  console.log("hello world");
  setFormData({
      ...formData,
      [key]: value
  })
}

const handleSubmit = (e, formData) => {
  e.preventDefault();

  let array = []
  Object.values(formData).forEach((e, i)=> {
  const name = Object.keys(formData)[i]
  array.push({name: name, amount: e})
  });
  console.log(formData);
  const bodyToPost = {
    array: array
  };
  fetch(`/api/update-followed-tickers/${user.email}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify(formData),
    body: JSON.stringify(bodyToPost),
  })
  window.location.reload();
};

const options = {
  method: 'GET',
  headers: {
      'X-RapidAPI-Key': '38669421cdmshdd11693b89a68fbp1994e4jsn0497ae53db5c',
      'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
  }
};

  useEffect( () => {
    console.log("use Effect triggered");
    if (isAuthenticated === true) {
        console.log("passed condition");
        const usedEmail = user.email;
        fetch(`/api/followed-tickers/${usedEmail}`)
            .then(response => response.json())
            .then(data => {
              // console.log(data);
                setFollowedStocks(data.tickers);
            })
            .catch(err => console.error("error: " + err));
    }
}, [isAuthenticated])

useEffect(() => {
  const fetchTickers = async () => {
    const arrayOfTickers = followedStocks.map(a => a.name);
    let forArr = [];
    for (const ticker of arrayOfTickers) {
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
    for(let i=0; i<forArr.length; i++) {
      console.log("hi");
      console.log(total);
      console.log(Number(forArr[i].price)*Number(followedStocks[i].amount))
      setTotal(total + (Number(forArr[i].price)*Number(followedStocks[i].amount)));
    }
  };
  if (followedStocks) {
    fetchTickers();
  }
}, [followedStocks]);


  if (isLoading) {
    return <div>Loading ...</div>;
  }

console.log(total);
  return (
    isAuthenticated ? (
    <Wrapper>
      <ProfileInfo>
        <img src={user.picture} alt={user.name} />
        <p>{user.nickname}</p>
        <p>{user.email}</p>
      </ProfileInfo>
      {followedStocks &&
      (<>
        <h1>Folloowed Stocks:</h1>
      <Container>
        <Prices>
          {stocks.map((stock) => {
            return(
                <p>{stock.price} $</p>
            )
          })}
          <div></div>
        </Prices>
        <Form onSubmit={(e) => handleSubmit(e, formData)}>
        {followedStocks.map((ticker) => {
          return(
            <>
            <Stocks>
              <p>{ticker.name}</p>
              <p>{ticker.amount} stocks owned</p>
            </Stocks>
            <input
                type="text"
                placeholder={"number of stocks"}
                onChange={(e) => handleChange(ticker.name, e.target.value)}
              />
            </>
            )
          })}
          <button type="submit">Update your stocks</button>
        </Form>
      </Container>
        <Total>Net worth: <span>{total} $</span></Total>
      </>
      )}
    </Wrapper>
    )
    :
    <h2>You are not logged in yet</h2>
  );
};

const Wrapper = styled.div`

h1 {
  color: var(--color-pale);
  margin-bottom: 16px;
  text-align: start;
  margin-left: 7vw;
  font-weight: bolder;
  font-size: 24px;
}
`;

const ProfileInfo = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
gap: 16px;
margin-right: 8vw;

img {
  width: 64px;
  height: 64px;
  border-radius: 8px;
}

p {
  color: var(--color-white);
}
`;

const Container = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width: 25vw;
gap: 16px;

p {
  color: var(--color-white);
  margin: 8px;
}
`;

const Form = styled.form`

input {
  height: 24px;
  border: none;
  border-radius: 8px;
}

button {
  display: block;
  padding: 8px 16px 8px 16px;
  border-radius: 8px;
  border-style: solid;
  border-width: 2px;
  border-color: var(--color-pale);
  background-color: transparent;
  color: var(--color-pale);
  margin-top: 12px;

  &:hover {
    color: var(--color-black);
    border-color: var(--color-black);
    transition: 0.3s;
}}
`;

const Stocks = styled.div`
display: flex;
gap: 8px;
`;

const Prices = styled.div`
display: flex;
flex-direction: column;
gap: 26px;

div {
  height: 40px;
}
`;

const Total = styled.p`
  color: var(--color-pale);
  font-size: 24px;
  font-weight: bolder;
  margin: 64px 0 0 5vw;

span {
  color: var(--color-white);
}
`;

export default Profile;