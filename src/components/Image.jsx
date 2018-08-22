import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Image = ({ dataResponse, imageToDOM, onLoad }) => {
  // console.log(dataResponse, "DATARESPONSE");
  return (
    <Fragment>
      {imageToDOM ? (
        <p className="image-container-list__inner__text">Loading . . </p>
      ) : (
        ""
      )}
      <img
        onLoad={onLoad}
        className={
          imageToDOM
            ? "image-container-list__inner__img--hide"
            : "image-container-list__inner__img--show"
        }
        alt="/"
        src={dataResponse.urls.regular}
      />
    </Fragment>
  );
};
Image.defaultProps = {
  dataResponse: {}
};
Image.propTypes = {
  imageToDOM: PropTypes.bool.isRequired,
  onLoad: PropTypes.func.isRequired,
  dataResponse: PropTypes.shape({
    urls: PropTypes.object
  })
};
export default Image;
