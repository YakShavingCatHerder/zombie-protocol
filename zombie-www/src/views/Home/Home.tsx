import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { useWallet } from 'use-wallet'

import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'

import useYam from '../../hooks/useYam'

// import Rebase from './components/Rebase'
import Stats from './components/Stats'
// import Vote from './components/Vote'

import { OverviewData } from './types'
import { getStats } from './utils'

import {current_zom_value} from '../../yamUtils/index';

const Home: React.FC = () => {

  const { account, ethereum } = useWallet()

  const yam = useYam()
  const [{
    circSupply,
    curPrice,
    targetPrice,
    totalSupply,
  }, setStats] = useState<OverviewData>({})
  const fetchStats = useCallback(async () => {
    const statsData = await getStats(yam)
    setStats(statsData)
  }, [yam, setStats])

  const checkPrice = useCallback(async () => {
    console.log(ethereum)
    console.log(1)
    await current_zom_value(ethereum)
  }, [ethereum, current_zom_value])

  useEffect(() => {
    if (yam) {
      fetchStats()
      checkPrice()
    }
  }, [yam])
  return (
    <Page>
      <PageHeader icon="aa" subtitle="Zombies ahead, survive if you can!" title="Welcome" />
      <div>
        
        <StyledSpacer />
        <StyledOverview>
          <Stats
            circSupply={circSupply}
            curPrice={curPrice}
            targetPrice={targetPrice}
            totalSupply={totalSupply}
          />
        </StyledOverview>
      </div>
    </Page>
  )
}

const StyledOverview = styled.div`
  align-items: center;
  display: flex;
`

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  width: ${props => props.theme.spacing[4]}px;
`

const StyledVote = styled.div`
  width: 100%;
`

export default Home