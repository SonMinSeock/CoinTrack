import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./Coin";
import Coins from "./Coins";

interface RouterProps {
  mode: boolean;
}

function Router({ mode }: RouterProps) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/:coinId">
          <Coin mode={mode} />
        </Route>
        <Route path="/">
          <Coins mode={mode} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
