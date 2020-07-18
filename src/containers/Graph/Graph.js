import React, { useEffect, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';

import ContextMenu from '../../components/ContextMenu/ContextMenu';

const Graph = (props) => {
    const outerRef = useRef(null);

    const { onSimpleExpand } = props;
    useEffect(() => {
        onSimpleExpand();
    }, [onSimpleExpand]);


    const { onOpenContextMenu, detailsMenuHandler } = props;
    useEffect(() => {
        Graph.cy.on('click', 'node', (event) => {
            // console.log(event.target._private.data);
            // var j = Graph.cy.$('#' + event.target._private.data.id);
            // Graph.cy.remove(j);

            detailsMenuHandler(event.target._private.data.id);
        });

        Graph.cy.on('cxttapend', 'node', (event) => {
            onOpenContextMenu(event.target._private.data.id);
        });

        // Add funcs like event listeners here! Example:
        //
        // document.body.addEventListener('click', function () {
        //     console.log('click');
        //     Graph.cy.add([{ data: { id: 'sdads', label: 'Node 5' }, position: { x: 400, y: 0 } }]);
        // });
    }, [onOpenContextMenu, detailsMenuHandler])

    const { elements } = props
    useEffect(() => {

        Graph.cy.add(
            // { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
            // { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
            // { data: { id: 'three', label: 'Node 3' }, position: { x: 200, y: 0 } },
            // { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } },
            // { data: { source: 'two', target: 'three', label: 'Edge from Node2 to Node3' } }
            elements
        );
    }, [elements]);

    if (props.clr) { // Clears graph
        Graph.cy.elements().remove();
        props.onSwitchClearGraph(false);
    }


    return (
        <div ref={outerRef} style={{ height: '100%' }}>
            <CytoscapeComponent cy={(cy) => { Graph.cy = cy }} elements={[]} style={{ width: '100%', height: '100%' }} />
            <ContextMenu outerRef={outerRef} />
        </div>
    );

}


const mapStateToProps = state => {
    return {
        clr: state.graph.clearNodes,
        elements: state.graph.elements
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSwitchClearGraph: (isActive) => dispatch(actionCreators.clearNodes(isActive)),
        onFetchDetails: () => dispatch(actionCreators.fetchDetails()),
        onOpenContextMenu: (nodeId) => dispatch(actionCreators.openContextMenu(nodeId)),
        onCloseContextMenu: () => dispatch(actionCreators.closeContextMenu()),
        onSimpleExpand: (nodeId) => dispatch(actionCreators.simpleExpand(nodeId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph); 