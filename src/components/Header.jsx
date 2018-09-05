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

const StyledAppBar = withStyles({
  root: {
    // background: "#000"
    // marginBottom: "50px"
    // position: "static"
  },
  positionStatic: {
    // background: "#000"
  }
})(AppBar);

const Header = ({ onSubmit }) => {
  return (
    <StyledAppBar position="static">
      <ToolBar>
        <Grid container>
          <Grid item lg={4}>
            Logo here
          </Grid>
          <Grid item lg={4}>
            <form onSubmit={onSubmit}>
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
    </StyledAppBar>
  );
};

Header.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default Header;
