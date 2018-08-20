import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { nextPage } from "../actions/index";

class PaginatePage extends Component {
  handleClick = () => {
    const { paginationData, dispatch } = this.props;
    const page = paginationData.params.page;
    // return dispatch(nextPage(page));
  };
  render() {
    return (
      <Fragment>
        <p>Hello from Paginate</p>
        {/* <button type="submit" onClick={}>
          Previous
        </button> */}
        <button type="submit" onClick={this.handleClick}>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatch }, dispatch);
export default connect(
  null,
  mapDispatchToProps
)(PaginatePage);
