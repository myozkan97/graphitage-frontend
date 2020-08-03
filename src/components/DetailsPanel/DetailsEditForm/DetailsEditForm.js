import React, { useCallback, useEffect, useReducer } from "react";
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import TagBox from "../../TagBox/TagBox";
import LibraryTagBox from "./LibraryTagBox/LibraryTagBox";
import DatasetTagBox from "./DatasetTagBox/DatasetTagBox";

import { useForm } from "react-hook-form";

import * as actionCreators from "../../../store/actions/index";

import httpReq from "../../../store/actions/utils/http";

const initialState = {};

function reducer(state, action) {
  const stateClone = JSON.parse(JSON.stringify(state));
  const payloadClone = JSON.parse(JSON.stringify(action.payload));
  stateClone[action.type] = payloadClone;
  return stateClone;
}

const Details = (props) => {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleKeywordsChange = useCallback((array) => {
    dispatch({ type: "keywords", payload: array });
  }, []);
  const handleTargetsChange = useCallback((array) => {
    dispatch({ type: "targets", payload: array });
  }, []);
  const handleProblemsChange = useCallback((array) => {
    dispatch({ type: "problems", payload: array });
  }, []);
  const handleApplicationDomainsChange = useCallback((array) => {
    dispatch({ type: "applicationDomains", payload: array });
  }, []);
  const handleComponentsChange = useCallback((array) => {
    dispatch({ type: "components", payload: array });
  }, []);
  const handleHighlightsChange = useCallback((array) => {
    dispatch({ type: "highlights", payload: array });
  }, []);
  const handleContributionsChange = useCallback((array) => {
    dispatch({ type: "contributions", payload: array });
  }, []);
  const handleProsChange = useCallback((array) => {
    dispatch({ type: "pros", payload: array });
  }, []);
  const handleConsChange = useCallback((array) => {
    dispatch({ type: "cons", payload: array });
  }, []);
  const handleFutureWorksChange = useCallback((array) => {
    dispatch({ type: "futureWorks", payload: array });
  }, []);
  const handleNotesChange = useCallback((array) => {
    dispatch({ type: "notes", payload: array });
  }, []);
  const handleDatasetsChange = useCallback((array) => {
    dispatch({ type: "dataset", payload: array });
  }, []);
  const handleEvaluationsChange = useCallback((array) => {
    dispatch({ type: "evaluations", payload: array });
  }, []);
  const handleLibrariesChange = useCallback((array) => {
    dispatch({ type: "libraries", payload: array });
  }, []);
  const handleAbstractChange = useCallback((event) => {
    dispatch({ type: "abstractOfPaper", payload: event.target.value });
  }, []);
  const handleYearChange = useCallback((event) => {
    dispatch({ type: "year", payload: event.target.value });
  }, []);

  const onUpdateSubmit = useCallback((data) => {
    console.log(data);
    console.log(state);

    let jsonToSend = { ...state };
    jsonToSend["abstractOfPaper"] = data.abstract;
    jsonToSend["authors"] = "";
    jsonToSend["comments"] = [];
    jsonToSend["constraints"] = [];
    jsonToSend["linkOfPaper"] = "";
    jsonToSend["paperId"] = props.dtl.paperId;
    jsonToSend["paperIdType"] = props.dtl.paperIdType;
    jsonToSend["reader"] = props.dtl.reader ? props.dtl.reader : [];
    jsonToSend["relatedWorks"] = props.dtl.relatedWorks
      ? props.dtl.relatedWorks
      : [];
    jsonToSend["summaries"] = [];
    jsonToSend["title"] = props.dtl.title;
    jsonToSend["year"] = data.year;
    // jsonToSend["datasets"] = props.dtl.datasets ? props.dtl.datasets : [];
    console.log(jsonToSend);

    httpReq("papers", "PUT", JSON.stringify(jsonToSend)).then((result) => {
      console.log(result);
      if (result.error) {
        props.onOpenErrorModal("Connection Error!"); //TODO: Fix - Returns response status 200, but this opens anyway.
      } else {
      }
    });
  });

  return (
    <div style={{ color: "#142850" }} className="DetailsEditForm">
      <h2>{props.dtl.title}</h2>

      {props.edit && (
        <p>
          ID: {props.dtl.paperId}/{props.dtl.paperIdType}
        </p>
      )}

      <Form
        style={{ color: "#142850" }}
        onSubmit={handleSubmit(onUpdateSubmit)}
      >
        {props.add && (
          <InputGroup>
            <FormControl
              placeholder="Paper ID"
              aria-label="Paper ID"
              aria-describedby="basic-addon2"
              name="paperId"
              ref={register()}
            />
            <Form.Control
              name="paperIdType"
              ref={register()}
              as="select"
              custom
            >
              <option>ARXIV</option>
              <option>DOI</option>
              <option>SEMANTIC</option>
            </Form.Control>
            <InputGroup.Append>
              <Button variant="outline-secondary">Get Details</Button>
            </InputGroup.Append>
          </InputGroup>
        )}

        <h3 className="menuHeader">Year</h3>
        <Form.Group controlId="year">
          <Form.Control
            defaultValue={props.dtl.year}
            as="input"
            type="text"
            name="year"
            ref={register()}
          />
        </Form.Group>

        <h3 className="menuHeader">Authors</h3>
        {props.add ? (
            <Form.Group controlId="authors" className="noAutocomplete">
              <TagBox
                load={props.dtl.authors}
                tags={props.dtl.authors}
                onChange={handleAuthorsChange}
              />
            </Form.Group>
        ) : ()}
        <h3 className="menuHeader">Keywords</h3>
        <Form.Group controlId="keywords" className="noAutocomplete">
          <TagBox
            load={props.dtl.keywords}
            tags={props.dtl.keywords}
            onChange={handleKeywordsChange}
          />
        </Form.Group>

        <h3 className="menuHeader">Abstract</h3>
        <Form.Group controlId="abstract">
          <Form.Control
            defaultValue={props.dtl.abstractOfPaper}
            as="textarea"
            rows="8"
            type="text"
            name="abstract"
            ref={register()}
          />
        </Form.Group>

        <h3 className="menuHeader">Targets</h3>
        <Form.Group controlId="targets">
          <TagBox
            load={props.dtl.targets}
            tags={props.dtl.targets}
            onChange={handleTargetsChange}
          />
        </Form.Group>

        <h3 className="menuHeader">Problems</h3>
        <Form.Group controlId="problems" className="noAutocomplete">
          <TagBox
            load={props.dtl.problems}
            tags={props.dtl.problems}
            onChange={handleProblemsChange}
          />
        </Form.Group>

        <h3 className="menuHeader">Application Domains</h3>
        <Form.Group controlId="applicationDomains" className="noAutocomplete">
          <TagBox
            load={props.dtl.applicationDomains}
            tags={props.dtl.applicationDomains}
            onChange={handleApplicationDomainsChange}
          />
        </Form.Group>

        <h3 className="menuHeader">Components</h3>
        <Form.Group controlId="components" className="noAutocomplete">
          <TagBox
            load={props.dtl.components}
            tags={props.dtl.components}
            onChange={handleComponentsChange}
          />
        </Form.Group>

        <h3 className="menuHeader">Highlights</h3>
        <Form.Group controlId="highlights" className="noAutocomplete">
          <TagBox
            load={props.dtl.highlights}
            tags={props.dtl.highlights}
            onChange={handleHighlightsChange}
          />
        </Form.Group>

        <h3 className="menuHeader">Contributions</h3>
        <Form.Group controlId="contributions" className="noAutocomplete">
          <TagBox
            load={props.dtl.contributions}
            tags={props.dtl.contributions}
            onChange={handleContributionsChange}
          />
        </Form.Group>

        <h3 className="menuHeader">Pros</h3>
        <Form.Group controlId="pros" className="noAutocomplete">
          <TagBox
            load={props.dtl.pros}
            tags={props.dtl.pros}
            onChange={handleProsChange}
          />
        </Form.Group>

        <h3 className="menuHeader">Cons</h3>
        <Form.Group controlId="cons" className="noAutocomplete">
          <TagBox
            load={props.dtl.cons}
            tags={props.dtl.cons}
            onChange={handleConsChange}
          />
        </Form.Group>

        <h3 className="menuHeader">Future Works</h3>
        <Form.Group controlId="futureWorks" className="noAutocomplete">
          <TagBox
            load={props.dtl.futureWorks}
            tags={props.dtl.futureWorks}
            onChange={handleFutureWorksChange}
          />
        </Form.Group>

        <h3 className="menuHeader">Notes</h3>
        <Form.Group controlId="notes" className="noAutocomplete">
          <TagBox
            load={props.dtl.notes}
            tags={props.dtl.notes}
            onChange={handleNotesChange}
          />
        </Form.Group>

        <h3 className="menuHeader">Datasets</h3>
        <DatasetTagBox
          onChange={handleDatasetsChange}
          load={props.dtl.datasets}
        />

        <h3 className="menuHeader">Libraries</h3>
        <Form.Group controlId="libraries">
          <LibraryTagBox
            load={props.dtl.libraries}
            onChange={handleLibrariesChange}
          />
        </Form.Group>

        <h3 className="menuHeader">Evaluations</h3>
        <Form.Group controlId="evaluations" className="noAutocomplete">
          <TagBox
            load={props.dtl.evaluations}
            tags={props.dtl.evaluations}
            onChange={handleEvaluationsChange}
          />
        </Form.Group>

        <br />
        <Container>
          <Row>
            <Col>
              <Button type="submit" variant="success" size="lg-2" block>
                Save Changes
              </Button>
            </Col>
            <Col xs={1}></Col>
            <Col>
              <Button
                onClick={() => props.setEditing(false)}
                variant="danger"
                size="lg-2"
                block
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Container>
        <br />
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dtl: state.details,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetToHideNodeId: (id) => dispatch(actionCreators.setToHideNodeId(id)),
    onOpenLoadingScreen: () => dispatch(actionCreators.openLoadingScreen()),
    onCloseLoadingScreen: () => dispatch(actionCreators.closeLoadingScreen()),
    onOpenErrorModal: (errorMessage) =>
      dispatch(actionCreators.openErrorModal(errorMessage)),
    onClearGraph: (bool) => dispatch(actionCreators.clearNodes(bool)),
    onSimpleExpand: (sourceNode) =>
      dispatch(actionCreators.simpleExpand(sourceNode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
