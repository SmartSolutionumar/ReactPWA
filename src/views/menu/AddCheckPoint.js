import React, {useState,useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

// import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
// import {config} from '../../config'
import Notification from '../../components/_helperComponents/Notification'
import { MenuContext } from '../Calendar/MonthNew';
import {SimpleMenuContext } from '../../components/SimpleCard';


export default function CustomizedDialogs(props) {
  const [text, setText] = useState('')
  const [Message, setMessage] = useState({ open: false,color: '',message: ''});

  const monthContext = useContext(MenuContext);
  const SimpleContext = useContext(SimpleMenuContext);


  const handleClose = () => {
    if(monthContext){
      monthContext.dialogClose()
    }
    if(SimpleContext){
      SimpleContext.dialogClose()
    }
   
    
  }; 

  const SaveSubmit = () => {
    handleClose()
  }

  return (
    <div>

<Notification open={Message.open} color={Message.color} 
            message={Message.message} onClose={()=>setMessage({open: false,color: Message.color,message: Message.message})} />


    <Dialog  
      fullWidth={true}
      maxWidth={'sm'}
      open={props.open} 
      onClose={handleClose} 
      aria-labelledby="max-width-dialog-title">

        <div>

          <div >
              <div style={{margin: '0px 17px',color: '#3f95fc',float: 'right'}}>
                <CloseIcon  onClick={handleClose} />
              </div>
              <p className='tagpadd'>Add CheckPoint</p>
          </div>

          <div style={{padding:'1rem'}}>

          <TextField
          id="Comments"
          label="Comments"
          multiline
          fullWidth
          rows={4}
          value={text}
          onChange={(e)=>setText(e.target.value)}
          variant="outlined"
        />

          <div style={{paddingTop:'1rem'}} align='right'>

          <Button variant="outlined" color="primary" onClick={SaveSubmit}>
          Add
          </Button>
         
          </div>

          </div>


        </div>
     
      </Dialog>
    </div>
  );
}