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
    if (isAuthenticated) {
      fetch("/api/add-user", {
        method: "POST",
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
            },
        body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => console.log(error))
    }
  }, [isAuthenticated]);
  
  return(
    <BrowserRouter>
      <Header setSearch={setSearch} search={search}/>
      <Main>
        <Routes>
          <Route exact path="/" element={<Homepage />}/>
          <Route exact path="/profile" element={<Profile />}/>
          <Route exact path="/stock-details/:stock" element={<StockDetails search={search}/>}/>
        </Routes>
      </Main>
    </BrowserRouter>
  )
}

const Main = styled.div`
`

export default App;
