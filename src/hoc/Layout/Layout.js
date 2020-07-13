import React, { useState } from 'react';
import { slide as SideMenu } from 'react-burger-menu'; 

import SearchMenu from '../../components/Navigation/SearchMenu/SearchMenu';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import classes from './Layout.module.css'



const Layout = (props) => {
    const [search, setSearch] = useState(false);

    const searchClosedHandler = () => {
        setSearch(false);
    }

    const searchClickedHandler = () => {
        setSearch(true);
    }

    return (
        <React.Fragment>
            <SearchMenu search={search} searchClosed={searchClosedHandler}></SearchMenu>
            <Toolbar searchClick={searchClickedHandler}></Toolbar>
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    );
} 



export default Layout; 