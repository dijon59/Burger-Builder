import React, { Component } from "react";
import Modal from "../../Components/UI/Modal/Modal";
import Aux from '../Aux';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null,
            }
            // axios.interceptors.request.use( request => {
            //     this.setState({error: null});
            //     return request
            // })
            // axios.interceptors.response.use(response => response, error => {
            //     this.setState({error: error});
            // })
        }
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use( request => {
                this.setState({error: null});
                return request
            })
            this.respInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({error: error});
            })
        }

        componentWillUnmount() {
            // used when a component is not required anymore
            console.log('Will Unmount', this.respInterceptor, this.reqInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.respInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}
export default withErrorHandler;
