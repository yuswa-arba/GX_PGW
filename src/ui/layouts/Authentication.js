import React from "react"

// IMAGES
import logo__svg from "../../assets/images/gx_new_logo_favicon.png"
import authentication__png from "../../assets/images/authentication-img.png"

const LayoutAuthentication = (props) => {

    return (
        <React.Fragment>
            <div className="account-pages my-5 pt-sm-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6 col-xl-5">
                            <div className="card overflow-hidden">
                                <div className="bg-soft-primary">
                                    <div className="row">
                                        <div className="col-7">
                                            <div className="text-primary p-4">
                                                <h5 className="text-primary">{props.title || 'Welcome Back !'}</h5>
                                                <p>{props.description || 'Sign in to continue to Portal.'}</p>
                                            </div>
                                        </div>
                                        <div className="col-5 align-self-end">
                                            <img src={authentication__png} alt="" className="img-fluid" />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div>
                                        <a href="/">
                                            <div className="avatar-md profile-user-wid mb-4">
                                            <span className="avatar-title rounded-circle bg-light">
                                                <img src={logo__svg} alt="" className="rounded-circle"
                                                     height="34"/>
                                            </span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="p-2">
                                        {props.children}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );

}

export default LayoutAuthentication