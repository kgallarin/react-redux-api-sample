import React from "react";
import PropTypes from "prop-types";
import Image from "./Image";

const ImageList = ({ imgData, imageToDOM }) => {
  return (
    <ul>
      <Image imageToDOM={imageToDOM} dataResponse={imgData} />
    </ul>
  );
};

ImageList.propTypes = {
  imgData: PropTypes.array.isRequired,
  imageToDOM: PropTypes.bool.isRequired
};
export default ImageList;
