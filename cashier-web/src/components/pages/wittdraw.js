import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import InsturctionList from "../presentation/instructionsList";
import TxAmountField from '../presentation/txAmountField';
import Balance from '../presentation/balance';
import { FormattedMessage } from 'react-intl';
const Withdraw = (props) => {
	let { session: { data: { instructions, accountBalances, customer, parameters } } } = props;
	const [checked, setChecked] = useState(false);
	const [withdrawAmount, setWithdrawAmount] = useState(0);
	const [totalWithdrawAmount, setTotalWithdrawAmount] = useState(0);
	const history = useHistory();
	const withdrawInstructions = instructions.filter((instruction) => { return instruction.isWithdrawalPossible });
	const defaultInstruction = withdrawInstructions.filter((instruction) => { return instruction.isDefaultForWithdrawal });
	const parameter = parameters.filter((item) => item.code === "Balance.LimitWithdrawAmount")[0];
	const balance = accountBalances.filter((item) => (item.type === parameter.value))[0];
	useEffect(() => {
		if (!withdrawInstructions) {
			history.push({
				pathname: '/addNewPayment',
				state: 'withdrawMethodsNotAvailable'
			});
		}
		setTotalWithdrawAmount(balance.value);
	}, []);
	const handleSubmit = (event) => {
		event.preventDefault();
	}
	const amountChangeHandler = (amount) => {
		setWithdrawAmount(amount);
	}
	const onChangeValue = (event) => {
		setChecked((previousValue) => {
			if (!previousValue) {
				setWithdrawAmount(totalWithdrawAmount);
			} else {
				setWithdrawAmount();
			}
			return !previousValue;
		});
	}

	return <div>
		<h2 className="page-title">Withdraw Funds</h2>
		<div className="panel panel-info-secondary panel-info-secondary--withdraw">
			<div className="heading-account-balance panel-body">
				<h5 className="h5-secondary"> <FormattedMessage id="availableBalanceToWithdraw" />:</h5>
				<Balance parameters={parameters} accountBalances={accountBalances}
					customer={customer} archetype="Balance.LimitWithdrawAmount" />
			</div>
		</div>
		<form className="form-horizontal cashier-app__form" name="withdrawFunds" onSubmit={e => { handleSubmit(e) }}>
			<fieldset className="fieldset">
				<div className="form-group">
					<label className="col-xs-24 col-sm-8 control-label" ><FormattedMessage id="paymentOptions" /></label>
					<div className="col-xs-24 col-sm-14">
						<InsturctionList defaultInstruction={defaultInstruction} instructionsList={withdrawInstructions} />
					</div>
				</div>
				<TxAmountField amount={withdrawAmount} amountChangeHandler={amountChangeHandler} disabled={checked} />
				<div className="col-xs-offset-0 col-sm-offset-8 col-sm-10">
					<label className="checkbox">
						<input type="checkbox" defaultChecked={checked} onChange={onChangeValue} />
						<span className="checkbox-mobile-ui"></span> <FormattedMessage id="withdrawAllAvailableFunds" />
					</label>
				</div>
			</fieldset>
			<div className="btn-centered">
				<Link className="btn btn-default" to="/home"><FormattedMessage id="cancel" /></Link>
				<button id="confirm" type="submit" className="btn btn-primary"><FormattedMessage id="withdrawMoney" /></button>
			</div>
		</form>
	</div>
}
const mapStateToProps = function (state) {
	return { session: state.session }
}
export default connect(mapStateToProps, null)(Withdraw);