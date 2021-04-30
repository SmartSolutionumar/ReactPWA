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
              <p className='tagpadd'>Start Work</p>
          </div>

          <div style={{padding:'1rem'}}>

          <h2>Are You Sure ,You Want To Start The Work!</h2>

          <div style={{paddingTop:'1rem'}} align='right'>

          <Button variant="outlined" color="primary" style={{margin:'0 1rem'}}>
          Yes
          </Button>
          <Button variant="outlined" color="primary">
          No
          </Button>
         
          </div>

          </div>


        </div>
     
      </Dialog>
    </div>
  );
}