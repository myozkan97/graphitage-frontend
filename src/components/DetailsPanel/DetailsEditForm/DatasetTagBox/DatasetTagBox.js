import React, { useState, useRef, useCallback, useEffect } from "react";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const boxStyle = {
  width: "100&",
  border: "1px solid #4fb9c9",
  padding: "50px",
  margin: "5px",
};

const DatasetTagBox = (props) => {
  const [datasets, setDatasets] = useState([]);
  const [datasetLegal, setDatasetLegal] = useState(false); // state to activate/deactivate submit button
  const datasetPrepInputRefs = useRef({});

  let nameRef = useRef();

  useEffect(() => {
    console.log(datasets);
  });

  const handleChangeDatasetName = useCallback((e) => {
    if (nameRef.current.value.length > 1) setDatasetLegal(true);
    else setDatasetLegal(false);
  }, []);

  const handleAddDataset = useCallback(
    (name = nameRef.current.value, preprocessingSteps = []) => {
      setDatasets((prevState) => [
        ...prevState,
        {
          dataset: { datasetName: name },
          preprocessingSteps,
        },
      ]);
      nameRef.current.value = "";
    },
    []
  );

  const handleAddRef = useCallback(
    (e, datasetName) => {
      datasetPrepInputRefs.current[datasetName] = e;
    },
    [datasetPrepInputRefs]
  );

  const handleRemove = useCallback((key) => {
    console.log(key);
    setDatasets((prevState) =>
      prevState.filter((obj) => obj.dataset.datasetName !== key)
    );
  }, []);

  const handleAddPreprocessingStep = useCallback(
    (datasetName, e) => {
      e.preventDefault();
      const str = datasetPrepInputRefs.current[datasetName].value;
      if (str.length > 0) {
        const datasetsClone = JSON.parse(JSON.stringify(datasets));

        const datasetToAdd = datasetsClone.find(
          (obj) => obj.dataset.datasetName === datasetName
        );
        datasetToAdd.preprocessingSteps.push(str);
        setDatasets(datasetsClone);

        datasetPrepInputRefs.current[datasetName].value = "";
      }
    },
    [datasets, datasetPrepInputRefs]
  );

  const handleRemoveProprocessingStep = useCallback(
    (datasetName, str) => {
      const datasetsClone = JSON.parse(JSON.stringify(datasets));

      const datasetToRemovePrepStep = datasetsClone.find(
        (obj) => obj.dataset.datasetName === datasetName
      );
      const newPrepArray = datasetToRemovePrepStep.preprocessingSteps.filter(
        (strP) => strP !== str
      );
      datasetToRemovePrepStep.preprocessingSteps = newPrepArray;
      setDatasets(datasetsClone);
    },
    [datasets]
  );

  // Set state of the parent form
  const { onChange } = props;
  useEffect(() => {
    onChange(datasets);
  }, [datasets, onChange]);

  // Register pre-loaded props
  const { load } = props;
  useEffect(() => {
    if (Array.isArray(load))
      load.forEach((obj) => {
        handleAddDataset(obj.dataset.datasetName, [...obj.preprocessingSteps]);
      });
  }, [load, handleAddDataset]);

  return (
    <div>
      {datasets.map((obj) => (
        <div style={boxStyle} key={obj.dataset.datasetName}>
          <h4>{obj.dataset.datasetName}</h4>
          <div>
            {obj.preprocessingSteps && (
              <div>
                <h5>Preprocessing Steps</h5>
                {obj.preprocessingSteps.map((str, index) => (
                  <div key={obj.dataset.datasetName + String(index)}>
                    <p>{str}</p>
                    <Button
                      onClick={() =>
                        handleRemoveProprocessingStep(
                          obj.dataset.datasetName,
                          str
                        )
                      }
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <InputGroup>
            <FormControl
              placeholder="Preprocessing Step"
              aria-label="Preprocessing Step"
              aria-describedby="basic-addon2"
              ref={(e) => handleAddRef(e, obj.dataset.datasetName)}
            />
            <InputGroup.Append>
              <Button
                onClick={(e) =>
                  handleAddPreprocessingStep(obj.dataset.datasetName, e)
                }
                variant="outline-secondary"
              >
                Add Dataset
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <Button onClick={() => handleRemove(obj.dataset.datasetName)}>
            Remove Dataset
          </Button>
        </div>
      ))}

      <InputGroup>
        <FormControl
          placeholder="Dataset Name"
          aria-label="Dataset Name"
          aria-describedby="basic-addon2"
          onChange={handleChangeDatasetName}
          ref={nameRef}
        />
        <InputGroup.Append>
          <Button
            onClick={(e) => handleAddDataset()}
            disabled={!datasetLegal}
            variant="outline-secondary"
          >
            Add Dataset
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

export default React.memo(DatasetTagBox);
