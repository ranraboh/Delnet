import React from 'react';
import { float_precision } from '../../general/methods';
function ParameterAnalysis(props) {
    if (props.display == false)
        return ''
    let offers = {
        'INCREASE_VALUE_HR': 'Highly Recommmended to increase value',
        'INCREASE_VALUE': 'Try to slightly increase value',
        'DECREASE_VALUE_HR': 'Highly Recommmended to decrease value',
        'DECREASE_VALUE': 'Try to slightly decrease value',
        'KEEP_VALUE': 'Value seems reasonable',
        'CHANGE_VALUE': 'Try to change the parameter value'
    }
    return (<div className="epoch-section">
        <h4 className="project-analysis-text">
            <span className="text-bold">Values that have been used: 
                { 
                    props.data.used.map((record) =>
                        <span> { record + ' ' } </span>    
                    )
                }   
            </span><br/>
            <span className="text-bold">Number of different values that have been used: { props.data.diversity } </span><br/>
            <p/>
            <span className="underline">
                terminology: 
            </span>
            { props.terminology } <p/>
            <span className="underline">
                how it is affect the model performence: 
            </span>
            { props.description }
            <p/>
            </h4>
            <p/>
            <table class="table">
        <thead>
            <tr id="analysis-parameters-th" className="table-header-blue d-flex">
                <th className="col-1">Epoch</th>
                <th className="col-1">Frequency</th>
                <th className="col-1">Rate</th>
                <th className="col-1">Max</th>
                <th className="col-1">Min</th>
                <th className="col-1">Average</th>
                <th className="col-2">Offer</th>
                <th className="col-4">Status</th>
            </tr>
        </thead>
        <tbody>
        {        
            Object.entries(props.data.summary).map(function (record) {
                return (
                <tr className="table-text table-hover d-flex">
                    <td className="main-field col-1">{ record[0] }</td>
                    <td className="regular-field col-1">{ record[1]['frequency'] }</td>
                    <td className="regular-field col-1">{ float_precision(record[1]['frequncy_rate'] * 100, 5) + '%' }</td>
                    <td className="regular-field col-1">{ float_precision(record[1]['max'] * 100, 5) }</td>
                    <td className="regular-field col-1">{ float_precision(record[1]['min'] * 100, 5) }</td>
                    <td className="regular-field col-1">{ float_precision(record[1]['average'] * 100, 5) }</td>
                    <td className="regular-field col-2">{ offers[record[1]['conclusion']['status']] }</td>
                    <td className="regular-field col-4">{ record[1]['conclusion']['text'] }</td>
                </tr>)
            }, this)
        } 
        </tbody>
        </table>
        <p/>
        <h4 className="project-analysis-text">
            { props.data.conclusion.conclusion_text.too_low } <br/>
            { props.data.conclusion.conclusion_text.too_high } <br/>
            { props.data.conclusion.conclusion_text.reasonable } <br/>
            { props.data.conclusion.conclusion_text.description } <br/>
        </h4>
    </div>)
}

export default ParameterAnalysis;


