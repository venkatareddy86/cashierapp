import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getDomainName, setCookie, getCookie } from '../../utils/appUtil';
import {
    VALIDATE_SESSION,
    REFRESH_SESSION,
    GET_INSTRUCTION_TEMPLATE,
    REGISTER_INSTRUCTION,
    REMOVE_INSTRUCTION,
    DEFAULT_INSTRUCTION,
    SESSION_INFO,
    INSTRUCTION_TEMPLATE,
    REDIRECT_MODULE
} from '../actions';
export function* validateSession(requestData) {
    const endpoint = getDomainName() + 'cashierapi/v1/session';
    let request = {
        "profileId": requestData.paramsInfo.profileId,
        "tempSessionId": requestData.paramsInfo.sessionId
    }
    const response = yield fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });
    if (response.ok) {
        const data = yield response.json();
        setCookie("token", data.token, 1);
        yield put({ type: SESSION_INFO, sessionInfo: { status: true, data: data } });
    } else if (response) {
        yield put({ type: SESSION_INFO, sessionInfo: { status: false, error: response.statusText } })
    }
}
export function* refreshSession() {
    const endpoint = getDomainName() + 'cashierapi/v1/session';
    const response = yield fetch(endpoint, {
        method: "GET",
        headers: getHeaders()
    });
    if (response.ok) {
        const data = yield response.json();
        yield put({ type: SESSION_INFO, sessionInfo: { status: true, data: data } });
    } else if (response) {
        yield put({ type: SESSION_INFO, sessionInfo: { status: false, error: response.statusText } })
    }
}
export function* getInstructionTemplete(data) {
    let { requestInfo: { methodId, callbackHandler } } = data;
    const endpoint = getDomainName() + 'cashierapi/v1/methods/' + methodId + '/instructiontemplate';
    const response = yield fetch(endpoint, {
        method: "GET",
        headers: getHeaders()
    });
    if (response.ok) {
        const data = yield response.json();
        yield put({ type: INSTRUCTION_TEMPLATE, instructionTemplate: data });
        callbackHandler(data);
    }
}
export function* registerInstruction(requestInfo) {
    let { instructionInfo: { instructionInfo, callback } } = requestInfo;
    const endpoint = getDomainName() + 'cashierapi/v1/instructions';
    const response = yield fetch(endpoint, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(instructionInfo)
    });
    if (response.ok) {
        const responsedata = yield response.json();
        yield call(refreshSession);
        callback(responsedata);
    }
}

export function* removeInstruction(requestInfo) {
    let { instructionId } = requestInfo;
    const endpoint = getDomainName() + 'cashierapi/v1/instructions/' + instructionId;
    const response = yield fetch(endpoint, {
        method: "DELETE",
        headers: getHeaders()
    });
    if (response.ok) {
        yield call(refreshSession);
    }
}
export function* setDefaultInstruction(data) {
    let { requestInfo } = data;
    let { instructionId } = requestInfo;
    const endpoint = getDomainName() + 'cashierapi/v1/instructions/' + instructionId + '/defaults';
    const response = yield fetch(endpoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + getCookie("token"),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestInfo)
    });
    if (response.ok) {
        yield call(refreshSession);
    }
}

export function* redirectModule(requestInfo) {
    const { requestInfo: { componentCode, endpointName, params } } = requestInfo;
    const endpoint = getDomainName() + 'cashierapi/v1/extensions/' + componentCode + '/' + endpointName;
    const response = yield fetch(endpoint, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(params)
    });
    if (response.ok) {
    }
}
export function* loadToDoList() {
    yield takeEvery(VALIDATE_SESSION, validateSession);
    yield takeEvery(REFRESH_SESSION, refreshSession);
    yield takeEvery(GET_INSTRUCTION_TEMPLATE, getInstructionTemplete);
    yield takeEvery(REGISTER_INSTRUCTION, registerInstruction);
    yield takeEvery(REMOVE_INSTRUCTION, removeInstruction);
    yield takeEvery(DEFAULT_INSTRUCTION, setDefaultInstruction);
    yield takeEvery(REDIRECT_MODULE, redirectModule);
}
export default function* rootSaga() {
    yield all([loadToDoList()]);
}
export const getHeaders = () => {
    return {
        'Authorization': 'Bearer ' + getCookie("token"),
        'Content-Type': 'application/json'
    }
}