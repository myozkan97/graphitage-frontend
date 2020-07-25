import React from "react";
import { connect } from "react-redux";

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import * as actionCreators from "../../../store/actions/index";

import httpReq from "../../../store/actions/utils/http";

const stringFromArray = (array, sep = ", ") => {
  return array.reduce((acc, cur, index) => {
    return acc + cur + sep;
  }, "");
};

const pFromArray = (array, key, htmlEl = "p") => {
  if (htmlEl === "p") {
    return array.reduce((acc, cur, index) => {
      acc.push(<p key={key + String(index)}>{cur}</p>);
      return acc;
    }, []);
  } else if (htmlEl === "list") {
    const listArr = array.reduce((acc, cur, index) => {
      acc.push(<li key={key + String(index)}>{cur}</li>);
      return acc;
    }, []);

    return <ul>{listArr}</ul>;
  }
};

const Details = (props) => {

  const handleHideButton = () => {
    props.onSetToHideNodeId(props.nodeId);
  }

  const handleDeleteButton = () => {
    props.onOpenLoadingScreen();
    httpReq("papers/" + props.nodeId, "DELETE")
      .then((result) => {
        console.log("deleted node:" + props.nodeId);
        props.onClearGraph(true);
        props.onSimpleExpand();
        props.onCloseLoadingScreen();
      })
      .catch((error) => {
        props.onCloseLoadingScreen();
        props.onOpenErrorModal("Could not delete node!");
      });
  }
  

  return (
    <div style={{ color: "#142850" }} className="Details">
      <h2>{props.dtl.title}</h2>
      <div className="body">
        {props.dtl.abstractOfPaper && (
          <div className="abstract">
            <h3>Abstract</h3>
            <p>{props.dtl.abstractOfPaper}</p>
          </div>
        )}
        {props.dtl.year && (
          <div className="year">
            <p>Year: {props.dtl.year}</p>
          </div>
        )}
        {props.dtl.applicationDomains && (
          <div className="applicationDomains">
            <h3>Application Domains</h3>
            <p>{stringFromArray(props.dtl.applicationDomains, ", ")}</p>
          </div>
        )}
        {props.dtl.components && (
          <div className="components">
            <h3>Components</h3>
            <p>{stringFromArray(props.dtl.components, ", ")}</p>
          </div>
        )}
        {props.dtl.highlights && (
          <div className="highlights">
            <h3>Highlights</h3>
            {pFromArray(props.dtl.highlights)}
          </div>
        )}
        {props.dtl.contributions && (
          <div className="contributions">
            <h3>Contributions</h3>
            {pFromArray(props.dtl.contributions, "cont")}
          </div>
        )}
        {props.dtl.pros && (
          <div className="pros">
            <h3>Pros</h3>
            {pFromArray(props.dtl.pros, "pros", "list")}
          </div>
        )}
        {props.dtl.notes && (
          <div className="notes">
            <h3>Notes</h3>
            {pFromArray(props.dtl.notes, "notes")}
          </div>
        )}
        {props.dtl.data && (
          <div className="data">
            <h3>Datasets</h3>
            <p>
              {stringFromArray(props.dtl.data.map((obj) => obj.datasetName))}
            </p>
          </div>
        )}
        {props.dtl.libraries && (
          <div className="libraries">
            <h3>Libraries</h3>
            <ul>
              {props.dtl.libraries.map((obj, index) => (
                <li key={"libs" + String(index)}>
                  <a href={obj.link}>{obj.name}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {props.dtl.relatedWorks && (
          <div className="relatedWorks">
            <h3>Related Works</h3>
            <ul>
              {props.dtl.relatedWorks.map((obj, index) => (
                <li key={"relatedW" + String(index)}>{obj.title}</li>
              ))}
            </ul>
          </div>
        )}
        {props.dtl.reader && (
          <div className="reader">
            <h3>Readers</h3>
            <ul>
              {props.dtl.reader.map((obj, index) => (
                <li key={"readers" + String(index)}>{obj.readerName}</li>
              ))}
            </ul>
          </div>
        )}

        {/* hide node button */}
        <br/>
        <Container>
          <Row>
            <Col><Button onClick={handleHideButton} variant="warning" size="lg-2" block>Hide Node</Button></Col>
            <Col xs={1}></Col>
            <Col><Button onClick={handleDeleteButton} variant="danger" size="lg-2" block>Delete Node</Button></Col>
          </Row>
        </Container>
        <br/>
        
      </div>
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
    onOpenErrorModal: (errorMessage) => dispatch(actionCreators.openErrorModal(errorMessage)),
    onClearGraph: (bool) => dispatch(actionCreators.clearNodes(bool)),
    onSimpleExpand: (sourceNode) =>
      dispatch(actionCreators.simpleExpand(sourceNode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
