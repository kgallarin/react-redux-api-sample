import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { withStyles } from "@material-ui/core/styles";
import Image from "./Image";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
  },
  gridList: {
    width: 500,
    height: 450
  },
  subheader: {
    width: "100%"
  }
});

class ImageList extends Component {
  renderList = () => {
    const { imgData } = this.props;
    return imgData.map((imgData, key) => (
      <GridListTile key={key}>
        <Image dataResponse={imgData} />
      </GridListTile>
    ));
  };
  render() {
    return (
      <Fragment>
        <GridList cellHeight={160} cols={2}>
          {this.renderList()}
        </GridList>
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

export default withStyles(styles)(ImageList);
