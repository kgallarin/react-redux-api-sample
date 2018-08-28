import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Image from "./Image";
import { imageHandling } from "../actions/index";

class ImageList extends Component {
  allImagesLoaded = parentNodeElement => {
    const allImages = parentNodeElement.querySelectorAll("img");
    for (const img of allImages) {
      if (!img.complete) {
        return false;
      }
    }
    return true;
  };
  imgOnload = () => {
    const { imageHandling } = this.props;
    imageHandling(!this.allImagesLoaded(this.parentElement));
  };
  render() {
    const { imgData, imageToDOM } = this.props;
    const render = imgData.map((imgData, key) => (
      <li key={key} className="image-container-list">
        <div
          className="image-container-list__inner"
          ref={parentElement => {
            this.parentElement = parentElement;
          }}
        >
          <Image
            imageToDOM={imageToDOM}
            dataResponse={imgData}
            onLoad={this.imgOnload}
          />
        </div>
      </li>
    ));
    return <ul className="image-container">{render}</ul>;
  }
}
ImageList.defaultProps = {
  imgData: {}
};
ImageList.propTypes = {
  imageHandling: PropTypes.func.isRequired,
  imageToDOM: PropTypes.bool.isRequired,
  imgData: PropTypes.arrayOf(
    PropTypes.shape({
      urls: PropTypes.object
    })
  )
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ imageHandling }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(ImageList);
