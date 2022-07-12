import React, { useContext, useRef, useState, LegacyRef, Fragment } from 'react'
import './App.css'
import { GlobalContext } from './context/GlobalContext'

const btnClass = 'bg-blue-500 p-2 rounded-md text-white';
const cardClass = 'mt-4 border rounded-sm p-4 w-1/3';

function App() {
  const { account, savedMoney, connectWallet, saveMoney, loading, withdrawMoney, balance = 0 } = useContext(GlobalContext);
  const saveMoneyInputRef = useRef<HTMLInputElement>(null);


  const handleSaveMoney = async () => {
    let val = saveMoneyInputRef.current?.value;

    if (val === '' || isNaN(Number(val)) || Number(val) <= 0) {
      alert('Error number');
      return;
    }

    if (Number(val) > balance) {
      alert('Save money need less than balance');
      return;
    }

    await saveMoney(Number(val));
    saveMoneyInputRef.current!.value = '';
  }

  return (
    <div className='container p-4 relative'>
      {loading && <div className='fixed left-0 top-0 flex justify-center items-center w-full h-full bg-opacity-5 bg-black'>Loading</div>}
      {!account && <div>
        <button className={btnClass} onClick={() => connectWallet()}>Connect</button>
      </div>}

      {account && <Fragment>
        <div className={cardClass}>
          <div>Account balance: {balance}</div>
        </div>

        <div className={cardClass}>
          <div>Saved money: {savedMoney}</div>
        </div>

        <div className={cardClass}>
          <input className='p-2 mr-2 outline-0 mb-4 w-full border-b-2' type={'number'} step='0.1' ref={saveMoneyInputRef} placeholder='Input save money' /><br/>
          <button
            className={btnClass}
            onClick={handleSaveMoney}>Save money</button>
        </div>

       <div className={cardClass}>
          <button className={btnClass} onClick={() => withdrawMoney()}>Withdraw money</button>
        </div>

      </Fragment>}


    </div>
  )
}

export default App
