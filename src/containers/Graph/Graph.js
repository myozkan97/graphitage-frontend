import React, { useEffect, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { connect } from 'react-redux';
import Cytoscape from 'cytoscape';
import CoseBilkent from 'cytoscape-cose-bilkent';



import * as actionCreators from '../../store/actions/index';

import ContextMenu from '../../components/ContextMenu/ContextMenu';

const layout = {
    name: 'cose-bilkent',
    randomize: true
};

Cytoscape.use(CoseBilkent);

const Graph = (props) => {
    const outerRef = useRef(null);

    const { onSimpleExpand } = props;
    useEffect(() => {
        onSimpleExpand();
    }, [onSimpleExpand]);


    const { onOpenContextMenu, detailsMenuHandler, onFetchDetails } = props;
    useEffect(() => {
        Graph.cy.on('click', 'node', (event) => {
            // console.log(event.target._private.data);
            // var j = Graph.cy.$('#' + event.target._private.data.id);
            // Graph.cy.remove(j);

            detailsMenuHandler(event.target._private.data.id);
            onFetchDetails(event.target._private.data.id);
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
    }, [onOpenContextMenu, detailsMenuHandler, onFetchDetails])

    const { elements } = props
    useEffect(() => {
        Graph.cy.add(
            elements
        );
        Graph.cy.elements().layout(layout).run();
    }, [elements]);

    if (props.clr) { // Clears graph
        Graph.cy.elements().remove();
        props.onSwitchClearGraph(false);
    }

   

    return (
        <div ref={outerRef} style={{ height: '100%' }}>
            <CytoscapeComponent cy={(cy) => { Graph.cy = cy }} elements={[]} layout={layout} style={{ width: '100%', height: '100%' }} />
            <ContextMenu outerRef={outerRef}  />
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
        onFetchDetails: (id) => dispatch(actionCreators.fetchDetails(id)),
        onOpenContextMenu: (nodeId) => dispatch(actionCreators.openContextMenu(nodeId)),
        onCloseContextMenu: () => dispatch(actionCreators.closeContextMenu()),
        onSimpleExpand: (nodeId) => dispatch(actionCreators.simpleExpand(nodeId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph); 