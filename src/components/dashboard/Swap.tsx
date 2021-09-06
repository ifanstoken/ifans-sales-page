import { useState, useCallback } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import useIFans from '../../hooks/useIFans';

const Swap = () => {
  const iFans = useIFans();
  const [swapAmount, setSwapAmount] = useState(0);
  const [swapBaseRequested, setSwapBaseRequested] = useState<boolean>(false);
  const [swapQuoteRequested, setSwapQuoteRequested] = useState<boolean>(false);
  
  const handleSwapAmountChange = (e) => {
    setSwapAmount(e.target.value);
  }

  //TODO
  const handleBuy = useCallback(async () => {
    if (isNaN(swapAmount) || Number(swapAmount) <= 0) {
      NotificationManager.error("Invalid Amount");
      return;
    }

    setSwapQuoteRequested(true);
    const txHash = await iFans?.swapQuote(swapAmount);
    setSwapQuoteRequested(false);
    if (!txHash) {
      NotificationManager.error('Swap Error');
      return;
    }
    setSwapAmount(0);
    NotificationManager.success(`${swapAmount} USDC Bought`, 'Swap Success');
  }, [swapAmount, iFans])

  const handleSell = useCallback(async () => {
    if (isNaN(swapAmount) || Number(swapAmount) <= 0) {
      NotificationManager.error("Invalid Amount");
      return;
    }

    setSwapBaseRequested(true);
    const txHash = await iFans?.swapBase(swapAmount);
    setSwapBaseRequested(false);
    if (!txHash) {
      NotificationManager.error('Swap Error');
      return;
    }
    setSwapAmount(0);
    NotificationManager.success(`${swapAmount} USDC Sold`, 'Swap Success');

  }, [swapAmount, iFans])


  return (
    <Card>
      <Card.Header>{`Swap (USDC : USDT)`}</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control type="email" placeholder="Enter amount" value={swapAmount} onChange={handleSwapAmountChange} />
          </Form.Group>
          <div className="mt-3 swap-button-group">
            <Button
              variant="secondary"
              className="me-3"
              onClick={handleBuy}
              disabled={swapBaseRequested || swapQuoteRequested}
            >
              {swapQuoteRequested?"Swaping...":"Buy"}
            </Button>
            <Button 
              variant="secondary" 
              className="me-3" 
              onClick={handleSell} 
              disabled={swapBaseRequested || swapQuoteRequested}
            >
              {swapBaseRequested?"Swaping...":"Sell"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default Swap;