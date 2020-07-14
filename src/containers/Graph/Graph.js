import React from 'react';
import ReactDOM from 'react-dom';
import CytoscapeComponent from 'react-cytoscapejs';

import classes from './Graph.module.css';


const Graph = (props) => {
    const elements = [
        { data: { id: '1', label: 'Node 1' }, position: { x: 0, y: 0 } },
        { data: { id: '2', label: 'Node 2' }, position: { x: 0, y: 0 } },
        { data: { id: '3', label: 'Node 3' }, position: { x: 0, y: 0 } },
        { data: { id: '4', label: 'Node 4' }, position: { x: 0, y: 0 } },
        { data: { id: '5', label: 'Node 5' }, position: { x: 0, y: 0 } },
        { data: { id: '6', label: 'Node 6' }, position: { x: 100, y: 0 } },
        { data: { source: '1', target: '2', label: 'Edge from Node1 to Node2' }},
        { data: { source: '1', target: '3', label: 'Edge from Node1 to Node2' }},
        { data: { source: '1', target: '4', label: 'Edge from Node1 to Node2' }},
        { data: { source: '1', target: '5', label: 'Edge from Node1 to Node2' }},
        { data: { source: '1', target: '6', label: 'Edge from Node1 to Node2' }},
     ];

     return <CytoscapeComponent elements={elements} style={ { width: '100%', height: '100%' } } />;
}


export default Graph;