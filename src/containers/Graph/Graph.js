import React, {useEffect} from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';


const Graph = (props) => {
     useEffect(() => {
        props.onFetchDetails();
        Graph.cy.add([
            { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
            { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
            { data: { id: 'three', label: 'Node 3' }, position: { x: 200, y: 0 } },
            { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } },
            { data: { source: 'two', target: 'three', label: 'Edge from Node2 to Node3' } }
        ]);

        Graph.cy.on('click', 'node', (event) => {
            console.log(event.target._private.data);
            var j = Graph.cy.$('#' + event.target._private.data.id);
            Graph.cy.remove( j );
        });

        // Add funcs like event listeners here! Example:
        //
        // document.body.addEventListener('click', function () {
        //     console.log('click');
        //     Graph.cy.add([{ data: { id: 'sdads', label: 'Node 5' }, position: { x: 400, y: 0 } }]);
        // });

        },[]);

        if (props.clr) { // Clears graph
            Graph.cy.elements().remove();
            props.switchClearGraph(false);
        }
      
      
     return <CytoscapeComponent cy={(cy) => {Graph.cy = cy}} elements={[]} style={ { width: '100%', height: '100%' } } />;

}


const mapStateToProps = state => {
    return {
        clr: state.graph.clearNodes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        switchClearGraph: (isActive) => dispatch(actionCreators.clearNodes(isActive)),
        onFetchDetails: () => dispatch(actionCreators.fetchDetails())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph); 