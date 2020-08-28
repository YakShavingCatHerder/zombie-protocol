import React, { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useWallet } from 'use-wallet'

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
  const [dicelptvl, setdicelptvl] = useState("loading...")

  const yam = useYam()
  const { ethereum } = useWallet()
  var address = '0x1dD61127758c47Ab95a1931E02D3517f8d0dD1A6'
  var cAddress = '0x38c4102D11893351cED7eF187fCF43D33eb1aBE6'
  var nowAbi = nonlpSHRIMPPoolJson.abi
  var currentCoinPrice = 'shrimp-finance'
  var token_name = "";
  var new_tvl = 0

  function a(tokenname: any) {
    switch (tokenname) {
      case 'shrimp':
        address = '0x1dD61127758c47Ab95a1931E02D3517f8d0dD1A6'
        cAddress = '0x38c4102D11893351cED7eF187fCF43D33eb1aBE6'
        nowAbi = nonlpSHRIMPPoolJson.abi
        currentCoinPrice = 'shrimp-finance'
        token_name = tokenname
        return currentCoinPrice;
      case 'dai':
        address = '0x66C58b0eD9F987c19177AA5949C3100BEdA982f5'
        cAddress = '0x6b175474e89094c44da98b954eedeac495271d0f'
        nowAbi = DAIPoolJson.abi
        currentCoinPrice = 'dai'
        token_name = tokenname
        return currentCoinPrice;
      case 'dice':
        address = '0xCd3D97a3ebF3910D1572D4446d4303bC77acE335'
        cAddress = '0xCF67CEd76E8356366291246A9222169F4dBdBe64'
        nowAbi = nonlpDicePool.abi
        currentCoinPrice = 'dice-finance'
        token_name = tokenname
        return currentCoinPrice;
      case 'uni':
        address = '0x88a131b5293Ca340B454111314b6C1b5c0Dfa9B9'
        cAddress = '0xC83E9d6bC93625863FFe8082c37bA6DA81399C47'
        nowAbi = UNIPoolJson.abi
        currentCoinPrice = '2'
        token_name = tokenname
        return currentCoinPrice;
      case 'shrimplp':
        address = '0xD82DEF026ec724aB8B06a117F69aA32A125E0DBD'
        cAddress = '0xeba5d22bbeb146392d032a2f74a735d66a32aee4'
        nowAbi = SHRIMPPoolJson.abi
        currentCoinPrice = '1'
        token_name = tokenname
        return currentCoinPrice;
      case 'dicelp':
        address = '0x934929f34c7b7611AbC1aEcA15769Da3ca47A097'
        cAddress = '0xc585cc7b9e77aea3371764320740c18e9aec9c55'
        nowAbi = DICEPoolJson.abi
        currentCoinPrice = '1'
        token_name = tokenname
        return currentCoinPrice;
      default:
        address = '0x1dD61127758c47Ab95a1931E02D3517f8d0dD1A6'
        cAddress = '0x38c4102D11893351cED7eF187fCF43D33eb1aBE6'
        nowAbi = nonlpSHRIMPPoolJson.abi
        token_name = tokenname
        currentCoinPrice = 'shrimp-finance'
        return currentCoinPrice;
    }
  }


  const get_wrapped_value = useCallback(async (num, old_tvl) => {
    const totalEthWrapped = await log_data(ethereum, cAddress, nowAbi);
    get_prices_wrapped(totalEthWrapped / Number(num), old_tvl)
  }, [yam])

  const get_altwrapped_value = useCallback(async (num, old_tvl) => {
    const totalDaiwrapped = await log_data2(ethereum, cAddress, nowAbi);
    get_prices_wrapped(totalDaiwrapped / Number(num), old_tvl)
  }, [yam])

  const getdai = useCallback(async (num, stake, old_tvl) => {
    if (currentCoinPrice === '1') {
      setCurrentTVl(num, stake, old_tvl)
    } else if (currentCoinPrice === '2') {
      setCurrentTVl(num, stake, old_tvl)
    } else {
      setCurrentTVl(num, stake, old_tvl)
    }

  }, [yam])

  const getdaistaked = useCallback(async (num, zomNum, old_tvl) => {
    const total_Amount_Staked = await current_DaiStaked_value(ethereum, address);
    getdai(num, total_Amount_Staked, old_tvl)
  }, [yam])

  const callPrice = useCallback(async (coin_name, old_tvl) => {
    if (currentCoinPrice === '1') {
      const totalDai = await current_Dai_value(ethereum, cAddress);
      get_wrapped_value(totalDai, old_tvl)
    } else if (currentCoinPrice === '2') {
      const totalDai = await current_Dai_value(ethereum, cAddress);
      get_altwrapped_value(totalDai, old_tvl)
    } else {
      axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=Cethereum%2C${coin_name}&vs_currencies=usd`).then((res) => {
        if (res.status === 200) {
          get_prices(Number(res.data[`${coin_name}`].usd), old_tvl)
        }
      })
    }
  }, [yam])

  const get_prices_wrapped = useCallback(async (num, old_tvl) => {
          getdaistaked(num, 0,old_tvl)
  }, [yam])

  const get_prices = useCallback(async (num, old_tvl) => {
          getdaistaked(num,0, old_tvl)
  }, [yam])

  const setCurrentTVl = useCallback(async (num, stake, oldtvl) => {
    //stake is the value staked
    //num is the current value of the coin
    var new_tvl = 0;
    switch (token_name) {
      case 'shrimp':
        new_tvl = oldtvl + Number(stake) * Number(num)
        callPrice(a('dai'),new_tvl)
        break;
      case 'dai':
        new_tvl = oldtvl + Number(stake) * Number(1)
        callPrice(a('dice'),new_tvl);
        break;
      case 'dice':
        new_tvl = oldtvl + Number(stake) * Number(num)
        callPrice(a('uni'),new_tvl);
        break;
      case 'uni':
        new_tvl = oldtvl + Number(stake) * Number(num)
        callPrice(a('shrimplp'),new_tvl);
        break;
        case 'shrimplp':
        new_tvl = oldtvl + Number(stake) * Number(num)
        callPrice(a('dicelp'),new_tvl);
        break;
      case 'dicelp':
        new_tvl = oldtvl + Number(stake) * Number(num)
        if(isNaN(new_tvl)){
          setdicelptvl('unlock wallet');
        }else{
          setdicelptvl(new_tvl.toLocaleString());
        }
        break;
      default:
        return;
    }

  }, [yam])

  useEffect(() => {
      callPrice(a('shrimp'), 0)
    
  }, [])

  return (
    <>

      <div>
        {(dicelptvl)}
      </div>
    </>
  )
}

export default TVL 
