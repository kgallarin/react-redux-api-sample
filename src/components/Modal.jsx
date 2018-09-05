import React from "react";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import Image from "./Image";

const imageModal = ({ handleClose, selected, open, classes }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Paper className={classes.paper}>
        <Image dataResponse={selected} />
      </Paper>
    </Modal>
  );
};

imageModal.defaultProps = {
  selected: {}
};
imageModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  classes: PropTypes.shape({
    paper: PropTypes.string
  }).isRequired,
  selected: PropTypes.shape({
    dataResponse: PropTypes.object
  })
};

export default imageModal;
