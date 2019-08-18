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

function CastDetails(props) {
    const { classes, dataCasts } = props;
    const CastView = dataCasts.map(function (cast) {
        if (cast.profile_path != null) {
            return (
                <Grid container spacing={16} key={cast.id}>
                    <Grid item >
                        <ButtonBase className={classes.image}>
                            <Link to={"/apps/castinfo/" + cast.id}>
                                <img className={classes.img} alt={cast.name}
                                    src={cast.profile_path == null ? '/movie_showcase/movie_showcase/assets/defaultpic.svg' : URL_IMG + IMG_SIZE_XSMALL + cast.profile_path}
                                />
                            </Link>
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container>
                            <Grid item xs>
                                <Link to={"/apps/castinfo/" + cast.id}>
                                    <Typography gutterBottom variant="subtitle1">
                                        {cast.name}
                                    </Typography>
                                </Link>
                                <Typography color="textSecondary">Character: {cast.character}</Typography>
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
                {CastView}
            </Paper>
        </div>
    );
}

CastDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    dataCasts: PropTypes.array.isRequired,
};

export default withStyles(styles)(CastDetails);