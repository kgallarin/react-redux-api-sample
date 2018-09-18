import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import grey from "@material-ui/core/colors/grey";

const styles = theme => ({
  progress: { margin: theme.spacing.unit * 2 }
});

const Loader = props => {
  const { classes } = props;
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{
        minHeight: "100vh"
      }}
    >
      <Grid item xs={3}>
        <CircularProgress
          className={classes.progress}
          size={50}
          style={{ color: grey[800] }}
        />
      </Grid>
    </Grid>
  );
};

Loader.propTypes = {
  classes: PropTypes.object.isRequired //eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(Loader);
