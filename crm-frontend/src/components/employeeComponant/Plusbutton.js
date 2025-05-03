
// import React, { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import QueueIcon from '@mui/icons-material/Queue';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

import { PlusLg } from 'react-bootstrap-icons';

const actions = [
  { icon: <TextSnippetIcon sx={{fontSize:30, color:"black"}}/>, name: 'Report' },
  { icon: <QueueIcon sx={{fontSize:30, color:"black"}} />, name: 'AddLead' },
];

const Plusbutton = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


 
  return (
    <>
    <Box  sx={{ height: 500, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        // sx={{ position: 'absolute', bottom: 16, right: 16}}
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          '& .MuiFab-primary': {
            width: 50, // Adjust button size
            height: 50,
            backgroundColor: 'black', // Background color white
            border: '2px solid black', // Corrected border syntax
            '&:hover': {
              // backgroundColor: 'black', // Background changes to black on hover
              color: 'white', // Icon color changes to white on hover
              backgroundColor: 'black', // Background color white
              border: '2px solid black',
            },
          },
        }}
        icon={<SpeedDialIcon sx={{color:'white'}} />}
        onClose={handleClose}
        // onClickCapture={handleClose}
        onClick={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </Box>

    
   {/* <PlusLg size={50}/> */}
         
    </>
  )
}

export default Plusbutton