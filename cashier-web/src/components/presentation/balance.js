import React from 'react';
import { FormattedNumber } from 'react-intl';
const Balance = (props) => {
    let { accountBalances, customer, parameters, archetype } = props;
    const parameter = parameters.filter((item) => item.code === archetype)[0];
    const balance = accountBalances.filter((item) => (item.type === parameter.value))[0];
    return <React.Fragment>
        {balance && <FormattedNumber value={balance.value} style={`currency`} currency={customer.currencyId || 'USD'} />}
    </React.Fragment>
}
export default Balance;