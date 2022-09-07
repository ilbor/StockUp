import { useState } from "react";
import styled from "styled-components";
import {BsSearch} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
const [state, setState] = useState("");
let navigate = useNavigate();
    return(
        <Wrapper>
                <input
                type="text"
                placeholder={"What stock would you like to search?"}
                onChange = {(e) => {
                    setState(e.target.value);
                }}
                onKeyDown= {(e) => {
                    if(e.code === "Enter") {
                        console.log("hello");
                        navigate(`/stock-details/${state}`);
                    }
                }}
                />
            <StyledSearchIcon>
            </StyledSearchIcon>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    input {
        -webkit-box-shadow: 1px 1px 2px 0px #A4A4A4; 
        box-shadow: 1px 1px 2px 0px #A4A4A4;
        width: 30vw;
        height: 2.5vh;
        border-width: 0;
        padding: 10px;
        font-size: 20px;
        color: var(--color-pale);
        border-radius: 8px;
        background-color: var(--color-white);

        &:focus{
            outline: none;
        }
    }
    z-index: 1;
`;

const StyledSearchIcon = styled(BsSearch)`
    padding:0.7vw;
    position: relative;
    left: -2.5vw;
    top:1.6vh;
    color: var(--color-pale);
`;

export default SearchBar;