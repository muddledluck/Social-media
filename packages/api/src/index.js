"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var dbConnection_1 = require("./utils/dbConnection");
var router_1 = require("./router");
var path_1 = require("path");
var emailService_1 = require("./utils/emailService");
var express_fileupload_1 = require("express-fileupload");
var logger_1 = require("./utils/logger");
var middleware_1 = require("./middleware");
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../.env"),
});
var PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000;
// database connection
var db = new dbConnection_1.Database((_b = process.env.mongoURI) !== null && _b !== void 0 ? _b : "mongodb://0.0.0.0:27017/social-media");
db.connect();
// email service
void emailService_1.default.init();
void emailService_1.default.verifyConnection();
var app = (0, express_1.default)();
app.use(express_1.default.json());
// Setup custom middleware
(0, middleware_1.default)(app);
// Middleware to parse form data with express-fileupload
app.use((0, express_fileupload_1.default)());
app.use(function (_req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});
app.get("/", function (_req, res) {
    res.sendSuccess200Response("Yay!🚀", null);
});
// routes
router_1.default.forEach(function (route) {
    app.use("/api/v1".concat(route.prefix), route.router);
});
app.listen(PORT, function () {
    logger_1.default.info("Server is running \uD83D\uDE80\uD83D\uDE80\uD83D\uDE80\uD83D\uDE80 http://localhost:".concat(PORT));
});
