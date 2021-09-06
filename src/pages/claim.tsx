import { useCallback, useState } from 'react';
import useIFans from 'hooks/useIFans';
import { Card, Container, Row, Button, Form } from 'react-bootstrap';
import useNrtBalances from '../hooks/nrt/useNrtBalances';
import { NotificationManager } from 'react-notifications';
import { Helmet } from 'react-helmet';
import { useWallet } from 'use-wallet';

const Claim = () => {

  const { account } = useWallet();
  const ifans = useIFans();
  const balances = useNrtBalances();
  const [claimRequested, setClaimRequested] = useState<boolean>(false);

  const handleClaim = useCallback(async () => {
    if (ifans === null || !balances) return;
    setClaimRequested(true);
    const txHash = await ifans?.claim(balances.nrt);
    setClaimRequested(false);
    if (!txHash) {
      NotificationManager.error('Claim Error');
      return;
    }
    NotificationManager.success(`Claim Success: ${balances.nrt} USDT`);
  }, [ifans, balances]);

  return (
    <>
    <Helmet>
      <title>iFans | Claim</title>
    </Helmet>
    <Container className="dashboard">
      {
        account ?
          <Row>
            <Card>
              <Card.Header>iFans NRT</Card.Header>
              <Card.Body>
                {
                  balances?.isWhitelisted?
                    <>
                      <p>Non transferrable tokens (NRT) will convert to tokens at the claim event</p>
                      <table className="nrt-table">
                        <tbody>
                          <tr><td>iFans NRT Balance</td><td>{balances?.nrt}</td></tr>
                          <tr><td>iFans NRT Issued</td><td>{balances?.nrtIssued}</td></tr>
                        </tbody>
                      </table>
                      <Form.Group>
                        {
                          (balances && balances.nrt != 0) &&
                            <Button 
                              className="mt-3" 
                              onClick={handleClaim}
                              disabled={claimRequested}
                            >
                              {claimRequested?"Claiming...":"Claim"}
                            </Button>
                        }
                      </Form.Group>
                    </>
                  :
                    <div>You are not whitelisted.</div>
                }
                
              </Card.Body>
            </Card>
          </Row>
        :
          <div>You should connect your wallet first.</div>
      }
      
    </Container>
    </>
  )
}

export default Claim;