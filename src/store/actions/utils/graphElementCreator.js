//{ data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } },

export const allPapersElementCreator = (array) => {
    const elements = [];
    array.forEach(obj => {
        elements.push({
            data: {
                type: "paper",
                id: obj.paperId,
                label: obj.title,
                idType: obj.paperIdType,
            }
        });

        if(obj.relatedWorks) {
            obj.relatedWorks.forEach(innerObj => {
                elements.push({
                    data: {
                        type: "edge",
                        source: obj.paperId,
                        target: innerObj.paperId,
                        label: obj.title + " " + innerObj.title
                    }
                });
            });
        }
    });

    return elements;
}

export const readersElementCreator = (array, sourceNode) => {
    const elements = [];

    array.forEach((obj) => {
        elements.push({
            data: {
                type: "reader",
                id: obj.id,
                label: obj.readerName,
            }
        });

        elements.push({
            data: {
                type: "edge",
                source: sourceNode.data.id,
                target: obj.id,
                label: "read"
            }
        })
    });

    elements.push({
        data: {
            type: "paper",
            id: sourceNode.data.id,
            label: sourceNode.data.label,
            idType: sourceNode.data.idType
        }
    });

    return elements;
}


export const datasetsElementCreator = (array, sourceNode) => {
    const elements = [];

    array.forEach((obj) => {
        elements.push({
            data: {
                type: "dataset",
                id: obj.datasetId,
                label: obj.datasetName,
            }
        });

        elements.push({
            data: {
                type: "edge",
                source: sourceNode.data.id,
                target: obj.datasetId,
                label: "uses"
            }
        })
    });

    elements.push({
        data: {
            type: "paper",
            id: sourceNode.data.id,
            label: sourceNode.data.label,
            idType: sourceNode.data.idType
        }
    });

    return elements;
}

export const simpleExpandElements = (array, sourceNode) => {
    const elements = [];

    array.forEach((obj) => {
        elements.push({
            data: {
                type: "paper", 
                id: obj.paperId,
                label: obj.title,
                idType: obj.idType
            }
        });

        elements.push({
            data: {
                type: "edge",
                source: sourceNode.data.id,
                target: obj.paperId,
                label: "related with"
            }
        })

    });

    elements.push({
        data: {
            type: "paper",
            id: sourceNode.data.id,
            label: sourceNode.data.title,
            idType: sourceNode.data.idType
        }
    });

    return elements;
}



