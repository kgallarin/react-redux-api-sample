import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { nextPage } from "../actions/index";

class PaginatePage extends Component {
  handleClick = () => {
    const { pageHeaders, dispatch } = this.props;
    // const page = paginationData.params.page;
    // return dispatch(nextPage(page));
  };
  render() {
    const { pageHeaders, dispatch } = this.props;
    console.log(pageHeaders["x-total"]);
    return (
      <Fragment>
        <p>Hello from Paginate</p>
        {/* <button type="submit" onClick={}>
          Previous
        </button> */}
        {/* <button type="submit" onClick={this.handleClick}>
          Next
        </button> */}
      </Fragment>
    );
  }
}

PaginatePage.defaultProps = {
  pageRange: 5,
  pageHeaders: []
};
PaginatePage.propTypes = {
  pageRange: PropTypes.number,
  pageHeaders: PropTypes.object
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatch }, dispatch);
export default connect(
  null,
  mapDispatchToProps
)(PaginatePage);
