import React, { Component } from 'react';
import Layout from "./Containers/Layout/Layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./Containers/Checkout/Checkout";
import {BrowserRouter, Route} from "react-router-dom";
import Orders from "./Containers/Orders/Orders";


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Layout>
                        <Route path="/" exact component={BurgerBuilder}/>
                        <Route path="/checkout" component={Checkout}/>
                        <Route path="/orders" component={Orders}/>
                    </Layout>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
