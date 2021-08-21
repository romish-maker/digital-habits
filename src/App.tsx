import React from 'react';
import {Box} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from "@material-ui/core/styles";
import {Directories} from "./derectories/Directories";

const useStyles = makeStyles({
  title: {
    color: "#fff"
  },
  app: {
    marginBottom: "20px"
  },
  container: {
    paddingLeft: "20px"
  },
  link: {
    paddingLeft: "60px"
  },
});

function App() {

  const classes = useStyles();

  return (
      <Box>
        <CssBaseline />
        <Box className={classes.container}>
          <Directories />
        </Box>

      </Box>
  );
}

export default App;