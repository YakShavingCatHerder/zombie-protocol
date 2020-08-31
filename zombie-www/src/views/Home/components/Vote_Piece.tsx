import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
// import BigNumber from 'bignumber.js'
import Countdown, { CountdownRenderProps } from 'react-countdown'

import { useWallet } from 'use-wallet'

import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'

import useYam from '../../../hooks/useYam'

import {
  getVotes_piece,
  get_y_n_vote,
  get_canVote
} from '../../../yamUtils'

interface VoteProps {
}

const WARNING_TIMESTAMP = 1599012000000

const Voter: React.FC<VoteProps> = () => {
  const [totalVotes, setTotalVotes] = useState(new Number)
  const [circulating, setcirculating] = useState(new Number)
  const [canVote, setCanVote] = useState(true);

  const { account, ethereum } = useWallet()
  const yam = useYam()

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const totalhours = days * 24 + hours;
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <StyledCountdown>{totalhours > 24 ? totalhours : paddedHours}:{paddedMinutes}:{paddedSeconds}</StyledCountdown>
    )
  }

  const getCanVote = useCallback(async () => {
    const canVote = await get_canVote(ethereum, account)
    setCanVote(canVote)
  }, [ethereum, account])

  const y_vote = useCallback(() => {
    get_y_n_vote(ethereum, account)
  }, [ethereum, account])

  const fetchVotes = useCallback(async () => {
    getVotes_piece(ethereum).then(function (data) {
      setTotalVotes(data)
    })
  }, [yam, setTotalVotes])


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
    if (yam) {
      circulation()
      fetchVotes()
      getCanVote()
    }
    const refetch = setInterval(fetchVotes, 10000)
    return () => clearInterval(refetch)
  }, [fetchVotes, yam])


  return (
    <Card>
      <CardContent>
        <div style={{ alignItems: 'flex-start', display: 'flex' }}>
          <StyledCenter>
            <Label text="Time remaining" />
            {Date.now() > WARNING_TIMESTAMP ? (
              <StyledDenominator>{`< 10 minutes`}</StyledDenominator>
            )
              : (
                <Countdown date={WARNING_TIMESTAMP} renderer={renderer} />
              )}
          </StyledCenter>
          <Spacer />
          <StyledCenter>
            <Label text="Votes Placed" />
            <div style={{
              alignItems: 'baseline',
              display: 'flex',
            }}>
              <StyledTitle>
                <div>{"24585.841"}</div>
              </StyledTitle>
              <StyledDenominator>
                <div>{`/ ${(306760 * Number(circulating)).toFixed(2)}`}</div>
              </StyledDenominator>
            </div>
            <br />
            <br />
          </StyledCenter>
        </div>
        <Spacer />
        <StyledCheckpoints>
          <StyledCheckpoint left={((306760 * Number(circulating)) / 2) / (306760 * Number(circulating)) * 100}>
            <StyledCheckpointText left={-50}>
              <div>Proposal Passed</div>
              <div>{((306760 * Number(circulating))/2).toFixed(2)}</div>
            </StyledCheckpointText>
          </StyledCheckpoint>
        </StyledCheckpoints>
        <StyledMeter>
          <StyledMeterInner width={(Math.max(1000) / 1000 * 100) * (24585.841 / (306760 * Number(circulating)))} />
        </StyledMeter>
        <Spacer />
        {!canVote ? <Button text="Yes" onClick={y_vote} /> : <Button disabled={true} text="Thank you for voting" />}
        {/* ) : (
          <div>
            {/* <StyledDelegatedCount>Delegating: {Number(delegatedBalance.multipliedBy(scalingFactor).toFixed(0)).toLocaleString()} YAM</StyledDelegatedCount> 
            <StyledThankYou>Thank you for your vote.</StyledThankYou>
          </div>
        )} */}
        <div style={{
          margin: '0 auto',
          width: 512,
          paddingTop: 24,
          opacity: 0.6,
        }}>
          <p>First and final proposal, </p>
          <p><span style={{fontWeight: "bold"}}>Whether to turn on the doomsday clock earlier or not.</span><br/><br/>
This poll will end on 2020/09/02 10:00:00 (UTC+0). There is no need to unstake when voting, the system will detect that your Zombie tokens are in different pools
<br/><br/>
<span style={{color: "red", fontWeight: "bold"}}>After the vote is passed, we will start the doomsday clock on 2020/09/07 10:00:00 (UTC+0)</span><br/><br/>
As long as more than half of the circulation is voted, we will start DDay!<br/>
How to calculate votes: Zombie, Dai/Zombie Lp, Curve/Zombie Lp, Yfi/Zombie Lp<br/><br/>
*What is <a target="_blank" href="https://github.com/Zombie-Finance/zombie-protocol/wiki/Doomsday-Prophecy---What-is-Doomsday-Clock-and-Debase%3F">DDay</a>?</p>
          {/* <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 32,
          }}>
            <StyledLink target="__blank" href="https://github.com/shrimp-finance/shrimp-protocol/wiki/Shrimp-Declaration-of-Independence">More Info</StyledLink>
          </div> */}
        </div>
        {/* <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 32,
        }}> */}
        {/* below here is a twitter link, we can place a link
             to a twitter announcement here so i have only commented it out for now  */}
        {/* <StyledLink target="__blank" href="https://twitter.com/YamFinance/status/1293660938906869760">More Info</StyledLink> */}
        {/* </div> */}
      </CardContent>
    </Card>
  )
}

