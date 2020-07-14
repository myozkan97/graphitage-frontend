import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import CytoscapeComponent from 'react-cytoscapejs';

import classes from './Graph.module.css';


const Graph = (props) => {
    const elements = [
        { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
        { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
        { data: { id: 'three', label: 'Node 3' }, position: { x: 200, y: 0 } },
        { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } },
        { data: { source: 'two', target: 'three', label: 'Edge from Node2 to Node3' } }
     ];

     useEffect(() => {
        Graph.cy.on('click', 'node', (event) => {
            console.log(event.target._private.data);
            var j = Graph.cy.$('#' + event.target._private.data.id);
            Graph.cy.remove( j );
          })
      });
      


     return <CytoscapeComponent cy={(cy) => {Graph.cy = cy}} elements={elements} style={ { width: '100%', height: '100%' } } />;
}


export default Graph;