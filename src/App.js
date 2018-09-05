import React, { Component } from "react";
import PropTypes from "prop-types";
// redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// components
import Header from "./components/Header";
import WrappedImageList from "./components/ImageList";
// assets
import "./styles/App.css";

import { fetchAPI, createQuery } from "./actions/index";

import Loader from "./components/Loader";

class App extends Component {
  componentWillMount() {
    window.addEventListener("scroll", e => {
      this.handleScroll(e);
    });
  }
  componentDidMount() {
    const { fetchAPI, searchQuery, thePage } = this.props;
    fetchAPI(searchQuery, thePage);
  }
  componentWillReceiveProps(nextProps) {
    const textQuery = nextProps.searchQuery;
    const { searchQuery, fetchAPI } = this.props;
    if (textQuery !== searchQuery) {
      fetchAPI(textQuery, 1); //reset page to 1
    }
  }
  handleScroll = () => {
    const { thePage, err, isLoading } = this.props;
    if (this.totalPages <= thePage) return;

    // scrolling offsets
    if (err) return;
    if (!isLoading) {
      const lastLi = document.querySelector("div#img-gallery > div:last-child");
      const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      let bottomOffset = 1;
      if (pageOffset > lastLiOffset - bottomOffset && !err) {
        this.changePage(this.loadMore());
      }
    }
  };
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
    const { images, thePage, err, isLoading } = this.props;
    return (
      <div className="App">
        <Header onSubmit={this.formSubmit} />
        {err ? (
          <div>
            <p>
              {err.response.data}, status: {err.response.status}
            </p>
            <p> Please try again in an hour. </p>
          </div>
        ) : (
          <WrappedImageList
            changePage={this.changePage}
            page={thePage}
            imgData={images}
          />
        )}
        {isLoading ? <Loader /> : null}
      </div>
    );
  }
}

App.defaultProps = {
  images: [],
  pageHeaders: {}
};
App.propTypes = {
  fetchAPI: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  thePage: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string
    })
  ),
  pageHeaders: PropTypes.shape({
    xtotal: PropTypes.string
  }),
  createQuery: PropTypes.func.isRequired,
  err: PropTypes.string.isRequired
};
const mapStateToProps = state => {
  const { searchQuery, promiseReducer, receiveData } = state;
  // promise data reducer
  const { isLoading, thePage, err } = promiseReducer;
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
    images,
    pageRange,
    isLoading,
    thePage,
    err
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
