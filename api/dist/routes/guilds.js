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
const server_1 = require("../database/server");
const router = express_1.default.Router();
router
    .post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, server_1.createServer)({
            name: req.body.server_name,
            userId: '1000',
        });
        res.redirect('/app');
    }
    catch (err) {
        console.log(err);
        res.json({ error: 'An error occured when creating new server' });
    }
}))
    .get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, server_1.fetchServer)({ id: req.params.id });
    }
    catch (err) {
        console.log(err);
        res.json({ error: 'An error occured when fetching server' });
    }
}))
    .patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, server_1.updateServer)({ id: req.params.id });
    }
    catch (err) {
        console.log(err);
        res.json({ error: 'An error occured when updating server' });
    }
}));
exports.default = router;
//# sourceMappingURL=guilds.js.map