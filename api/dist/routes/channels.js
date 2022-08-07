"use strict";
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
const channel_1 = require("../database/channel");
const message_1 = require("../database/message");
const router = express_1.default.Router();
function default_1(io) {
    router
        // Get the channel
        .get('/:channelId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const channel = yield (0, channel_1.fetchChannel)({ id: req.params.channelId });
            res.json(channel !== null && channel !== void 0 ? channel : { error: 'Incorrect channel Id' });
        }
        catch (err) {
            console.log(err);
            res.json({ error: 'An error occured fetching channel' });
        }
    }))
        // Delete a channel
        .delete('/:channelId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const channel = yield (0, channel_1.deleteChannel)({ id: req.params.channelId });
            res.json(channel !== null && channel !== void 0 ? channel : { error: 'Incorrect channel Id' });
        }
        catch (err) {
            console.log(err);
            res.json({ error: 'An error occured fetching channel' });
        }
    }))
        // Get the latest 100 messages from the channel
        .get('/:channelId/messages', (req, res) => __awaiter(this, void 0, void 0, function* () {
        // Fetch messages
        const messages = yield (0, message_1.fetchMessages)({ id: req.params.channelId });
        res.send(messages);
    }))
        // Get a specific message from the channel
        .get('/:channelId/messages/:messageId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const messages = yield (0, message_1.fetchMessage)({ id: req.params.messageId });
        res.send(messages);
    }))
        // Create a message
        .post('/:channelId/messages', (req, res) => __awaiter(this, void 0, void 0, function* () {
        // Post messages
        try {
            const { id } = yield (0, message_1.createMessage)({
                text: req.body.message,
                userId: '1000',
                channelId: req.params.channelId,
            });
            const message = yield (0, message_1.fetchMessage)({ id });
            io.to(`channel_${req.params.channelId}`).emit('message', message);
            res.sendStatus(200);
        }
        catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    }));
    return router;
}
exports.default = default_1;
//# sourceMappingURL=channels.js.map