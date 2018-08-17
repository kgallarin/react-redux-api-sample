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
    const { image, searchQueryReducer } = this.props;
    console.log(typeof searchQueryReducer.imageToDOM);
    const render = image.dataItems.data.map(response => {
      return (
        <li key={response.id}>
          <div
            ref={parentElement => {
              this.parentElement = parentElement;
            }}
          >
            <img
              className={searchQueryReducer.imageToDOM ? "hiade" : "shoaw"}
              onLoad={this.imgOnload}
              src={response.urls.regular}
              alt="/"
            />
            {searchQueryReducer.imageToDOM ? <p> Loading . . </p> : ""}
          </div>
        </li>
      );
    });
    // console.log(image);
    return <Fragment>{render}</Fragment>;
  }
}

Image.defaultProps = {
  image: {},
  searchQueryReducer: {}
};
Image.propTypes = {
  image: PropTypes.shape({
    data: PropTypes.array
  }),
  searchQueryReducer: PropTypes.shape({
    imageToDOM: PropTypes.bool.isRequired
  }),
  imageHandling: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ imageHandling }, dispatch);

const mapStateToProps = state => {
  const { searchQueryReducer } = state;
  return {
    searchQueryReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Image);
