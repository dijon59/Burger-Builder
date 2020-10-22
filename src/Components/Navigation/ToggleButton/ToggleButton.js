import React, { Component } from "react";
import classes from "./ToggleButton.module.css"

class ToggleButton extends Component {
    render() {
        return(
            <div className={classes.ToggleButton} onClick={this.props.clicked}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}
export default ToggleButton;
