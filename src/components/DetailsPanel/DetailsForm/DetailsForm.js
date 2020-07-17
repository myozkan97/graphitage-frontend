import React from "react"

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const Details = (props) => {
    return (
        <Form>
            <h3>
                Details
            </h3>
            <p>NodeId: {props.nodeId}</p>
        </Form>
    )
}

export default Details;
