import {Engine}   from "../src/engine";
import {ethers}      from "ethers";

const test = async () => {
  let storageData = {}
  const engine = new Engine({
    chainId: 56,
    scanApi: 'https://api.bscscan.com/api',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    account: '0xC06F7cF8C9e8a8D39b0dF5A105d66127912Bc980',
    provider: new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/"),
    providerToGetLog: new ethers.providers.JsonRpcProvider('https://bscrpc.com/'),
  })
  const res = await engine.RESOURCE.fetchResourceData('0xC06F7cF8C9e8a8D39b0dF5A105d66127912Bc980')
    console.log({
      pools: engine.RESOURCE.pools,
      tokens: engine.RESOURCE.tokens,
      swapLogs: engine.RESOURCE.swapLogs
    })

}

test()
