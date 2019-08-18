import React from 'react';
import { Redirect } from 'react-router-dom';
import MovieApp from "./MovieApp";
import MovieDetails from "./MovieDetails";
import CastInfo from "./CastInfo";
import MoviePhotoList from './MoviePhotoList';

export const MovieAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/apps/movies/:id',
            component: MovieApp
        },
        {
            path: '/apps/movies',
            component: () => <Redirect to="/apps/movies/photos/list" />
        },
        {
            path: '/apps/moviesdetails/:id',
            component: MovieDetails
        },
        {
            path: '/apps/castinfo/:id',
            component: CastInfo
        },
        {
            path: '/apps/movies/photos/list',
            component: MoviePhotoList
        },
    ]
};
