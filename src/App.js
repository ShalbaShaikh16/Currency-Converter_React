import React from 'react';
import { useState , useEffect} from 'react';
import logo from './exchange.gif';
import axios from 'axios';
import './App.css';

function App() {

  const[exchangerate,setExchange]=useState({});
  const [amount,setAmount]=useState(1);
  const[fromCurrency,setFromCurrency]=useState('USD')
  const[toCurrency,setToCurrency]=useState('INR')
  const[convertedAmount,setConvertedAmount]=useState(null);

  useEffect(() => {
    const apiUrl=`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    axios.get(apiUrl)
    .then(
      Response=>{
        setExchange(Response.data.rates);
      }
    )
    .catch(error =>{
      console.error('Error fetching exchange rates: ',error);
    })
  }, [fromCurrency])
  
  useEffect(()=>{
    const conversionRate=exchangerate[toCurrency]
    if(conversionRate){
      const converted=amount* conversionRate;
      setConvertedAmount(converted.toFixed(2));
      
    }
  },[amount,fromCurrency,toCurrency,exchangerate]);

  const handleChange=(e)=>{
    const {name,value}=e.target;
    switch(name){
      case 'amount': 
      setAmount(value);
      break;

      case 'fromCurrency': 
      setFromCurrency(value);
      break;

      case 'toCurrency': 
      setToCurrency(value);
      break;
    }
  }


  return (
  <div className='card'>
    <img src={logo} width='60' alt='test'/>
    <h1 className='text'>Currency Converter</h1>
    <div className='curr_exchange'>

      <div className='input'>
      <label className='inpt_label'>Amount:</label>
      <input type='number' name='amount' className='input_field' value={amount} onChange={handleChange}/>

    </div>

    <div className='input'>
      <label className='inpt_label'>From Currency:</label>
      <select name="fromCurrency" className='input_field' value={fromCurrency} onChange={handleChange}>
      {
        Object.keys(exchangerate).map(currency=>(
          <option key={currency} value={currency}>
            {currency}

          </option>
        ))
      }
      </select>
    </div>

    <div className='input'>
      <label className='inpt_label'>To Currency:</label>
      <select name="toCurrency" className='input_field' onChange={handleChange} value={toCurrency}>
      {
        Object.keys(exchangerate).map(currency=>(
          <option key={currency} value={currency}>
            {currency}


          </option>
        ))
      }
    </select>
    </div>

    </div>


    <div className='result' >
      <h2>Converted Amount: <b>{convertedAmount}</b></h2>





    </div>
  </div>
  );
}

export default App;
