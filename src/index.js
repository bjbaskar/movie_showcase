import 'babel-polyfill'
import 'typeface-muli';
import React from 'react';
import ReactDOM from 'react-dom';
import history from './history';
import './styles/index.css';
import './react-table-defaults';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { routes } from './baseconfigs/baseRoutesConfig';
import { BaseLayout, BaseTheme } from '@basecomponent';
import MainToolbar from './main/MainToolbar';

import MainFooter from './main/MainFooter';
import jssExtend from 'jss-extend'
import store from 'store';

const jss = create({
    ...jssPreset(),
    plugins: [...jssPreset().plugins, jssExtend()]
});

jss.options.insertionPoint = document.getElementById('jss-insertion-point');
const generateClassName = createGenerateClassName();

ReactDOM.render(
    <JssProvider jss={jss} generateClassName={generateClassName}>
        <Provider store={store}>

            <Router history={history}>

                <BaseTheme>
                    <BaseLayout
                        routes={routes}
                        toolbar={
                            <MainToolbar />
                        }

                    // footer={
                    //     <MainFooter />
                    // }

                    >
                    </BaseLayout>
                </BaseTheme>
            </Router>

        </Provider>
    </JssProvider>
    , document.getElementById('root'));

registerServiceWorker();
