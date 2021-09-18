import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { getClassModifier } from '../../../utils/appUtil';
const InstructionTile = (props) => {
    const { instruction } = props;
    const [showConfirm, setShowConfirm] = useState(false)
    return <li key={instruction.instructionId} >
        <div className="cashier-app__payment-item">
            <div className={`cashier-app__thumbnail ${getClassModifier(instruction.methodId, 'cashier-app__thumbnail')}`}></div>
            <ul className="cashier-app__payment-item-details">
                <li>
                    <div className="cashier-app__payment-item-type">
                        {instruction.methodName}
                        {instruction.bankName}
                        <span className="cashier-app__payment-item-type">{instruction.accountName}</span>
                    </div>
                    {instruction.methodId === 'Sightline' &&
                        <button className="cashier-app__verified cashier-app__verified--btn text-success"
                            onClick={props.fundPlayPlus}><FormattedMessage id="fund_play_plus" /></button>
                    }
                </li>
                <li >
                    <span className="cashier-app__payment-item-num">{instruction.accountNumber}</span>
                </li>
                {instruction.cardExpiryDate &&
                    <li>
                        <span className="cashier-app__payment-item-exp"><FormattedMessage id="expires" />: {instruction.cardExpiryDate}</span>
                    </li>
                }
                <li>
                    {instruction.defaultForDeposit &&
                        <span className="cashier-app__default-option text-success">
                            <span className="icon glyphicon glyphicon-ok"></span>
                            <FormattedMessage id="defaultPaymentOption" />
                        </span>
                    }
                    {instruction.canBeDefaultForDeposit &&
                        <button className="cashier-app__set-as-default" onClick={() => props.setAsDefaultInstruction(instruction, "DEPOSIT")}>
                            <FormattedMessage id="setAsDefaultForPayment" />
                        </button>
                    }
                </li>
                <li>
                    {instruction.defaultForWithdrawal &&
                        <span className="cashier-app__default-option text-success">
                            <span className="icon glyphicon glyphicon-ok"></span>
                            <FormattedMessage id="defaultWithdrawOption" />
                        </span>
                    }
                    {instruction.canBeDefaultForWithdrawal &&
                        <button className="cashier-app__set-as-default" onClick={() => props.setAsDefaultInstruction(instruction, "WITHDRAW")}>
                            <FormattedMessage id="setAsDefaultForWithdrawals" />
                        </button>
                    }
                </li>
            </ul>
            <a href="#" className="cashier-app__payment-item-delete" onClick={() => setShowConfirm(true)}><FormattedMessage id="delete" /></a>
        </div>
        {showConfirm && <div className="cashier-app__confirm-delete fade in">
            <div>
                <h5 className="h5-secondary"><FormattedMessage id="areYouSureDeleteAccount" /></h5>
                <button className="btn btn-default" onClick={() => setShowConfirm(false)}><FormattedMessage id="cancel" /></button>
                <button className="btn btn-danger" onClick={() => props.removeInstruction(instruction)}><FormattedMessage id="delete" /></button>
            </div>
        </div>}
    </li >
}
export default InstructionTile;