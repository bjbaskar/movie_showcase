import React from 'react';
import { Redirect } from 'react-router-dom';
import { BaseUtils } from '@basecomponent/index';
import { MovieAppConfig } from 'main/movie/MovieAppConfig';

const routeConfigs = [
    MovieAppConfig
];

export const routes = [
    ...BaseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path: '/',
        component: () => <Redirect to="/apps/movies" />
    }
];
