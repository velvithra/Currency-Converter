import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css'

function App() {
   const[amount,setAmount]=useState(1);
   const[fromcurrency,setFromCurrency]=useState("USD");
   const[tocurrency,setToCurrency]=useState("INR");
   const[convertedAmount,setConvertedAmount]=useState(null);
   const[exchangerate,setExchangeRate]=useState(null);

 useEffect(()=>{
  const getExchangeRate = async ()=>{
    try{
       let url=`https://api.exchangerate-api.com/v4/latest/${fromcurrency}`;
       const response = await axios.get(url);
       setExchangeRate(response.data.rates[tocurrency]);
      }catch(error){
        console.error("Error fetching exchange rate:",error);
    }
  };
  getExchangeRate();
},[fromcurrency,tocurrency]);

 useEffect(()=>{
if(exchangerate !== null){
  setConvertedAmount((amount * exchangerate).toFixed(2));
}
 },[amount,exchangerate])


  const handleAmount =(e)=>{
    const value= parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value)
  }

  const handleFromcurrencychange=(e)=>{
    setFromCurrency(e.target.value);
  }
  const handleTocurrencychange=(e)=>{
    setToCurrency(e.target.value);
  }

  return (
    <>
     <div className='currency-converter'>
      
      <div className='data'>
        <h1>Currency Converter</h1>
        <div className='input-container'>
          <label htmlFor='amt'>Amount:</label>
          <input type="number" id='amt' value={amount}  onChange={handleAmount}/>
        </div>
        <div className='input-container'>
          <label htmlFor='from-currency'>From Currency:</label>
          <select id="from-currency" value={fromcurrency} onChange={handleFromcurrencychange}>
          <option value="">Select</option>
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>
          </select>
          </div>
          <div  className='input-container'>
          <label htmlFor='to-currency'>To Currency:</label>
          <select id="to-currency" value={tocurrency} onChange={handleTocurrencychange}>
            <option value="">Select</option>
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>
          </select>
        </div>
        <div className="final">
          <p>{amount} {fromcurrency} is equal to {convertedAmount} {tocurrency} </p>
        </div>
      </div>
     </div>
     
    </>
  )
}

export default App
