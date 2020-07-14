import React, { useState } from 'react';
import { slide as SideMenu } from 'react-burger-menu'; 

import SearchMenu from '../../components/Navigation/SearchMenu/SearchMenu';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import classes from './Layout.module.css'
import OptionsMenu from '../../components/OptionsMenu/OptionsMenu';



const Layout = (props) => {
    const [search, setSearch] = useState(false);
    const [options, setOptions] = useState(false);

    const searchClosedHandler = () => {
        setSearch(false);
    }

    const searchClickedHandler = () => {
        setSearch(true);
        setOptions(false);
    }

    const optionsClosedHandler = () => {
        setOptions(false);
    }

    const optionsClickedHandler = () => {
        setOptions(true);
        setSearch(false);
    }

    const clearGraph = () => {

    }

    return (
        <React.Fragment>
            <SearchMenu search={search} searchClosed={searchClosedHandler}></SearchMenu>
            <Toolbar searchClick={searchClickedHandler} optionsClick={optionsClickedHandler} clearGraph={clearGraph}></Toolbar>
            <OptionsMenu options={options} optionsClosed={optionsClosedHandler}></OptionsMenu>
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    );
} 



export default Layout; 