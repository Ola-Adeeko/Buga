import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ShopPage from "./pages/shop/shop.component";
import ProductDisplay from "./pages/product-display/product-display.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from "./components/header/header.component";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to="/shop/all" />
          </Route>
          <Route path="/shop/:category" component={ShopPage} />
          <Route path="/product/:id" component={ProductDisplay} />
          <Route exact path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
