import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";

class PaginatePage extends Component {
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
    const { page } = this.props;
    return page + 1;
  };
  previousPage = () => {
    const { page } = this.props;
    return page - 1;
  };
  // NAVIGATION STARTS

  pages = () => {
    let pages = [];
    for (let start = this.rangeStart(); start <= this.rangeEnd(); start++) {
      pages.push(start);
    }
    return pages;
  };
  handleClick = page => {
    const { changePage } = this.props;
    return changePage(page);
  };
  render() {
    const { page } = this.props;
    console.log(this.rangeStart(), ":==>RangeStart");
    console.log(this.rangeEnd(), ":==>RangeEnd");
    return (
      <Fragment>
        <p>Hello from Paginate</p>
        {/* previous button */}
        <button
          type="submit"
          onClick={e => this.handleClick(this.previousPage())}
        >
          Previous
        </button>
        {/* pages render */}
        {this.pages().map(result => (
          <button type="submit" onClick={e => this.handleClick(result)}>
            {result}
          </button>
        ))}
        {/* next button */}
        <button type="submit" onClick={e => this.handleClick(this.nextPage())}>
          Next
        </button>

        <p>{`Hello this is page: ${page}`}</p>
      </Fragment>
    );
  }
}

PaginatePage.defaultProps = {
  pageHeaders: {}
};
PaginatePage.propTypes = {
  // pageRange: PropTypes.number,
  pageHeaders: PropTypes.object
};

export default PaginatePage;
