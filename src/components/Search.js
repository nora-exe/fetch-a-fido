import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";

// MUI
import { Autocomplete, Button, Checkbox, Chip, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";

import Dog from "./Dog";
import DogContainer from "./DogContainer";
import Pagination from "./Pagination";

const Search = () => {
    const [breeds, setBreeds] = useState([]) //dropdown
    const [breedsSelect, setBreedsSelect] = useState([]) //selected within dropdown
    const [dogResults, setDogResults] = useState({'total': 0}) //store searched results (as object) to POST to get dogs
    const [currentPage, setCurrentPage] = useState(1); // pagination default

    // Get dog breeds (array)
    useEffect(() => {
        axiosWithAuth()
            .get(`/dogs/breeds`)
            .then(res => {
                setBreeds(res.data);
            })
            .catch(err => console.log({ err }));
    }, []);

    // Set selected breeds to state
    const handleChange = (event, value) => {
        setBreedsSelect(value)
    };

    // Run search
    const search = (pageNumber) => {
        axiosWithAuth()
            .get(`/dogs/search`, { params: { breeds: breedsSelect, sort: "breed:asc", from: ((pageNumber-1) * 25) } })
            .then(res => {
                //todo: check res comes back fine, success messages with MUI element?
                setDogResults(res.data) // re-render DogContainer if state changes
            })
            .catch(err => console.log({ err }));
    };
    
    // get first page of results
    const onSearch = () => {
        search(1)
        setCurrentPage(1)
    };

    // pagination
    const onPageChange = (pageNumber) => {
        search(pageNumber)
        setCurrentPage(pageNumber)
    };

    return (
        <>
            <h2>Ready to See Some Pups?</h2>
            <p>Type to filter by breed (you can choose more than 1!) then hit <b>search</b>. Mark your favorites, then <b>match</b> to meet your new best friend! </p>

            <Autocomplete
                multiple
                id="tags-breeds"
                options={breeds}
                onChange={handleChange}
                renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="By Breed"
                      placeholder="Start typing..."
                    />
                )}
            >
            </Autocomplete>

            
            <Button
                variant="contained"
                onClick={onSearch}
            >
                search
            </Button>


            <DogContainer dogResults={dogResults} setDogResults={setDogResults}>
            </DogContainer>
            
            <Pagination
                total={dogResults.total}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </>
    )
};

export default Search;