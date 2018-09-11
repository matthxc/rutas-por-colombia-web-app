import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Icon, Search as SearchControl } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Control } from 'leaflet';
import 'leaflet-control-geocoder';

const Search = styled(SearchControl)`
  display: inline-block;
  & > .ui.input > input {
    border-radius: 0;
    border-top: none;
    border-left: none;
    border-right: none;
    background: transparent;
    background-color: transparent;
    color: white;
    border-color: white;
    &:focus,
    &:hover {
      background: transparent;
      background-color: transparent;
      color: white;
    }
  }
  & > .results .result {
    font-size: 1rem !important;
    text-align: left;
  }
`;

class SearchInput extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
  };

  state = { noResultsMessage: 'No se encontraron resultados' };

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title });
    this.props.onSelect(result);
  };

  handleSearchChange = async (e, value) => {
    await this.setState({ isLoading: true, value });

    if (this.state.value.length < 1) {
      this.resetComponent();
    }
  };

  requestResults = _.debounce(async (e, value) => {
    if (value.length < 3) {
      this.setState({
        isLoading: false,
        noResultsMessage: 'Intenta con una palabra más larga',
      });
    } else {
      try {
        const response = await this.requestGeocoderLocation(value);
        let results = response;
        results = results.map(place => ({
          id: place.properties.place_id,
          title: place.name,
          coordinates: place.center,
        }));
        if (_.isEmpty(results)) {
          await this.setState({
            noResultsMessage: 'No se encontraron resultados',
          });
        }
        this.setState({
          isLoading: false,
          results,
        });
      } catch (error) {
        this.setState({ isLoading: false, results: [] });
        console.log(error);
      }
    }
  }, 500);

  loseFocusFields = () => {
    const el = document.querySelector(':focus');
    if (el) el.blur();
  };

  requestGeocoderLocation = searchText =>
    new Promise(resolve => {
      const geo = Control.Geocoder.nominatim();
      geo.geocode(searchText, response => {
        resolve(response);
      });
    });

  render() {
    const { isLoading, value, results, noResultsMessage } = this.state;
    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={(e, search) => {
          this.handleSearchChange(e, search.value);
          this.requestResults(e, search.value);
        }}
        results={results}
        value={value}
        noResultsMessage={noResultsMessage}
        icon={<Icon name="search" inverted />}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            this.loseFocusFields();
          }
        }}
      />
    );
  }
}

export default SearchInput;
