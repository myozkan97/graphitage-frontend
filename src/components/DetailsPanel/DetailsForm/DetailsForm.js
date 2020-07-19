import React from "react"
import { connect } from 'react-redux';

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"


const stringFromArray = (array, sep) => {
    return array.reduce((acc, cur, index) => {
        return acc + cur + sep;
    }, "")
}

const pFromArray = (array, htmlEl = "p") => {
    if (htmlEl === "p") {
        return array.reduce((acc, cur, index) => {
            acc.push((<p>{cur}</p>))
            return acc;
        }, [])
    } else if (htmlEl === "list") {
        const listArr = array.reduce((acc, cur, index) => {
            acc.push((<li>{cur}</li>))
            return acc;
        }, []);

        return (<ul>{listArr}</ul>)
    }
    
}


const Details = (props) => {
    return (
        
        <div className="Details">
            <h2>{props.dtl.title}</h2>
            <div className="body">
                {props.dtl.abstractOfPaper &&
                    <div className="abstract">
                        <h3>Abstract</h3>
                        <p>{props.dtl.abstractOfPaper}</p>
                    </div>
                }
                {props.dtl.year &&
                    <div className="year">
                        <p>Year: {props.dtl.year}</p>
                    </div>
                }
                {props.dtl.applicationDomains &&
                    <div className="applicationDomains">
                        <h3>Application Domains</h3>
                        <p>{stringFromArray(props.dtl.applicationDomains, ", ")}</p>
                    </div>
                }
                {props.dtl.components &&
                    <div className="components">
                        <h3>Components</h3>
                        <p>{stringFromArray(props.dtl.components, ", ")}</p>
                    </div>
                }
                {props.dtl.highlights &&
                    <div className="highlights">
                        <h3>Highlights</h3>
                        <p>{pFromArray(props.dtl.highlights)}</p>
                    </div>
                }
                {props.dtl.contributions &&
                    <div className="contributions">
                        <h3>Contributions</h3>
                        <p>{pFromArray(props.dtl.contributions)}</p>
                    </div>
                }
                {props.dtl.pros &&
                    <div className="pros">
                        <h3>Pros</h3>
                        <p>{pFromArray(props.dtl.pros, "list")}</p>
                    </div>
                }
                {props.dtl.notes &&
                    <div className="notes">
                        <h3>Notes</h3>
                        <p>{pFromArray(props.dtl.notes)}</p>
                    </div>
                }
                {props.dtl.data &&
                    <div className="data">
                        <h3>Datasets</h3>
                        <p>{stringFromArray(props.dtl.data.map(obj => obj.datasetName))}</p>
                    </div>
                }
                {props.dtl.libraries &&
                    <div className="libraries">
                        <h3>Libraries</h3>
                        <p><ul>{props.dtl.libraries.map(obj => (<li><a href={obj.link}>{obj.name}</a></li>))}</ul></p>
                    </div>
                }
                {props.dtl.relatedWorks &&
                    <div className="relatedWorks">
                        <h3>Related Works</h3>
                        <p><ul>{props.dtl.relatedWorks.map(obj => (<li>{obj.title}</li>))}</ul></p>
                    </div>
                }
                {props.dtl.reader &&
                    <div className="reader">
                        <h3>Readers</h3>
                        <p><ul>{props.dtl.reader.map(obj => (<li>obj.readerName</li>))}</ul></p>
                    </div>
                }
            </div>
            {console.log(props.dtl.title)}
        </div>
    )
}


const mapStateToProps = state => {
    return {
        dtl: state.details
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details); 
