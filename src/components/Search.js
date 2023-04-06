import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosWithAuth } from "../utilities/axiosWithAuth";
import {
  Autocomplete,
  Button,
  Box,
  Grid,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import DogContainer from "./DogContainer";
import Pagination from "./Pagination";

const Search = () => {
  const navigate = useNavigate();
  const [breeds, setBreeds] = useState([]); //dropdown
  const [breedsSelect, setBreedsSelect] = useState([]); //selected within dropdown
  const [dogResults, setDogResults] = useState({ resultIds: [], total: 0 }); //store searched results (as object) to POST to get dogs
  const [currentPage, setCurrentPage] = useState(1); // pagination default
  const [ageSelect, setAgeSelect] = useState({ ageMin: null, ageMax: null });
  const [sortBy, setSortBy] = useState();

  let ageList = [];
  for (let i = 0; i <= 20; i++) {
    ageList.push(i.toString());
  }

  const viewResultsStart = () => {
    return (currentPage - 1) * 25 + 1;
  };

  const sortOptions = [
    { title: "Name A-Z", sortBy: "name:asc" },
    { title: "Name Z-A", sortBy: "name:desc" },
    { title: "Youngest First", sortBy: "age:asc" },
    { title: "Oldest First", sortBy: "age:desc" },
    { title: "Breed A-Z", sortBy: "breed:asc" },
    { title: "Breed Z-A", sortBy: "breed:desc" },
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

  // Search on criteria update
  useEffect(() => {
    search(1);
    setCurrentPage(1);
  }, [breedsSelect, ageSelect, sortBy]);

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
    setSortBy(
      sortOptions.filter((option) => option.title == event.target.innerText)[0]
        .sortBy
    );
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
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ my: "2%", mx: "5%" }}
      >
        <Box>
          <Typography variant="h2">Ready to See Some Pups?</Typography>
          <Typography variant="subtitle1">
            Type to filter by breed (you can choose more than 1!). Mark your
            favorites good bois and girls, then <b>match</b> to meet your new
            canine BFF!
          </Typography>
        </Box>

        <Button variant="outlined" onClick={onLogout}>
          Logout
        </Button>
      </Stack>

      <Grid
        container
        columns={16}
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={16} sm={16} md={16} lg={8} xl={8}>
          <Autocomplete
            id="tags-breeds"
            multiple
            limitTags={2}
            options={breeds}
            onChange={handleBreedSelect}
            defaultValue={breeds[87]}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="By Breed"
                placeholder="Type here..."
              />
            )}
          ></Autocomplete>
        </Grid>
        <Grid item xs={8} sm={8} md={8} lg={2} xl={1.5}>
          <Autocomplete
            id="ageMin"
            options={ageList}
            onChange={handleMinAge}
            // autoWidth
            // sx={{ width: '15%' }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Min Age"
                placeholder="Age"
              />
            )}
          ></Autocomplete>
        </Grid>
        <Grid item xs={8} sm={8} md={8} lg={2} xl={1.5}>
          <Autocomplete
            id="ageMax"
            options={ageList}
            onChange={handleMaxAge}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Max Age"
                placeholder="Age"
              />
            )}
          ></Autocomplete>
        </Grid>
        <Grid item xs={16} sm={16} md={16} lg={3} xl={3}>
          <Autocomplete
            id="sortBy"
            disableClearable
            options={sortOptions}
            getOptionLabel={(option) => option.title}
            onChange={handleSort}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Sort By"
                placeholder="Name"
              />
            )}
          ></Autocomplete>
        </Grid>
      </Grid>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
        spacing={2}
        sx={{ my: "2%" }}
      >
        <Typography>
          Viewing {viewResultsStart()} -{" "}
          {dogResults?.resultIds.length + viewResultsStart() - 1} of{" "}
          {dogResults?.total} results
        </Typography>
        <Pagination
          total={dogResults.total}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </Stack>

      <DogContainer
        dogResults={dogResults}
        setDogResults={setDogResults}
      ></DogContainer>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
        spacing={2}
        sx={{ my: "2%" }}
      >
        <Typography>
          Viewing {viewResultsStart()} -{" "}
          {dogResults?.resultIds.length + viewResultsStart() - 1} of{" "}
          {dogResults?.total} results
        </Typography>
        <Pagination
          total={dogResults.total}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </Stack>
    </>
  );
};

export default Search;
