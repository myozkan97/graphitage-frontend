import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";

import { connect } from "react-redux";

import * as actionCreators from "../../../../store/actions/index";
import httpReq from "../../../../store/actions/utils/http";

import BootstrapSwitchButton from "bootstrap-switch-button-react";

const baseUrl = "https://graphitage.herokuapp.com/api.graphitage.com/";

const styles = {
    searchBttn:  {
        width: "50%",
        float: "right",
    }
}

const SearchForm = (props) => {
  // there's also a prob call error, we can use it to display form errors
  const { register, handleSubmit, watch, formState } = useForm({
    mode: "onChange",
  });

  // is "and" search toggled (otherwise its an "or" search)
  const [isOn, setIsOn] = useState(false);

  // create request url and make the request
  const onSubmit = (data) => {
    let urlToSend =
      baseUrl + isOn ? "papers/searchWithAND?" : "papers/searchWithOR?";
    if (data.Dataset !== "") {
      urlToSend += "dataset=" + data.Dataset;
    }
    if (data.Keywords !== "") {
      urlToSend += "&keyword=" + data.Keywords;
    }
    if (data.LibraryName !== "") {
      urlToSend += "&library=" + data.LibraryName;
    }
    if (data.PublishDate !== "") {
      urlToSend += "&publishData=" + data.PublishDate;
    }
    if (data.Readers !== "") {
      urlToSend += "&readerName=" + data.Readers;
    }
    if (data.Title !== "") {
      urlToSend += "&title=" + data.Title;
    }

    httpReq(urlToSend, "GET").then((result) => {
      props.onClearGraph(true);
      props.onAddElementsToGraph(result.data);
    });
  };

  const validate = () => {
    const test1 = watch("Title");
    const test2 = watch("PublishDate");
    const test3 = watch("Readers");
    const test4 = watch("Keywords");
    const test5 = watch("LibraryName");
    const test6 = watch("Dataset");

    let button = document.getElementById("searchButton");
    if (test1 || test2 || test3 || test4 || test5 || test6) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  };

  return (
    <Form style={{ color: "#142850" }} onSubmit={handleSubmit(onSubmit)}>
      <h3 className="menuHeader">Search</h3>
      <Form.Group controlId="searchFormTitle">
        <Form.Control
          type="text"
          placeholder="Title"
          name="Title"
          ref={register({ validate })}
        />
      </Form.Group>

      <Form.Group controlId="searchFormPublishDate">
        <Form.Control
          type="text"
          name="PublishDate"
          onBlur={(e) => {
            e.currentTarget.type = "text";
            e.currentTarget.placeholder = "Publish Date";
          }}
          onFocus={(e) => (e.currentTarget.type = "date")}
          placeholder="Publish Date"
          ref={register({ validate })}
        />
      </Form.Group>

      <Form.Group controlId="searchFormReaders">
        <Form.Control
          type="text"
          placeholder="Readers"
          name="Readers"
          ref={register({ validate })}
        />
      </Form.Group>

      <Form.Group controlId="searchFormKeywords">
        <Form.Control
          type="text"
          placeholder="Keywords"
          name="Keywords"
          ref={register({ validate })}
        />
      </Form.Group>

      <Form.Group controlId="searchFormLibraryName">
        <Form.Control
          type="text"
          placeholder="Library Name"
          name="LibraryName"
          ref={register({ validate })}
        />
      </Form.Group>

      <Form.Group controlId="searchFormDataset">
        <Form.Control
          type="text"
          placeholder="Dataset"
          name="Dataset"
          ref={register({ validate })}
        />
      </Form.Group>

      <Form.Group controlId="searchFormSwitch">
        <div>
          Search With
          <BootstrapSwitchButton
            onlabel="AND"
            onstyle="primary"
            offlabel="OR"
            offstyle="info"
            style={styles.searchBttn}
            onChange={(checked) => {
              if (checked) {
                setIsOn(true);
              } else {
                setIsOn(false);
              }
            }}
          />
        </div>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        id="searchButton"
        name="Search"
        disabled={!formState.isValid}
      >
        Search
      </Button>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearGraph: (bool) => dispatch(actionCreators.clearNodes(bool)),
    onAddElementsToGraph: (elements) =>
      dispatch(actionCreators.addElements(elements)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
