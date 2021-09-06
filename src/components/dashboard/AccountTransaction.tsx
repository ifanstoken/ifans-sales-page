
import { Currency } from 'blockchain/types/Currency';
import CurrencyInput from 'components/CurrencyInput';
import useCurrencies from 'hooks/useCurrencies';
import useIFans from 'hooks/useIFans';
import { useEffect } from 'react';
import { useState, useCallback } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';

const AccountTransaction = () => {
  const [amount, setAmount] = useState(0);
  const { defaultCurrency } = useCurrencies();
  const [currency, setCurrency] = useState<Currency|null>(null);
  const [allowance, setAllowance] = useState<Number>(0);
  const [approveRequested, setApproveRequested] = useState<boolean>(false);
  const [depositRequested, setDepositRequested] = useState<boolean>(false);
  const [withdrawRequested, setWithdrawRequested] = useState<boolean>(false);
  const iFans = useIFans();

  useEffect(() => {
    if (!currency && defaultCurrency)
      setCurrency(defaultCurrency);
  }, [currency, defaultCurrency]);
  
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  }

  useEffect(() => {
    if (iFans !== null && currency !== null) {
      iFans.getAllowance(currency)
        .then(_allowance => {
          setAllowance(_allowance);
        })
        .catch(e => {
          console.log("getAllowance() error:", e);
        })
    }
  }, [iFans, currency, approveRequested])

  const handleDeposit = useCallback(async () => {
    if (isNaN(amount) || Number(amount) <= 0) {
      NotificationManager.error("Invalid Amount");
      return;
    }

    if (currency === null) {
      NotificationManager.error("Select a currency");
      return;
    }

    setDepositRequested(true);
    const txHash = await iFans?.deposit(amount, currency);
    setDepositRequested(false);
    if (!txHash) {
      NotificationManager.error('Deposit Error');
      return;
    }

    setAmount(0);
    NotificationManager.success(`${amount} ${currency.symbol} deposited`, 'Deposit Success');

  }, [amount, currency, iFans])

  const handleWithdraw = useCallback(async () => {
    if (isNaN(amount) || Number(amount) <= 0) {
      NotificationManager.error("Invalid Amount");
      return;
    }

    if (currency === null) {
      NotificationManager.error("Select a currency");
      return;
    }

    setWithdrawRequested(true);
    const txHash = await iFans?.withdraw(amount, currency);
    setWithdrawRequested(false);
    if (!txHash) {
      NotificationManager.error('Withdraw Error');
      return;
    }

    setAmount(0);
    NotificationManager.success(`${amount} ${currency.symbol} withdraw`, 'Withdrawal Success');

  }, [amount, currency, iFans])
  
  const handleApprove = useCallback(async () => {

    if (currency === null) {
      NotificationManager.error("Select a currency");
      return;
    }

    setApproveRequested(true);
    const txHash = await iFans?.approve(currency);
    setApproveRequested(false);
    if (!txHash) {
      NotificationManager.error('Approval Error');
      return;
    }

    setAmount(0);
    NotificationManager.success(`${currency.symbol} approved`, 'Approval Success');

  }, [currency, iFans])

  return (
    <Card>
      <Card.Header>Deposit &amp; Withdraw</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="my-2">
            <CurrencyInput
              currency={ currency }
              onCurrencySelect={setCurrency}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" placeholder="Enter amount" value={amount} onChange={handleAmountChange} disabled={allowance <= 0} />
          </Form.Group>
          {
            allowance > 0 ?
              <Form.Group className="mt-3 swap-button-group">
                <Button 
                  variant="secondary" 
                  className="me-3" 
                  onClick={handleDeposit} 
                  disabled={depositRequested || withdrawRequested}
                >
                  {depositRequested?"Depositing...":"Deposit"}
                </Button>
                <Button 
                  variant="secondary" 
                  className="me-3" 
                  onClick={handleWithdraw} 
                  disabled={depositRequested || withdrawRequested}
                >
                  {withdrawRequested?"Withdrawing...":"Withdraw"}
                </Button>
              </Form.Group>
            :
              <Form.Group className="mt-3 swap-button-group">
                <Button 
                  variant="secondary"
                  onClick={handleApprove} 
                  disabled={approveRequested}
                >
                  {approveRequested?"Approving...":"Approve"}
                </Button>
              </Form.Group>
          }
          
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AccountTransaction;