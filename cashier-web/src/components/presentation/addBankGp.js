import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';
const AddBankGp = (props) => {
    let { method: { methodConfiguration: { instructionProperties: { instructionFields } } }, instructionData } = props;
    const history = useHistory();
    const [values, setValues] = useState({});
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
    const registerInstructionResponseHandler = (response) => {
        history.push({
            pathname: '/home',
            state: 'netellerRegisterAccountSuccess'
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        for (var key in values) instructionData[key] = values[key];
        let instructionInfo = {
            instructionInfo: instructionData,
            callback: registerInstructionResponseHandler
        }
        props.registerInstructionRequest(instructionInfo);

    }
    return <div>
        <h2 className="page-title"><FormattedMessage id="gpach_form_title" /></h2>
        <form className="form-horizontal cashier-app__form" name="addNeteller" onSubmit={e => { handleSubmit(e) }}>
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
    </div>
}
export default AddBankGp;