import React, { useState, useCallback, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

import httpReq from '../../store/actions/utils/http';

export default function AddRelatedPapersModal(props) {
   const [checkedElements, setCheckedElements] = useState([]);
   
    const clickHandler = useCallback((e, obj) => {
        const clone = JSON.parse(JSON.stringify(checkedElements));
        if(e.target.checked) {
            clone.push({...obj});
            setCheckedElements(clone);
        } else {
            setCheckedElements(clone.filter((cObj) => cObj.paperId !== obj.paperId));
        }
        
   });


   const addPapersHandler =  useCallback(async () => {
    // props.onOpenLoadingScreen();

    // checkedElements.forEach((paper) => {
    //     const result = await httpReq(
    //         "papers/semantic_api/{paperIdType}:{paperId}?paperId=" +
    //           paperId +
    //           "&paperIdType=" +
    //           paperIdType,
    //         "GET"
    //       )
    // })

    console.log("inside addPapersHandler")

    for(let index = 0; index < checkedElements.length; index++) {
        const result = await httpReq(
            "papers/semantic_api/{paperIdType}:{paperId}?paperId=" +
              checkedElements[index].paperId +
              "&paperIdType=" +
              checkedElements[index].paperIdType,
            "GET"
        );
            console.log(JSON.stringify(result.data))
        if(result.error) {
            console.log("error");
        } else {
            if (
                Object.keys(result.data).length === 0 &&
                result.data.constructor === Object
              ) {
                // props.onOpenErrorModal("No such paper found!");
                // props.setCollapsed(true);



              } else {
                // await httpReq(
                //     "papers",
                //     "POST", 
                //     result.data
                // )

                await httpReq("papers", "POST", JSON.stringify(result.data))
                
                // .then((result) => {
                //     console.log(result);
                //     if (result.error) {
                //       onOpenErrorModal("Connection Error!"); //TODO: Fix - Returns response status 200, but this opens anyway.
                //     } else {
                //     }
                //   });
                  

              }
        }
    }

    console.log("finished addPapersHandler")
    
    // httpReq(
    //   "papers/semantic_api/{paperIdType}:{paperId}?paperId=" +
    //     paperId +
    //     "&paperIdType=" +
    //     paperIdType,
    //   "GET"
    // ).then((result) => {
    //   props.onCloseLoadingScreen();
    //   if (result.error) {
    //     props.onOpenErrorModal("Connection Error!");
    //     props.setCollapsed(true);
    //   } else {
    //     if (
    //       Object.keys(result.data).length === 0 &&
    //       result.data.constructor === Object
    //     ) {
    //       props.onOpenErrorModal("No such paper found!");
    //       props.setCollapsed(true);
    //     } else {
    //       props.setCollapsed(false);
    //     }
    //   }
    // });
  }, [checkedElements, props]);

   useEffect(() => console.log(checkedElements));
  
  
    return (
    <Modal.Dialog style= {{position: 'fixed', left: '50%', top: '10%', transform: 'translate(-50%, 0)', zIndex:'9999'}}>
      <Modal.Header closeButton>
        <Modal.Title>Which related papers would you like to save?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
          <div style={{height: '300px', overflowY: 'auto'}}>
        <ListGroup >
          {props.papers &&
            props.papers.map((obj) => {
              return (
                <ListGroup.Item>
                  <Form.Group size="sm" controlId="formBasicCheckbox">
                    <Form.Check onClick={(e) => clickHandler(e, {...obj})} check size='sm' type="checkbox" label={obj.title}/>
                  </Form.Group>
                </ListGroup.Item>
              );
            })}
        </ListGroup>
        </div>
        
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Abort</Button>
        <Button onClick={async () => {await addPapersHandler()}} variant="primary">Save Papers to Database</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}
