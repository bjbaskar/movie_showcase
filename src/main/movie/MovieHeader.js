import React, { Component } from 'react';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles/index';
import { Hidden, Icon, IconButton, Input, Paper, Typography } from '@material-ui/core';
import * as Actions from './store/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { BaseSelectedTheme } from '@basecomponent';
import SearchBar from './SearchMovie';

const styles = theme => ({
    root: {}
});

class MoviesHeader extends Component {

    render() {
        const { classes, pageLayout } = this.props;
        return (
            <div className={classNames(classes.root, "flex flex-1 items-center justify-between p-8 sm:p-24")}>

                <div className="flex flex-shrink items-center sm:w-224">
                    <Hidden lgUp>
                        <IconButton
                            onClick={(ev) => pageLayout().toggleLeftSidebar()}
                            aria-label="open left sidebar"
                        >
                            <Icon>menu</Icon>
                        </IconButton>
                    </Hidden>

                    <div className="flex items-center">
                        <Icon className="text-32 mr-12">account_box</Icon>
                        <Typography variant="h6" className="hidden sm:flex">Movie</Typography>
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">

                    <MuiThemeProvider theme={BaseSelectedTheme}>
                        <Paper className="flex p-4 items-center w-full max-w-512 px-8 py-4" elevation={1}>

                            {/* <Icon className="mr-8" color="action">search</Icon> */}

                            {/* <Input
                                placeholder="Search for anything"
                                className="flex flex-1"
                                disableUnderline
                                fullWidth
                                value={searchText}
                                inputProps={{
                                    'aria-label': 'Search'
                                }}
                                onChange={setSearchText}
                            /> */}

                            <SearchBar searchText={''} className="flex flex-1" fullWidth />
                        </Paper>
                    </MuiThemeProvider>
                </div>
            </div>
        )
            ;
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setSearchText: Actions
    }, dispatch);
}

function mapStateToProps({ MovieApp }) {
    return {
        searchText: MovieApp
    }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(MoviesHeader));
