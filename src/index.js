import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Store from "./store";

let store = Store();
const theme = createMuiTheme({
  palette: {
    type: "light"
  }
});

const UnsplashToyApp = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(<UnsplashToyApp />, document.getElementById("root"));
registerServiceWorker();
