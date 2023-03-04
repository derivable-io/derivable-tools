import { BigNumber, ethers } from "ethers";
import { LogType, ParseLogType, PoolsType, PoolType, StatesType, Storage, TokenType } from "../types";
import { UniV2Pair } from "./uniV2Pair";
import { JsonRpcProvider } from "@ethersproject/providers";
declare type ConfigType = {
    chainId: number;
    scanApi: string;
    account?: string;
    storage?: Storage;
    provider: ethers.providers.Provider;
    providerToGetLog: ethers.providers.Provider;
    overrideProvider: JsonRpcProvider;
    UNIV2PAIR: UniV2Pair;
};
declare type ResourceData = {
    pools: PoolsType;
    tokens: TokenType[];
    swapLogs: LogType[];
};
export declare class Resource {
    pools: PoolsType;
    tokens: TokenType[];
    swapLogs: LogType[];
    chainId: number;
    scanApi: string;
    account?: string;
    storage?: Storage;
    provider: ethers.providers.Provider;
    providerToGetLog: ethers.providers.Provider;
    overrideProvider: JsonRpcProvider;
    UNIV2PAIR: UniV2Pair;
    constructor(configs: ConfigType);
    fetchResourceData(account: string): Promise<any>;
    getLastBlockCached(account: string): any;
    cacheDdlLog({ swapLogs, ddlLogs, headBlock, account }: {
        swapLogs: any;
        ddlLogs: any;
        headBlock: number;
        account: string;
    }): void;
    getResourceCached(account: string): Promise<ResourceData>;
    getNewResource(account: string): Promise<ResourceData>;
    /**
     * parse DDL logs
     * @param logs
     */
    generatePoolData(logs: ParseLogType[]): Promise<{
        tokens: {
            address: any;
            decimal: any;
            name: any;
            symbol: any;
            totalSupply: any;
        }[];
        pools: {
            [x: string]: PoolType;
        };
    }>;
    /**
     * load Token detail, poolstate data and then dispatch to Store
     * @param listTokens
     * @param listPools
     * @param uniPools
     */
    loadStatesData(listTokens: string[], listPools: {
        [key: string]: PoolType;
    }, uniPools: string[]): Promise<{
        tokens: {
            address: any;
            decimal: any;
            name: any;
            symbol: any;
            totalSupply: any;
        }[];
        pools: {
            [x: string]: PoolType;
        };
    }>;
    getRentRate({ rDcLong, rDcShort, R }: {
        R: BigNumber;
        rDcLong: BigNumber;
        rDcShort: BigNumber;
    }, rentRate: BigNumber): {
        rentRateLong: BigNumber;
        rentRateShort: BigNumber;
    };
    getPoolOverridedProvider(poolAddresses: string[]): JsonRpcProvider;
    getBasePrice(pairInfo: any, baseToken: string): string;
    /**
     * get Multicall Request to get List token and poolState data in 1 request to RPC
     * @param normalTokens
     * @param listPools
     */
    getMultiCallRequest(normalTokens: string[], listPools: {
        [key: string]: PoolType;
    }): {
        reference: string;
        contractAddress: any;
        abi: {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        }[];
        calls: {
            reference: string;
            methodName: string;
            methodParameters: string[][];
        }[];
    }[];
    parseMultiCallResponse(multiCallData: any, poolAddresses: string[]): {
        tokens: any;
        poolsState: {};
    };
    getRdc(states: StatesType, powers: number[], cPrice: number): {
        R: BigNumber;
        rDcLong: BigNumber;
        rDcShort: BigNumber;
    };
    parseDdlLogs(ddlLogs: any): any;
    getTopics(): {
        [key: string]: string;
    };
}
export {};