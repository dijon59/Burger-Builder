import React, { Component } from "react";
import classes from './ToolBar.module.css'
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import ToggleButton from "../ToggleButton/ToggleButton";

class ToolBar extends Component {
    render() {
        return (
           <header className={classes.Toolbar}>
               <ToggleButton clicked={this.props.openSideDrawer}/>
               <Logo height="80%"/>
               <nav className={classes.DesktopOnly}>
                   <NavigationItems/>
               </nav>
           </header>
        )
    }
}
export default ToolBar;
