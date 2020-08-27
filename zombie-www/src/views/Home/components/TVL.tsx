import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import axios from 'axios'
import { useWallet } from 'use-wallet'

import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'

import useFarms from '../../../hooks/useFarms'

import { Farm } from '../../../contexts/Farms'

import useYam from '../../../hooks/useYam'

import DAIPoolJson from '../../../yam/clean_build/contracts/YAMCOMPPool.json';
import UNIPoolJson from '../../../yam/clean_build/contracts/ShrimpUniPool.json';
import nonlpDicePool from '../../../yam/clean_build/contracts/nonlpDicePool.json'
import DICEPoolJson from '../../../yam/clean_build/contracts/SHRIMPDICEPool.json';
import SHRIMPPoolJson from '../../../yam/clean_build/contracts/ShrimpTacoPool.json';
import nonlpSHRIMPPoolJson from '../../../yam/clean_build/contracts/nonlpShrimpPool.json';


import {
  current_Dai_value,
  current_DaiStaked_value,
  log_data,
  log_data2
} from '../../../yamUtils'


const TVL: React.FC = () => {

  const [totalDai, setTotalDai] = useState(0)
  const [total_Amount_Staked, setTotalDaiStaked] = useState(0)
  const [totalEthWrapped, settotalwrapped] = useState(0)
  const [totalDaiwrapped, settotalDaiwrapped] = useState(0)

  const [shrimptvl, setshrimptvl] = useState(0)
  const [daitvl, setdaitvl] = useState(0)
  const [dicetvl, setdicetvl] = useState(0)
  const [unitvl, setunitvl] = useState(0)
  const [shrimplptvl, setshrimplptvl] = useState(0)
  const [dicelptvl, setdicelptvl] = useState(0)
  

  const [currentPrice, setCurrentPrice] = useState(new Number)
  const [currentstatPrice, setCurrentstatPrice] = useState(new Number)

  const [depositToken, setdepositToken] = useState('shrimp')

  const [tvl, settvl] = useState(0)
  const yam = useYam()
  const { ethereum } = useWallet()

  switch (depositToken) {
    case 'shrimp':
      var address = '0x1dD61127758c47Ab95a1931E02D3517f8d0dD1A6'
      var cAddress = '0x38c4102D11893351cED7eF187fCF43D33eb1aBE6'
      var nowAbi = nonlpSHRIMPPoolJson.abi
      var currentCoinPrice = 'shrimp-finance'
      break;
    case 'dai':
      var address = '0x66C58b0eD9F987c19177AA5949C3100BEdA982f5'
      var cAddress = '0x6b175474e89094c44da98b954eedeac495271d0f'
      var nowAbi = DAIPoolJson.abi
      var currentCoinPrice = 'dai'
      break;
    case 'dice':
      var address = '0xCd3D97a3ebF3910D1572D4446d4303bC77acE335'
      var cAddress = '0xCF67CEd76E8356366291246A9222169F4dBdBe64'
      var nowAbi = nonlpDicePool.abi
      var currentCoinPrice = 'dice-finance'
      break;
    case 'uni':
      var address = '0x88a131b5293Ca340B454111314b6C1b5c0Dfa9B9'
      var cAddress = '0xC83E9d6bC93625863FFe8082c37bA6DA81399C47'
      var nowAbi = UNIPoolJson.abi
      var currentCoinPrice = '2'
      break;
    case 'shrimplp':
      var address = '0xD82DEF026ec724aB8B06a117F69aA32A125E0DBD'
      var cAddress = '0xeba5d22bbeb146392d032a2f74a735d66a32aee4'
      var nowAbi = SHRIMPPoolJson.abi
      var currentCoinPrice = '1'
      break;
    case 'dicelp':
      var address = '0x934929f34c7b7611AbC1aEcA15769Da3ca47A097'
      var cAddress = '0xc585cc7b9e77aea3371764320740c18e9aec9c55'
      var nowAbi = DICEPoolJson.abi
      var currentCoinPrice = '1'
      break;
    default:
      //shrimp data i dont know why i chose this/s
      var address = '0x1dD61127758c47Ab95a1931E02D3517f8d0dD1A6'
      var cAddress = '0x38c4102D11893351cED7eF187fCF43D33eb1aBE6'
      var nowAbi = nonlpSHRIMPPoolJson.abi
      var currentCoinPrice = 'shrimp-finance'
  }

  const get_wrapped_value = useCallback(async (num) => {
    const totalEthWrapped = await log_data(ethereum, cAddress, nowAbi);
    console.log(totalEthWrapped, '=totalEthWrapped')
    settotalwrapped(totalEthWrapped);
    get_prices_wrapped(totalEthWrapped / Number(num))
  }, [yam])

  const get_altwrapped_value = useCallback(async (num) => {
    const totalDaiwrapped = await log_data2(ethereum, cAddress, nowAbi);
    console.log(totalDaiwrapped)
    settotalDaiwrapped(totalDaiwrapped);
    get_prices_wrapped(totalDaiwrapped / Number(num))
  }, [yam])

  const getdai = useCallback(async () => {
    const totalDai = await current_Dai_value(ethereum, cAddress);
    console.log(totalDai)
    setTotalDai(Number(totalDai))
    if (currentCoinPrice === '1') {
      get_wrapped_value(totalDai)
    } else if (currentCoinPrice === '2') {
      get_altwrapped_value(totalDai)
    } else {
      console.log(totalDai)
      setCurrentTVl()
    }

  }, [yam])

  const getdaistaked = useCallback(async (num, zomNum) => {
    console.log(num)
    console.log(zomNum)
    const total_Amount_Staked = await current_DaiStaked_value(ethereum, address);
    console.log(total_Amount_Staked)
    await setTotalDaiStaked(Number(total_Amount_Staked))
    getdai()
  }, [yam])

  const callPrice = useCallback(async () => {
    if (currentCoinPrice === '1' || currentCoinPrice === '2') {
    } else {
      axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=Cethereum%2C${currentCoinPrice}&vs_currencies=usd`).then((res) => {
        if (res.status === 200) {
          setCurrentstatPrice(Number(res.data[`${currentCoinPrice}`].usd))
          get_prices(Number(res.data[`${currentCoinPrice}`].usd))
        }
      })
    }
  }, [setCurrentstatPrice])

  const get_prices_wrapped = useCallback(async (num) => {
    //seconds step
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=Cethereum%2Czombie-finance&vs_currencies=usd').then((res) => {
      if (res.status === 200) {
        setCurrentPrice(Number(res.data['zombie-finance'].usd))
        if (yam) {
          getdai()
          getdaistaked(num, Number(res.data['zombie-finance'].usd))
        }
      }
    })
  }, [yam, setCurrentstatPrice])

  const get_prices = useCallback(async (num) => {
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=Cethereum%2Czombie-finance&vs_currencies=usd').then((res) => {
      if (res.status === 200) {
        setCurrentPrice(Number(res.data['zombie-finance'].usd))
        if (yam) {
          getdaistaked(num, Number(res.data['zombie-finance'].usd))
        }
      }
    })
  }, [yam, setCurrentstatPrice])

  const setCurrentTVl = useCallback(async () => {
    switch (depositToken) {
      case 'shrimp':
        var new_tvl = Number(total_Amount_Staked) * Number(totalEthWrapped / totalDai)
        setshrimptvl(new_tvl)
        setdepositToken('dai')
        console.log(totalEthWrapped);
        console.log(total_Amount_Staked);
        console.log(totalDai);
        console.log(new_tvl)
        console.log(depositToken)
        callPrice()
        break;
      case 'dai':
        var new_tvl = Number(total_Amount_Staked) * Number(1)
        setdaitvl(new_tvl)
        setdepositToken('dice')
        callPrice()
        break;
      case 'dice':
        var new_tvl = Number(total_Amount_Staked) * Number(currentstatPrice)
        setdicetvl(new_tvl)
        setdepositToken('uni')
        getdai()
        break;
      case 'uni':
        var new_tvl = Number(total_Amount_Staked) * Number(totalDaiwrapped / totalDai)
        setunitvl(new_tvl)
        setdepositToken('shrimplp')
        getdai()
        break;
      case 'shrimplp':
        var new_tvl = Number(total_Amount_Staked) * Number(totalEthWrapped / totalDai)
        setshrimplptvl(new_tvl)
        setdepositToken('dicelp')
        getdai()
        break;
      case 'dicelp':
        var new_tvl = Number(total_Amount_Staked) * Number(totalEthWrapped / totalDai)
        setdicelptvl(new_tvl)
        break;
      default:
        return;
    }

  }, [yam])

  useEffect(() => { 
    if(shrimptvl === 0){
      callPrice()
    }
  }, [])

  return (
    <>

      <div style={{ fontSize: '23px' }}>
        {(Number(shrimptvl) + Number(daitvl) + Number(dicetvl) + Number(unitvl) + Number(shrimplptvl) + Number(dicelptvl)).toFixed(2)}
        {/* {currentCoinPrice === '1' && `${(depositToken).toLocaleUpperCase()} TVL: $${(Number(total_Amount_Staked) * Number(totalEthWrapped / totalDai)).toFixed(2)}`}
        {currentCoinPrice === '2' && `${(depositToken).toLocaleUpperCase()} TVL: $${(Number(total_Amount_Staked) * Number(totalDaiwrapped / totalDai)).toFixed(2)}`}
        {depositToken === 'shrimp' || depositToken === 'dice' ? `${(depositToken).toLocaleUpperCase()} TVL: $${(Number(total_Amount_Staked) * Number(currentstatPrice)).toFixed(2)}` : ''}
        {depositToken === 'dai' && `${(depositToken).toLocaleUpperCase()} TVL: $${(Number(total_Amount_Staked) * Number(1)).toFixed(2)}`} */}
      </div>
    </>
  )
}

export default TVL 
