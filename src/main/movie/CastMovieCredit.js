import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { URL_IMG, IMG_SIZE_XSMALL } from './constants';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        margin: 'auto',
        // maxWidth: 500,
    },
    image: {
        // width: 128,
        // height: 128,
    },
    img: {
        // margin: 'auto',
        // display: 'block',
        // maxWidth: '100%',
        // maxHeight: '100%',
    },
});

function CastMovieCredit(props) {
    const { classes, castMovieInfo } = props;
    const alternatingColor = ['#EDEDED', '#f8fafc'];
    const CastMovieView = castMovieInfo.map(function (movieInfo, index) {
        let overview = movieInfo.overview;
        if (overview.length > 0) {
            overview = overview.substring(0, 150);
        }
        let bgColor = alternatingColor[index % alternatingColor.length];

        if (movieInfo.id != null) {
            return (
                <Grid container spacing={16} key={index}
                    className="pt-16 pb-16"
                    style={{ backgroundColor: bgColor }}>
                    <Grid item >
                        <ButtonBase className={classes.image}>
                            <Link to={"/apps/moviesdetails/" + movieInfo.id}>
                                <img className={classes.img} alt={movieInfo.title} width='45px'
                                    src={movieInfo.poster_path == null ? '/movie_showcase/assets/defaultpic.svg' : URL_IMG + IMG_SIZE_XSMALL + movieInfo.poster_path}
                                />
                            </Link>
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container>
                            <Grid item xs>
                                <Typography color="textSecondary">Movie Title: {movieInfo.title}</Typography>
                                <Typography gutterBottom variant="subtitle1">
                                    {overview}<Link to={"/apps/moviesdetails/" + movieInfo.id}> more...</Link>
                                </Typography>
                                <Typography color="textSecondary">Character: {movieInfo.character}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )
        }
    });

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                {CastMovieView}
            </Paper>
        </div>
    );
}

CastMovieCredit.propTypes = {
    classes: PropTypes.object.isRequired,
    castMovieInfo: PropTypes.array.isRequired,
};

export default withStyles(styles)(CastMovieCredit);