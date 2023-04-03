import { React, useEffect, useState } from "react";
// import { fetchDogs } from "../utilities/fetchDogs";
import { Box, Modal, Typography } from '@mui/material';


const Dog = props => {
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	};
    
	return (
	<div>
		<Modal
			open={props.open}
			onClose={props.handleClose}
		>
		<Box sx={style}>
			<Typography id="modal-match" variant="h6" component="h2">
				{props.dogMatch.name}
			</Typography>
			<Typography id="modal-modal-description">
			</Typography>
		</Box>
		</Modal>
	</div>
	)
};

export default Dog;

// read IDs from state, POST to /match, returns random ID, route to dog/{query ID param}
// read query param, POST ID to /dogs, render DOG ID object
// 