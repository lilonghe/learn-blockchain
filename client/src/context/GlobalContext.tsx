import { contractABI, contractAddress } from '../utils/constants';
import { ethers } from 'ethers';
import { createContext, useEffect, useState } from 'react';

interface IGlobalContext {
    savedMoney?: number;
    account?: string;
    connectWallet: Function;
    saveMoney: Function;
    withdrawMoney: Function;
    loading?: boolean;
    balance?: number;
}

export const GlobalContext = createContext<IGlobalContext>({});
const { ethereum } = window;

function connectContract() {
   const provider = new ethers.providers.Web3Provider(ethereum);
   const signer = provider.getSigner();
   const contract = new ethers.Contract(contractAddress, contractABI, signer);

   return contract;
}

export const GlobalProvider = ({ children }: any) => {
    const [savedMoney, setSavedMoney] = useState(0);
    const [account, setAccount] = useState();
    const [loading, setLoading] = useState<boolean>(false);
    const [balance, setBalance] = useState(0);

    const checkIsConnect = async () => {
        if (!ethereum) return alert('Do not install metamask');
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        setAccount(accounts[0]);
        reloadStatus();
    }

    const connectWallet = async () => {
        const accounts = await ethereum.request({ method: "eth_requestAccounts", });

        setAccount(accounts[0]);
        reloadStatus();
    }

    const getAccountBalance = async (newAccount?: any) => {
        let acc = newAccount || account;
        if (!acc) return;
        let balance = await ethereum.request({ method: "eth_getBalance", params: [acc, "latest"]});
        setBalance(parseInt(balance) / (10 ** 18));
    }

    const reloadStatus = () => {
        getSavedMoney();
        getAccountBalance();
    }
    
    const getSavedMoney = async () => {
        const contract = connectContract();
        const money = await contract.getMoney();
        setSavedMoney(parseInt(money._hex) / (10 ** 18));
    }

    const saveMoney = async (money: number) => {
        try{
            const contract = connectContract();
            const parsedNum = ethers.utils.parseEther(money.toString());
    
            setLoading(true);
            const hash = await contract.saveMoney({ from: account, value: parsedNum });
            await hash.wait();
    
            reloadStatus();
        } catch(err: any) {
            alert(err.message)
        }
        setLoading(false);
    }

    const withdrawMoney = async (money: number) => {
        try{
            const contract = connectContract();
    
            setLoading(true);
            const hash = await contract.withdrawMoney({ from: account });
            await hash.wait();
    
            reloadStatus();
        } catch(err: any) {
            alert(err.message)
        }
        setLoading(false);
    }

    useEffect(() => {
        checkIsConnect();
        ethereum.on('accountsChanged', () => {
            window.location.reload();
        });
    }, []);

    useEffect(() => {
        getAccountBalance();
    }, [account])


    return <GlobalContext.Provider value={{
        savedMoney,
        account,
        connectWallet,
        saveMoney,
        loading,
        withdrawMoney,
        balance,
    }}>
        {children}
    </GlobalContext.Provider>
    
}