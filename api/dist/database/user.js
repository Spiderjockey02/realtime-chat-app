"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.findUser = exports.createUser = void 0;
const index_1 = __importDefault(require("./index"));
// Create a user
function createUser(data) {
    return index_1.default.user.create({
        data: {
            email: data.email,
            username: data.name,
            password: data.password,
        },
    });
}
exports.createUser = createUser;
// Find a user by email (for login)
function findUser(data) {
    if (data.email) {
        return index_1.default.user.findUnique({
            where: {
                email: data.email,
            },
            include: {
                servers: true,
            },
        });
    }
    else if (data.id) {
        return index_1.default.user.findUnique({
            where: {
                id: data.id,
            },
            include: {
                servers: true,
            },
        });
    }
    return null;
}
exports.findUser = findUser;
// Update a user (Username, avatar)
function updateUser(data) {
    return index_1.default.user.update({
        where: {
            id: data.id,
        },
        data: {
            username: data.username,
        },
    });
}
exports.updateUser = updateUser;
//# sourceMappingURL=user.js.map