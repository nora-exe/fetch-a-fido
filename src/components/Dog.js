import React from "react";
import {
  Box,
  Container,
  Card,
  Modal,
  Typography,
  CardContent,
  CardMedia,
} from "@mui/material";
import PinDrop from "@mui/icons-material/PinDrop";
import PermContactCalendar from "@mui/icons-material/PermContactCalendar";

const Dog = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "#F9F2ED",
    // border: "1px solid #fff",
    boxShadow: 25,
  };

  return (
    <Box>
      <Container>
        <Modal open={props.open} onClose={props.handleClose}>
          <Card sx={style}>
            <CardMedia
              component="img"
              image={props.dogMatch.img}
              alt={`picture of a ${props.dogMatch.breed} named ${props.dogMatch.name}`}
            />
            <CardContent>
              <Typography id="modal-title" variant="h3">
                {props.dogMatch.name}
              </Typography>
              <Typography id="modal-modal-description">
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  {props.dogMatch.breed}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <PermContactCalendar />
                  &nbsp;<b>{props.dogMatch.age}</b> year(s) old
                  <br />
                  <PinDrop />
                  &nbsp;I live in{" "}
                  <b>
                    {props.dogMatch.city}, {props.dogMatch.state}
                  </b>
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  I can't wait to meet you!
                </Typography>
              </Typography>
            </CardContent>
          </Card>
        </Modal>
      </Container>
    </Box>
  );
};

export default Dog;
