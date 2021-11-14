import React from "react"

import {all as allTransaction} from "../../lib/root";
import {Link} from "react-router-dom";

import error_image from "../../assets/images/error-img.png"

const Error = (props) => {

    return (
        <div className="account-pages my-5 pt-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center mb-5">
                            {props.children}
                            <div className="mt-5 text-center">
                                <Link className="btn btn-primary waves-effect waves-light" to={allTransaction}>
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8 col-xl-6">
                        <div>
                            <img src={error_image} alt="" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Error