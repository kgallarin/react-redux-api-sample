import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Img = styled.img`
  width: 100%;
  display: block;
`;

const Image = ({ dataResponse }) => {
  return (
    <Fragment>
      <Img alt="/" src={dataResponse.urls.regular} />
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
