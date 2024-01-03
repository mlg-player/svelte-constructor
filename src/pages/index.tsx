import { Route, Switch } from "wouter";
import MainPage from "./HomePage";

const Pages = () => {
  return (
    <Switch>
      <Route path="/" component={MainPage} />
    </Switch>
  );
};

export default Pages;
