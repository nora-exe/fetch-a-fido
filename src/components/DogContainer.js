import { React, useEffect, useState } from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";
import Dog from "./Dog";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Grid,
  Typography,
} from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

const DogContainer = (props) => {
  const [dogs, setDogs] = useState([]);
  const [dogSelect, setDogSelect] = useState([]);
  const [dogMatch, setDogMatch] = useState({
    id: "",
    img: "",
    name: "",
    age: 0,
    zip_code: 0,
    breed: "",
    city: "",
    state: "",
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getCities = (data) => {
    const uniqueZips = [...new Set(data.map((item) => item.zip_code))];
    axiosWithAuth()
      .post(`/locations`, uniqueZips)
      .then((res) => {
        setDogs(
          data.map((item) => {
            let locationMatch = res.data.filter(
              (loc) => loc.zip_code == item.zip_code
            )[0];
            item["city"] = locationMatch.city;
            item["state"] = locationMatch.state;
            return item;
          })
        );
      });
  };

  // use search results to fetch queried dogs
  useEffect(() => {
    axiosWithAuth()
      .post(`/dogs`, props.dogResults.resultIds)
      .then((res) => {
        getCities(res.data);
      })
      .catch((err) => console.log({ err }));
  }, [props.dogResults]);

  // match function that takes IDs of selected dogs, posts to API, returns randomized ID for 1 {dog}
  const onMatch = () => {
    axiosWithAuth()
      .post(`/dogs/match`, dogSelect)
      .then((res) => {
        axiosWithAuth()
          .post(`/dogs`, [res.data.match])
          .then((res) => {
            setDogMatch(res.data[0]);
            handleOpen();
          })
          .catch((err) => console.log({ err }));
      });
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      setDogSelect([...dogSelect, e.target.id]);
    } else {
      setDogSelect(dogSelect.filter((id) => id !== e.target.id));
    }
  };

  return (
    <>
      <Button variant="contained" onClick={onMatch}>
        match me!
      </Button>

      <Dog dogMatch={dogMatch} open={open} handleClose={handleClose} />

      <Grid
        container
        columns={15}
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="stretch"
      >
        {dogs.map((dog) => (
          <Grid item xs={15} sm={7.5} md={5} lg={3} xl={3}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                alt={dog.breed}
                height="200"
                image={dog.img}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  align="left"
                >
                  {dog.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="left">
                  My name is <b>{dog.name}</b>! I'm a(n) <b>{dog.age}</b> year
                  old <b>{dog.breed}</b>. I live in{" "}
                  <b>
                    {dog.city} {dog.state}
                  </b>
                  !
                </Typography>
              </CardContent>
              <CardActions>
                <Checkbox
                  id={dog.id}
                  onChange={handleChange}
                  checked={dogSelect.indexOf(dog.id) > -1}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                />
                <Typography variant="body2" color="text.secondary">
                  Favorite
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default DogContainer;
