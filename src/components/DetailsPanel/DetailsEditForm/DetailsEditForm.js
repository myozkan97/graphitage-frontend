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
      if(props.dtl.keywords)
        setKeywords([...props.dtl.keywords]);
  }, [props.dtl.keywords]);

  const handleKeywordsChange = useCallback((array) => {
    setKeywords(array);
  }, []);
  const handleTargetsChange = useCallback((array) => {
    setTargets(array);
  }, []);
  const handleProblemsChange = useCallback((array) => {
    setProblems(array);
  }, []);
  const handleApplicationDomainsChange = useCallback((array) => {
    setApplicationDomains(array);
  }, []);
  const handleComponentsChange = useCallback((array) => {
    setComponents(array);
  }, []);
  const handleHighlightsChange = useCallback((array) => {
    setHighlights(array);
  }, []);
  const handleContributionsChange = useCallback((array) => {
    setContributions(array);
  }, []);
  const handleProsChange = useCallback((array) => {
    setPros(array);
  }, []);
  const handleConsChange = useCallback((array) => {
    setCons(array);
  }, []);
  const handleFutureWorksChange = useCallback((array) => {
    setFutureWorks(array);
  }, []);
  const handleNotesChange = useCallback((array) => {
    setNotes(array);
  }, []);
  const handleDatasetsChange = useCallback((array) => {
    setDatasets(array);
  }, []);
  const handleEvaluationsChange = useCallback((array) => {
    setEvaluations(array);
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
        {props.dtl.keywords && (
          <Form.Group controlId="keywords">
            {console.log(props.dtl.keywords)}
            <TagBox load={props.dtl.keywords} tags={props.dtl.keywords} onChange={handleKeywordsChange} />
          </Form.Group>
        )}

        <h3 className="menuHeader">Abstract</h3>
        <Form.Group controlId="abstract">
          <Form.Control type="textArea" name="abstract" ref={register()} />
        </Form.Group>

        {props.dtl.targets && (
          <>
            <h3 className="menuHeader">Targets</h3>
            <Form.Group controlId="targets">
              <TagBox tags={props.dtl.targets} onChange={handleTargetsChange} />
            </Form.Group>
          </>
        )}

        {props.dtl.problems && (
          <>
            <h3 className="menuHeader">Problems</h3>
            <Form.Group controlId="problems">
              <TagBox tags={props.dtl.problems} onChange={handleProblemsChange} />
            </Form.Group>
          </>
        )}

{props.dtl.applicationDomains && (
          <>
        <h3 className="menuHeader">Application Domains</h3>
        <Form.Group controlId="applicationDomains">
          <TagBox tags={props.dtl.applicationDomains} onChange={handleApplicationDomainsChange} />
        </Form.Group>
        </>
        )}

        {props.dtl.components && (
          <>
        <h3 className="menuHeader">Components</h3>
        <Form.Group controlId="components">
          <TagBox tags={props.dtl.components} onChange={handleComponentsChange} />
        </Form.Group>
        </>
        )}

        {props.dtl.highlights && (
          <>
        <h3 className="menuHeader">Highlights</h3>
        <Form.Group controlId="highlights">
          <TagBox tags={props.dtl.highlights} onChange={handleHighlightsChange} />
        </Form.Group>
        </>
        )}

        {props.dtl.contributions && (
          <>
        <h3 className="menuHeader">Contributions</h3>
        <Form.Group controlId="contributions">
          <TagBox tags={props.dtl.contributions} onChange={handleContributionsChange} />
        </Form.Group>
        </>
        )}

        {props.dtl.pros && (
          <>
        <h3 className="menuHeader">Pros</h3>
        <Form.Group controlId="pros">
          <TagBox tags={props.dtl.pros} onChange={handleProsChange} />
        </Form.Group>
        </>
        )}

        {props.dtl.cons && (
          <>
        <h3 className="menuHeader">Cons</h3>
        <Form.Group controlId="cons">
          <TagBox tags={props.dtl.cons} onChange={handleConsChange} />
        </Form.Group>
        </>
        )}

        {props.dtl.futureWorks && (
          <>
        <h3 className="menuHeader">Future Works</h3>
        <Form.Group controlId="futureWorks">
          <TagBox tags={props.dtl.futureWorks} onChange={handleFutureWorksChange} />
        </Form.Group>
        </>
        )}

        {props.dtl.notes && (
          <>
        <h3 className="menuHeader">Notes</h3>
        <Form.Group controlId="notes">
          <TagBox tags={props.dtl.notes} onChange={handleNotesChange} />
        </Form.Group>
        </>
        )}

        {props.dtl.data && (
          <>
        <h3 className="menuHeader">Datasets</h3>
        <Form.Group controlId="data">
          <TagBox
            tags={[1,2,3,4]}
            // tags={props.dtl.data.map((obj) => obj.datasetName)}
            onChange={handleDatasetsChange}
          />
        </Form.Group>
        </>
        )}

        {props.dtl.evaluations && (
          <>
        <h3 className="menuHeader">Evaluations</h3>
        <Form.Group controlId="evaluations">
          <TagBox tags={props.dtl.evaluations} onChange={handleEvaluationsChange} />
        </Form.Group>
        </>
        )}
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
