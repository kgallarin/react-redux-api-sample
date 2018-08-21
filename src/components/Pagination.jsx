import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { changePage } from "../actions/index";

class PaginatePage extends Component {
  rangeStart = () => {
    const { page, pageRange } = this.props;
    const start = page.page - pageRange;
    return start > 0 ? start : 1;
  };
  rangeEnd = () => {
    const { page, pageRange } = this.props;
    const pageEnd = page + pageRange;

    const totalPages = this.totalPages();

    return pageEnd < totalPages ? pageEnd : totalPages;
  };
  totalPages = () => {
    const { pageHeaders } = this.props;

    return Math.ceil(pageHeaders["x-total"] / pageHeaders["x-per-page"]);
  };
  hasFirstPage = () => {
    return this.rangeStart !== 1;
  };
  hasLastPage = () => {
    return this.rangeEnd() < this.totalPages();
  };
  hasPrevious = () => {
    const { page } = this.props;
    return page > 1;
  };
  hasNext = () => {
    const { page } = this.props;
    return page < this.totalPages();
  };
  nextPage = () => {
    const { page, dispatch } = this.props;
    return console.log(page + 1);
  };
  previousPage = () => {
    const { page } = this.props;
    return page - 1;
  };
  // NAVIGATION STARTS

  pages = () => {
    let pages = [];
    for (let start = this.rangeStart(); start <= this.rangeEnd(); start++) {
      pages.push[start];
    }
    return pages;
  };
  handleClick = page => {
    const { changePage } = this.props;
    return changePage(page);
  };
  render() {
    return (
      <Fragment>
        <p>Hello from Paginate</p>
        <a onClick={e => this.handleClick(this.nextPage())}> Next</a>
        <button type="submit" onClick={e => this.handleClick()}>
          Previous
        </button>
        {/* <button type="submit" onClick={this.handleClick(this.nextPage())}> */}
        {/* Next */}
        {/* </button> */}
        {/* {console.log(this.props.rangeStart())} */}
      </Fragment>
    );
  }
}

PaginatePage.defaultProps = {
  pageRange: 5,
  pageHeaders: {}
};
PaginatePage.propTypes = {
  // pageRange: PropTypes.number,
  pageHeaders: PropTypes.object
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatch }, dispatch);
export default connect(
  null,
  mapDispatchToProps
)(PaginatePage);
