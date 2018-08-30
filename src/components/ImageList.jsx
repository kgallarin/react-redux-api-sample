import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import Image from "./Image";
// import { imageHandling } from "../actions/index";

class ImageList extends Component {
  renderList = () => {
    const { imgData } = this.props;
    return imgData.map((imgData, key) => (
      <li key={key} className="image-container-list">
        <div
          className="image-container-list__inner"
          ref={parentElement => {
            this.parentElement = parentElement;
          }}
        >
          <Image dataResponse={imgData} />
        </div>
      </li>
    ));
  };
  render() {
    return (
      <Fragment>
        <ul className="image-container">{this.renderList()}</ul>
      </Fragment>
    );
  }
}
ImageList.defaultProps = {
  imgData: {}
};
ImageList.propTypes = {
  imgData: PropTypes.arrayOf(
    PropTypes.shape({
      urls: PropTypes.object
    })
  )
};

export default ImageList;
