import React from "react";
import PropTypes from "prop-types";
import Image from "./Image";

const ImageList = ({ imgData, imageToDOM }) => {
  const render = imgData.map(imgData => (
    <li key={imgData.id}>
      <Image imageToDOM={imageToDOM} dataResponse={imgData} />
    </li>
  ));
  return <ul>{render}</ul>;
};

ImageList.propTypes = {
  imgData: PropTypes.shape({
    id: PropTypes.number
  }).isRequired,
  imageToDOM: PropTypes.bool.isRequired
};
export default ImageList;
