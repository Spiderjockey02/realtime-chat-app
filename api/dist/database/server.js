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
exports.updateServer = exports.deleteServer = exports.fetchServer = exports.fetchServers = exports.createServer = void 0;
const index_1 = __importDefault(require("./index"));
const channel_1 = require("./channel");
// Create a server with 1 text, 1 voice and 2 category channels
function createServer(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const server = yield index_1.default.server.create({
            data: {
                name: data.name,
                owner: {
                    connect: {
                        id: data.userId,
                    },
                },
            },
        });
        // Create channels
        yield (0, channel_1.createChannel)({ name: 'TEXT CHANNELS', type: 'CATEGORY', serverId: server.id,
            position: yield (0, channel_1.getNextPosition)({ serverId: server.id }) });
        yield (0, channel_1.createChannel)({ name: 'general', type: 'TEXT', serverId: server.id,
            position: yield (0, channel_1.getNextPosition)({ serverId: server.id }) });
        yield (0, channel_1.createChannel)({ name: 'VOICE CHANNELS', type: 'CATEGORY', serverId: server.id,
            position: yield (0, channel_1.getNextPosition)({ serverId: server.id }) });
        yield (0, channel_1.createChannel)({ name: 'General', type: 'VOICE', serverId: server.id,
            position: yield (0, channel_1.getNextPosition)({ serverId: server.id }) });
    });
}
exports.createServer = createServer;
// Fetch all guilds with the same owner
function fetchServers(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.default.server.findMany({
            where: {
                ownerId: data.userId,
            },
        });
    });
}
exports.fetchServers = fetchServers;
// Fetch a guild by ID
function fetchServer(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.default.server.findUnique({
            where: {
                id: data.id,
            },
            include: {
                users: true,
                roles: true,
                channels: {
                    include: {
                        children: true,
                    },
                },
            },
        });
    });
}
exports.fetchServer = fetchServer;
function deleteServer(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.default.channel.delete({
            where: {
                id: data.id,
            },
        });
    });
}
exports.deleteServer = deleteServer;
function updateServer(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.default.channel.delete({
            where: {
                id: data.id,
            },
        });
    });
}
exports.updateServer = updateServer;
