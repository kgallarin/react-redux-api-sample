import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { imageHandling } from "../actions/index";

const allImagesLoaded = parentNodeElement => {
  const allImages = parentNodeElement.querySelectorAll("img");

  for (const img of allImages) {
    if (!img.complete) {
      return false;
    }
  }
  return true;
};

class Image extends Component {
  imgOnload = () => {
    const { imageHandling } = this.props;
    imageHandling(!allImagesLoaded(this.parentElement));
  };
  render() {
    const { dataResponse, imageToDOM } = this.props;
    return (
      <Fragment>
        {dataResponse.map(res => (
          <li key={res.id}>
            <div
              ref={parentElement => {
                this.parentElement = parentElement;
              }}
            >
              <img
                className={imageToDOM ? "hide" : "show"}
                onLoad={this.imgOnload}
                alt="/"
                src={res.urls.thumb}
              />

              {imageToDOM ? <p>Loading . . </p> : ""}
            </div>
          </li>
        ))}
      </Fragment>
    );
  }
}
Image.propTypes = {
  imageHandling: PropTypes.func.isRequired,
  dataResponse: PropTypes.array.isRequired,
  imageToDOM: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ imageHandling }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Image);
