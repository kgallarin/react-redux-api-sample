import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import ImageCollections from "@material-ui/icons/Collections";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";

const style = theme => ({
  appBar: {
    background: theme.palette.primary.dark
  }
});

const Header = props => {
  const { classes, onSubmit } = props;
  return (
    <AppBar position="static" className={classes.appBar}>
      <ToolBar>
        <Grid container>
          <Grid item lg={4}>
            {/* Logo here */}
          </Grid>
          <Grid item lg={4}>
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
