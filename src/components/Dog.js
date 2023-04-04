import React from "react";
import { Box, Modal, Typography } from '@mui/material';
import PinDrop from '@mui/icons-material/PinDrop';
import PermContactCalendar from '@mui/icons-material/PermContactCalendar';


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
			<img src={props.dogMatch.img} alt={`picture of a ${props.dogMatch.breed} named ${props.dogMatch.name}`} />
			<Typography id="modal-title" variant="h3" gutterBottom>
				{props.dogMatch.name}
			</Typography>
			<Typography id="modal-modal-description">
				<Typography variant="subtitle1" gutterBottom>
					{props.dogMatch.breed}
				</Typography>
				<Typography variant="body1" gutterBottom>
					<PermContactCalendar/>
					&nbsp;<b>{props.dogMatch.age}</b> year(s) old
					<br/>
					<PinDrop/>
					&nbsp;I'm at <b>{props.dogMatch.zip_code}</b>
				</Typography>
				<Typography variant="body2" gutterBottom>
					I can't wait to meet you!
				</Typography>	
			</Typography>
		</Box>
		</Modal>
	</div>
	)
};

export default Dog;