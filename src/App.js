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
  const [matric, setMatric] = useState('')
  const [Fsc, setFsc] = useState('')
  const [Mdcat, setMdcat] = useState('')
  const [aggregate, setaggregate] = useState(0)
  const [isDisable, setisDisable] = useState(true)
  const [mdcatOn, setMdcatOn] = useState(true)
  const [NumsOn, setNumsOn] = useState(false)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const calculation = () => {
    if (mdcatOn) {
      setaggregate(((matric / 1100) * 10) + ((Fsc / 1100) * 40) + ((Mdcat / 200) * 50))
    }
    else {
      setaggregate(((matric / 200) * 25) + ((Fsc / 1100) * 25) + ((Mdcat / 200) * 50))
    }
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
  const switchToMdcat = () => {
    setMatric('')
    setFsc('')
    setMdcat('')
    setaggregate(0)
    setMdcatOn(true)
  }
  const switchToNums = () => {
    setMatric('')
    setFsc('')
    setMdcat('')
    setaggregate(0)
    setMdcatOn(false)
  }
  return (
    <div className="App">
      <div className='AppContainer'>
        <div className='iconContainer'>
          <InfoIcon className='icon' onClick={handleOpen} />
        </div>
        <p className='Title'>Calculate your Aggregate</p>
        <p className='Subtitle'>Developed By <span className='span'>Manzar Abbas</span></p>
        <div className='TabsContainer'>
          <div className={mdcatOn ? 'ActiveTab' : 'inActiveTab'} onClick={switchToMdcat} >MDCAT</div>
          <div className={mdcatOn ? 'inActiveTab' : 'ActiveTab'} onClick={switchToNums} >NUMS</div>
        </div>
        <div className='inputContainer'>
          <div className="textInput">
            <TextField
              value={matric}
              className="textInput"
              label={mdcatOn ? "MATRIC" : "NUMS"}
              type="number"
              onChange={e => setMatric(e.target.value)}
              required
              error={mdcatOn ? ((matric > 1100 || matric < 0) ? true : false) : ((matric > 200 || matric < 0) ? true : false)}
              helperText={mdcatOn ? ((matric > 1100 || matric < 0) ? "Aby Harami! sae sae Bta " : "") : ((matric > 200 || matric < 0) ? "Aby Harami! sae sae Bta " : "")}
              InputProps={{
                endAdornment: <InputAdornment position="end">{mdcatOn ? '/1100' : '/200'}</InputAdornment>,
              }}
            />
          </div>
          <div className="textInput">
            <TextField
              value={Fsc}
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
              value={Mdcat}
              className="textInput"
              label="MDCAT"
              type="number"
              onChange={e => setMdcat(e.target.value)}
              required
              helperText={(Mdcat > 200 || Mdcat < 0) ? "Aby Harami! sae sae Bta" : ""}
              error={(Mdcat > 200 || Mdcat < 0) ? true : false}
              InputProps={{
                endAdornment: <InputAdornment position="end">/200</InputAdornment>,
              }}
            />
          </div>
          <div className='CalBtn'>
            <button
              className={isDisable ? "btnDisble" : "btn"}
              disabled={isDisable}
              onClick={calculation}
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
            {mdcatOn ? <p>
              This calculation is based on following weightage : <br />
              Matric 10% <br />
              FSC 40% <br />
              Mdcat 50%
            </p> : <p>
              This calculation is based on following weightage : <br />
              Nums 25% <br />
              FSC 25% <br />
              Mdcat 50%
            </p>}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
export default App;