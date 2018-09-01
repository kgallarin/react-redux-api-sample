import React, { Component } from "react";
import PropTypes from "prop-types";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
// import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Image from "./Image";

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
      <GridListTile
        key={imgData.id}
        onClick={() => this.handleSelected(imgData)}
      >
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
    const { open, selected } = this.state;
    return (
      <div style={{ padding: "0 calc(4px * 4)" }}>
        <GridList id="img-gallery" cellHeight={160} cols={3}>
          {this.renderList()}
        </GridList>
        <input
          type="button"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: "0",
            background: "transparent",
            outline: "none",
            border: "none"
          }}
          onClick={this.handleOpen}
        />
        <div>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={this.handleClose}
            disableEnforceFocus={false}
          >
            <div>
              <Image dataResponse={selected} />
            </div>
          </Modal>
        </div>
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
