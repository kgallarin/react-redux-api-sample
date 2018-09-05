import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
// import GridListTile from "@material-ui/core/GridListTile";
import Masonry from "react-masonry-component";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Image from "./Image";
import Loader from "./Loader";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: "none"
  },
  modal: {
    display: "flex"
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
    const { imgData } = this.props;
    return imgData.map(imgData => (
      <Grid
        item
        key={imgData.id}
        onClick={() => this.handleSelected(imgData)}
        sm={12}
        md={4}
        lg={3}
      >
        <div style={{ width: "100%", height: "100%", padding: "15px" }}>
          <Image dataResponse={imgData} />
        </div>
      </Grid>
    ));
  };
  render() {
    const { open, selected } = this.state;
    const { classes } = this.props;
    const imagesLoadedOptions = { background: ".black" };
    return (
      <div style={{ padding: "0 calc(4px * 4)" }}>
        <Masonry
          id="img-gallery"
          options={masonryOptions}
          style={{ padding: "0" }}
          imagesLoadedOptions={imagesLoadedOptions}
        >
          {this.renderList()}
        </Masonry>
        <Modal
          open={open}
          onClose={this.handleClose}
          className={classes.modal}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <div className={classes.paper}>
            <Image dataResponse={selected} />
          </div>
        </Modal>
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
  ),
  classes: PropTypes.shape({
    paper: PropTypes.string
  }).isRequired
};
const WrappedImageList = withStyles(styles)(ImageList);
export default WrappedImageList;
