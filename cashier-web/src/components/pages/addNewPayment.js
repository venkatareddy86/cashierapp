import React, { useState } from 'react';
import { connect } from 'react-redux';
import Loader from '../presentation/loader';
import PaymentMethodsList from '../presentation/paymentMethodsList';
import { useHistory } from 'react-router';
import { getDomainName } from '../../utils/appUtil';
import Iframe from "../presentation/iframe";
import {
    getInstructionTempleteRequest,
    registerInstructionRequest
} from '../../redux/actions/index';

const AddNewPayment = (props) => {
    const { session: { data: { methods } } } = props;
    const [spinner, setSpinner] = useState(false);
    const [showIframe, setShowIframe] = useState(false);
    const [iframeUrl, setIframeUrl] = useState("");
    const history = useHistory();
    const addPaymentMethodHandler = (event, method) => {
        event.preventDefault();
        let { methodId } = method;
        if (!spinner) {
            setSpinner(true);
            props.getInstructionTempleteRequest({ methodId: methodId, callbackHandler: processInstructionTemplate });
        }
    }
    const processInstructionTemplate = (insturctionTemplate) => {
        let { instructionData } = insturctionTemplate;
        if (["PayNearMe", "Sightline"].includes(instructionData.methodId)) {
            registerInstruction(instructionData);
        } else {
            setSpinner(false);
            history.push("/addPayment");
        }
    }
    const registerInstructionResponseHandler = (data) => {
        setShowIframe(true);
        setSpinner(false);
        setIframeUrl(getDomainName() + '/cashierapi/v1/instructions/' + data.instructionId + '/redirect?returnURL');
    }
    const registerInstruction = (instructionInfo) => {
        instructionInfo = {
            instructionInfo: instructionInfo,
            callback: registerInstructionResponseHandler
        }
        props.registerInstructionRequest(instructionInfo);
    }
    return <React.Fragment>
        {!showIframe && <PaymentMethodsList methods={methods} addPaymentMethodHandler={addPaymentMethodHandler} />}
        {showIframe && <Iframe url={iframeUrl} />}
        {spinner && <Loader />}
    </React.Fragment>
}
const mapStateToProps = function (state) {
    return { session: state.session }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getInstructionTempleteRequest: (requestInfo) => dispatch(getInstructionTempleteRequest(requestInfo)),
        registerInstructionRequest: (instructionInfo) => dispatch(registerInstructionRequest(instructionInfo))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddNewPayment);