import "./scss/App.scss";
import Route from "./route/index";
import Web3ModalProvider from "contexts/Web3ModalProvider";
import Web3WrapperProvider from "contexts/Web3WrapperProvider";

const App = () => {
  return (
    <Providers>
      <Route />
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
