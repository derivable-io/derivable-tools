import {PoolsType, Storage, SwapLog, TokenType} from "./types";
import {ethers}                                 from "ethers";
import {Price}                                  from "./services/price";
import {Resource}                               from "./services/resource";
import {BnA}                                    from "./services/balanceAndAllowance";
import {UniV2Pair}                              from "./services/uniV2Pair";
import {History}                                from "./services/history";
import {Swap}                  from "./services/swap";
import {CurrentPool, PoolData} from "./services/currentPool";
import {CreatePool}            from "./services/createPool";
import {JsonRpcProvider} from "@ethersproject/providers";

type ConfigType = {
  chainId: number
  scanApi: string
  rpcUrl: string
  signer?: ethers.providers.JsonRpcSigner
  provider: ethers.providers.Provider
  providerToGetLog: ethers.providers.Provider
  account?: string
  storage?: Storage
}

export class Engine {
  chainId: number
  scanApi: string
  rpcUrl: string
  account?: string
  signer?: ethers.providers.JsonRpcSigner
  provider: ethers.providers.Provider
  providerToGetLog: ethers.providers.Provider
  overrideProvider: JsonRpcProvider
  storage?: Storage
  PRICE: Price
  RESOURCE: Resource
  BNA: BnA
  UNIV2PAIR: UniV2Pair
  HISTORY: History
  SWAP: Swap
  CURRENT_POOL: CurrentPool
  currentPoolAddress: string
  CREATE_POOL: CreatePool

  constructor(configs: ConfigType) {
    this.chainId = configs.chainId
    this.scanApi = configs.scanApi
    this.rpcUrl = configs.rpcUrl
    this.overrideProvider = new JsonRpcProvider(configs.rpcUrl)
    this.storage = configs.storage
    this.provider = configs.provider
    this.account = configs.account
    this.signer = configs.signer
    this.providerToGetLog = configs.providerToGetLog
    this.initServices()
  }

  initServices() {
    this.UNIV2PAIR = new UniV2Pair({
      chainId: this.chainId,
      scanApi: this.scanApi,
      provider: this.provider
    })
    this.BNA = new BnA({
      account: this.account,
      chainId: this.chainId,
      provider: this.provider,
    })
    this.RESOURCE = new Resource({
      account: this.account,
      chainId: this.chainId,
      scanApi: this.scanApi,
      storage: this.storage,
      provider: this.provider,
      providerToGetLog: this.providerToGetLog,
      UNIV2PAIR: this.UNIV2PAIR,
      overrideProvider: this.overrideProvider,
    })

    this.PRICE = new Price({
      chainId: this.chainId,
      scanApi: this.scanApi,
      provider: this.provider,
      providerToGetLog: this.providerToGetLog,
      UNIV2PAIR: this.UNIV2PAIR
    })

    this.CURRENT_POOL = new CurrentPool({
      chainId: this.chainId,
      resource: this.RESOURCE,
      poolAddress: this.currentPoolAddress
    })

    this.HISTORY = new History({
      account: this.account,
      CURRENT_POOL: this.CURRENT_POOL,
    })

    this.SWAP = new Swap({
      chainId: this.chainId,
      provider: this.provider,
      scanApi: this.scanApi,
      UNIV2PAIR: this.UNIV2PAIR,
      CURRENT_POOL: this.CURRENT_POOL,
      signer: this.signer,
      account: this.account,
      overrideProvider: this.overrideProvider
    })

    this.CREATE_POOL = new CreatePool({
      chainId: this.chainId,
      provider: this.provider,
      scanApi: this.scanApi,
      UNIV2PAIR: this.UNIV2PAIR,
      signer: this.signer,
      account: this.account,
      overrideProvider: this.overrideProvider
    })
  }

  setCurrentPool(poolData: PoolData) {
    this.CURRENT_POOL.initCurrentPoolData(poolData)
  }

}
