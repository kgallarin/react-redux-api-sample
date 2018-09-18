import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./App";
import Store from "./store";
import uiThemeConfig from "./styles/MuiThemeConfig";

let store = Store();
const theme = createMuiTheme(uiThemeConfig);

const UnsplashToyApp = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(<UnsplashToyApp />, document.getElementById("root"));
