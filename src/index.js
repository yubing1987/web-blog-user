import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Home from "./component/home/Home";


import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

const SliderComponent = () => (
    <Switch>
        <Route path="/" component={Home}/>
    </Switch>
)

ReactDOM.render((
    <BrowserRouter>
        <SliderComponent />
    </BrowserRouter>

), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
