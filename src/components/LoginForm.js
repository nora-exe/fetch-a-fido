import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { axiosWithAuth } from "../utilities/axiosWithAuth";

import { Button, TextField } from "@mui/material";

const LoginForm = (props) => {
    
    const [login, setLogin] = useState({
        name: "",
        email: "",
        canSubmit: false
    });
    
    const navigate = useNavigate();
    
    const _onChange = event => {
        setLogin({
            ...login,
            [event.target.id]: event.target.value,
            canSubmit: (login.name !== "" && login.email !== "" && event.target.value !== "") ? true : false 
        })
    };

    const _onSubmit = () => {
        axiosWithAuth()
            .post("/auth/login",
                { name: login.name, email: login.email })
            .then(res => {
                if (res.status = 200 ) {
                    props.setIsLoggedIn(true);
                    navigate('/search')
            }
            })
            .catch(err => console.log({ err }));
    };

    return (
        <>
            <TextField
                required
                id="name"
                label="Name"
                onChange={_onChange}
                variant="filled"
            />
            <TextField
                required
                id="email"
                label="Email"
                onChange={_onChange}
                variant="filled"
            />
            <Button
                disabled={!login.canSubmit}
                onClick={_onSubmit}
                variant="contained"
            >
                Log In
            </Button>
        </>
    )
};

export default LoginForm;