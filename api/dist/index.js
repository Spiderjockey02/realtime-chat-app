"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http = __importStar(require("http"));
const compression_1 = __importDefault(require("compression"));
const express_session_1 = __importDefault(require("express-session"));
const memorystore_1 = __importDefault(require("memorystore"));
const socket_io_1 = require("socket.io");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const server = http.createServer(app);
const io = new socket_io_1.Server(server);
// Session handler
const Store = (0, memorystore_1.default)(express_session_1.default);
const sessionMiddleware = (0, express_session_1.default)({
    store: new Store({ checkPeriod: 86400000 }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
});
// The server
app.use(express_1.default.static(__dirname))
    .use(body_parser_1.default.json())
    .use(body_parser_1.default.urlencoded({ extended: false }))
    .use(express_1.default.static('./src/public'))
    .use((0, compression_1.default)())
    .use(sessionMiddleware)
    .use('/api', routes_1.default.route(io));
io.on("connection", (s) => {
    console.log(s);
});
server.listen(process.env.port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${process.env.port}`);
});
