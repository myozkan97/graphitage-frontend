

export const allPapersElementCreator = (array) => {
    const elements = array.map(obj => {
        return { data: { 
            id: obj.paperId,
            label: obj.title,
            idType: obj.paperIdType
        }};
    });

    return elements;
}

export const simpleExpandElements = (array, nodeId) => {
    

}



