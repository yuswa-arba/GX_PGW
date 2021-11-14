import React, {Component} from 'react'
import Error from "./layouts/Error";

class ReactBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
        return {hasError: true};
    }

    render() {

        if (this.state.hasError) {
            return (
                <Error>
                    <h1 className="display-2 font-weight-medium">
                        5<i className="bx bx-buoy bx-spin text-primary display-3" />0
                    </h1>
                    <h4>Ops. Something went wrong</h4>
                </Error>
            )
        }

        return this.props.children
    }

}

export default ReactBoundary
