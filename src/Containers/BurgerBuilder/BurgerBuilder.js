import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios'
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        axios.get('/ingredients.json')
             .then(response => {
                 this.setState({ingredients: response.data})
             })
             .catch(error => {
                 this.setState({error: true})
             })
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
        // alert('You Continue')
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Dijon',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '7800',
                    country: 'South Africa'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
             .then(response => {
                 this.setState({loading: false, purchasing: false})
             })
             .catch(error => {
                 this.setState({loading: false, purchasing: false})
             })
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null
        let burger = this.state.error ? <p>Ingredients can't be loaded </p> : <Spinner/>
        if (this.state.ingredients) {
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                                         price={this.state.totalPrice}
                                         purchaseCancelled={this.purchaseCancelHandler.bind(this)}
                                         purchaseContinue={this.purchaseContinueHandler.bind(this)}/>
            burger = <Aux>
                        <Burger ingredients={this.state.ingredients}/>
                        <BuildControls
                            ingredientAdded={this.addIngredientHandler}
                            ingredientDeleted={this.removeIngredientHandler}
                            disabled={disabledInfo}
                            ordered={this.purchaseHandler.bind(this)}
                            price={this.state.totalPrice}
                            purchasable={this.state.purchasable}/>
                     </Aux>
        }
        if (this.state.loading) {
            console.log('hey')
            orderSummary = <Spinner/>;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler.bind(this)}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
