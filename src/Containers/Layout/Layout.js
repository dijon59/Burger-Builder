import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import classes from "./Layout.module.css"
import ToolBar from "../../Components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../Components/Navigation/SideDrawer/SideDrawer";


class Layout extends Component {
    state = {
        showSideDrawer: false,
    }
    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    }
    // sideDrawerOpenHandler = () => {
    //     this.setState({showSideDrawer: true})
    // }

    // best way of setting the state when it depends on the old state
    sideDrawerOpenHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}})
    }
    render() {
        return(
            <Aux>
                <ToolBar openSideDrawer={this.sideDrawerOpenHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>
        )
    }
}

export default Layout;
