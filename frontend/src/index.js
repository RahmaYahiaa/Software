import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

/*eslint-disable*/

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  {/* <ProductsContextProvider>
    <App />
  </ProductsContextProvider> */}
  <Provider store={store}>
    <App />
  </Provider>,
</BrowserRouter>
  
)