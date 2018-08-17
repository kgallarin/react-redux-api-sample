import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// components
import ImageList from "./components/ImageList";
import Pagination from "./components/Pagination";
// assets
import "normalize.css/normalize.css";
import "./styles/App.css";

import { fetchAPI, searchQuery } from "./actions/index";

class App extends Component {
  componentDidMount() {
    const { fetchAPI, settings, text_query } = this.props;
    console.log(this.props);
    fetchAPI(text_query, settings);
  }

  componentWillReceiveProps(nextProps) {
    const { searchQueryReducer, fetchAPI } = this.props;
    const textQuery = nextProps.searchQueryReducer.text_query;

    if (textQuery !== searchQueryReducer.text_query) {
      fetchAPI(textQuery, searchQueryReducer.settings);
    }
  }
  // expensive live search
  // inputChange = inputValue => {
  // const { searchQuery } = this.props;
  // const inputText = inputValue.target.value.trim();
  // searchQuery(inputText);
  // };
  formSubmit = event => {
    event.preventDefault();
    const { searchQuery, fetchAPI, searchQueryReducer } = this.props;
    let inputText = event.target.elements.inputQuery.value.trim();
    const defaultsearchQuery = "rainy";
    if (inputText !== "") {
      searchQuery(inputText);
      event.target.elements.inputQuery.value = "";
    } else {
      fetchAPI(defaultsearchQuery, searchQueryReducer.settings);
    }
  };
  render() {
    const { dataReducer, searchQueryReducer } = this.props;
    console.log(this.props);
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.formSubmit}>
            <input name="inputQuery" type="text" />
          </form>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {dataReducer.isLoading ? (
          "Loading . . ."
        ) : (
          <Fragment>
            <Pagination paginationData={searchQueryReducer} />
            <ImageList imgData={dataReducer} />
          </Fragment>
        )}
      </div>
    );
  }
}

App.defaultPropTypes = {
  dataReducer: {},
  searchQueryReducer: {}
};

App.propTypes = {
  fetchAPI: PropTypes.func.isRequired,
  searchQuery: PropTypes.func.isRequired,
  searchQueryReducer: PropTypes.shape({
    text_query: PropTypes.string.isRequired,
    settings: PropTypes.object
  }).isRequired,
  dataReducer: PropTypes.shape({
    dataItems: PropTypes.shape({
      data: PropTypes.array
    })
  }).isRequired
};

const mapStateToProps = state => {
  const { searchQueryReducer, dataReducer } = state;
  const {
    text_query,
    isLoading,
    dataItems,
    isRejected,
    err,
    settings
  } = dataReducer[searchQueryReducer] || {
    isLoading: true,
    dataItems: []
  };
  return {
    searchQueryReducer,
    dataReducer,
    text_query,
    isLoading,
    dataItems,
    isRejected,
    settings,
    err
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAPI,
      searchQuery
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
