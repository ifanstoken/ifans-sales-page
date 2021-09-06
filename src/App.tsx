import './App.css';
import * as utils from './blockchain/utils';
import { Container } from 'react-bootstrap';
import Header from './components/header';
// import Dashboard from 'pages/dashboard';
// import Claim from './pages/claim';
import IDO from 'pages/ido';
import NotFound from 'pages/notfound';
import IFansProvider from './contexts/IFansProvider';
import { UseWalletProvider } from 'use-wallet';
import { NotificationContainer } from 'react-notifications';
import {
  // faExchangeAlt,
  // faTachometerAlt,
  faTint,
} from '@fortawesome/free-solid-svg-icons';
import SideBar from 'components/sidebar';
import { BrowserRouter } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router';


const navs = [
  // { text: 'Swap', icon: faExchangeAlt, to: '/swap', component: Dashboard },
  // { text: 'Claim iFANS', icon: faTachometerAlt, to: '/nrt', component: Claim },
  { text: 'Presale', icon: faTint, to: '/presale', component: IDO }
];

function App() {

  return (
    <Providers>
      <Container className="root-cotainer">
        <Header />
        <div className="main-cotainer">
          <SideBar navItems={navs} />
          <div className="main-content">
            <Switch>
              {
                navs.map((nav) =>
                  <Route key={nav.to} path={nav.to} component={nav.component} exact />
                )
              }
              <Redirect exact from="/" to="/presale" />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Container>
      <NotificationContainer />
    </Providers>
  );
}

const Providers = ({ children }) => {

  const {
    chainId,
    rpcUrl
  } = utils.getEthChainInfo();

  return (
    <BrowserRouter>
      <UseWalletProvider
        chainId={chainId}
        connectors={{
          walletconnect: { rpcUrl }
        }}
      >
        <IFansProvider>
          {children}
        </IFansProvider>
      </UseWalletProvider>
    </BrowserRouter>
  )
}

export default App;
