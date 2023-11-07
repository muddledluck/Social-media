"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("../utils/logger");
var ResponseSenderMiddleware = /** @class */ (function () {
    function ResponseSenderMiddleware(res) {
        this.res = res;
    }
    ResponseSenderMiddleware.prototype.sendResponse = function (status, message, data) {
        if (data === void 0) { data = null; }
        var response = {
            status: status,
            message: message,
            data: data,
        };
        this.res.status(status).json(response);
    };
    ResponseSenderMiddleware.prototype.sendSuccess200Response = function (message, data) {
        if (data === void 0) { data = null; }
        logger_1.default.info({ url: this.res.req.url, status: 200, message: message, data: data });
        this.sendResponse(200, message, data);
    };
    ResponseSenderMiddleware.prototype.sendCreated201Response = function (message, data) {
        if (data === void 0) { data = null; }
        logger_1.default.info({ url: this.res.req.url, status: 201, message: message, data: data });
        this.sendResponse(201, message, data);
    };
    ResponseSenderMiddleware.prototype.sendNoContent204Response = function () {
        logger_1.default.info({ url: this.res.req.url, status: 204 });
        this.res.status(204).end();
    };
    ResponseSenderMiddleware.prototype.sendNotFound404Response = function (message, data) {
        if (message === void 0) { message = "Not Found"; }
        if (data === void 0) { data = null; }
        logger_1.default.error({ url: this.res.req.url, status: 404, message: message, data: data });
        this.sendResponse(404, message, data);
    };
    ResponseSenderMiddleware.prototype.sendForbidden403Response = function (message, data) {
        if (message === void 0) { message = "Forbidden"; }
        if (data === void 0) { data = null; }
        logger_1.default.error({ url: this.res.req.url, status: 403, message: message, data: data });
        this.sendResponse(403, message, data);
    };
    ResponseSenderMiddleware.prototype.sendUnauthorized401Response = function (message, data) {
        if (message === void 0) { message = "Unauthorized"; }
        if (data === void 0) { data = null; }
        logger_1.default.error({ url: this.res.req.url, status: 401, message: message, data: data });
        this.sendResponse(401, message, data);
    };
    ResponseSenderMiddleware.prototype.sendBadRequest400Response = function (message, data) {
        if (message === void 0) { message = "Bad Request"; }
        if (data === void 0) { data = null; }
        logger_1.default.error({ url: this.res.req.url, status: 400, message: message, data: data });
        this.sendResponse(400, message, data);
    };
    ResponseSenderMiddleware.prototype.sendErrorResponse = function (message, data) {
        if (data === void 0) { data = null; }
        logger_1.default.error({ url: this.res.req.url, status: 500, message: message, data: data });
        this.sendResponse(500, message, data);
    };
    ResponseSenderMiddleware.prototype.sendCustomSuccessResponse = function (status, message, data) {
        if (data === void 0) { data = null; }
        logger_1.default.info({ url: this.res.req.url, status: status, message: message, data: data });
        this.sendResponse(status, message, data);
    };
    ResponseSenderMiddleware.prototype.sendCustomErrorResponse = function (status, message, data) {
        if (data === void 0) { data = null; }
        logger_1.default.error({ url: this.res.req.url, status: status, message: message, data: data });
        this.sendResponse(status, message, data);
    };
    return ResponseSenderMiddleware;
}());
exports.default = ResponseSenderMiddleware;
