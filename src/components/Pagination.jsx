import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";

class PaginatePage extends Component {
  rangeStart = () => {
    const { paginationData, pageRange } = this.props;
    const start = paginationData.params.page - pageRange;
    return start > 0 ? start : 1;
  };
  rangeEnd = () => {
    const { paginationData, pageRange } = this.props;
    const pageEnd = paginationData.params.page + pageRange;

    const totalPages = this.totalPages();

    return pageEnd < totalPages ? pageEnd : totalPages;
  };
  totalPages = () => {
    const { dataHeaders } = this.props;

    return Math.ceil(
      dataHeaders.headers["x-total"] / dataHeaders.headers["x-per-page"]
    );
  };
  nextPage = () => {
    const { paginationData } = this.props;
    return paginationData.params.page + 1;
  };
  previousPage = () => {
    const { paginationData } = this.props;
    return paginationData.params.page - 1;
  };
  // NAVIGATION STARTS
  hasFirstPage = () => {
    return this.rangeStart !== 1;
  };
  hasLastPage = () => {
    return this.rangeEnd() < this.totalPages();
  };
  hasPrevious = () => {
    const { paginationData } = this.props;
    return paginationData.params.page > 1;
  };
  hasNext = () => {
    const { paginationData } = this.props;
    return paginationData.params.page < this.totalPages();
  };
  handleChangePage = page => {
    return page;
  };
  pages = () => {
    let pages = [];
    for (let start = this.rangeStart(); start <= this.rangeEnd(); start++) {
      pages.push[start];
    }
    return pages;
  };
  render() {
    return (
      <Fragment>
        <p>Hello from Paginate</p>
        <button
          type="submit"
          onClick={() => this.handleChangePage(this.previousPage())}
        >
          Previous
        </button>
        <button
          type="submit"
          onClick={() => this.handleChangePage(this.nextPage())}
        >
          Next
        </button>
      </Fragment>
    );
  }
}

PaginatePage.defaultProps = {
  pageRange: 5
};
PaginatePage.propTypes = {
  pageRange: PropTypes.number,
  paginationData: PropTypes.shape({}).isRequired,
  dataHeaders: PropTypes.shape({}).isRequired
};
export default PaginatePage;
