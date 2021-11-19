import React, {Component} from "react"

// IMAGES
import logo_light__png from "../../../../assets/images/gx_new_logo_white.png"
import avatar_small from "../../../../assets/images/avatar_small.jpg"
import {authLogout} from "../../../../lib/authentication";
import {getUserAccount} from "../../../../config/authentication";

class Header extends Component {

    state = {
        userAccount: null,
        isLoading: false
    }

    _handleLogout = () => {
        this._isLoading(true, authLogout()
            .then((resData) => {
                this._isLoading(false)
            })
            .catch((err) => {
                this._isLoading(false)
            }))
    }

    _isLoading = (isLoading, callback = {}) => {
        this.setState(() => {
            return {
                isLoading: isLoading
            }
        }, () => {
            return callback
        })
    }

    componentDidMount() {
        this.setState(() => {
            return {
                userAccount: getUserAccount || null
            }
        })
    }

    render() {

        const {userAccount, isLoading} = this.state

        return (<header id="page-topbar">
                <div className="navbar-header">
                    <div className="d-flex">
                        <div className="navbar-brand-box">
                            <a href="/" className="logo logo-light">
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
                                     src={avatar_small}
                                     alt="Header Avatar"/>
                                <span className="d-none d-xl-inline-block ml-1">{userAccount ? userAccount.name || userAccount.email : 'Admin'}</span>
                                <i className="mdi mdi-chevron-down d-none d-xl-inline-block"/>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="/">
                                    <i className="bx bx-user font-size-16 align-middle mr-1"/> Profile
                                </a>
                                <div className="dropdown-divider"/>
                                <p className={'dropdown-item text-danger mb-0 waves-effect ' + (isLoading ? 'disabled' : '')}
                                   onClick={this._handleLogout}>
                                    <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"/> Logout
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </header>
        )
    }

}

export default Header
