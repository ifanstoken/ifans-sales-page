import "./scss/App.scss";
import 'react-notifications/lib/notifications.css';
import Route from "./route/index";
import Web3ModalProvider from "contexts/Web3ModalProvider";
import Web3WrapperProvider from "contexts/Web3WrapperProvider";
import { NotificationContainer } from 'react-notifications';

const App = () => {

  return (
    <Providers>
      <Route />
      <NotificationContainer />
    </Providers>
  );
}

const Providers = (props) => {
  return (
    <Web3ModalProvider>
      <Web3WrapperProvider>
        {props.children}
      </Web3WrapperProvider>
    </Web3ModalProvider>
  )
}

export default App;
