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

import { fetchAPI, createQuery, isScrolling } from "./actions/index";

class App extends Component {
  componentWillMount() {}
  componentDidMount() {
    const { fetchAPI, searchQuery, thePage } = this.props;
    fetchAPI(searchQuery, thePage);
  }
  componentWillReceiveProps(nextProps) {
    const textQuery = nextProps.searchQuery;
    const { searchQuery, fetchAPI, thePage } = this.props;
    if (textQuery !== searchQuery) {
      fetchAPI(textQuery, 1); //reset page to 1
    }
  }

  // expensive live search
  // inputChange = inputValue => {
  // const { searchQuery } = this.props;
  // const inputText = inputValue.target.value.trim();
  // searchQuery(inputText);
  // };
  totalPages = () => {
    const { pageHeaders } = this.props;
    const headersTotal = pageHeaders["x-total"];
    const headersPerPage = pageHeaders["x-per-page"];
    return Math.ceil(headersTotal / headersPerPage);
  };
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
    const { fetchAPI, searchQuery, thePage } = this.props;
    if (thePage !== page) {
      fetchAPI(searchQuery, page);
    }
  };
  loadMore = () => {
    const { thePage } = this.props;
    return thePage + 1;
  };
  render() {
    const {
      isLoading,
      pageHeaders,
      imageToDOM,
      images,
      thePage,
      pageRange
    } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.formSubmit}>
            <input name="inputQuery" type="text" />
          </form>
        </header>
        <p className="App-intro" />
        {isLoading ? (
          <Fragment>
            <ImageList imageToDOM={imageToDOM} imgData={images} />{" "}
            <p> Loading data . . . </p>
          </Fragment>
        ) : (
          <Fragment>
            <ImageList imageToDOM={imageToDOM} imgData={images} />
          </Fragment>
        )}
        <Pagination
          changePage={this.changePage}
          page={thePage}
          pageHeaders={pageHeaders}
          pageRange={pageRange}
          totalPagesFunc={this.totalPages}
        />
        <button
          type="submit"
          onClick={e => {
            this.changePage(this.loadMore());
            e.preventDefault();
          }}
        >
          Load more...{" "}
        </button>
      </div>
    );
  }
}

App.defaultProps = {
  images: [],
  pageRange: 0,
  pageHeaders: {}
};
App.propTypes = {
  fetchAPI: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  imageToDOM: PropTypes.bool.isRequired,
  pageRange: PropTypes.number,
  thePage: PropTypes.number.isRequired,
  scrolling: PropTypes.bool.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string
    })
  ),
  pageHeaders: PropTypes.shape({
    xtotal: PropTypes.string
  }),
  createQuery: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  const { searchQuery, promiseReducer, receiveData } = state;
  // promise data reducer
  const { isLoading, imageToDOM, thePage, scrolling } = promiseReducer;
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
    thePage,
    scrolling
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAPI,
      createQuery,
      isScrolling
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
