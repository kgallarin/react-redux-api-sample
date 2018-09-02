import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Store from "./store";

let store = Store();
const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const UnsplashToyApp = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(<UnsplashToyApp />, document.getElementById("root"));
registerServiceWorker();
