import React, {useState,useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

// import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// import TextField from '@material-ui/core/TextField';
import {config} from '../../config'
import Notification from '../../components/_helperComponents/Notification'
import { MenuContext } from '../Calendar/MonthNew'; 
import LoadingOverlay from 'react-loading-overlay';
import ScaleLoader from 'react-spinners/ScaleLoader';
import '../../assets/css/calendar.css';
import {SimpleMenuContext } from '../../components/SimpleCard';


export default function CustomizedDialogs(props) {
  const [Message, setMessage] = useState({ open: false,color: '',message: ''});
  const [Formload, setFormload] = useState(false);
  const monthContext = useContext(MenuContext);
  const SimpleContext = useContext(SimpleMenuContext);

  
  const handleClose = () => {
     
    if(monthContext){
      monthContext.dialogClose();
    }
    if(SimpleContext){
      SimpleContext.dialogClose();
    }
  };


  const SaveSubmit = val => {
    setFormload(true); 
    let ComplaintID =  localStorage.getItem('ComplaintIDPK')

      const param =  config.configurl+`/HoldETA.php?ComplaintType=${13}&ComplaintIDPK=${ComplaintID}`

      fetch(param)
			.then(response => response.json())
			.then(data => { 
          if(data.success === '1'){
            setMessage({ open:true,color:'success',message: data.message })
            handleClose();
            setFormload(false); 
            return false;
          }else{
            setMessage({ open:true,color:'error',message: data.message })
            setFormload(false); 
            return false;
          }
          
			});
  }

  const releaseSubmit = val => {

    let ComplaintID =  localStorage.getItem('ComplaintIDPK')

      const param =  config.configurl+`/HoldETA.php?ComplaintType=${14}&ComplaintIDPK=${ComplaintID}`

      fetch(param)
			.then(response => response.json())
			.then(data => {
                console.log(data,"payment");
          if(data.success === '1'){
            setMessage({ open:true,color:'success',message: data.message })
            handleClose();
            return false;
          }else{
            setMessage({ open:true,color:'error',message: data.message })
            return false;
          }
          
			});
  }

  const TableRow = SimpleContext.paymentrow; 
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
              <p className='tagpadd'>Payment Update</p>
          </div>
          <LoadingOverlay

            active={Formload}
            spinner={<ScaleLoader />}
            text='Processing Your Request...'
            > 
            <div style={{padding:'10px 1rem'}}>
            <div  className='flex'>
              <p className='poplistlf'>ComplainedNo</p> 
              <p className='poplistlr'>{TableRow.ComplaintNo} </p>
            </div>    
            <div  className='flex'>
              <p className='poplistlf'>ContractName</p> 
              <p className='poplistlr'>{TableRow.ContractName} </p>
            </div> 

            <div  className='flex'>
              <p className='poplistlf'>Description</p> 
              <p className='poplistlr'>{TableRow.RequestDetailsDesc} </p>
            </div> 

            <div style={{paddingTop:'1rem'}} align='right'>

            <Button variant="outlined" color="primary" style={{margin:'0 1rem'}} onClick={()=>SaveSubmit()}>
            Update
            </Button>
            <Button variant="outlined" color="primary" onClick={()=>releaseSubmit()}>
            Release
            </Button>
          
            </div>

          </div>

          </LoadingOverlay>
        </div>
     
      </Dialog>
    </div>
  );
}