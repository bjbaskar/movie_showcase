import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { Avatar, Divider, Icon, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

const styles = theme => ({
    listItem: {
        color: 'inherit!important',
        textDecoration: 'none!important',
        height: 40,
        width: 'calc(100% - 16px)',
        borderRadius: '0 20px 20px 0',
        paddingLeft: 24,
        paddingRight: 12,
        '&.active': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText + '!important',
            pointerEvents: 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        }
    }
});

class MoviesSidebarContent extends Component {

    render() {
        const { classes, user } = this.props;
        return (
            <div className="p-16 lg:p-24 lg:pr-4">
                <Paper elevation={1} className="rounded-8">
                    <div className="p-24 flex items-center">
                        <Typography>Movie Selection</Typography>
                    </div>
                    <Divider />
                    <List>
                        <ListItem
                            button
                            component={NavLink}
                            to={'/apps/movies/photos'}
                            activeClassName="active"
                            className={classes.listItem}
                        >
                            <Icon className="list-item-icon text-16" color="action">restore</Icon>
                            <ListItemText className="truncate pr-0" primary="Trending Movies" disableTypography={true} />
                        </ListItem>

                        <ListItem
                            button
                            component={NavLink}
                            to={'/apps/movies/all'}
                            activeClassName="active"
                            className={classes.listItem}
                        >
                            <Icon className="list-item-icon text-16" color="action">people</Icon>
                            <ListItemText className="truncate pr-0" primary="Popular Movies" disableTypography={true} />
                        </ListItem>

                        <ListItem
                            button
                            className={classes.listItem}
                        >
                            <Icon className="list-item-icon text-16" color="action">restore</Icon>
                            <ListItemText className="truncate pr-0" primary="Some Test Link2" disableTypography={true} />
                        </ListItem>
                    </List>
                </Paper>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({ MovieApp }) {
    return {
        user: {}
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(MoviesSidebarContent)));
