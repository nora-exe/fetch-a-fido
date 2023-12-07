import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { axiosWithAuth } from "../utilities/axiosWithAuth";

import {
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const LoginForm = (props) => {
  const [login, setLogin] = useState({
    name: "",
    email: "",
    canSubmit: false,
  });

  const navigate = useNavigate();

  // handler to enable/disable submit button - check state in name/email fields, conditional and boolean
  const _onChange = (event) => {
    setLogin({
      ...login,
      [event.target.id]: event.target.value,
      canSubmit:
        login.name !== "" && login.email !== "" && event.target.value !== ""
          ? true
          : false,
    });
  };

  // check for 200 and pass TRUE loggedin state up so we can nav to search (protected). WISHLIST: SNACKBAR ALERT on auth success or fail
  const _onSubmit = () => {
    axiosWithAuth()
      .post("/auth/login", { name: login.name, email: login.email })
      .then((res) => {
        if ((res.status = 200)) {
          props.setIsLoggedIn(true);
          navigate("/search");
        }
      })
      .catch((err) => console.log({ err }));
  };

  // 2 grids 1 for page 1 for forms; responsive, flexible, handles breakpoints well. Also utilizes typography, text fields, and CONDITIONAL button from MUI
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ mt: "10%", ml: 0, height: 600 }}
      >

        <Grid
          container
          columns={10}
          direction="row"
          justifyContent="center"
          justifyItems={"center"}
          alignItems="center"
          sx={{ width: "60%", borderRadius: "16px" }}
          bgcolor="lightgray"
        >
            <Typography align="center" variant="h1" sx={{mt: "1em"}}>
              <b>
              Log in to see some dogs!
              </b>
            </Typography>
          <Grid
            item
            xs={10}
            sm={10}
            md={10}
            lg={10}
            xl={10}
            align="center"
            sx={{ px: 5, py: 5 }}
          >
          </Grid>
          <Grid
            item
            xs={10}
            sm={10}
            md={5}
            lg={5}
            xl={5}
            align="center"
            sx={{ px: 5, py: 5 }}
          >
            <TextField
              required
              id="name"
              label="Name"
              onChange={_onChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={10}
            sm={10}
            md={5}
            lg={5}
            xl={5}
            align="center"
            sx={{ px: 5, py: 5 }}
          >
            <TextField
              required
              id="email"
              label="Email"
              onChange={_onChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={10}
            sm={10}
            md={10}
            lg={10}
            xl={10}
            align="center"
            sx={{ px: 5, py: 5 }}
          >
            <Button
              disabled={!login.canSubmit}
              onClick={_onSubmit}
              variant="contained"
            >
              Log In
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginForm;
