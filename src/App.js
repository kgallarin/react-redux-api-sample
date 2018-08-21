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

import { fetchAPI, createQuery } from "./actions/index";

class App extends Component {
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
  }
  componentDidMount() {
    const { fetchAPI, searchQuery } = this.props;
    fetchAPI(searchQuery);
  }

  componentWillReceiveProps(nextProps) {
    const textQuery = nextProps.searchQuery;
    const { searchQuery, fetchAPI } = this.props;

    if (textQuery !== searchQuery) {
      fetchAPI(textQuery);
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
    const { createQuery } = this.props;
    const defaultsearchQuery = "dark";

    let inputTextSubmitted = event.target.elements.inputQuery.value.trim();

    if (inputTextSubmitted !== "") {
      createQuery(inputTextSubmitted);
      event.target.elements.inputQuery.value = "";
    } else {
      fetchAPI(defaultsearchQuery);
    }
  };
  changePage = page => {
    const { fetchAPI, searchQuery } = this.props;
    fetchAPI(searchQuery, page);
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
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.formSubmit}>
            <input name="inputQuery" type="text" />
          </form>
          {/* <h1 className="App-title">Welcome to React</h1> */}
        </header>
        <p className="App-intro">
          {/* To get started, edit <code>src/App.js</code> and save to reload. */}
        </p>
        {isLoading ? (
          "Loading data . . ."
        ) : (
          <Fragment>
            <ImageList imageToDOM={imageToDOM} imgData={images} />
            {/* <Pagination
              changePage={this.changePage}
              pageParams={params}
              pageHeaders={pageHeaders}
              pageRange={pageRange}
            /> */}
          </Fragment>
        )}
      </div>
    );
  }
}

App.defaultProps = {
  images: []
};
App.propTypes = {
  fetchAPI: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  imageToDOM: PropTypes.bool.isRequired,
  images: PropTypes.array
};
const mapStateToProps = state => {
  const { searchQuery, promiseReducer, receiveData, pagination } = state;
  // promise data reducer
  const { isLoading, imageToDOM } = promiseReducer;
  // state shape
  const { imgData: images, pageHeaders, pageRange } = receiveData[
    searchQuery
  ] || {
    dataItems: []
  };

  return {
    pageHeaders,
    promiseReducer,
    searchQuery,
    imageToDOM,
    images,
    pageRange,
    isLoading,
    pagination
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAPI,
      createQuery
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
