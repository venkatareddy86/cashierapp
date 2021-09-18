import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';
import QuickDeposit from '../presentation/quickDeposit';
import TxAmountField from '../presentation/txAmountField';
import InsturctionList from "../presentation/instructionsList";
const Deposit = (props) => {
	const { session: { data: { instructions, customer } } } = props;
	const [amountDisabled, setAmountDisabled] = useState(false);
	const [quickDepositAmount, setQuickDepositAmount] = useState(0);
	const history = useHistory();
	const depositInstructions = instructions.filter((instruction) => { return instruction.isDepositPossible });
	const defaultInstruction = depositInstructions.filter((instruction) => { return instruction.isDefaultForDeposit });
	useEffect(() => {
		if (!depositInstructions) {
			history.push({
				pathname: '/addNewPayment',
				state: 'depositMethodsNotAvailable'
			});
		}
	}, []);
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
	const handleSubmit = (event) => {
		event.preventDefault();
	}
	return <div>
		<h2 className="page-title"><FormattedMessage id="depositMoney" /></h2>
		<form className="form-horizontal cashier-app__form" name="depositFunds" onSubmit={e => { handleSubmit(e) }}>
			<fieldset className="fieldset">
				<div className="form-group">
					<label className="col-xs-24 col-sm-8 control-label" ><FormattedMessage id="paymentOptions" /></label>
					<div className="col-xs-24 col-sm-14">
						{depositInstructions && depositInstructions.length > 0 && <InsturctionList defaultInstruction={defaultInstruction} instructionsList={depositInstructions} />}
					</div>
				</div>
				<QuickDeposit customer={customer} quickDepositHandler={quickDepositHandler} />
				<TxAmountField amount={quickDepositAmount} amountChangeHandler={amountChangeHandler} disabled={amountDisabled} />
			</fieldset>
			<div className="btn-centered">
				<Link className="btn btn-default" to="/home"><FormattedMessage id="cancel" /></Link>
				<button id="confirm" type="submit" className="btn btn-primary"><FormattedMessage id="depositMoneyButton" /></button>
			</div>
		</form>
	</div>

}
const mapStateToProps = function (state) {
	return { session: state.session }
}
export default connect(mapStateToProps, null)(Deposit);