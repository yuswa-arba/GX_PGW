import React from 'react'
import {Link} from "react-router-dom";
import MetisMenu from '@metismenu/react';

import {menus} from '../../../../config/sidebarsMenu'

const Sidebar = (props) => {

    const SubMenuUI = ({route, title, icon}) => {

        const pathname = window.location.pathname

        const liActiveMenuClass = (pathname === route) ? 'mm-active' : ''
        const linkActiveMenuClass = (pathname === route) ? 'active' : ''

        return (
            <li className={liActiveMenuClass}>
                <Link to={route} className={'waves-effect ' + linkActiveMenuClass}>
                    <i className={'bx ' + icon}/>
                    <span>{title}</span>
                </Link>
            </li>
        );

    }

    return (
        <div className="vertical-menu">
            <div className="h-100">

                <div id="sidebar-menu" className="m-l--40">
                    <MetisMenu className="list-unstyled mm-show">
                        <li className="menu-title"> Menu</li>
                        {menus.length > 0 ?
                            menus.map((menu, index) => (
                                <SubMenuUI route={menu.root} title={menu.title} icon={menu.icon} key={index}/>
                            )) : null}
                    </MetisMenu>
                </div>

            </div>
        </div>
    );

}

export default Sidebar
