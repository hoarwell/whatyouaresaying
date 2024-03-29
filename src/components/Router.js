import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Home';

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path = "/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default AppRouter;