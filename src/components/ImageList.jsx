import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Image from "./Image";

const ImageList = ({ imgData, imageToDOM }) => {
  const mapData = imgData.map(response => response);
  return (
    <Fragment>
      <Image imageToDOM={imageToDOM} dataResponse={mapData} />
    </Fragment>
  );
};

ImageList.propTypes = {
  imgData: PropTypes.array.isRequired,
  imageToDOM: PropTypes.bool.isRequired
};
export default ImageList;
