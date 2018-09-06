import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import ImageCollections from "@material-ui/icons/Collections";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const style = theme => ({
  appBar: {
    background: theme.palette.primary.dark
  },
  gridContainer: {
    padding: "10px 0"
  },
  inputForm: {}
});

const Header = props => {
  const { classes, onSubmit } = props;
  return (
    <AppBar position="static" className={classes.appBar}>
      <ToolBar>
        <Grid
          container
          className={classes.gridContainer}
          spacing={0}
          direction="row"
          alignItems="center"
          justify="center"
        >
          {/* <Grid item xs={1}>
            <Typography>Logo here</Typography>
          </Grid> */}
          <Grid item xs={6} className={classes.inputForm}>
            <form autoComplete="off" onSubmit={onSubmit}>
              <FormControl fullWidth>
                <InputLabel htmlFor="input-with-icon-adornment">
                  Search images
                </InputLabel>
                <Input
                  fullWidth
                  name="inputQuery"
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment position="start">
                      <ImageCollections color="action" />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </form>
          </Grid>
          {/* <Grid item xs={5}>
            <Grid
              container
              direction="row"
              alignItems="flex-start"
              justify="flex-end"
            >
              <Grid item xs={3}>
                <Button>Links 1</Button>
              </Grid>
              <Grid item xs={3}>
                <Button>Links 1</Button>
              </Grid>
              <Grid item xs={3}>
                <Button>Links 1</Button>
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </ToolBar>
    </AppBar>
  );
};

Header.defaultProps = {
  classes: {}
};

Header.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    appBar: PropTypes.string
  })
};

export default withStyles(style)(Header);
