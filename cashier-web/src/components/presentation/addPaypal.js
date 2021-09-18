import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import QuickDeposit from './quickDeposit';
import TxAmountField from './txAmountField';
import Loader from './loader';
import { pullPaypalCheckout, loadPaypal } from '../../utils/paypalCheckService';
const AddPaypal = (props) => {
    let { method: { methodConfiguration: { instructionProperties: { instructionFields } } },
        instructionData, parameters, profileParameters, customer, redirectModuleRequest } = props;
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [amountDisabled, setAmountDisabled] = useState(false);
    const [quickDepositAmount, setQuickDepositAmount] = useState(0);
    const [paypalInstruction, setPaypalInstruction] = useState(undefined);
    const [paypalInsReady, setPaypalInsReady] = useState(false);
    const paypalEnv = parameters.filter((item) => item.code === "PayPal2.EnvironmentCode")[0];
    const salesChannel = profileParameters.filter((item) => item.code === "salesChannel")[0];
    useEffect(() => {
        let instructionInfo = {
            instructionInfo: instructionData,
            callback: registerInstructionResponseHandler
        }
        props.registerInstructionRequest(instructionInfo);
        loadPaypal(() => {
            setScriptLoaded(true);
        });
    }, []);
    useEffect(() => {
        if (paypalInsReady && scriptLoaded) {
            pullPaypalCheckout(undefined, paypalInstruction.instructionId, "initialDeposit", paypalEnv, salesChannel, redirectModuleRequest);
        }
    }, [paypalInstruction, scriptLoaded, paypalInsReady]);
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
        setPaypalInstruction(response);
        setPaypalInsReady(true);
    }
    const quickDepositHandler = (amount) => {
        setQuickDepositAmount(amount);
        if (amount === 0)
            setAmountDisabled(false);
        else setAmountDisabled(true);
    }
    const amountChangeHandler = (amount) => {
        setAmountDisabled(false);
        setQuickDepositAmount(amount);
    }
    return <div>
        <h2 className="page-title"><FormattedMessage id="paypalCheckout_form_title" /></h2>
        <p><FormattedMessage id="paypalCheckout_form_description" /></p>
        {paypalInsReady && scriptLoaded ?
            <form className="form-horizontal cashier-app__form" name="addPaypal">
                <QuickDeposit customer={customer} quickDepositHandler={quickDepositHandler} />
                <TxAmountField amount={quickDepositAmount} amountChangeHandler={amountChangeHandler} disabled={amountDisabled} />
                {instructionFields && instructionFields.map((field) => (
                    <div className={"form-group " + (field.uiHidden ? 'hide' : '')} key={field.fieldName}>
                        <label htmlFor="nameOnCard" className="col-xs-24 col-sm-8 control-label">{field.uiCaption}</label>
                        <div className="col-xs-24 col-sm-8">
                            <input name={field.fieldName}
                                className="form-control"
                                disabled={field.uiReadonly}
                                value={field.value}
                                type={field.uiHidden ? "hidden" : "text"} size="30"></input>
                        </div>
                    </div>
                ))}
                <div className="btn-centered">
                    <Link className="btn btn-outline sightline-cancel" to="/addNewPayment"><FormattedMessage id="cancel" /></Link>
                    <div id="paypal-button" className="btn btn-paypal"></div>
                </div>
            </form>
            : <Loader />}
    </div>
}
export default AddPaypal;