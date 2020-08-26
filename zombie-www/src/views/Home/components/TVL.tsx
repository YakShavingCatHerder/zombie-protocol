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
   const [tlv_data, setTlv_data] = useState(0)
  const [farms] = useFarms()
  const rows = farms.reduce<Farm[][]>((farmRows, farm) => {
    const newFarmRows = [...farmRows]
    if (newFarmRows[newFarmRows.length - 1].length) {
      newFarmRows.push([farm])
    } else {
      newFarmRows[newFarmRows.length - 1].push(farm)
    }
    return newFarmRows
  }, [[]])

  return (
    <StyledCards>
      {rows.map((farmRow, i) => (
        <div key={i}>
          {farmRow.map((farm, j) => (
            <React.Fragment key={j}>
              <FarmCard farm={farm} />
            </React.Fragment>
          ))}
        </div>
      ))}
    </StyledCards>
  )
}

interface FarmCardProps {
  farm: Farm,
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {

  const [totalDai, setTotalDai] = useState(0)
  const [totalDaiStaked, setTotalDaiStaked] = useState(0)
  const [totalwrapped, settotalwrapped] = useState(0)
  const [totalDaiwrapped, settotalDaiwrapped] = useState(0)

  const [currentPrice, setCurrentPrice] = useState(new Number)
  const [currentstatPrice, setCurrentstatPrice] = useState(new Number)

  const yam = useYam()
  const { account, ethereum } = useWallet()

  switch (farm.depositToken) {
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
    const totalwrapped = await log_data(ethereum, cAddress, nowAbi);
    settotalwrapped(totalwrapped);
    get_prices_wrapped(totalwrapped/Number(num))
  }, [yam])

  const get_altwrapped_value = useCallback(async (num) => {
    const totalDaiwrapped = await log_data2(ethereum, cAddress, nowAbi);
    settotalDaiwrapped(totalDaiwrapped);
    get_prices_wrapped(totalDaiwrapped/Number(num))
  }, [yam])

  const getdai = useCallback(async () => {
    const totalDai = await current_Dai_value(ethereum, cAddress);
    setTotalDai(Number(totalDai))
    if(currentCoinPrice === '1'){
      get_wrapped_value(totalDai)
    } else if(currentCoinPrice === '2'){
      get_altwrapped_value(totalDai)
    }
  }, [yam])

  const getdaistaked = useCallback(async (num, zomNum) => {
    const totalDaiStaked = await current_DaiStaked_value(ethereum, address);
    await setTotalDaiStaked(Number(totalDaiStaked))
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
          getdai()
        }
      }
    })
  }, [yam, setCurrentstatPrice])

  useEffect(() => {
    if (currentCoinPrice === '1') {
      getdai()
    } else if (currentCoinPrice === '2') {
      getdai()
    } else {
      callPrice()
    }


  }, [])

  return (
    <>
      {farm.sort === 0 || farm.sort === 1 ?
        ''
        :
        <div style={{fontSize: '23px'}}>
        {currentCoinPrice === '1' && `${(farm.id).toLocaleUpperCase()} TLV: $${(Number(totalDaiStaked)*Number(totalwrapped / totalDai)).toFixed(2)}`}
        {currentCoinPrice === '2' && `${(farm.id).toLocaleUpperCase()} TLV: $${(Number(totalDaiStaked)*Number(totalDaiwrapped / totalDai)).toFixed(2)}`}
        {farm.id === 'shrimp' || farm.id === 'dice' ? `${(farm.id).toLocaleUpperCase()} TLV: $${(Number(totalDaiStaked)*Number(currentstatPrice)).toFixed(2)}` : ''}
        {farm.id === 'dai' && `${(farm.id).toLocaleUpperCase()} TLV: $${(Number(totalDaiStaked)*Number(1)).toFixed(2)}` }
        </div>
      }
    </>
  )
}

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  border-radius: 12px;
  filter: blur(4px);
  position: absolute;
  top: -2px; right: -2px; bottom: -2px; left: -2px;
  z-index: -1;
`

const StyledCards = styled.div`
  width: 900px;
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${props => props.theme.color.grey[600]};
  font-size: 24px;
  font-weight: 700;
  margin: ${props => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  width: ${props => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  margin-bottom: ${props => props.theme.spacing[6]}px;
  margin-top: ${props => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: ${props => props.theme.color.grey[500]};
`

export default TVL
