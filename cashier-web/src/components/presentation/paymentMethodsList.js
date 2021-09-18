import React from 'react';
import { getClassModifier } from '../../utils/appUtil';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
const PaymentMethodsList = (props) => {
    const { methods, addPaymentMethodHandler } = props;
    return <React.Fragment>
        <h2 className="page-title"><FormattedMessage id="addNewMethod_title" /></h2>
        <ul className="cashier-app__payment-sources cashier-app__payment-sources--clm-3">
            {methods.map((method) => (
                <li key={method.methodId}
                    role="presentation">
                    <a href="#" id="add-method-{{method.methodId}}" onClick={(event) => addPaymentMethodHandler(event, method)}
                        className="cashier-app__payment-item cashier-app__payment-item--option"
                        aria-pressed="false">
                        <div className={`cashier-app__thumbnail ${getClassModifier(method.methodId, 'cashier-app__thumbnail')}`}></div>
                        <span className="cashier-app__payment-item-type">{method.description}</span>
                    </a>
                </li>
            ))}
        </ul>
        <div className="btn-centered">
            <Link className="btn btn-outline sightline-cancel" to="/home"><FormattedMessage id="cancel" /></Link>
        </div>
    </React.Fragment>
}
export default PaymentMethodsList;
