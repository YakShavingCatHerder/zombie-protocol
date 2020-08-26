import React, { useMemo } from 'react'
import styled from 'styled-components'

import { useParams } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import Page from '../../components/Page'

import Button from '../../components/Button'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'

import useFarm from '../../hooks/useFarm'
import useRedeem from '../../hooks/useRedeem'
import { getContract } from '../../utils/erc20'

import Harvest from './components/Harvest'
import Stake from './components/Stake'

const Farm: React.FC = () => {
  const { farmId } = useParams()

  const {
    contract,
    depositToken,
    depositTokenAddress,
    earnToken,
    name,
    icon,
  } = useFarm(farmId) || {
    depositToken: '',
    depositTokenAddress: '',
    earnToken: '',
    name: '',
    icon: ''
  }

  const { ethereum } = useWallet()

  const tokenContract = useMemo(() => {
    return getContract(ethereum as provider, depositTokenAddress)
  }, [ethereum, depositTokenAddress])

  const { onRedeem } = useRedeem(contract)

  const depositTokenName = useMemo(() => {
    return depositToken.toUpperCase()
  }, [depositToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])

  return (
    <Page>
      {depositTokenName === 'CURVE' &&
      <PageHeader
        icon={icon}
        subtitle={`Deposit CURVE_ZOMBIE_BALANCER_LP and earn ${earnTokenName}`}
        title={name}
      />}
      {depositTokenName === 'YFI' &&
      <PageHeader
        icon={icon}
        subtitle={`Deposit YFI_ZOMBIE_BALANCER_LP and earn ${earnTokenName}`}
        title={name}
      />}
      {depositTokenName !== 'CURVE' && depositTokenName !== 'YFI' ?
      <PageHeader
        icon={icon}
        subtitle={`Deposit ${depositTokenName} and earn ${earnTokenName}`}
        title={name}
      />
    :
    ''}
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest poolContract={contract} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake
              poolContract={contract}
              tokenContract={tokenContract}
              tokenName={depositToken.toUpperCase()}
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        <div>
          <Button
            onClick={onRedeem}
            text="Harvest & Withdraw"
          />
        </div>
        <Spacer size="lg" />
      </StyledFarm>
    </Page>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

export default Farm
