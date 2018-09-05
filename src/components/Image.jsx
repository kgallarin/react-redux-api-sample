import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Image = ({ dataResponse }) => {
  return (
    <Fragment>
      <img alt="/" src={dataResponse.urls.regular} />
    </Fragment>
  );
};
Image.defaultProps = {
  dataResponse: {}
};
Image.propTypes = {
  dataResponse: PropTypes.shape({
    urls: PropTypes.object
  })
};
export default Image;
