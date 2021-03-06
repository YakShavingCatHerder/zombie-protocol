import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Countdown, { CountdownRenderProps } from 'react-countdown'

import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'

import useFarms from '../../../hooks/useFarms'

import { Farm } from '../../../contexts/Farms'

import { getPoolStartTime } from '../../../yamUtils'

const WorldCards: React.FC = () => {
  const [farms] = useFarms()

  const rows = farms.reduce<Farm[][]>((farmRows, farm) => {
    const newFarmRows = [...farmRows]
    if (newFarmRows[newFarmRows.length - 1].length === 3) {
      if(farm.sort === 0 || farm.sort === 1){
        newFarmRows.push([farm])
      }
    } else {
      if(farm.sort === 0 || farm.sort === 1){
      newFarmRows[newFarmRows.length - 1].push(farm)
    }
    }
    return newFarmRows
  }, [[]])

  return (
    <StyledCards>
      {rows.map((farmRow, i) => (
        <StyledRow key={i}>
          {farmRow.map((farm, j) => (
            <React.Fragment key={j}>
              <FarmCard farm={farm} />
              {(j === 0 || j === 1) && <StyledSpacer />}
            </React.Fragment>
          ))}
        </StyledRow>
      ))}
    </StyledCards>
  )
}

interface FarmCardProps {
  farm: Farm,
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
  const [startTime, setStartTime] = useState(0)
  const timeStamp = 1598436000000;
  const getStartTime = useCallback(async () => {
    const startTime = await getPoolStartTime(farm.contract)
    setStartTime(startTime)
  }, [farm, setStartTime])

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const totalhours = days * 24 + hours;
    const paddedHours = totalhours < 10 ? `0${totalhours}` : totalhours
    return (
      <span style={{ width: '100%' }}>{totalhours > 24 ? totalhours : paddedHours}:{paddedMinutes}:{paddedSeconds}</span>
    )
  }

  const poolActive = startTime * 1000 - Date.now() <= 0

  return (
    <>
        <StyledCardWrapper>
          <Card>
            <CardContent>
              <StyledContent>
                <CardIcon>{farm.icon}</CardIcon>
                <StyledTitle>{farm.name}</StyledTitle>
                <StyledDetails>
                {farm.depositToken.toUpperCase() === "CURVE" && <StyledDetail>Deposit CURVE_ZOMBIE_BALANCER_LP</StyledDetail>}
                {farm.depositToken.toUpperCase() === "YFI" && <StyledDetail>Deposit YFI_ZOMBIE_BALANCER_LP</StyledDetail>}
                  <StyledDetail>Earn {farm.earnToken.toUpperCase()}</StyledDetail>
                </StyledDetails>
                <Button
                  disabled={!poolActive}
                  text={poolActive ? 'Select' : undefined}
                  to={`/farms/${farm.id}`}
                >
                  {/* {poolActive && <Countdown date={new Date(timeStamp)} renderer={renderer} />} */}
                </Button>
                <br />
                <StyledDetail>{farm.stats1}
                  <br />
                  {farm.stats2}</StyledDetail>
                  <br/>
                  {farm.id === 'curve' && 
                <StyledLink target="__blank" href="https://pools.balancer.exchange/#/pool/0xda4b031b5ece42abb394a9d2130eaa958c2a8b38/">More Info</StyledLink>
                  }
                  {farm.id === 'yfi' && 
                <StyledLink target="__blank" href="https://pools.balancer.exchange/#/pool/0x1066a453127fad74d0ab1c981dffa56d76310517/">More Info</StyledLink>
                  }
              </StyledContent>
            </CardContent>
          </Card>
        </StyledCardWrapper>
    </>
  )
}

const StyledLink = styled.a`
  color: ${props => props.theme.color.grey[600]};
  text-decoration: none;
  font-weight: 700;
`

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

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing[4]}px;
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${props => props.theme.spacing[4]}px * 2) / 3);
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

export default WorldCards
