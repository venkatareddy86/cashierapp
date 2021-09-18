import React from 'react';
import { FormattedMessage } from 'react-intl';
const TxAmountField = (props) => {
    const amount = (props.amount > 0) ? props.amount : '';
    const onChangeValue = (event) => {
        props.amountChangeHandler(event.target.value);
    }
    return <div className="form-group">
        <label className="col-xs-24 col-sm-8 control-label required"><FormattedMessage id='totalAmount' /></label>
        <div className="col-sm-8">
            <div className="input-group">
                <input type="number" name="amount"
                    id="amount"
                    value={amount}
                    disabled={props.disabled}
                    onChange={onChangeValue}
                    className="form-control" />
            </div>
        </div>

    </div>
}
export default TxAmountField;