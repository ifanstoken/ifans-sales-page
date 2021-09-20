import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "../pages/landing";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
      </Switch>
    </Router>
  );
}

export default Routes;
