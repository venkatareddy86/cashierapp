import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { EMPTY_INSTRUCTION_TEMPLATE_INFO } from "../../redux/actions";
import { Link } from 'react-router-dom';
const AddMethod = (props) => {
    let { instructionFields, registerInstructionRequest, insturctionTemplateInfo: { instructionData } } = props;
    const [values, setValues] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        for (var key in values) instructionData[key] = values[key];
        registerInstructionRequest(instructionData);

    }
    const fieldChanged = (fieldId, value) => {
        setValues(currentValues => {
            currentValues[fieldId] = value;
            return currentValues;
        });

    };
    instructionFields = instructionFields.map((field) => {
        let fieldName = field.fieldName;
        fieldName = fieldName[0].toLocaleLowerCase() + fieldName.slice(1);
        if (instructionData[fieldName]) {
            field.value = instructionData[fieldName];
        }
        field["fieldName"] = fieldName;
        return field;
    });
    return <React.Fragment>

        <form className="form-horizontal cashier-app__form" onSubmit={e => { handleSubmit(e) }}>
            {instructionFields && instructionFields.map((field) => (
                <div className="form-group" key={field.fieldName}>
                    <label htmlFor="nameOnCard" className="col-xs-24 col-sm-8 control-label">{field.uiCaption}</label>
                    <div className="col-xs-24 col-sm-8">
                        <input name={field.fieldName}
                            className="form-control"
                            disabled={field.uiReadonly}
                            value={field.value}
                            onChange={e => fieldChanged(field.fieldName, e.target.value)}
                            type="text" size="30"></input>
                    </div>
                </div>
            ))}

            <div className="btn-centered">
                <Link className="btn btn-outline sightline-cancel" to="/addNewPayment"><FormattedMessage id="cancel" /></Link>
                <button id="confirm" type="submit" className="btn btn-primary"><FormattedMessage id="submit" /></button>
            </div>
        </form>
    </React.Fragment>
}
const mapDispatchToProps = (dispatch) => {
    return {
        clearInstructionTemplete: () => dispatch({ type: EMPTY_INSTRUCTION_TEMPLATE_INFO })
    }
}
export default connect(null, mapDispatchToProps)(AddMethod);