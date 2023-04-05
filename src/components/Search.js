import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosWithAuth } from "../utilities/axiosWithAuth";
import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DogContainer from "./DogContainer";
import Pagination from "./Pagination";

const Search = () => {
  const navigate = useNavigate();
  const [breeds, setBreeds] = useState([]); //dropdown
  const [breedsSelect, setBreedsSelect] = useState([]); //selected within dropdown
  const [dogResults, setDogResults] = useState({ total: 0 }); //store searched results (as object) to POST to get dogs
  const [currentPage, setCurrentPage] = useState(1); // pagination default
  const [ageSelect, setAgeSelect] = useState({ ageMin: null, ageMax: null });
  const [sortBy, setSortBy] = useState("name:asc");

  var ageList = [];
  for (var i = 0; i <= 20; i++) {
    ageList.push(i.toString());
  }

  const sortOptions = [
    { text: "Breed A-Z", sortBy: "breed:asc" },
    { text: "Breed Z-A", sortBy: "breed:asc" },
    { text: "Name A-Z", sortBy: "name:asc" },
    { text: "Name Z-A", sortBy: "name:desc" },
    { text: "Youngest First", sortBy: "age:asc" },
    { text: "Oldest First", sortBy: "age:desc" },
  ];

  // Get dog breeds (array)
  useEffect(() => {
    axiosWithAuth()
      .get(`/dogs/breeds`)
      .then((res) => {
        setBreeds(res.data);
      })
      .catch((err) => console.log({ err }));
  }, []);

  // Set selected breeds to state
  const handleBreedSelect = (event, value) => {
    setBreedsSelect(value);
  };

  // Age handling
  const handleMinAge = (event, value) => {
    setAgeSelect({ ...ageSelect, ageMin: value });
  };
  const handleMaxAge = (event, value) => {
    setAgeSelect({ ...ageSelect, ageMax: value });
  };

  // Sort Handling
  const handleSort = (event) => {
    setSortBy(event.target.value)
  };

  // Run search
  const search = (pageNumber) => {
    let params = {
      breeds: breedsSelect,
      sort: sortBy,
      from: (pageNumber - 1) * 25,
    };
    if (ageSelect.ageMin !== null) {
      params["ageMin"] = ageSelect.ageMin;
    }
    if (ageSelect.ageMax !== null) {
      params["ageMax"] = ageSelect.ageMax;
    }

    axiosWithAuth()
      .get(`/dogs/search`, { params: params })
      .then((res) => {
        setDogResults(res.data);
      })
      .catch((err) => console.log({ err }));
  };

  // get first page of results
  const onSearch = () => {
    search(1);
    setCurrentPage(1);
  };

  // logout
  const onLogout = () => {
    axiosWithAuth()
      .post(`/auth/logout`)
      .then((res) => {
        if ((res.status = 200)) {
          navigate("/");
        }
      })
      .catch((err) => console.log({ err }));
  };

  // pagination
  const onPageChange = (pageNumber) => {
    search(pageNumber);
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Button variant="outlined" onClick={onLogout}>
        Logout
      </Button>

      <h2>Ready to See Some Pups?</h2>
      <p>
        Type to filter by breed (you can choose more than 1!) then hit{" "}
        <b>search</b>. Mark your favorites, then <b>match</b> to meet your new
        best friend!{" "}
      </p>

      <Grid
        container
        columns={12}
        direction="row"
        justifyContent="center"
        alignItems="center"
        maxWidth={"50%"}
      >
        <Grid item xs={12} sm={6} md={6} lg={8} xl={8}>
          <Autocomplete
            multiple
            id="tags-breeds"
            options={breeds}
            onChange={handleBreedSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="By Breed"
                placeholder="Start typing..."
              />
            )}
          ></Autocomplete>
        </Grid>
        <Grid item xs={6} sm={3} md={3} lg={2} xl={2}>
          <Autocomplete
            id="ageMin"
            autoWidth
            options={ageList}
            onChange={handleMinAge}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Min Age"
                placeholder="Number"
              />
            )}
          ></Autocomplete>
        </Grid>
        <Grid item xs={6} sm={3} md={3} lg={2} xl={2}>
          <Autocomplete
            id="ageMax"
            autoWidth
            options={ageList}
            onChange={handleMaxAge}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Max Age"
                placeholder="Number"
              />
            )}
          ></Autocomplete>
        </Grid>
      </Grid>
      <br />
      <FormControl>
        <InputLabel id="select-sort">Sort By</InputLabel>
        <Select
          label="Sort By"
          value={sortBy}
          onChange={handleSort}
        >
          {sortOptions.map((item) => (
            <MenuItem value={item.sortBy}>{item.text}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={onSearch}>
        search
      </Button>

      <DogContainer
        dogResults={dogResults}
        setDogResults={setDogResults}
      ></DogContainer>

      <Pagination
        total={dogResults.total}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default Search;
