import styled from "styled-components";
import { Link } from "react-router-dom";
import {MdOutlineAssignmentInd} from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";

import SearchBar from "./SearchBar";
import LoginButton from "./Login";
import LogoutButton from "./Logout";

const Header = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return(
        <Wrapper>
            <Link to="/" className="link">
                <p>STOCK UP</p>
            </Link>
            <SearchBar />
            <Container>
                <Link to="/profile" >
                    <MdOutlineAssignmentInd className="profile"/>
                </Link>
                {!isAuthenticated ?
                <LoginButton />
                :
                <LogoutButton />
                }
            </Container>
        </Wrapper>
    );
};

const Wrapper = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
padding-bottom: 16px;

.link {
    text-decoration: none;
    color: var(--color-white);
    font-size: 40px;
    font-weight: bolder;
    margin-top: 16px;

    &:active{
        transform: translateY(0.5px);
    }
    &:hover{
        color: var(--color-black);
        transition: 0.3s;
    }
}

.profile {
    height: 40px;
    width: 40px;
    color: var(--color-pale);
    margin-top: 16px;

    &:active{
        transform: translateY(0.5px);
    }
    &:hover{
        color: var(--color-black);
        transition: 0.3s;
    }
}
`;

const Container = styled.div`
display: flex;
flex-direction: row;
align-items: center;
gap: 16px;
`;

export default Header;