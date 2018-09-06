import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Masonry from "react-masonry-component";
import { withStyles } from "@material-ui/core/styles";
import Image from "./Image";
import Modal from "./Modal";

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  },
  imageContainer: {
    padding: theme.spacing.unit
  }
});
const masonryOptions = {
  transitionDuration: 0
};
class ImageList extends Component {
  state = {
    open: false,
    selected: {}
  };
  handleOpen = () => {
    this.setState({
      open: true
    });
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };
  handleSelected = imgId => {
    this.setState({
      open: true,
      selected: imgId
    });
  };
  renderList = () => {
    const { imgData, classes } = this.props;
    return imgData.map((imgData, key) => (
      <Grid
        item
        key={key}
        onClick={() => this.handleSelected(imgData)}
        xsm={12}
        sm={6}
        lg={4}
        xl={4}
      >
        <div className={classes.imageContainer}>
          <Image dataResponse={imgData} />
        </div>
      </Grid>
    ));
  };
  render() {
    const { classes } = this.props;
    const { open, selected } = this.state;
    return (
      <div className={classes.root}>
        <Masonry
          id="img-gallery"
          options={masonryOptions}
          style={{ padding: "0" }}
          updateOnEachImageLoad
        >
          {this.renderList()}
        </Masonry>
        <Modal handleClose={this.handleClose} open={open} selected={selected} />
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
export default withStyles(styles)(ImageList);
