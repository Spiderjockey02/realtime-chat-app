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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient({ errorFormat: 'pretty',
    log: [
        { level: 'info', emit: 'event' },
        { level: 'warn', emit: 'event' },
        { level: 'error', emit: 'event' },
    ] });
client.$use((params, next) => __awaiter(void 0, void 0, void 0, function* () {
    const startTime = Date.now();
    const result = yield next(params);
    const timeTook = Date.now() - startTime;
    console.log(`Query ${params.model}.${params.action} took ${timeTook}ms`);
    return result;
}));
client.$on('info', (data) => {
    console.log(data.message);
});
client.$on('warn', (data) => {
    console.log(data.message);
});
client.$on('error', (data) => {
    console.log(data.message);
});
exports.default = client;
//# sourceMappingURL=index.js.map