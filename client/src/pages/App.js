import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import Homepage from "./Homepage";
import Profile from "./Profile";
import StockDetails from "../pages/StockDetails";

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated === true) {
      fetch("/api/add-user", {
        method: "POST",
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
            },
        body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => console.log(error))
    }
  }, []);
  
  return(
    <Wrapper>
    <BrowserRouter>
      <Header />
      <Main>
        <Routes>
          <Route exact path="/" element={<Homepage />}/>
          <Route exact path="/profile" element={<Profile />}/>
          <Route exact path="/stock-details/:stock" element={<StockDetails />}/>
        </Routes> 
      </Main>
    </BrowserRouter>
    </Wrapper>
  )
}

const Main = styled.div`
`;

const Wrapper = styled.div`
background-image: url("../Img/Background.png");
background-repeat: no-repeat;
background-position: center;
background-size: cover;
min-height: 100%;
min-width: 1024px;
width: 100%;
height: auto;
position: fixed;
left: 0;
`;

export default App;
