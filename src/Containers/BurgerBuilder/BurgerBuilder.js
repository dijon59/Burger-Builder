import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios'
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from 'react-redux'
import * as actionTypes from '../../store/action'



class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        // axios.get('/ingredients.json')
        //      .then(response => {
        //          this.setState({ingredients: response.data})
        //      })
        //      .catch(error => {
        //          console.log(error)
        //          this.setState({error: true})
        //      })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igkey => {
            // console.log(ingredients[igkey])
            return ingredients[igkey];
        }).reduce((sum, el) => {
            return sum + el
        }, 0)
        return sum > 0
    }

    purchaseHandler() {
        this.setState({purchasing: true})
    }
    purchaseCancelHandler() {
        this.setState({purchasing: false})
    }
    purchaseContinueHandler() {
        // alert('You Continue')
        // const queryParams = []
        // for (let i in this.state.ingredients) {
        //     // encodeURIComponent encodes the element such that they can be used in the url
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&')
        //
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // })

        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null
        let burger = this.state.error ? <p>Ingredients can't be loaded </p> : <Spinner/>
        if (this.props.ings) {
            orderSummary = <OrderSummary ingredients={this.props.ings}
                                         price={this.props.totalPrice}
                                         purchaseCancelled={this.purchaseCancelHandler.bind(this)}
                                         purchaseContinue={this.purchaseContinueHandler.bind(this)}/>
            burger = <Aux>
                        <Burger ingredients={this.props.ings}/>
                        <BuildControls
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientDeleted={this.props.onIngredientRemoved}
                            disabled={disabledInfo}
                            ordered={this.purchaseHandler.bind(this)}
                            price={this.props.totalPrice}
                            purchasable={this.updatePurchaseState(this.props.ings)}/>
                     </Aux>
        }
        if (this.state.loading) {
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
