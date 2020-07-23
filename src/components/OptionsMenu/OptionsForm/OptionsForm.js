import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";

import { connect } from "react-redux";

import * as actionCreators from "../../../store/actions/index";
import httpReq from "../../../store/actions/utils/http";

const baseUrl = "https://graphitage.herokuapp.com/api.graphitage.com/";

const OptionsForm = (props) => {
  // add "errors" and "watch" prop to display errors
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = (data) => {
    console.log(data.jsonFile[0]);
    const objectURL = URL.createObjectURL(data.jsonFile[0]);

    async function getData(url) {
      const response = await fetch(url);
      return response.json();
    }

    async function runConn() {
      const jsonData = await getData(objectURL);
      console.log(jsonData);

      httpReq(baseUrl + "papers", "POST", JSON.stringify(jsonData))
        .then((result) => {
          setIsSuccess(true);
          props.onClearGraph(true);
          props.onSimpleExpand();
        })
        .catch((error) => {
          setIsSuccess(false);
        });
    }

    runConn();
  };

  const onFileChange = (data) => {
    setIsSuccess(false);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="optionsFormJSON">
        <Form.File
          id="jsonFile"
          placeholder="jsonFile"
          onChange={onFileChange}
          name="jsonFile"
          ref={register()}
        />
      </Form.Group>

      <div>
        <Button
          variant="primary"
          type="submit"
          id="searchButton"
          name="Search"
          disabled={!formState.isValid}
        >
          Add
        </Button>
        {isSuccess && <h4 style={{ color: "green" }}>Success!</h4>}
      </div>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearGraph: (bool) => dispatch(actionCreators.clearNodes(bool)),
    onSimpleExpand: (sourceNode) =>
      dispatch(actionCreators.simpleExpand(sourceNode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionsForm);
