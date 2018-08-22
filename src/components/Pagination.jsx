import React, { Component } from "react";
import PropTypes from "prop-types";

class PaginatePage extends Component {
  // - - - - - - - - - - Page initialization - - - - - - - - - -
  rangeStart = () => {
    const { page, pageRange } = this.props;
    const start = page - pageRange;
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
    const headersTotal = pageHeaders["x-total"];
    const headersPerPage = pageHeaders["x-per-page"];
    return Math.ceil(headersTotal / headersPerPage);
  };
  // - - - - - - - - - - - - - Page conditions - - - - - - - - - - - - -
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

  // - - - - - - - - - - - - - Page navigation - - - - - - - - - - - - -
  nextPage = () => {
    const { page } = this.props;
    return page + 1;
  };
  previousPage = () => {
    const { page } = this.props;
    return page - 1;
  };
  // - - - - - - - - - - - - - Page number render - - - - - - - - - - - - -
  pages = () => {
    let pages = [];
    for (let start = this.rangeStart(); start <= this.rangeEnd(); start++) {
      pages.push(start);
    }
    return pages;
  };
  // - - - - - - - - - - - - - Main action Creator - - - - - - - - - - - - -
  handleClick = page => {
    const { changePage } = this.props;
    return changePage(page);
  };
  render() {
    const { page } = this.props;
    return (
      <div className="pagination-container">
        <p>Hello from Paginate</p>
        {/* previous button */}
        <button
          type="submit"
          onClick={() => this.handleClick(this.previousPage())}
        >
          Previous
        </button>
        {/* pages render */}
        {this.pages().map(result => (
          <button
            key={result}
            type="submit"
            onClick={() => this.handleClick(result)}
          >
            {result}
          </button>
        ))}
        {/* next button */}
        <button type="submit" onClick={() => this.handleClick(this.nextPage())}>
          Next
        </button>

        <p>{`Hello this is page: ${page}`}</p>
      </div>
    );
  }
}

PaginatePage.defaultProps = {
  pageHeaders: {}
};
PaginatePage.propTypes = {
  pageRange: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  pageHeaders: PropTypes.shape({
    headersTotal: PropTypes.string,
    headersPerPage: PropTypes.string
  })
};

export default PaginatePage;
