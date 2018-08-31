import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import grey from "@material-ui/core/colors/grey";

const styles = theme => ({
  progress: { margin: theme.spacing.unit * 2 }
});

const Loader = props => {
  const { classes } = props;
  return (
    <div>
      <CircularProgress
        className={classes.progress}
        size={50}
        style={{ color: grey[800] }}
      />
    </div>
  );
};

export default withStyles(styles)(Loader);
