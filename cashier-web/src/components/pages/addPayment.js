import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AddNeteller from '../presentation/addNeteller';
import AddPaypal from '../presentation/addPaypal';
import AddVantiv from '../presentation/addVantiv';
import AddBankGp from '../presentation/addBankGp';
import { useHistory } from 'react-router';
import { registerInstructionRequest, redirectModuleRequest } from '../../redux/actions/index';
const AddPayment = (props) => {
    const history = useHistory();
    const { insturctionTemplate: { instructionData } } = props;
    const { session: { data: { methods, parameters, profileParameters, customer } } } = props;
    let method = methods.filter((method) => method.methodId === instructionData.methodId)[0];
    useEffect(() => {
        if (!instructionData) {
            history.push('/addNewPayment');
        }
    }, [instructionData]);
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return <div>
        {(() => {
            switch (method.methodId) {
                case 'NETELLER':
                    return <AddNeteller handleSubmit={handleSubmit} method={method} instructionData={instructionData} registerInstructionRequest={props.registerInstructionRequest} />;
                case 'VTV00':
                    return <AddVantiv handleSubmit={handleSubmit} method={method} instructionData={instructionData} registerInstructionRequest={props.registerInstructionRequest} />;
                case 'GPL00':
                    return <AddBankGp handleSubmit={handleSubmit} method={method} instructionData={instructionData} registerInstructionRequest={props.registerInstructionRequest} />;
                case 'PayPal2':
                    return <AddPaypal handleSubmit={handleSubmit} customer={customer} parameters={parameters}
                        profileParameters={profileParameters} method={method} instructionData={instructionData}
                        registerInstructionRequest={props.registerInstructionRequest} redirectModuleRequest={props.redirectModuleRequest} />
                default:
                    return null;
            }
        })()}
    </div>
}
const mapStateToProps = function (state) {
    return {
        session: state.session,
        insturctionTemplate: state.insturctionTemplate
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        registerInstructionRequest: (instructionInfo) => dispatch(registerInstructionRequest(instructionInfo)),
        redirectModuleRequest: (requestInfo) => dispatch(redirectModuleRequest(requestInfo))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPayment);