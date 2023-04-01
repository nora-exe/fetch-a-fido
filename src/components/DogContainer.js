import { React, useEffect, useState } from "react";
import { axiosWithAuth } from '../utilities/axiosWithAuth';
import { Button, Card, CardActions, CardContent, CardMedia, Checkbox,Grid, Typography } from '@mui/material';

const DogContainer = props => {
    const [dogs, setDogs] = useState([]);
    
    // use search results to fetch queried dogs
    useEffect(() => {
        axiosWithAuth()
            .post(`/dogs`, props.dogResults.resultIds)
            .then(res => { setDogs(res.data); })
            .catch(err => console.log({ err }));
    }, [props.dogResults])

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
                                Hi my name is ${dog.name}! I'm a(n) ${dog.age} year old ${dog.breed}. I'm at ${dog.zip_code}, come pick me up!
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More!</Button>
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
 * month or year age?
 */