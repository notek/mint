import Web3 from 'web3'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

import type * as W3I from './web3.interface'

let web3: Web3
export async function CONNECT_WALLET() {
    let rpc = {}
    if (import.meta.env.MODE === 'testnet') {
        rpc = { 5: 'https://goerli.infura.io/v3/' }
    }
    if (import.meta.env.MODE === 'mainnet') {
        rpc = { 56: 'https://bsc-dataseed4.ninicoin.io' }
    }

    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                rpc: rpc
            }
        }
    }

    const web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        providerOptions
    })

    try {
        const web3Provider = await web3Modal.connect()
        web3 = new Web3(web3Provider)
        return { web3Provider, web3Ins: web3 }
    } catch (err: any) {
        return { errmsg: err.message }
    }
}

export async function GET_WALLET_INFO(): Promise<W3I.UserInfo> {
    const act = (await web3.eth.getAccounts())[0].toLocaleLowerCase()
    const bal = await web3.eth.getBalance(act)

    return {
        account: act,
        balance: (+web3.utils.fromWei(bal, 'ether')).toFixed(4)
    }
}