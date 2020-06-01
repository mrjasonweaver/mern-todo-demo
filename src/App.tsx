import * as React from 'react';
import { HashRouter as Router, Route, Switch, useLocation, Redirect } from "react-router-dom";
import { NotFound  } from '~/components/NotFound';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { Hi } from '~/components/Hi';

export class App extends React.Component {
  public render() {
    return (
      <div>
        <Header />
        <Router basename='/'>
            <Route path="*">
              <AnimationApp />
            </Route>
        </Router>
        <Footer />
      </div>
    )
  }
}

function AnimationApp() {
  let location = useLocation();

  return (
    <div style={styles.fill} className="main">
      <TransitionGroup style={styles.content}>
        <CSSTransition
          key={location.pathname}
          classNames="fade"
          timeout={300}
        >
          <Switch location={location}>
            <Route exact path="/">
              <Redirect to="/hi" />
            </Route>
            <Route path="/hi">
              <Hi />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

const styles = { content: {}, fill: {}};

styles.fill = {
  position: "relative",
};

styles.content = {
};