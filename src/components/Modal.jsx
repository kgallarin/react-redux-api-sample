import React from "react";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Image from "./Image";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: "none"
  }
});

const imageModal = props => {
  const { open, handleClose, classes, selected } = props;
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

export default withStyles(styles)(imageModal);
