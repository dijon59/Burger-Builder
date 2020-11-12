import React, { Component } from "react";
import classes from './Order.module.css'

class Order extends Component {
    render() {
        let style = {
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }
        const ingredients = [];

        for (let ingredientName in this.props.ingredients) {
            ingredients.push({
                name: ingredientName,
                amount: this.props.ingredients[ingredientName]
            })
        }

        const ingredientOutput = ingredients.map(ig => {
            return <span style={style}>{ig.name} ({ig.amount})</span>
        })

        return (
            <div className={classes.Order}>
                <p>Ingredients: {ingredientOutput}</p>
                <p>Price: <strong>USD {+this.props.price}</strong></p>
            </div>
        )
    }
}

export default Order;
