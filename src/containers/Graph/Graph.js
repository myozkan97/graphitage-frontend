import React, { useEffect, useRef } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { connect } from "react-redux";
import Cytoscape from "cytoscape";
import CoseBilkent from "cytoscape-cose-bilkent";

import * as actionCreators from "../../store/actions/index";

import ContextMenu from "../ContextMenu/ContextMenu";

const layout = {
  name: "cose-bilkent",
  randomize: true,
  idealEdgeLength: 200,
  tilingPaddingHorizontal: 110,
  tilingPaddingVertical: 25,
};

Cytoscape.use(CoseBilkent);

const Graph = (props) => {
    const outerRef = useRef(null);

    // Start out with simple expand at the beginning
    const { onSimpleExpand } = props;
    useEffect(() => {
        onSimpleExpand();
    }, [onSimpleExpand]);


    // Setting up event listeners
    const { onOpenContextMenu, detailsMenuHandler, onFetchDetails } = props;
    useEffect(() => {
        Graph.cy.on('click', 'node', (event) => {
            if(event.target._private.data.type === "paper") {
                detailsMenuHandler(event.target._private.data.id);
                onFetchDetails(event.target._private.data.id);
            }
        });

        Graph.cy.on('cxttapend', 'node', (event) => {
            onOpenContextMenu(event.target._private);
        });

        Graph.cy.minZoom(0.1);
        Graph.cy.maxZoom(3);
        
    }, [onOpenContextMenu, detailsMenuHandler, onFetchDetails])


    const { elements } = props
    useEffect(() => {
        // applying node styles 
        let nodeStyle = 'node { background-color: white ; label: data(label); text-wrap: ellipsis; text-max-width: 140; height: 50; width: 50;  }';
        
        // add elements to the graph
        Graph.cy.add(
            elements
        );

        // apply node styles
        Graph.cy.style(nodeStyle);
        
        Graph.cy.style()
        .selector('node[type = "paper"]') // paper
            .style({
            'background-image': window.location.origin + '/paperIcon.png',
            'background-fit': 'cover',
        })
        .selector('node[type = "dataset"]') // dataset
            .style({
            'background-image': window.location.origin + '/datasetIcon.png',
            'background-fit': 'cover',
        })
        .selector('node[type = "reader"]') // reader
            .style({
            'background-image': window.location.origin + '/readerIcon.svg',
            'background-fit': 'cover'
        })
        .selector('node[type = "library"]') // library
            .style({
            'background-image': window.location.origin + '/libraryIcon.png',
            'background-fit': 'contain'
        })
        .selector('node[type = "keyword"]') // keyword
            .style({
            'background-image': window.location.origin + '/keywordIcon.png',
            'background-fit': 'contain'
        })

        .update(); // indicate the end of your new stylesheet so that it can be updated on elements
        
        // apply cose-bilkent layout
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
        onOpenContextMenu: (sourceNode) => dispatch(actionCreators.openContextMenu(sourceNode)),
        onCloseContextMenu: () => dispatch(actionCreators.closeContextMenu()),
        onSimpleExpand: (sourceNode) => dispatch(actionCreators.simpleExpand(sourceNode)),
        onAddElements: (data) => dispatch(actionCreators.addElements(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph); 
