import React, {useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';



export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(true);
  const [text, setText] = useState('')

  useEffect(() => {
    setOpen(props.open)
  }, [props.open]);

  const handleClose = () => {
    setOpen(false);
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
              <p className='tagpadd'>Reason For Pending</p>
          </div>

          <div style={{padding:'1rem'}}>

          <TextField
          id="Reason"
          label="Comments"
          multiline
          fullWidth
          rows={4}
          value={text}
          onChange={(e)=>setText(e.target.value)}
          variant="outlined"
        />

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