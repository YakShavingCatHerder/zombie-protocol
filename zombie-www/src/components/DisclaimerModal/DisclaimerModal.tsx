import React, { useCallback, useState, useMemo } from 'react'

import Button from '../Button'
import CardIcon from '../CardIcon'
import Modal, { ModalProps } from '..//Modal'
import ModalActions from '..//ModalActions'
import ModalTitle from '..//ModalTitle'

interface DisclaimerModal extends ModalProps {
  onConfirm: () => void
}

const DisclaimerModal: React.FC<DisclaimerModal> = ({ onConfirm, onDismiss }) => {

  const [step, setStep] = useState('disclaimer')

  const handleConfirm = useCallback(() => {
    onConfirm()
    onDismiss()
  }, [onConfirm, onDismiss])

  const modalContent = useMemo(() => {
    if (step === 'disclaimer') {
      return (
        <div>
          <p>Audits: None. (This project is in beta. Use at your own risk.)</p>
          <p>🔥 The army of zombies is coming!<br/><br/>

          🚨Fake zombie coin alert<br/>
          　　0x0c93637a42680e8f76bea2bb230ea4fd32a90b96(Fake)<br/>
          <span style={{fontWeight: "bold"}}>　　ZOMBIE/ETH in Uniswap pair is fake!</span><br/><br/>

          　　Real zombie erc20 address: <br/>　　0xd55BD2C12B30075b325Bc35aEf0B46363B3818f8(Real)<br/><br/>

          🙌 Be mindful that zombies are by your side!</p>
        </div>
      )
    } else {
      return (
        <div>
          <p>Attention ZOMBIE Uniswap LPs</p>
          <p>The only Uniswap pool that is compatible with ZOMBIE is ZOMBIE/WETH</p>
          <p>Providing liquidity for other Uniswap pools is dangerous</p>
        </div>
      )
    }
  }, [step])

  const button = useMemo(() => {
    if (step === 'disclaimer') {
      // return (
      //   <Button text="Next" variant="secondary" onClick={() => setStep('uniswap')} />
      // )
      return (
        <Button text="I understand" onClick={handleConfirm} />
      )
    } else {
      return (
        <Button text="I understand" onClick={handleConfirm} />
      )
    }
  }, [setStep, step, handleConfirm])

  return (
    <Modal>
      <ModalTitle text={`Warning`} />
      <CardIcon>⚠️</CardIcon>
      {modalContent}
      <ModalActions>
        {button}
      </ModalActions>
    </Modal>
  )
}


export default DisclaimerModal