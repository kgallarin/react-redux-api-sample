import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Pagination from "react-js-pagination";

import { connect } from "react-redux";

const PaginatePage = ({ paginationData }) => {
  return (
    <Fragment>
      <p>Hello from Paginate</p>
      <Pagination
        activePage={paginationData.currentPage}
        itemsCountPerPage={paginationData.per_page}
        // totalItemsCount={}
      />
    </Fragment>
  );
};

PaginatePage.propTypes = {
  paginationData: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => {
  const { dataReducer, searchQueryReducer } = state;
  return {
    dataReducer,
    searchQueryReducer
  };
};
export default connect(
  mapStateToProps,
  null
)(PaginatePage);
