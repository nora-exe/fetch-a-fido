import { React, useEffect, useState } from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";
import Dog from "./Dog";
// import { fetchDogs } from "../utilities/fetchDogs";

import { Button, Card, CardActions, CardContent, CardMedia, Checkbox, Grid, Typography } from '@mui/material';
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

const DogContainer = props => {
    const [dogs, setDogs] = useState([]);
    const [dogSelect, setDogSelect] = useState([]);
    const [dogMatch, setDogMatch] = useState({id:'', img:'', name:'', age:0, zip_code:0, breed:''}); // default don't render match
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // use search results to fetch queried dogs
    useEffect(() => {
        // setDogs(fetchDogs(props.dogResults.resultIds))
        axiosWithAuth()
            .post(`/dogs`, props.dogResults.resultIds)
            .then(res => { setDogs(res.data) })
            .catch(err => console.log({ err }));
    }, [props.dogResults]);

    // match function that takes IDs of selected dogs, posts to API, returns randomized ID for 1 {dog}
    const onMatch = () => {
        axiosWithAuth()
            .post(`/dogs/match`, dogSelect)
            .then(res => {
                axiosWithAuth()
                    .post(`/dogs`, [res.data.match])
                    .then(res => {
                        setDogMatch(res.data[0]);
                        handleOpen()
                    })
                    .catch(err => console.log({ err })); 
                
            })
    };

    const handleChange = (e) => {
        if (e.target.checked) {
            setDogSelect([...dogSelect, e.target.id])
          } else {
            setDogSelect(dogSelect.filter(id => id !== e.target.id))
          }
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={onMatch}
            >match!
            </Button>

            <Dog dogMatch={dogMatch} open={open} handleClose={handleClose} />
            
            <Grid
                container
                columns={15}
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                { dogs.map(dog => (
                    <Grid item xs={15} sm={7.5} md={5} lg={3} xl={3}> 
                        <Card>
                            <CardMedia
                                component="img"
                                alt={dog.breed}
                                height="200"
                                image={dog.img}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {dog.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    My name is <b>{dog.name}</b>! I'm a(n) <b>{dog.age}</b> year old <b>{dog.breed}</b>. I'm at <b>{dog.zip_code}</b>, come pick me up!
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
                                <Typography variant="body2" color="text.secondary">Favorite</Typography>    
                            </CardActions>
                        </Card>
                    </Grid>
                )) }                    
            </Grid>
        </>       
    )
};

export default DogContainer;