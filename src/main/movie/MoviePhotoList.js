import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles/index';
import axios from 'axios/index';
import { GridList, GridListTile, GridListTileBar, Icon, IconButton, Typography, ListSubheader } from '@material-ui/core';
import classNames from 'classnames';
import { URL_IMG, IMG_SIZE_SMALL } from './constants';
import 'rc-pagination/assets/index.css';
import Pagination from 'rc-pagination';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)'
    },
    alignCenter: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
});

class MoviePhotoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photosVideos: [],
            current: 1
        };

        // this.setTotal = this.setTotal.bind(this);
        this.itemRender = this.itemRender.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    itemRender = (current, type, element) => {
        if (type === 'page') {
            return <a>{current}</a>;
        }
        return element;
    };

    handleChange = (current, pageSize) => {
        this.setState({ current: current });
        axios.get('//api.themoviedb.org/3/movie/popular?api_key=5d3c7870ac77bed5ee45c3b44470eca6&language=en-US&page=' + current)
            .then((response) =>
                this.setState({ photosVideos: response.data.results })
            );
    }

    componentDidMount() {
        const current = this.state.current;
        axios.get('//api.themoviedb.org/3/movie/popular?api_key=5d3c7870ac77bed5ee45c3b44470eca6&language=en-US&page=' + current)
            .then((response) =>
                this.setState({ photosVideos: response.data.results })
            );
    }

    render() {
        const { classes } = this.props;
        const { photosVideos } = this.state;

        if (!photosVideos && photosVideos.length === 0) {
            return (
                <p>No data found</p>
            )
        }
        return (
            <div className={classNames(classes.root, "md:flex max-w-2xl", 'p-24 h-full')}>
                <div className="flex flex-col flex-1 md:pr-32">
                    <div className={classes.alignCenter}>
                        <Pagination
                            total={1000}
                            itemRender={this.itemRender}
                            onChange={this.handleChange}
                            current={this.state.current}
                            style={{ height: 50, marginTop: 0, marginBottom: 20 }} />
                    </div>
                    <GridList className="h-full" spacing={24} cols={0} style={{ overflowY: 'hidden' }}>
                        {photosVideos.map(media => (
                            <GridListTile
                                classes={{
                                    root: "w-1 sm:w-1/2 md:w-1/4",
                                    tile: "rounded-8"
                                }}
                                key={media.id}
                            >
                                <Link to={"/apps/moviesdetails/" + media.id}>
                                    <img width="254" src={URL_IMG + IMG_SIZE_SMALL + media.poster_path} alt={media.title} />
                                    <GridListTileBar
                                        title={media.title}
                                        actionIcon={
                                            <IconButton className="" color="inherit">
                                                <Icon className={classes.icon}>info</Icon>
                                            </IconButton>
                                        }
                                    />
                                </Link>
                            </GridListTile>

                        ))}
                    </GridList>
                    <div className={classes.alignCenter}>
                        <Pagination
                            total={1000}
                            itemRender={this.itemRender}
                            onChange={this.handleChange}
                            current={this.state.current}
                            style={{ height: 100, marginTop: 50 }} />
                    </div>
                </div>

            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(MoviePhotoList);
