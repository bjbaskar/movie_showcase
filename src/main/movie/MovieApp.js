import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BasePageSimple, BaseAnimate } from '@basecomponent';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from './store/actions';
import MoviesList from './MovieList';
import MoviesHeader from './MovieHeader';
import MoviesSidebarContent from './MovieSidebarContent';
import _ from '@lodash';
import { Fab, Icon } from '@material-ui/core';
import withReducer from 'store/withReducer';
import reducer from './store/reducers';
import MoviePhotoList from './MoviePhotoList';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        zIndex: 99
    }
});

class MovieApp extends Component {

    componentDidMount() {
        this.props.getMovies(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.location, prevProps.location)) {
            this.props.getMovies(this.props.match.params);
        }
    }

    render() {
        const { classes } = this.props;
        const paramId = this.props.match.params.id;

        return (
            <React.Fragment>
                <BasePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                        leftSidebar: "w-256",
                        header: "min-h-42 h-42 sm:h-106 sm:min-h-106"
                    }}
                    header={
                        <MoviesHeader pageLayout={() => this.pageLayout} />
                    }
                    content={
                        paramId === 'photos' ? <MoviePhotoList /> : <MoviesList />
                    }
                    leftSidebarContent={
                        <MoviesSidebarContent />
                    }
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />

            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getMovies: Actions.getMovies
    }, dispatch);
}

function mapStateToProps({ MovieApp }) {
    return {
        Movies: MovieApp.moviesReducer.entities,
        selectedMovieIds: MovieApp.moviesReducer.selectedMovieIds,
        searchText: MovieApp.moviesReducer.searchText,
        user: MovieApp.user
    }
}

export default withReducer('MovieApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieApp))));
