"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCatchErrorMessage = exports.createSuccessMessage = exports.createErrorMessage = void 0;
const createErrorMessage = (message) => {
    return {
        type: 'error',
        message: message,
    };
};
exports.createErrorMessage = createErrorMessage;
const createSuccessMessage = (message) => {
    return {
        type: 'success',
        message: message,
    };
};
exports.createSuccessMessage = createSuccessMessage;
const createCatchErrorMessage = (message) => {
    const err = message;
    return {
        type: 'error',
        message: err.message,
    };
};
exports.createCatchErrorMessage = createCatchErrorMessage;
