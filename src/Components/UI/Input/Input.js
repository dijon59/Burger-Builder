import React, { Component } from "react";
import classes from './Input.module.css'

class Input extends Component {
    render() {
        let inputElement = null;
        switch (this.props.elementType) {
            case ('input'):
                inputElement = <input
                    className={classes.InputElement}
                    {...this.props.elementConfig}
                    value={this.props.value}/>
                break;
            case ('textarea'):
                inputElement = <textarea
                    className={classes.InputElement}
                    {...this.props.elementConfig}
                    value={this.props.value}/>
                break;
            default:
                inputElement = <input
                    className={classes.InputElement}
                    {...this.props.elementConfig}
                    value={this.props.value}/>
        }

        return (
            <div className={classes.Input}>
                <label className={classes.Label}>{this.props.label}</label>
                {inputElement}
            </div>
        )
    }
}

export default Input;
