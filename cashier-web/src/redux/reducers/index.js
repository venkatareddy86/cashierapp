import {
    SESSION_INFO,
    INSTRUCTION_TEMPLATE
} from '../actions/index';
const initialState = {
    session: {}
};
export default function commonReducer(state = initialState, action) {
    switch (action.type) {
        case SESSION_INFO:
            return {
                ...state,
                session: action.sessionInfo
            }
        case INSTRUCTION_TEMPLATE: {
            return {
                ...state,
                insturctionTemplate: action.instructionTemplate
            }
        }
        default:
            return state;
    }
}