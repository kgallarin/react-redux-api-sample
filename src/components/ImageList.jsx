import React, { Component } from "react";
import PropTypes from "prop-types";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
// import { withStyles } from "@material-ui/core/styles";
import Image from "./Image";

class ImageList extends Component {
  renderList = () => {
    const { imgData } = this.props;
    return imgData.map((imgData, key) => (
      <GridListTile key={key}>
        <div
          style={{
            background: " #000"
          }}
        >
          <Image dataResponse={imgData} />
        </div>
      </GridListTile>
    ));
  };
  render() {
    return (
      <div style={{ padding: "0 calc(4px * 4)" }}>
        <GridList id="img-gallery" cellHeight={160} cols={3}>
          {this.renderList()}
        </GridList>
      </div>
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
