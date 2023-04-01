import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";

import { Button, OutlinedInput, Select, Checkbox, MenuItem, ListItemText, InputLabel } from "@mui/material";

import DogContainer from "./DogContainer";

const Search = () => {
    const [breeds, setBreeds] = useState([]) //dropdown
    const [breedsSelect, setBreedsSelect] = useState([]) //selected within dropdown
    const [dogResults, setDogResults] = useState({}) //store searched results (as object) to POST to get dogs
    
    // Get dog breeds (array)
    useEffect(() => {
        axiosWithAuth()
            .get(`/dogs/breeds`)
            .then(res => {
                setBreeds(res.data);
            })
            .catch(err => console.log({ err }));
    }, [])

    // Select to search
    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setBreedsSelect(
          typeof value === 'string' ? value.split(',') : value,
        );
    };

    // Run search
    const onClick = () => {
        axiosWithAuth()
            .get(`/dogs/search`, { params: { breeds: breedsSelect } })
            .then(res => {
                //todo: check res comes back fine, success messages with MUI element?
                setDogResults(res.data) // re-render DogContainer if state changes
            })
            .catch(err => console.log({ err }));
    }

    return (
        <>
            <h2>Let's See Some Pups!</h2>

            <InputLabel id="multiple-checkbox-label">Breeds</InputLabel>
            <Select
                labelId="breed-multiple-checkbox-label"
                id="breed-multiple-checkbox"
                multiple
                displayEmpty
                value={breedsSelect}
                onChange={handleChange}
                input={<OutlinedInput label="Breeds" />}
                renderValue={(selected) => {
                    if (selected.length === 0) { return <>Select breed(s)</>; }
                    return selected.join(', ');
                }}
            >
                { breeds.map((breed) => (
                    <MenuItem key={breed} value={breed}>
                    <Checkbox checked={breedsSelect.indexOf(breed) > -1} />
                    <ListItemText primary={breed} />
                    </MenuItem>
                )) }
            </Select>
            <Button
                variant="contained"
                onClick={onClick}
            >
                search //todo: icon?
            </Button>
            <DogContainer dogResults={dogResults} setDogResults={setDogResults}></DogContainer>   
        </>
    )
}

export default Search;

//TODO
/**
 * icons
 * 
 */