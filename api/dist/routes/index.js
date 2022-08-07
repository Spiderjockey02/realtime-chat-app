"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const channels_1 = __importDefault(require("./channels"));
const guilds_1 = __importDefault(require("./guilds"));
const users_1 = __importDefault(require("./users"));
function route(io) {
    router
        .use('/guilds', guilds_1.default)
        .use('/channels', (0, channels_1.default)(io))
        .use('/users', users_1.default);
    return router;
}
exports.default = { route };
//# sourceMappingURL=index.js.map