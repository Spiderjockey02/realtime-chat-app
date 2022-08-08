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
exports.getNextPosition = exports.createChannel = exports.fetchChannels = exports.fetchChannel = exports.deleteChannel = void 0;
const index_1 = __importDefault(require("./index"));
function deleteChannel(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.default.channel.delete({
            where: {
                id: data.id,
            },
        });
    });
}
exports.deleteChannel = deleteChannel;
function fetchChannel(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.default.channel.findUnique({
            where: {
                id: data.id,
            },
        });
    });
}
exports.fetchChannel = fetchChannel;
function fetchChannels(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.default.channel.findMany({
            where: {
                serverId: data.serverId,
            },
        });
    });
}
exports.fetchChannels = fetchChannels;
function createChannel(data) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.default.channel.create({
            data: {
                name: data.name,
                type: (_a = data.type) !== null && _a !== void 0 ? _a : 'TEXT',
                topic: (_b = data.topic) !== null && _b !== void 0 ? _b : '',
                position: data.position,
                server: {
                    connect: {
                        id: data.serverId,
                    },
                },
            },
        });
    });
}
exports.createChannel = createChannel;
function getNextPosition(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const channels = yield index_1.default.channel.findMany({
            where: {
                serverId: data.serverId,
            },
            orderBy: {
                position: 'asc',
            },
        });
        return channels.length;
    });
}
exports.getNextPosition = getNextPosition;
