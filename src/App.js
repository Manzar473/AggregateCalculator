import './App.css';
import { TextField } from "@mui/material"
import { useState, useEffect } from "react"
import InputAdornment from '@mui/material/InputAdornment';
import InfoIcon from '@mui/icons-material/Info';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from 'react';

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


function App() {
  const [matric, setMatric] = useState(0)
  const [Fsc, setFsc] = useState(0)
  const [Mdcat, setMdcat] = useState(0)
  const [aggregate, setaggregate] = useState(0)
  const [isDisable, setisDisable] = useState(true)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const calculation = () => {

    setaggregate(((matric / 1100) * 10) + ((Fsc / 1100) * 40) + ((Mdcat / 200) * 50))
  }

  useEffect(() => {
    if (matric > 0 && Fsc > 0 && Mdcat > 0) {
      setisDisable(false)
    }
    else {
      setisDisable(true)
    }
  }, [matric, Fsc, Mdcat])

  useEffect(() => {
    if (matric > 1100 || Fsc > 1100 || Mdcat > 200 || matric < 0 || Fsc < 0 || Mdcat < 0) {
      setisDisable(true)
    }
  }, [matric, Fsc, Mdcat])


  return (
    <div className="App">
      <div className='AppContainer'>
        <div className='iconContainer'>
          <InfoIcon className='icon' onClick={handleOpen} />

        </div>
        <div className='inputContainer'>
          <p className='Title'>Calculate your Aggregate</p>
          <p className='Subtitle'>Developed By <span className='span'>Manzar Abbas</span></p>
          <div className="textInput">
            <TextField
              className="textInput"
              label="MATRIC"
              type="number"
              onChange={e => setMatric(e.target.value)}
              required
              error={(matric > 1100 || matric < 0) ? true : false}
              helperText={(matric > 1100 || matric < 0) ? "Aby Harami! sae sae Bta " : ""}
              InputProps={{
                endAdornment: <InputAdornment position="end">/1100</InputAdornment>,
              }}
            />
          </div>
          <div className="textInput">
            <TextField
              className="textInput"
              label="FSC"
              type="number"
              onChange={e => setFsc(e.target.value)}
              required
              error={(Fsc > 1100 || Fsc < 0) ? true : false}
              helperText={(Fsc > 1100 || Fsc < 0) ? "Aby Harami! sae sae Bta" : ""}
              InputProps={{
                endAdornment: <InputAdornment position="end">/1100</InputAdornment>,
              }}
            />
          </div>
          <div className="textInput">
            <TextField
              className="textInput"
              label="MDCAT"
              type="number"
              onChange={e => setMdcat(e.target.value)}
              required
              helperText={(Mdcat > 200 || Fsc < 0) ? "Aby Harami! sae sae Bta" : ""}
              error={(Mdcat > 200 || Mdcat < 0) ? true : false}
              InputProps={{
                endAdornment: <InputAdornment position="end">/200</InputAdornment>,
              }}
            />
          </div>
          <div className='CalBtn'>
            <button
              className={isDisable ? "btnDisble" : "btn"}
              onClick={calculation}
              disabled={isDisable}
            >Calculate</button>
          </div>
        </div>

        {aggregate > 0 &&
          <div className='result'>
            <p className='aggHeading'>Your Aggregte is</p>
            <h1 className='aggregate'>{aggregate.toFixed(6)}</h1>
          </div>}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Aggregate criteria
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div>
              <p>
                This calculation is based on following weightage : <br />
                Matric 10% <br />
                FSC 40% <br />
                Mdcat 50%
              </p>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
