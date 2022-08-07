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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const http = __importStar(require("http"));
const server = http.createServer(app);
const compression_1 = __importDefault(require("compression"));
const express_session_1 = __importDefault(require("express-session"));
const memorystore_1 = __importDefault(require("memorystore"));
const mStore = (0, memorystore_1.default)(express_session_1.default);
const socket_io_1 = require("socket.io");
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + '/.env' });
const io = new socket_io_1.Server(server);
const routes_1 = __importDefault(require("./routes"));
// Session handler
const sessionMiddleware = (0, express_session_1.default)({
    store: new mStore({ checkPeriod: 86400000 }),
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
    .use((req, res, next) => {
    // if (req.originalUrl !== '/favicon.ico') logger.connection(req, res);
    next();
})
    .use('/api', routes_1.default.route(io));
io
    .use((socket, next) => {
    // Wrap the express middleware
    // sessionMiddleware(socket.request, {}, next);
})
    .on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    // If user isn't logged in then disconnect from socket
    if (socket.request.session.passport == null) return await socket.disconnect();
    const user = new User(socket.request.session.passport.user);

    logger.log(`User logged in to WS: ${user.tag}`);

    // Show ping for client
    socket.on('ping', (callback) => {
        callback();
    });
    socket.on('hello', ({ roomName }) => {
        socket.join(roomName);
    });

    socket.on('disconnect', function() {
        logger.log(`User disconnected from WS: ${user.tag}`);
    });
    */
}));
server.listen(process.env.port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${process.env.port}`);
});
//# sourceMappingURL=index.js.map