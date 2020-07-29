import React, { useState, useCallback, useEffect, useMemo } from "react";
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Form from "react-bootstrap/Form";
import TagBox from "../../TagBox/TagBox";

import { useForm } from "react-hook-form";

import * as actionCreators from "../../../store/actions/index";

import httpReq from "../../../store/actions/utils/http";

const Details = (props) => {
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });

  const [keywords, setKeywords] = useState([]);
  const [targets, setTargets] = useState([]);
  const [problems, setProblems] = useState([]);
  const [applicationDomains, setApplicationDomains] = useState([]);
  const [components, setComponents] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [pros, setPros] = useState([]);
  const [cons, setCons] = useState([]);
  const [futureWorks, setFutureWorks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    if (props.dtl.keywords) setKeywords([...props.dtl.keywords]);
  }, [props.dtl.keywords]);

  const handleKeywordsChange = useCallback((array) => {
    setKeywords(array);
    console.log("setting keywords");
  }, []);
  const handleTargetsChange = useCallback((array) => {
    setTargets(array);
    console.log("setting targets");
  }, []);
  const handleProblemsChange = useCallback((array) => {
    setProblems(array);
    console.log("setting problems");
  }, []);
  const handleApplicationDomainsChange = useCallback((array) => {
    setApplicationDomains(array);
    console.log("setting app dom");
  }, []);
  const handleComponentsChange = useCallback((array) => {
    setComponents(array);
    console.log("setting components");
  }, []);
  const handleHighlightsChange = useCallback((array) => {
    setHighlights(array);
    console.log("setting highlights");
  }, []);
  const handleContributionsChange = useCallback((array) => {
    setContributions(array);
    console.log("setting cont");
  }, []);
  const handleProsChange = useCallback((array) => {
    setPros(array);
    console.log("setting pros");
  }, []);
  const handleConsChange = useCallback((array) => {
    setCons(array);
    console.log("setting cons");
  }, []);
  const handleFutureWorksChange = useCallback((array) => {
    setFutureWorks(array);
    console.log("setting future");
  }, []);
  const handleNotesChange = useCallback((array) => {
    setNotes(array);
    console.log("setting notes");
  }, []);
  const handleDatasetsChange = useCallback((array) => {
    setDatasets(array);
    console.log("setting datasets");
  }, []);
  const handleEvaluationsChange = useCallback((array) => {
    setEvaluations(array);
    console.log("setting eval");
  }, []);

  return (
    <div style={{ color: "#142850" }} className="DetailsEditForm">
      <h2>{props.dtl.title}</h2>
      {props.dtl.year && (
        <div className="year">
          <h4>Year: {props.dtl.year}</h4>
        </div>
      )}

      <p>
        ID: {props.dtl.paperId}/{props.dtl.paperIdType}
      </p>

      <Form style={{ color: "#142850" }} onSubmit={handleSubmit()}>
        <h3 className="menuHeader">Keywords</h3>
        
          <Form.Group controlId="keywords" className="noAutocomplete">
            {console.log(props.dtl.keywords)}
            <TagBox
              load={props.dtl.keywords}
              tags={props.dtl.keywords}
              onChange={handleKeywordsChange}
            />
          </Form.Group>

        <h3 className="menuHeader">Abstract</h3>
        <Form.Group controlId="abstract">
          {console.log(props.dtl)}
          <Form.Control
            readOnly={false}
            value={props.dtl.abstractOfPaper}
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
        {/* <Form.Group controlId="datasets">
          <TagBox
            load={props.dtl.datasets && props.dtl.datasets.map((dataset) => dataset.dataset.datasetName)}
            tags={props.dtl.datasets && props.dtl.datasets.map((dataset) => dataset.dataset.datasetName)}
            onChange={handleDatasetsChange}
          />
        </Form.Group> */}

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
                <Button
                  variant="success"
                  size="lg-2"
                  block
                >
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
