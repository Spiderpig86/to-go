import React from 'react';
import Axios from 'axios';
import { Route, Switch, Redirect } from 'react-router-dom';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import './App.css';
import { List } from './pages/list';
import { Main } from './pages/main';

interface CellType {
    cell: {
        value: any;
    };
}

function App() {
    return (
        <div className="App u-flex" css={{
            flexDirection: 'column',
            minHeight: '100vh'
        }}>
            <div>
                <Switch>
                    <Route exact={true} path={'/'} render={(props) => <Main />} />
                    <Route exact={false} path={'/list/:city'} render={(props) => {
                        return(<List cityId={props.match.params.city} />)
                    }} />
                </Switch>
            </div>
            <footer css={{
                marginTop: 'auto'
            }}>
                <div className="u-text-center content">
                    <h3 className="white">2go.</h3>
                    <div
                        className="divider w-50 u-center"
                        css={{
                            margin: '2rem auto',
                        }}
                    ></div>
                    <p>
                        Powered by{' '}
                        <a target="_blank" rel="noopener noref" href="https://spiderpig86.github.io/Cirrus/">
                            Cirrus
                        </a>
                        . Made by your local foodie,{' '}
                        <a target="_blank" rel="noopener noref" href="https://stanleylim.me">
                            🍚 Stanley Lim
                        </a>
                        .
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;
