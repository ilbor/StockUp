import styled from "styled-components";
import {BsSearch} from "react-icons/bs";

const SearchBar = () => {

    return(
        <Wrapper>
            <input disabled id={"smartSearchDisabled"}
            type="text"
            defaultValue={"What are you looking for?"}
            />
            <StyledSearchIcon></StyledSearchIcon>
            <StyledContainer>
            </StyledContainer>
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
        color:grey;

        &:focus{
            outline: none;
        }
    }
    z-index: 1;
`

const StyledContainer = styled.div`
    z-index: 3;
    position:absolute;
    margin-top: 1vh;
    border-color: white;
    left: 35.9vw;
    display:flex;
    flex-direction: column;
    overflow: scroll;
    overflow-x: hidden;
    max-height: 25.1vh;
    width: 31.5vw;
`

const StyledSearchIcon = styled(BsSearch)`
    padding:0.7vw;
    position: relative;
    left: -2.5vw;
    top:1.6vh;
`

export default SearchBar;