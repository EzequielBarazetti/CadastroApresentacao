
import React from "react";  
import {Switch, Route} from 'react-router-dom'
import Forms from "./components/Forms";

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route  path="/" exact component={Forms} />
        </Switch>
    )
}
export default Routes