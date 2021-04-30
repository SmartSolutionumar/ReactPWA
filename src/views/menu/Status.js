import React, {useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(true);
  const [text, setText] = useState('')
  const [value, setValue] = React.useState('female');

  useEffect(() => {
    setOpen(props.open)
  }, [props.open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>

    <Dialog  
      fullWidth={true}
      maxWidth={'sm'}
      open={open} 
      onClose={handleClose} 
      aria-labelledby="max-width-dialog-title">

        <div>

          <div >
              <div style={{margin: '0px 17px',color: '#3f95fc',float: 'right'}}>
                <CloseIcon  onClick={handleClose} />
              </div>
              <p className='tagpadd'>Status</p>
          </div>

          <div style={{padding:'1rem',marginTop:'-2rem'}}>

        <FormControl component="fieldset" className='width100'>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
      <div className="myrow">
            <div className="mycolumn" >
              <FormControlLabel value="PRODUCTION COMPLETED" control={<Radio size="small" />} label="PRODUCTION COMPLETED" /> <br></br>
              <FormControlLabel value="TEST COMPLETE" control={<Radio size="small" />} label="TEST COMPLETE" /><br></br>
              <FormControlLabel value="LIVE PUBLISH" control={<Radio size="small" />} label="LIVE PUBLISH" /><br></br>
              <FormControlLabel value="FAILED"  control={<Radio size="small"/>} label="FAILED" /><br></br>
            </div>

            <div className="mycolumn" >
              <FormControlLabel value="TEST PUBLISHED" control={<Radio size="small"/>} label="TEST PUBLISHED" /><br></br>
              <FormControlLabel value="TEST FAIL" control={<Radio size="small"/>} label="TEST FAIL" /><br></br>
              <FormControlLabel value="CLOSED" control={<Radio size="small"/>} label="CLOSED" /><br></br>
              <FormControlLabel value="REPEATED" control={<Radio size="small"/>} label="REPEATED" /><br></br>
            </div>
          </div>
       
      </RadioGroup>
    </FormControl>


    <div className="myrow">
        <div className="mycolumn" >
            <TextField
              id="Reason"
              label="Failed Remarks"
              multiline
              fullWidth
              rows={4}
              value={text}
              onChange={(e)=>setText(e.target.value)}
              variant="outlined"
            />
        </div>
        <div className="mycolumn" >
            <TextField
              id="Reason"
              label="Repeated Remarks"
              multiline
              fullWidth
              rows={4}
              value={text}
              onChange={(e)=>setText(e.target.value)}
              variant="outlined"
            />
        </div>
    </div>
          

          <div style={{paddingTop:'1rem'}} align='right'>

          <Button variant="outlined" color="primary">
          Update
          </Button>

         
          </div>

          </div>

          

            


        </div>
     
      </Dialog>
    </div>
  );
}