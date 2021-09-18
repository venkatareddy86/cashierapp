import { connect } from 'react-redux';
const InsturctionList = (props) => {
    let { instructionsList } = props;
    return <select className="form-control" >
        {instructionsList.map((instruction) => { return <option key={instruction.instructionId} value={instruction.instructionId}>{instruction.methodName} {instruction.accountNumber}</option> })}
    </select>
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(null, mapDispatchToProps)(InsturctionList);