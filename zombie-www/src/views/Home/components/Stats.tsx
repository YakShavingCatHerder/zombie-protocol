import React, { useMemo, useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import axios from "axios";

import { useWallet } from 'use-wallet'

import numeral from 'numeral'

// import TVL frsom './TVL';
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'

import { getDisplayBalance } from '../../../utils/formatBalance'
import BigNumber from 'bignumber.js'


import useYam from '../../../hooks/useYam'

import {
  current_zom_value,
  current_Dai_value,
  current_DaiStaked_value,
  current_UserDaiStaked_value,
  current_UserDaiEarned_value,
  current_DaiAPY,
  log_data,
  log_data2
} from '../../../yamUtils'

interface StatsProps {
  circSupply?: string,
  curPrice?: number,
  targetPrice?: number,
  totalSupply?: string
}

const Stats: React.FC<StatsProps> = ({
  circSupply,
  curPrice,
  targetPrice,
  totalSupply,
}) => {
  const [currentPrice, setCurrentPrice] = useState(new Number)
  const [circulating, setcirculating] = useState(new Number)
  const [totalTokenPrice, setTotalTokenPrice] = useState(0)
  const [totalDai, setTotalDai] = useState(0)
  const [totalDaiStaked, setTotalDaiStaked] = useState(0)
  const [userStakedDai, setUserStakedDai] = useState(0)
  const [userEarnedDai, setUserEarnedDai] = useState(0)
  const [total, setTotal] = useState(0)
  const [totalwrapped, settotalwrapped] = useState(0)
  const [totalDaiwrapped, settotalDaiwrapped] = useState(0)

  const [currentstatPrice, setCurrentstatPrice] = useState(new Number)

  const formattedTotalSupply = useMemo(() => {
    if (totalSupply) {
      const supplyStr = getDisplayBalance(new BigNumber(totalSupply))
      return numeral(supplyStr).format('0.0a')
    } else return '--'
  }, [totalSupply])

  const yam = useYam()

  const { account, ethereum } = useWallet()


  const circulation = useCallback(() => {
    const now_time = Date.now();
    const now_timestamp = now_time / 1000
    if (now_timestamp < 1598529600) {
      var total_reveal_percent = (now_timestamp - 1598270400) * 2 / (60 * 60 * 24 * 73)
      setcirculating(Number(total_reveal_percent))
    } else if (now_timestamp < 1604318400) {
      var total_reveal_percent = ((1598529600 - 1598270400) * 2 + (now_timestamp - 1598529600)) / (60 * 60 * 24 * 73)
      setcirculating(Number(total_reveal_percent))
    } else {
      var total_reveal_percent = 306760
      setcirculating(Number(total_reveal_percent))
    }
  }, [setcirculating])

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=Cethereum%2Czombie-finance&vs_currencies=usd').then((res) => {
      if (res.status === 200) {
        setCurrentPrice(Number(res.data['zombie-finance'].usd))
      }
      circulation()
    })
  }, [setCurrentPrice])

  return (
    <StyledStats>
      <Card>
        <CardContent>
          <StyledStat>
            <StyledValue>{Number(currentPrice).toLocaleString()}</StyledValue>
            {/* <StyledValue>--</StyledValue> */}
            <Label text="Current Price" />
          </StyledStat>
        </CardContent>
      </Card>

      <StyledSpacer />

      {/* <Card>
        <CardContent>
          <StyledStat>
              <TVL/>
            <Label text="Total Locked Value" />
          </StyledStat>
        </CardContent>
      </Card> */}

      <StyledSpacer />

      <Card>
        <CardContent>
          <StyledStat>
            <StyledValue>
              {Number(circulating) === 306760 ?
                <>
                  306,760
              <br />
              100%
              </>
                :
                <>
                  {(306760 * Number(circulating)).toFixed(2)} <span style={{ fontSize: "14px" }}>({(Number(circulating) * 100).toFixed(2)}%)</span>
                </>
              }
            </StyledValue>
            <Label text="Total Circulating Supply" />
          </StyledStat>
        </CardContent>
      </Card>

      <StyledSpacer />

      <Card>
        <CardContent>
          <StyledStat>
            <StyledValue>
              306,780
            </StyledValue>
            <Label text="Total Supply" />
          </StyledStat>
        </CardContent>
      </Card>


    </StyledStats>
  )
}

const StyledStats = styled.div`
  width: 325px;
`

const StyledStat = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledValue = styled.span`
  color: ${props => props.theme.color.grey[600]};
  font-size: 36px;
  font-weight: 700;
`

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
`

export default Stats