import React, { Fragment } from "react";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import Loader from "./Loader";

const Image = ({ dataResponse }) => {
  return (
    <Fragment>
      <LazyLoad height={200} placeholder={<Loader />} throttle once>
        <img alt="/" src={dataResponse.urls.regular} />
      </LazyLoad>
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
