import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./pages/App";

import GlobalStyles from "./components/GlobalStyles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
  domain="dev-dc3g0095.us.auth0.com"
  clientId="ZqYiKEpPaAMEwfRnbny5ZgXUbq8Yyew3"
  redirectUri={window.location.origin}
>
<GlobalStyles />
  <App />
</Auth0Provider>
);
