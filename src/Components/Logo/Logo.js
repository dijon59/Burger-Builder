import React, { Component } from "react";
import burgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css'

class Logo extends Component {
    render() {
        return (
            <div className={classes.Logo} style={{height: this.props.height}}>
                <img src={burgerLogo} alt="burger"/>
            </div>
        )
    }
}

export default Logo;
