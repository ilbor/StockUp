import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import Homepage from "./Homepage";
import SignIn from "./SignIn";

const App = () => {
  return(
    <BrowserRouter>
      <Header />
      <Main>
        <Routes>
          <Route exact path="/" element={<Homepage />}/>
          <Route exact path="/sign-in" element={<SignIn />}/>
        </Routes>
      </Main>
    </BrowserRouter>
  )
}

const Main = styled.div`
`

export default App;