const StyledDelegatedCount = styled.div`
  text-align: center;
  font-size: 24px;
  color: ${props => props.theme.color.grey[600]};
  font-weight: 700;
  margin: 0 auto;
`

const StyledThankYou = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.color.secondary.main};
  text-align: center;
  padding: 0 48px;
`

const StyledDenominator = styled.div`
  margin-left: 8px;
  font-size: 18px;
  color: ${props => props.theme.color.grey[600]};
`

const StyledCountdown = styled.div`
  color: ${props => props.theme.color.primary.main};
  font-size: 32px;
  font-weight: 700;
`

const StyledTitle = styled.div`
  font-size: 32px;
  font-weight: 700;
  line-height: 32px;
`

const StyledCheckpoints = styled.div`
  position: relative;
  width: 100%;
  height: 56px;
`

/*
          <StyledCheckpoint left={35500 / METER_TOTAL * 100}>
            <StyledCheckpointText left={-48}>
              <div>Target Proposal</div>
              <div>50,000</div>
            </StyledCheckpointText>
          </StyledCheckpoint>
*/

interface StyledCheckpointProps {
  left: number
}

const StyledCenter = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
`
const StyledCheckpoint = styled.div<StyledCheckpointProps>`
  position: absolute;
  left: ${props => props.left}%;
  &:after {
    content: "";
    position: absolute;
    width: 1px;
    background-color: ${props => props.theme.color.grey[400]};
    height: 28px;
    left: 0;
    top: 40px;
  }
`

const StyledCheckpointText = styled.div<StyledCheckpointProps>`
  position: absolute;
  left: ${props => props.left}px;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  color: ${props => props.theme.color.grey[600]};
  text-align: center;
`

const StyledMeter = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 12px;
  border-radius: 16px;
  width: 100%;
  background-color: ${props => props.theme.color.grey[300]};
  padding: 2px;
`

interface StyledMeterInnerProps {
  width: number
}
const StyledMeterInner = styled.div<StyledMeterInnerProps>`
  height: 100%;
  background-color: ${props => props.theme.color.secondary.main};
  border-radius: 12px;
  width: ${props => props.width}%;
`

const StyledLink = styled.a`
  color: ${props => props.theme.color.grey[600]};
  text-decoration: none;
  font-weight: 700;
`

export default Voter
