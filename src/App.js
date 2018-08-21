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
  static propTypes = {
    fetchAPI: PropTypes.func.isRequired,
    searchQuery: PropTypes.func.isRequired,
    text_query: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    imageToDOM: PropTypes.bool.isRequired,
    images: PropTypes.array,
    searchQueryReducer: PropTypes.shape({})
  };
  componentDidMount() {
    const { params, fetchAPI, text_query } = this.props;
    fetchAPI(text_query, params);
  }

  componentWillReceiveProps(nextProps) {
    const textQuery = nextProps.text_query;
    const { text_query, fetchAPI, params } = this.props;

    if (textQuery !== text_query) {
      fetchAPI(textQuery, params);
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
    const { params, searchQuery } = this.props;
    const defaultsearchQuery = "dark";

    let inputTextSubmitted = event.target.elements.inputQuery.value.trim();

    if (inputTextSubmitted !== "") {
      searchQuery(inputTextSubmitted);
      event.target.elements.inputQuery.value = "";
    } else {
      fetchAPI(defaultsearchQuery, params);
    }
  };
  render() {
    const {
      isLoading,
      pageHeaders,
      imageToDOM,
      images,
      params,
      pageRange
    } = this.props;
    // console.log(searchQueryReducer);
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
        {isLoading ? (
          "Loading data . . ."
        ) : (
          <Fragment>
            <ImageList imageToDOM={imageToDOM} imgData={images} />
            <Pagination
              pageParams={params}
              pageHeaders={pageHeaders}
              pageRange={pageRange}
            />
          </Fragment>
        )}
      </div>
    );
  }
}

App.defaultProps = {
  images: [],
  searchQueryReducer: {}
};
const mapStateToProps = state => {
  const { searchQueryReducer, promiseReducer, receiveData, pagination } = state;
  // promise data reducer
  const { isLoading } = promiseReducer;
  // query and params/settings reducer
  const { text_query, imageToDOM, settings: params } = searchQueryReducer;
  // state shape
  const { imgData: images, pageHeaders, pageRange } = receiveData[
    text_query
  ] || {
    dataItems: []
  };

  return {
    searchQueryReducer,
    pageHeaders,
    promiseReducer,
    text_query,
    imageToDOM,
    images,
    params,
    pageRange,
    isLoading,
    pagination
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
