import React, { Component } from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css"

class CheckoutSummary extends Component {
    render() {
        console.log(this.props.ingredients)
        return (
            <div className={classes.CheckoutSummary}>
             <h1>We hope it tastes well!</h1>
             <div style={{width: '100%', margin: 'auto'}}>
                 <Burger ingredients={this.props.ingredients}/>
                 <Button
                     btnType="Danger"
                     clicked={this.props.checkoutCancelled}>Cancel</Button>
                 <Button
                     btnType="Success"
                     clicked={this.props.checkoutContinued}>Continue</Button>
             </div>
            </div>
        )
    }

}

export default CheckoutSummary;
