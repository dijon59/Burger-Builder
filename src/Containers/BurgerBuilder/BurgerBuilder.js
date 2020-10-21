import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igkey => {
            // console.log(ingredients[igkey])
            return ingredients[igkey];
        }).reduce((sum, el) => {
            return sum + el
        }, 0)
        this.setState({purchasable: sum > 0})
        console.log(this.state)
    }

    purchaseHandler() {
        this.setState({purchasing: true})
    }


    addIngredientHandler = type => {
        console.log(this)
        const oldCount = this.state.ingredients[type]
        const updatedCounted = oldCount + 1
        const updatedIngredient = {
            ...this.state.ingredients // we use the spread operator because the state should be updated in a unmutable way
        }
        updatedIngredient[type] = updatedCounted
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredient})
        this.updatePurchaseState(updatedIngredient)
        console.log(updatedIngredient)
    }
    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) {
            return;
        }

        const updatedCounted = oldCount - 1
        const updatedIngredient = {
            ...this.state.ingredients // we use the spread operator because the state should be updated in a unmutable way
        }
        updatedIngredient[type] = updatedCounted
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredient})
        this.updatePurchaseState(updatedIngredient)
    }

    purchaseCancelHandler() {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler() {
        alert('You Continue')
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler.bind(this)}>
                    <OrderSummary  ingredients={this.state.ingredients}
                                   price={this.state.totalPrice}
                                   purchaseCancelled={this.purchaseCancelHandler.bind(this)}
                                   purchaseContinue={this.purchaseContinueHandler.bind(this)}/>
                </Modal>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientDeleted={this.removeIngredientHandler}
                disabled={disabledInfo}
                ordered={this.purchaseHandler.bind(this)}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;
