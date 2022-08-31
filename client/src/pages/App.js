import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import Homepage from "./Homepage";
import SignIn from "./SignIn";
import Profile from "../Profile";

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
      <Header />
      <Main>
        <Routes>
          <Route exact path="/" element={<Homepage />}/>
          <Route exact path="/profile" element={<Profile />}/>
        </Routes>
      </Main>
    </BrowserRouter>
  )
}

const Main = styled.div`
`

export default App;
