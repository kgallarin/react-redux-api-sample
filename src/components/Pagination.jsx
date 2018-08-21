import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { pagination } from "../actions/index";

class PaginatePage extends Component {
  componentDidMount() {
    const { dispatch, pagination } = this.props;

    dispatch(pagination());
  }
  // rangeStart = () => {
  //   const { pageParams, pageRange } = this.props;
  //   const start = pageParams.page - pageRange;
  //   return start > 0 ? start : 1;
  // };
  // rangeEnd = () => {
  //   const { pageParams, pageRange } = this.props;
  //   const pageEnd = pageParams.page + pageRange;

  //   const totalPages = this.totalPages();

  //   return pageEnd < totalPages ? pageEnd : totalPages;
  // };
  // totalPages = () => {
  //   const { pageHeaders } = this.props;

  //   return Math.ceil(pageHeaders["x-total"] / pageHeaders["x-per-page"]);
  // };
  // handleClick = () => {
  //   const { pageHeaders, dispatch } = this.props;
  //   // const page = paginationData.params.page;
  //   // return dispatch(nextPage(page));
  // };
  render() {
    const { pageParams, pageHeaders, pageRange } = this.props;
    return (
      <Fragment>
        <p>Hello from Paginate</p>
        {/* <button type="submit" onClick={}>
          Previous
        </button> */}
        {/* <button type="submit" onClick={this.handleClick}>
          Next
        </button> */}
        {/* {console.log(this.rangeEnd())} */}
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
  bindActionCreators({ pagination, dispatch }, dispatch);
export default connect(
  null,
  mapDispatchToProps
)(PaginatePage);
