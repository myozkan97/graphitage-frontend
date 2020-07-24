import React from "react";
import { connect } from 'react-redux';

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import * as actionCreators from '../../store/actions/index';

function ErrorModal(props) {
  return (
    <Modal.Dialog style={{position: 'absolute', left: '50%', top: '10%', transform: 'translate(-50%, 0)'}}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{props.message}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Close</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}


const mapStateToProps = state => {
    return {
        message: state.ui.errorModal.errorMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCloseErrorModal: () => dispatch(actionCreators.closeErrorModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal); 