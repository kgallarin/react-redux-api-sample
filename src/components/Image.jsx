import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Image = ({ image }) => {
  const render = image.dataItems.data.map(response => {
    return (
      <li key={response.id}>
        <div>
          <img src={response.urls.small} alt="/" />
        </div>
      </li>
    );
  });
  return <Fragment>{render}</Fragment>;
};

Image.defaultProps = {
  image: {}
};
Image.propTypes = {
  image: PropTypes.shape({
    data: PropTypes.array
  })
};

export default Image;
