import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosWithAuth } from "../utilities/axiosWithAuth";
import { Button, TextField } from "@mui/material";

const LoginForm = () => {
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
    }

    const _onSubmit = () => {
        axiosWithAuth()
            .post("/auth/login",
                { name: login.name, email: login.email })
            .then(res => {
                if (res.status = 200 ) { navigate('/search') }
                else {
                    //TODO stay on page with MUI error button
                    console.log("invalid credentials");
                }
        })
    }

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
}

export default LoginForm;

//TODO LIST
/**
 * canSubmit behavior - currently an issue with checking state and enabling/disabling submit button, maybe an async issue, maybe an issue with MUI component library possible UN/PWD minimum? don't have enough time to address but ideally just shouldn't be able to submit empty text fields, currently reading state 3x instead of twice I think, but reading and logging state fine
 * 
 * encrypt secrets ✔
 * 
*/