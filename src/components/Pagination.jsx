import React, { Fragment } from "react";
import Pagination from "react-js-pagination";

import { connect } from "react-redux";

const PaginatePage = ({ paginationData }) => {
  //   paginationData.settings.params.map(res => console.log(res));
  //   const paginationHeaders = paginationData.settings.params;
  //   console.log(paginationHeaders);
  return (
    <Fragment>
      <p>Hello from Paginate</p>
      {/* <Pagination
        activePage={paginationHeaders.currentPage}
        itemsCountPerPage={paginationHeaders.per_page}
        // totalItemsCount={}
      /> */}
    </Fragment>
  );
};

const mapStateToProps = state => {
  const { dataReducer, searchQueryReducer } = state;
  return {
    dataReducer,
    searchQueryReducer
  };
};

// const mapDispatchToProps = dispatch => {

// }
export default connect(
  mapStateToProps,
  null
)(PaginatePage);
