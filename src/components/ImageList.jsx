import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Image from "./Image";

const ImageList = ({ imgData }) => {
  const render = (
    <ul>
      <div>
        <Image image={imgData} />
      </div>
    </ul>
  );
  return <Fragment>{render}</Fragment>;
};

ImageList.defaultProps = {
  imgData: {}
};

ImageList.propTypes = {
  imgData: PropTypes.shape({
    dataItems: PropTypes.object.isRequired
  })
};

export default ImageList;
