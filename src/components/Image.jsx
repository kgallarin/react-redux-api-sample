import React, { Fragment } from "react";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";

const Image = ({ dataResponse }) => {
  return (
    <Fragment>
      {/* <LazyLoad height={200} placeholder={<Loader />} throttle={200}> */}
      <img alt="/" src={dataResponse.urls.regular} />
      {/* </LazyLoad> */}
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
