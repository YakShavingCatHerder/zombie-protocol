import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink target="_blank" href="https://github.com/Zombie-Finance/zombie-protocol">Github</StyledLink>
      <StyledLink target="_blank" href="https://twitter.com/ZombieFinance">Twitter</StyledLink>
      <StyledLink target="_blank" href="https://t.me/defizombie">Telegram</StyledLink>
      <StyledLink target="_blank" href="https://www.coingecko.com/en/coins/zombie-finance">Coingecko</StyledLink>
      <StyledLink target="_blank" href="https://app.uniswap.org/#/swap?inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f&outputCurrency=0xd55bd2c12b30075b325bc35aef0b46363b3818f8">Uniswap</StyledLink> 
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: ${props => props.theme.color.grey[400]};
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.grey[500]};
  }
`

export default Nav