import React, {useState,useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

// import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import {config} from '../../config'
import Notification from '../../components/_helperComponents/Notification'
import { MenuContext } from '../Calendar/MonthNew';


export default function CustomizedDialogs(props) {
  // const [open, setOpen] = React.useState(true);
  const [text, setText] = useState('')
  const [Message, setMessage] = useState({ open: false,color: '',message: ''});

  const monthContext = useContext(MenuContext);


  const handleClose = () => {
    monthContext.dialogClose()
  };

  const SaveSubmit = () => {

    let ComplaintID =  localStorage.getItem('ComplaintIDPK')

    if(!text){
      setMessage({ open:true,color:'error',message: 'Rework Remarks is empty' })
      return false;
    }

    const param =  config.configurl+`/HoldETA.php?ComplaintType=${8}&MaintenanceRemarks=${text}&ETADate=2019-11-03&ComplaintIDPK=${ComplaintID}`

      fetch(param)
			.then(response => response.json())
			.then(data => {
          if(data.success === 1 ){
            setMessage({ open:true,color:'success',message: data.message })
            monthContext.refresh()
            handleClose();
            setText('')
            return false;
          }else{
            setMessage({ open:true,color:'error',message: data.message })
            return false;
          }
          
			});
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
              <p className='tagpadd'>ETA & Rework Remarks</p>
          </div>

          <div style={{padding:'1rem'}}>

          <TextField
          id="Rework_Remarks"
          label="Rework Remarks"
          multiline
          fullWidth
          rows={4}
          value={text}
          onChange={(e)=>setText(e.target.value)}
          variant="outlined"
        />

          <div style={{paddingTop:'1rem'}} align='right'>

          <Button variant="outlined" color="primary" onClick={()=>SaveSubmit()}>
          Update
          </Button>
         
          </div>

          </div>


        </div>
     
      </Dialog>
    </div>
  );
}