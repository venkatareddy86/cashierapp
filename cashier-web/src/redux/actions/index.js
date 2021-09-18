export const REFRESH_SESSION = 'REFRESH_SESSION';
export const VALIDATE_SESSION = 'VALIDATE_SESSION';
export const SESSION_INFO = 'SESSION_INFO';
export const DEFAULT_INSTRUCTION = "DEFAULT_INSTRUCTION";
export const REMOVE_INSTRUCTION = "REMOVE_INSTRUCTION";
export const REGISTER_INSTRUCTION = "REGISTER_INSTRUCTION";
export const INSTRUCTION_TEMPLATE = "INSTRUCTION_TEMPLATE";
export const GET_INSTRUCTION_TEMPLATE = "GET_INSTRUCTION_TEMPLATE";
export const REDIRECT_MODULE = "REDIRECT_MODULE";
export const INSTRUCTION_FIELDS_INFO = "INSTRUCTION_FIELDS_INFO";

export function refreshSession() {
    return { type: REFRESH_SESSION };
}
export function validateSession(searchParams) {
    if (searchParams.has("tempSessionId") && searchParams.has("profileId")) {
        return {
            type: VALIDATE_SESSION,
            paramsInfo: {
                sessionId: searchParams.get("tempSessionId"),
                profileId: searchParams.get("profileId"),
                languageId: searchParams.get("languageId"),
            }
        };
    } else { return refreshSession(); }
}
export function setAsDefaultInstruction(instructionInfo, type) {
    return {
        type: DEFAULT_INSTRUCTION,
        requestInfo: {
            instructionId: instructionInfo.instructionId,
            setDefaultForDeposit: type === 'DEPOSIT' ? true : false,
            setDefaultForWithdrawal: type === 'WITHDRAW' ? true : false,
        }
    };
}
export function removeInstruction(instructionInfo) {
    return {
        type: REMOVE_INSTRUCTION,
        instructionId: instructionInfo.instructionId
    };
}
export function getInstructionTempleteRequest(requestInfo) {
    return {
        type: GET_INSTRUCTION_TEMPLATE,
        requestInfo: requestInfo
    };
}
export function registerInstructionRequest(instructionInfo) {
    return {
        type: REGISTER_INSTRUCTION,
        instructionInfo: instructionInfo
    };
}
export function registerInstructionFields(instructionFieldsInfo) {
    return {
        type: INSTRUCTION_FIELDS_INFO,
        instructionFieldsInfo: instructionFieldsInfo
    };
}
export function redirectModuleRequest(requestInfo) {
    return {
        type: REDIRECT_MODULE,
        requestInfo: requestInfo
    };
}