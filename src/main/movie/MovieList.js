import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { BaseUtils } from '@basecomponent';
import { Avatar, Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import ReactTable from "react-table";
import classNames from 'classnames';

const styles = theme => ({
    mailList: {
        padding: 0
    },
    mailItem: {},
    avatar: {
        backgroundColor: theme.palette.primary[500]
    },
    labels: {}

});

class MoviesList extends Component {

    state = {
        selectedMoviesMenu: null
    };


    render() {
        const { classes, Movies, apiCallsInProgress } = this.props;

        const data = Movies;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no movie!
                    </Typography>
                </div>
            );
        }

        return (
            <div>
                {apiCallsInProgress > 0 &&
                    <Typography color="textSecondary" variant="h5">
                        Loading...
                    </Typography>
                }
                <ReactTable
                    className={classNames(classes.root, "-striped -highlight border-0")}
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            className: "cursor-pointer",
                            onClick: (e, handleOriginal) => {
                                if (rowInfo) {
                                    this.props.history.push('/apps/moviesdetails/' + rowInfo.row.id);
                                }
                            }
                        }
                    }}
                    data={data}
                    columns={[
                        {
                            Header: "Movie Name",
                            accessor: "title",
                            filterable: true,
                            className: "font-bold"
                        },
                        {
                            Header: "Release Date",
                            accessor: "release_date",
                            filterable: true,
                            className: "font-bold"
                        },
                        {
                            Header: "Popularity",
                            accessor: "popularity",
                            filterable: true
                        },
                        {
                            Header: "Language",
                            accessor: "original_language",
                            filterable: true
                        },
                        {
                            Header: "id",
                            accessor: "id",
                            width: 0,
                            show: false
                        },
                    ]}
                    defaultPageSize={10}
                    noDataText="No movie found"
                />
            </div>
        );

    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getMovies: Actions.getMovies,
    }, dispatch);
}

function mapStateToProps({ MovieApp }) {
    return {
        Movies: MovieApp.moviesReducer.entities,
        apiCallsInProgress: MovieApp.apiReducer.apiCallsInProgress
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(MoviesList)));
