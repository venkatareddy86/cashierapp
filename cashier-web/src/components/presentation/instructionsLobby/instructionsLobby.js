import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import InstructionTile from "./instructionTile";
import { removeInstruction, setAsDefaultInstruction } from "../../../redux/actions";
const InsturctionsLobby = (props) => {
    let { session: { data: { instructions } } } = props;
    const fundPlayPlusHandler = () => console.log("fundPlayPlusHandler");
    return <div >
        <h3 className="page-title-secondary">Registered Payment Methods</h3>
        <ul className="cashier-app__payment-sources">
            {instructions.map((item) => (
                <InstructionTile instruction={item} key={item.instructionId}
                    setAsDefaultInstruction={props.setAsDefaultInstruction}
                    removeInstruction={props.removeInstructionHandler}
                    fundPlayPlus={fundPlayPlusHandler} />
            ))}
            <li>
                <div className="cashier-app__payment-item cashier-app__payment-item--add">
                    <Link className="cashier-app__payment-btn-add ng-binding" to="/addNewPayment">
                        <span className="cashier-app__thumbnail cashier-app__thumbnail--add">
                            <span className="glyphicon glyphicon-plus-sign"></span>
                        </span>
                        Add new payment method
                    </Link>
                </div>
            </li>
        </ul>
    </div>
}
const mapStateToProps = function (state) {
    return {
        session: state.session
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setAsDefaultInstruction: (instructionInfo, type) => dispatch(setAsDefaultInstruction(instructionInfo, type)),
        removeInstructionHandler: (instructionInfo) => dispatch(removeInstruction(instructionInfo))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InsturctionsLobby);