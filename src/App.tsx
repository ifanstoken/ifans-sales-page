import "./scss/App.scss";
import Route from "./route/index";
import Web3ModalProvider from "contexts/Web3ModalProvider";

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
      {props.children}
    </Web3ModalProvider>
  )
}

export default App;
