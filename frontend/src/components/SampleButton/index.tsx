import React from 'react';
import Button from '@mui/material/Button';

const SampleButton: React.FC = () => {
  return (
	<Button
	  variant="contained"
	  color="primary"
	  sx={{
		padding: '10px 20px',
		borderRadius: '8px',
		textTransform: 'uppercase',
		fontWeight: 600,
	  }}
	>
	  Sample MUI Button
	</Button>
  );
};

export default SampleButton;
