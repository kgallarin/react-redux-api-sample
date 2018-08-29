import React, { Fragment } from "react";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";

const Image = ({ dataResponse, imageToDOM }) => {
  return (
    <Fragment>
      {/* {imageToDOM ? (
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
      /> */}
      <LazyLoad
        height={200}
        placeholder={<h1>I am placeholder</h1>}
        offset={[-200, 0]}
        debounce={500}
      >
        <img
          // onLoad={onLoad}
          // className={
          //   imageToDOM
          //     ? "image-container-list__inner__img--hide"
          //     : "image-container-list__inner__img--show"
          // }
          alt="/"
          src={dataResponse.urls.regular}
        />
      </LazyLoad>
    </Fragment>
  );
};
Image.defaultProps = {
  dataResponse: {}
};
Image.propTypes = {
  imageToDOM: PropTypes.bool.isRequired,
  // onLoad: PropTypes.func.isRequired,
  dataResponse: PropTypes.shape({
    urls: PropTypes.object
  })
};
export default Image;
