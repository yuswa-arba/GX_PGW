import React from "react"
import {Link} from "react-router-dom";

import {all as allTransaction} from "../../../../lib/root";
import {menus} from "../../../../config/sidebarsMenu";

const Content = (props) => {

    const onPage = menus.find((menu) => {
        return menu.root === window.location.pathname
    })

    return (
        <div className="main-content" id="testing">

            <div className="page-content">
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">

                                <h4 className="mb-0 font-size-18">{ (onPage && onPage.title) || '-' }</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <Link to={allTransaction}>Transactions</Link>
                                        </li>
                                        <li className="breadcrumb-item active">{ (onPage && onPage.title) || '-' }</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>

                    {props.children}

                </div>
            </div>

        </div>
    );

}

export default Content
