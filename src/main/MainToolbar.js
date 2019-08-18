import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
    seperator: {
        width: 1,
        height: 64,
        backgroundColor: theme.palette.divider
    }
});

class MainToolbar extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classNames(classes.root, "flex flex-row")}>

                <div className="flex flex-1 px-24">
                    <Typography>Movie Showcase </Typography>
                </div>

            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        toggleQuickPanel: {}
    }, dispatch);
}

export default withStyles(styles, { withTheme: true })(connect(null, mapDispatchToProps)(MainToolbar));
