import React, { Component } from 'react'
import { connect } from 'react-redux'
import Autosuggest from 'react-autosuggest'
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Grid, Icon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles/index';
import { URL_SEARCH, API_KEY, URL_IMG, IMG_SIZE_XSMALL, URL_SEARCH_PERSON } from './constants';

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

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: [],
            searchBy: 'MOVIE'
        };

        this.handleChange = this.handleChange.bind(this);
    }

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };

    handleKeyDown = (event) => {
        if (event.key == 'Enter') {
            return this.handleSubmit(this.state.value);
        }
    }

    handleSubmit = (searchText) => {
        // this.props.history.push('/search/' + searchText);
        this.setState({ value: '' });
    }


    getSuggestionValue = (suggestion) => {
        return suggestion.title;
    };

    onSuggestionsFetchRequested = ({ value }) => {
        const trimmedValue = value.trim();
        const searchBy = this.state.searchBy;

        if (trimmedValue.length > 0 && searchBy === 'MOVIE') {
            let url = URL_SEARCH + trimmedValue + API_KEY;
            fetch(url)
                .then(response => response.json())
                .then(json => json.results)
                .then(data => {
                    const results = data.map(movie => {
                        let temp = {}
                        temp.id = movie.id
                        temp.title = movie.title
                        temp.img = movie.poster_path
                        temp.year = (movie.release_date == "") ? "0000" : movie.release_date.substring(0, 4)
                        return temp
                    });
                    this.setState({
                        suggestions: results
                    });
                }).catch(error => console.log('Exception to get Suggestions'))
        }
        else if (trimmedValue.length > 0 && searchBy === 'ACTOR') {
            this.getActors(trimmedValue);
        }
        else {
            this.setState({
                suggestions: []
            })
        }
    }

    getActors = (trimmedValue) => {
        let url = URL_SEARCH_PERSON + trimmedValue + API_KEY;
        fetch(url)
            .then(response => response.json())
            .then(json => json.results)
            .then(data => {
                const results = data.map(movie => {
                    let temp = {}
                    temp.id = movie.id
                    temp.title = movie.name
                    temp.img = movie.profile_path
                    temp.year = (movie.popularity == "") ? "0000" : movie.popularity
                    return temp
                });
                this.setState({
                    suggestions: results
                });
            }).catch(error => console.log('Exception to get Suggestions'))
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    renderSuggestion = (suggestion) => {
        return (
            <a>
                <img className="searchResult-image"
                    src={suggestion.img == null ? '/movie_showcase/assets/logo_square.svg' : URL_IMG + IMG_SIZE_XSMALL + suggestion.img}
                    ref={img => this.img = img} onError={() => this.img.src = '/movie_showcase/assets/defaultpic.svg'} />
                <div className="searchResult-text">
                    <div className="searchResult-name">
                        {suggestion.title}
                    </div>
                    {suggestion.year}
                </div>
            </a>
        );
    };

    onSuggestionSelected = (event, { suggestion, method }) => {
        if (method === 'enter')
            event.preventDefault();

        if (this.state.searchBy === 'MOVIE') {
            this.props.history.push('/apps/moviesdetails/' + suggestion.id);
        }
        else if (this.state.searchBy === 'ACTOR') {
            this.props.history.push('/apps/castinfo/' + suggestion.id);
        }

        this.setState({ value: '' });
    };

    handleChange = event => {
        this.setState({ searchBy: event.target.value });
    };

    render() {
        const { classes } = this.props;
        const { value, suggestions } = this.state;
        const inputProps = {
            value,
            onChange: this.onChange,
            onKeyPress: this.handleKeyDown,
            placeholder: 'Search ' + this.state.searchBy + '...'
        };

        return (
            <Grid container item direction="row" alignItems="center" justify="center">
                <Grid container item xs={12} >
                    <Icon style={{ marginTop: '5px', marginLeft: '5px' }} color="action">search</Icon>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionSelected={this.onSuggestionSelected}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={inputProps}
                    />
                </Grid>


                <RadioGroup
                    aria-label="searchby"
                    name="searchby"
                    value={this.state.searchBy}
                    onChange={this.handleChange}
                    row
                    style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <FormControlLabel value="MOVIE" control={<Radio />} label="Search Movie" />
                    <FormControlLabel value="ACTOR" control={<Radio />} label="Search Actor/Actress" />
                </RadioGroup>
            </Grid>
        );

    }
}

// export default withRouter(connect()(SearchBar));
export default withStyles(styles, { withTheme: true })(withRouter((connect()(SearchBar))));
