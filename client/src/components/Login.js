import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

const Button = styled.button`
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
}
`;

export default LoginButton;