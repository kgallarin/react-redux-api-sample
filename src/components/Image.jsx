import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { imageHandling } from "../actions/index";

class Image extends Component {
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
    const { dataResponse, imageToDOM } = this.props;

    return (
      <Fragment>
        <div
          className="image-container"
          ref={parentElement => {
            this.parentElement = parentElement;
          }}
        >
          {imageToDOM ? <p>Loading . . </p> : ""}
          <img
            onLoad={this.imgOnload}
            className={
              imageToDOM
                ? "image-container__img--hide"
                : "image-container__img--show"
            }
            alt="/"
            src={dataResponse.urls.full}
          />
        </div>
      </Fragment>
    );
  }
}

Image.propTypes = {
  imageHandling: PropTypes.func.isRequired,
  imageToDOM: PropTypes.bool.isRequired,
  dataResponse: PropTypes.shape({
    urls: PropTypes.string
  }).isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ imageHandling }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Image);
