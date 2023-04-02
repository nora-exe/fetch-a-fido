import { React, useEffect, useState } from "react";
import { axiosWithAuth } from '../utilities/axiosWithAuth';
import { Button, Card, CardActions, CardContent, CardMedia, Checkbox, Grid, Pagination, Typography, FormControlLabel, FormControl } from '@mui/material';
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const DogContainer = props => {
    const [dogs, setDogs] = useState([]);
    const [dogSelect, setDogSelect] = useState([]);
    
    // use search results to fetch queried dogs
    useEffect(() => {
        axiosWithAuth()
            .post(`/dogs`, props.dogResults.resultIds)
            .then(res => { setDogs(res.data); })
            .catch(err => console.log({ err }));
    }, [props.dogResults])

    const handleChange = (e) => {
        if (e.target.checked) {
            setDogSelect([...dogSelect, e.target.id])
          } else {
            setDogSelect(dogSelect.filter(id => id !== e.target.id))
          }
    }

    return (
        <Grid
            container
            columns={15}
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
        >

            { dogs.map(dog => (
                <Grid item xs={10} sm={5} md={2}> 
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
                            <Checkbox id={dog.id} onChange={handleChange} checked={dogSelect.indexOf(dog.id) > -1} icon={<FavoriteBorder />} checkedIcon={<Favorite />}/>
                            <Typography variant="body2" color="text.secondary">Favorite</Typography>    
                        </CardActions>
                    </Card>
                </Grid>
            )) }                    

        </Grid>        
    )
}

export default DogContainer;

//TODO
/**
 * checkboxes
 * match func => navigates to dog detail page
 * detail page (component + routing)
 * randomized description greeting strings
 * conditional articles
 * month or year age? less than year?
 */