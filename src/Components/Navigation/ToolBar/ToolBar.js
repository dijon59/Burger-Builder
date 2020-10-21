import React, { Component } from "react";
import classes from './ToolBar.module.css'
import Logo from "../../Logo/Logo";

class ToolBar extends Component {
    render() {
        return (
           <header className={classes.Toolbar}>
               <div>Menu</div>
               <Logo />
           </header>
        )
    }
}
export default ToolBar;
