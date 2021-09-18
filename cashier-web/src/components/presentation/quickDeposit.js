import React, { useState } from 'react';
import { FormattedNumber, FormattedMessage } from 'react-intl';

const QuickDeposit = (props) => {
    let { customer } = props;
    const [quickDepositAmount, setQuickDepositAmount] = useState(0);
    const qdv = [10, 20, 30, 40];
    const onChangeValue = (event) => {
        setQuickDepositAmount(Number(event.target.value));
        props.quickDepositHandler(Number(event.target.value));
    }
    return <React.Fragment>
        <div className="form-group">
            <label className="col-xs-24 col-sm-8 control-label"><FormattedMessage id="quickDeposit" /></label>
            <div className="col-sm-16">
                <div className="btn-group" data-toggle="buttons" onChange={onChangeValue}>
                    {qdv.map((item, index, array) => (
                        <label key={item} className={"btn btn-toggle-default " + ((item === quickDepositAmount) ? "active " : "") + ((index === array.length - 1) ? "btn-toggle-default--last" : "")
                        }>
                            <input type="radio" name="options" autoComplete="off" value={item} />
                            <FormattedNumber value={item} style={`currency`} currency={customer.currencyId || 'USD'} minimumFractionDigits={0}
                                maximumFractionDigits={0} />
                        </label>
                    ))}

                    <label className="clearfix btn btn-link btn-sm btn-toggle-default--reset">
                        <input id="clear-selection-amount" type="radio" name="options" value="0" autoComplete="off"
                        />
                        <FormattedMessage id="clearSelection" />
                    </label>
                </div>
            </div>
        </div>
    </React.Fragment>
}
export default QuickDeposit;