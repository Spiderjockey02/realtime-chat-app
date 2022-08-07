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
exports.createMessage = exports.fetchMessage = exports.fetchMessages = void 0;
const index_1 = __importDefault(require("./index"));
function fetchMessages(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.default.message.findMany({
            where: {
                channelId: data.id,
            },
            include: {
                author: true,
            },
        });
    });
}
exports.fetchMessages = fetchMessages;
function fetchMessage({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.default.message.findUnique({
            where: {
                id,
            },
            include: {
                author: true,
            },
        });
    });
}
exports.fetchMessage = fetchMessage;
function createMessage(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.default.message.create({
            data: {
                text: data.text,
                attachment: '',
                author: {
                    connect: {
                        id: data.userId,
                    },
                },
                channel: {
                    connect: {
                        id: data.channelId,
                    },
                },
            },
        });
    });
}
exports.createMessage = createMessage;
//# sourceMappingURL=message.js.map