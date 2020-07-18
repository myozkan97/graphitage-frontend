import React from "react"
import { connect } from 'react-redux';

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const Details = (props) => {
    return (
        <Form>
            <h3>
               <br/> Details
            </h3>
            <p>
               <br/> NodeId: {props.nodeId}
               <br/> Paper Id Type: {props.dtl.paperIdType}
               <br/> Title: {props.dtl.title}
            </p>
        </Form>
    )
}


const mapStateToProps = state => {
    return {
        dtl: state.details
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details); 
