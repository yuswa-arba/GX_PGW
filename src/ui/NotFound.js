import React, {Component} from 'react'
import Error from "./layouts/Error";

class NotFound extends Component {

    render() {
        console.log('testing')

        return (
            <Error>
                <h1 className="display-2 font-weight-medium">
                    4<i className="bx bx-buoy bx-spin text-primary display-3" />4
                </h1>
                <h4>Page Not Found</h4>
            </Error>
        )

    }

}

export default NotFound
