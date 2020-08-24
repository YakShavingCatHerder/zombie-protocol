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

          😵 Please note that due to the large number of zombies: <span style={{fontWeight: "bolder"}}>we adjusted the token distribution period to 10 weeks, the Shrimp pool was switched to Eth-Shrimp LP and the Dice pool was also switched to Eth-Dice LP</span> Please prepare countermeasures as soon as possible!<br/><br/>

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