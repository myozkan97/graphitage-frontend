import React, { useState, useRef, useCallback, useEffect } from "react";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const MultipleFieldTagBox = (props) => {
  const [elements, setElements] = useState([]);
  const [legal, setLegal] = useState(false); // state to activate/deactivate submit button 

  let nameRef = useRef();
  let linkRef = useRef();

  const handleChange = useCallback((e) => {
    if (nameRef.current.value.length > 1 || linkRef.current.value.length > 4)
      setLegal(true);
    else setLegal(false);
  }, []);

  const handleAdd = useCallback(
    (
      name = nameRef.current.value,
      link = linkRef.current.value
    ) => {
        console.log(name.length, name)
      setElements((prevState) => [
        ...prevState,
        {
          name: name && name.length > 0 ? name : link ,
          link,
        },
      ]);
      nameRef.current.value = "";
      linkRef.current.value = "";
    },
    []
  );

  const handleRemove = useCallback((key) => {
    console.log(key);
    setElements((prevState) => prevState.filter((obj) => obj.name !== key));
  }, []);

  // Set state of the parent form 
  const { setOuterState } = props;
  useEffect(() => {
    setOuterState([...elements]);
  }, [elements, setOuterState]);


  // Register pre-loaded props
  const { load } = props;
  useEffect(() => {
      console.log(load)
    if (Array.isArray(load)) load.forEach((obj) => handleAdd(obj.name, obj.link));
  }, [load, handleAdd]);

  return (
    <div>
      {elements.map((obj) => (
        <div
          onClick={() => handleRemove(obj.name || obj.link)}
          key={obj.name || obj.link}
        >
          <a href={obj.link}>{obj.name}</a>
        </div>
      ))}

      <InputGroup>
        <FormControl
          placeholder="Library Name"
          aria-label="Library Name"
          aria-describedby="basic-addon2"
          onChange={handleChange}
          ref={nameRef}
        />
        <FormControl
          placeholder="Library Link"
          aria-label="Library Link"
          aria-describedby="basic-addon2"
          onChange={handleChange}
          ref={linkRef}
        />
        <InputGroup.Append>
          <Button
            onClick={(e) => handleAdd()}
            disabled={!legal}
            variant="outline-secondary"
          >
            Add Library
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

export default React.memo(MultipleFieldTagBox);
