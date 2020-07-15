import React, { useState, useEffect } from 'react';
import { slide as SideMenu } from 'react-burger-menu'; 
import {connect} from 'react-redux';

import SearchMenu from '../../components/Navigation/SearchMenu/SearchMenu';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import classes from './Layout.module.css'
import OptionsMenu from '../../components/OptionsMenu/OptionsMenu';

import * as actionTypes from '../../store/actions/actions';


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
        props.switchClearGraph(true);
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


const mapStateToProps = state => {
    return {
        clr: state.clearNodes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        switchClearGraph: (isActive) => dispatch({type: actionTypes.CLEAR_NODES, bool: isActive})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout); 