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
exports.UniV2Pair = void 0;
const ethers_1 = require("ethers");
const PairDetail_json_1 = __importDefault(require("../abi/PairDetail.json"));
const configs_1 = require("../utils/configs");
const FLAG = '0x0000110000000000000000000000000000000000000000000000000000000111';
class UniV2Pair {
    constructor(configs) {
        this.chainId = configs.chainId;
        this.scanApi = configs.scanApi;
        this.provider = configs.provider;
    }
    getPairInfo({ pairAddress, flag = FLAG }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pairDetailContract = new ethers_1.ethers.Contract(configs_1.CONFIGS[this.chainId].pairsInfo, PairDetail_json_1.default, this.provider);
                const res = yield pairDetailContract.functions.query([pairAddress], flag);
                return res.details[0];
            }
            catch (e) {
                throw e;
            }
        });
    }
    getPairsInfo({ pairAddresses, flag = FLAG }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pairDetailContract = new ethers_1.ethers.Contract(configs_1.CONFIGS[this.chainId].pairsInfo, PairDetail_json_1.default, this.provider);
                const { details } = yield pairDetailContract.functions.query(pairAddresses, flag);
                const result = {};
                for (let i = 0; i < pairAddresses.length; i++) {
                    result[pairAddresses[i]] = details[i];
                }
                return result;
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.UniV2Pair = UniV2Pair;
//# sourceMappingURL=uniV2Pair.js.map