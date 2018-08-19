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
    params: PropTypes.shape({
      text_query: PropTypes.string,
      per_page: PropTypes.number,
      currentPage: PropTypes.number,
      client_id: PropTypes.string
    }).isRequired,
    isLoading: PropTypes.bool.isRequired,
    imageToDOM: PropTypes.bool.isRequired,
    imgData: PropTypes.shape({
      data: PropTypes.array
    }).isRequired
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
    const defaultsearchQuery = "rainy";

    let inputTextSubmitted = event.target.elements.inputQuery.value.trim();

    if (inputTextSubmitted !== "") {
      searchQuery(inputTextSubmitted);
      event.target.elements.inputQuery.value = "";
    } else {
      fetchAPI(defaultsearchQuery, params);
    }
  };
  render() {
    // const { dataItems: data, isLoading, err, isRejected } = dataReducer;
    const { imgData, isLoading, params, imageToDOM } = this.props;
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
          "Loading . . ."
        ) : (
          <Fragment>
            <Pagination paginationData={params} />
            <ImageList imageToDOM={imageToDOM} imgData={imgData} />
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { searchQueryReducer, dataReducer } = state;
  const { text_query, settings: params, imageToDOM } = searchQueryReducer;
  const { dataItems: imgData, isLoading, err, isRejected } = dataReducer;

  return {
    searchQueryReducer,
    dataReducer,
    text_query,
    imageToDOM,
    isLoading,
    imgData,
    isRejected,
    params,
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
