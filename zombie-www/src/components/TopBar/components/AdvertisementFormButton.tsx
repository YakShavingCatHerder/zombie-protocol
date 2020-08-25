import React, { useMemo } from 'react'
import styled from 'styled-components'

import { useWallet } from 'use-wallet'

import useModal from '../../../hooks/useModal'
import { formatAddress } from '../../../utils'

import Button from '../../Button'

import AdvertisementFormModal from './AdvertisementFormModal'

interface AccountButtonProps {}

const AdvertisementFormButton: React.FC<AccountButtonProps> = (props) => {
  const [onPresentAccountModal] = useModal(<AdvertisementFormModal />)
  
  const { account, connect } = useWallet()

  return (
    <StyledAccountButton>
      {!account ? (
        <Button
          onClick={() => connect('injected')}
          size="md"
          text="Unlock Wallet"
        />
      ) : (
        ''
      )}
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div``

export default AdvertisementFormButton