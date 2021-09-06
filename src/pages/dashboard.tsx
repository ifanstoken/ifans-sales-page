
import { Card, Container, Row } from 'react-bootstrap';
import useBalances from '../hooks/useBalances';
import useStablePool from '../hooks/useStablePool';
import Swap from '../components/dashboard/Swap';
import AccountTransaction from '../components/dashboard/AccountTransaction';
import useIFans from 'hooks/useIFans';
import { addresses } from 'blockchain/constants';

const Dashboard = () => {

  const balances = useBalances();
  const stablePool = useStablePool();
  const ifans = useIFans();

  return (
    <Container className="dashboard">
      <Row>
        <Card>
          <Card.Header>Account Balances</Card.Header>
          <Card.Body>
            <table className="balance-table">
              <tbody>
                <tr><td>BNB</td><td>{balances?.bnb}</td></tr>
                <tr><td>USDC</td><td>{balances?.usdc}</td></tr>
                <tr><td>USDT</td><td>{balances?.usdt}</td></tr>
                <tr><td>BUSD</td><td>{balances?.busd}</td></tr>
                <tr><td>LP Shares</td><td>{balances?.lpShare}</td></tr>
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Row>
      <Row className="mt-3">
        <Card>
          <Card.Header>Pool Balacnes</Card.Header>
          <Card.Body>
            <table className="pool-table">
              <tbody>
                <tr><td>BNB Balance</td><td>{stablePool?.bnb}</td></tr>
                <tr><td>USDT Balance</td><td>{stablePool?.usdt}</td></tr>
                <tr><td>USDC Balance</td><td>{stablePool?.usdc}</td></tr>
                <tr><td>BUSD Balance</td><td>{stablePool?.busd}</td></tr>
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Row>
      <Row className="mt-3">
        <Swap />
      </Row>
      <Row className="mt-3">
        <AccountTransaction />
      </Row>
      <Row className="mt-3">
        <Card>
          <Card.Header>Additional Info</Card.Header>
          <Card.Body>
            <table className="info-table">
              <tbody>
                <tr><td>Network Id</td><td>{ifans?.chainId}</td></tr>
                <tr><td>Pool Address</td><td>{ifans && addresses.pool[ifans.chainId]}</td></tr>
                <tr><td>Pool LP Shares</td><td>{ifans && addresses.lpShare[ifans.chainId]}</td></tr>
                <tr><td>BUSD Address</td><td>{ifans && addresses.busd[ifans.chainId]}</td></tr>
                <tr><td>USDT Address</td><td>{ifans && addresses.usdt[ifans.chainId]}</td></tr>
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )
}

export default Dashboard;