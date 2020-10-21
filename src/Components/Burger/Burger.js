import React, { Component } from "react";
import classes from './Burger.module.css'
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

class Burger extends Component {

    render() {
        // this extracts the keys of a given object and turns that into an array
        let transformedIngredients = Object.keys(this.props.ingredients)
            .map((ingredientKey) => {
                return [...Array(this.props.ingredients[ingredientKey])].map((_, index) => {
                    return <BurgerIngredient type={ingredientKey} key={ingredientKey + index}/>
                })
            }).reduce((arr, el) => {
                return arr.concat(el)
            }, []); // reduce allows us to transform an array into something else.
        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding ingredient!</p>
        }
        return (
            <div className={classes.Burger}>
                <BurgerIngredient type='bread-top'/>
                {transformedIngredients}
                <BurgerIngredient type='bread-bottom'/>
            </div>
        )
    }
}

export default Burger;
