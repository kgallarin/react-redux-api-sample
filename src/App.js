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
    const { settings, fetchAPI, text_query } = this.props;
    fetchAPI(text_query, settings);
  }

  componentWillReceiveProps(nextProps) {
    const { text_query, fetchAPI, settings } = this.props;
    const textQuery = nextProps.text_query;

    if (textQuery !== text_query) {
      fetchAPI(textQuery, settings);
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
    const { settings, searchQuery } = this.props;
    // input submitted
    let inputTextSubmitted = event.target.elements.inputQuery.value.trim();
    // default value
    const defaultsearchQuery = "rainy";

    if (inputTextSubmitted !== "") {
      searchQuery(inputTextSubmitted);
      event.target.elements.inputQuery.value = "";
    } else {
      fetchAPI(defaultsearchQuery, settings);
    }
  };
  render() {
    const { dataReducer, searchQueryReducer } = this.props;
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
  fetchAPI: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { searchQueryReducer, dataReducer } = state;
  const { text_query, settings } = searchQueryReducer;
  const { dataItems, isLoading, err, isRejected } = dataReducer;

  return {
    searchQueryReducer,
    dataReducer,
    text_query,
    isLoading,
    // data,
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
