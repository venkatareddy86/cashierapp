import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Balance from './balance';
import { FormattedMessage } from 'react-intl';
const LobbyHeader = (props) => {
    const { session: { data: { accountBalances, parameters, customer } } } = props;
    return <div className="panel panel-info-secondary">
        <div className="panel-body">
            <div className="row">
                <div className="col-xs-24">
                    <h5 className="h5-secondary ng-binding">
                        <FormattedMessage id="home_currentAccountBalance" />
                    </h5>
                    <div className="heading-account-balance">
                        <Balance parameters={parameters} accountBalances={accountBalances}
                            customer={customer} archetype="Balance.InfoPlayBalance" />
                    </div>
                </div>
                <div className="col-xs-24">
                    <div className="action-bar-wrap">
                        <Link className="btn btn-primary" to="/deposit">Deposit</Link>
                        <Link className="btn btn-secondary" to="/withdraw"> Withdraw</Link><br />
                    </div>
                </div>
            </div>
        </div>
    </div>

}
const mapStateToProps = function (state) {
    return {
        session: state.session
    }
}
export default connect(mapStateToProps, null)(LobbyHeader);