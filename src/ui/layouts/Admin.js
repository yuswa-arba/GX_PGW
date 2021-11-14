import React from 'react'

import Header from "./partials/Admin/Header";
import Sidebar from "./partials/Admin/Sidebar";
import Content from "./partials/Admin/Content";

const LayoutAdmin = (props) => {

    return (
        <React.Fragment>
            <Header/>
            <Sidebar/>
            <Content children={props.children}/>
        </React.Fragment>
    );

}

export default LayoutAdmin