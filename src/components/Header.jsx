import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import ImageCollections from "@material-ui/icons/Collections";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

const styles = {
  root: {
    flexGrow: 1
  }
};

const Header = ({ onSubmit }) => {
  return (
    <header className="App-header">
      <AppBar>
        <ToolBar positionStatic>
          <form onSubmit={onSubmit}>
            <FormControl>
              <InputLabel htmlFor="input-with-icon-adornment">
                Search images
              </InputLabel>
              <Input
                name="inputQuery"
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <ImageCollections />
                  </InputAdornment>
                }
              />
            </FormControl>
          </form>
        </ToolBar>
      </AppBar>
    </header>
  );
};

Header.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);
