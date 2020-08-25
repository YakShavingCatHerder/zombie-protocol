import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink href="https://github.com/Zombie-Finance/zombie-protocol">Github</StyledLink>
      <StyledLink href="https://twitter.com/ZombieFinance">Twitter</StyledLink>
      <StyledLink href="https://t.me/defizombie">Telegram</StyledLink>
      {/* <StyledLink href="https://www.coingecko.com/en/coins/shrimp-finance">Coingecko</StyledLink>*/}
      <StyledLink href="https://app.uniswap.org/#/swap?inputCurrency=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&outputCurrency=0xd55BD2C12B30075b325Bc35aEf0B46363B3818f8">Uniswap</StyledLink> 
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