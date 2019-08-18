import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { BaseUtils } from '@basecomponent';
import { Avatar, Typography } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import _ from '@lodash';
import classNames from 'classnames';
import withReducer from 'store/withReducer';
import reducer from './store/reducers';
import { BasePageSimple, BaseAnimate } from '@basecomponent';
import MoviesHeader from './MovieHeader';
import MoviesSidebarContent from './MovieSidebarContent';
import { URL_IMG, IMG_SIZE_LARGE } from './constants';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import CastDetails from './CastDetails';

const styles = theme => ({
    mailList: {
        padding: 0
    },
    mailItem: {},
    avatar: {
        backgroundColor: theme.palette.primary[500]
    },
    labels: {},
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        margin: 'auto',
    },
});

class MovieDetails extends Component {

    state = {
        overview: '',
        release_date: '',
        title: '',
        runtime: '',
        poster_path: '',
        loading: true
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return BaseUtils.filterArrayByString(arr, searchText);
    };

    componentDidMount() {
        const s_param = this.props.match.params;
        this.props.getMovieDetails(s_param);
        this.props.getCastDetails(s_param);
        this.setState({ loading: false })
    }

    componentWillReceiveProps(nextProps) {
        const id = nextProps.match.params.id;
        const s_param = nextProps.match.params;
        if (!_.isEqual(this.props.match.params.id, id)) {
            this.props.getMovieDetails(s_param);
            this.props.getCastDetails(s_param);
            this.setState({ loading: false })
        }
    }

    componentWillUnmount() {
        this.setState({ loading: true })
    }

    render() {
        const { classes, movies, casts, apiCallsInProgress } = this.props;
        const { loading } = this.state;

        const data = {
            overview: movies.overview,
            release_date: movies.release_date,
            title: movies.title,
            runtime: movies.runtime,
            poster_path: movies.poster_path,
            budget: movies.budget
        }

        // if (apiCallsInProgress > 0) {
        //     return (
        //         <Typography color="textSecondary" variant="h5">
        //             Loading...
        //         </Typography>
        //     );
        // }

        if (!movies && movies.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no movie!
                    </Typography>
                </div>
            );
        }

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
                        <div className={classes.root}>
                            <Paper className={classes.paper}>

                                {apiCallsInProgress > 0 &&
                                    <Typography color="textSecondary" variant="h5">
                                        Loading...
                                    </Typography>
                                }

                                <Grid container spacing={16}>
                                    <Grid item>
                                        <ButtonBase className={classes.image}>
                                            <img className={classes.img} width="342"
                                                src={data.poster_path == null ? '/movie_showcase/assets/defaultpic.svg' : URL_IMG + IMG_SIZE_LARGE + data.poster_path}
                                                alt={data.title}
                                            />
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={16}>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="h2">
                                                    {data.title}
                                                </Typography>
                                                <Typography gutterBottom variant="subtitle1">
                                                    {data.overview}
                                                </Typography>
                                                <Typography color="textSecondary">
                                                    Release Date: {data.release_date}
                                                </Typography>
                                                <Typography color="textSecondary" variant="h3" className="pt-24">
                                                    Casts
                                                </Typography>
                                                <CastDetails dataCasts={casts} />
                                            </Grid>
                                            <Grid item>
                                                <Typography style={{ cursor: 'pointer' }}> Budget: {data.budget}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1">Runtime: {data.runtime} mins</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </div>

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
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getMovieDetails: Actions.getMovieDetails,
        getCastDetails: Actions.getCastDetails
    }, dispatch);
}

function mapStateToProps({ MovieApp }) {

    return {
        movies: MovieApp.moviesReducer.movies,
        casts: MovieApp.moviesReducer.casts,
        apiCallsInProgress: MovieApp.apiReducer.apiCallsInProgress
    }
}

export default withReducer('MovieApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieDetails))));
