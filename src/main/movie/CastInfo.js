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
import CastMovieCredit from './CastMovieCredit';

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
    }
});

class CastInfo extends Component {

    state = {
        overview: '',
        release_date: '',
        title: '',
        runtime: '',
        poster_path: '',
    };

    componentDidMount() {
        this.props.getCastInfo(this.props.match.params);
        this.props.getCastMovieInfo(this.props.match.params);
    }

    componentWillReceiveProps(nextProps) {
        const id = nextProps.match.params.id;
        if (!_.isEqual(this.props.match.params.id, id)) {
            this.props.getCastInfo(nextProps.match.params);
            this.props.getCastMovieInfo(nextProps.match.params);
            // this.setState({ loading: false })
        }
    }

    render() {
        const { classes, castInfo, castMovieInfo } = this.props;
        const data = {
            biography: castInfo.biography,
            gender: castInfo.gender,
            profile_path: castInfo.profile_path,
            birthday: castInfo.birthday,
            name: castInfo.name,
            place_of_birth: castInfo.place_of_birth
        }

        if (!castInfo && castInfo.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no cast info!
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
                                <Grid container spacing={16} direction="row">
                                    <Grid item>
                                        <ButtonBase>
                                            <img alt={data.name}
                                                src={data.profile_path == null ? '/movie_showcase/movie_showcase/assets/defaultpic.svg' : URL_IMG + IMG_SIZE_LARGE + data.profile_path}
                                                ref={img => this.img = img} onError={() => this.img.src = '/movie_showcase/movie_showcase/assets/defaultpic.svg'} />
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={16}>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="h2">
                                                    {data.name}
                                                </Typography>
                                                <Typography gutterBottom variant="subtitle1">
                                                    {data.biography}
                                                </Typography>
                                                <Typography color="textSecondary">
                                                    BirthDay: {data.birthday}
                                                </Typography>
                                                <Typography color="textSecondary">
                                                    Gender: {data.gender == 1 ? 'Female' : 'Male'}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography style={{ cursor: 'pointer' }}> Place of Birth: {data.place_of_birth}</Typography>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Grid>
                                <Typography color="textSecondary" variant="h3" className="pt-24">
                                    Movie Credits
                                </Typography>
                                <CastMovieCredit castMovieInfo={castMovieInfo} />
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
        getCastInfo: Actions.getCastInfo,
        getCastMovieInfo: Actions.getCastMovieInfo
    }, dispatch);
}

function mapStateToProps({ MovieApp }) {
    return {
        castInfo: MovieApp.moviesReducer.castInfo,
        castMovieInfo: MovieApp.moviesReducer.castMovieInfo
    }
}

export default withReducer('MovieApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CastInfo))));
