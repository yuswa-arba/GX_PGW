import React from "react"

// IMAGES
import logo_light__svg from "../../../../assets/images/logo-light.svg"
import logo_light__png from "../../../../assets/images/logo-light.png"
import photo_profile from "../../../../assets/images/profile.jpg"

const Header = (props) => {

    return (
        <header id="page-topbar">
            <div className="navbar-header">
                <div className="d-flex">
                    <div className="navbar-brand-box">
                        <a href="/" className="logo logo-light">
                                <span className="logo-sm">
                                    <img src={logo_light__svg} alt="" height="22"/>
                                </span>
                            <span className="logo-lg">
                                    <img src={logo_light__png} alt="" height="19"/>
                                </span>
                        </a>
                    </div>

                </div>

                <div className="d-flex">

                    <div className="dropdown d-inline-block">
                        <button type="button" className="btn header-item waves-effect"
                                id="page-header-user-dropdown"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img className="rounded-circle header-profile-user"
                                 src={photo_profile}
                                 alt="Header Avatar"/>
                            <span className="d-none d-xl-inline-block ml-1">Henry</span>
                            <i className="mdi mdi-chevron-down d-none d-xl-inline-block"/>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="/">
                                <i className="bx bx-user font-size-16 align-middle mr-1"/> Profile
                            </a>
                            <div className="dropdown-divider"/>
                            <a className="dropdown-item text-danger" href="/">
                                <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"/> Logout
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </header>
    );

}

export default Header
