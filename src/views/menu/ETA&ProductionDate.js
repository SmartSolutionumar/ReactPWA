import React, {useState,useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

// import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {config} from '../../config';
import LoadingOverlay from 'react-loading-overlay';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Notification from '../../components/_helperComponents/Notification'
import { MenuContext } from '../Calendar/MonthNew';
import moment from 'moment';
import {SimpleMenuContext } from '../../components/SimpleCard';

export default function CustomizedDialogs(props) {
  const [Formload, setFormload] = useState(false);
  const [text, setText] = useState('')
  const [productionDate, handleChangeproductionD] = useState(new Date());
  const [deliveryDate, handleChangedeliveryD] = useState(new Date());
  const [Message, setMessage] = useState({ open: false,color: '',message: ''});

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
     
    let ComplaintID =  localStorage.getItem('ComplaintIDPK')

    var param = '';
    if(val === 'productionDate'){ 

      if(!productionDate){
        setMessage({ open:true,color:'error',message: 'Please Select Production Date' })
        return false;
      }
      if(moment(productionDate).isValid() === false){
        setMessage({ open:true,color:'error',message: 'Invaild Production Date' })
        return false;
      }
      let format = moment(productionDate).format('yyyy-MM-DD')

       param =  config.configurl+`/HoldETA.php?ComplaintType=4&MaintenanceRemarks=complete&ETADate=${format}&ComplaintIDPK=${ComplaintID}`
    }else if(val === 'deliveryDate'){

      if(!deliveryDate){
        setMessage({ open:true,color:'error',message: 'Please Select Delivery Date' })
        return false;
      }
      if(moment(deliveryDate).isValid() === false){
        setMessage({ open:true,color:'error',message: 'Invaild Delivery Date' })
        return false;
      }
      let format = moment(deliveryDate).format('yyyy-MM-DD')

       param =  config.configurl+`/HoldETA.php?ComplaintType=7&MaintenanceRemarks=complete&ETADate=${format}&ComplaintIDPK=${ComplaintID}`
    }else if(val === 'etaTime'){
      
      if(!text){
        setMessage({ open:true,color:'error',message: 'ETA Time is empty' })
        return false;
      }
       param =  config.configurl+`/HoldETA.php?ComplaintType=9&MaintenanceRemarks=${text}&ETADate=null&ComplaintIDPK=${ComplaintID}`
    }
    setFormload(true); 
      fetch(param)
			.then(response => response.json())
			.then(data => {
          if(data.success === 1 ){
            setMessage({ open:true,color:'success',message: data.message })
            
            if(monthContext){
              monthContext.refresh();
            }
            if(SimpleContext){
              SimpleContext.refresh();
            }
            handleClose();
            clear();
            setFormload(false); 
            return false;
          }else{
            setMessage({ open:true,color:'error',message: data.message });
            setFormload(false);
            return false;
          }
          
			});
  }

  const clear = () => {
    setText('')
    handleChangeproductionD(new Date())
    handleChangedeliveryD(new Date())
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
              <p className='tagpadd'>ETA & Production Date</p>
          </div>
          <LoadingOverlay

            active={Formload}
            spinner={<ScaleLoader />}
            text='Processing Your Request...'
            > 
              <div style={{padding:'1rem'}}>

              <div className='flex'>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                label="Production ETA"
                format="dd-MM-yyyy"
                value={productionDate}
                InputAdornmentProps={{ position: "start" }}
                onChange={date => handleChangeproductionD(date)}
              />
              </MuiPickersUtilsProvider>

              <div style={{padding:'1rem'}} align='right'>
              <Button variant="outlined" color="primary" onClick={()=>SaveSubmit('productionDate')}>
              Update
              </Button>
              </div>

              </div>
              </div>

              <div style={{padding:'1rem'}}>

              <div className='flex'>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                label="Delivery ETA"
                format="dd-MM-yyyy"
                value={deliveryDate}
                InputAdornmentProps={{ position: "start" }}
                onChange={date => handleChangedeliveryD(date)}
              />
              </MuiPickersUtilsProvider>

              <div style={{padding:'1rem'}} align='right'>
              <Button variant="outlined" color="primary" onClick={()=>SaveSubmit('deliveryDate')}>
              Update
              </Button>
              </div>

              </div>
              </div>

              <div style={{padding:'1rem'}}>

          <div className='flex'>
            <div style={{width:'50%'}}>
            <TextField
            id="ETA_Time"
            label="ETA Time"
            fullWidth
            type={'number'}
            value={text}
            onChange={(e)=>setText(e.target.value)}
            variant="outlined"
          />
          </div>

          <div style={{padding:'1rem'}} align='right'>
          <Button variant="outlined" color="primary" onClick={()=>SaveSubmit('etaTime')}>
          Update
          </Button>
          </div>

          </div>
          </div>

            </LoadingOverlay>

          </div>


      
     
      </Dialog>
    </div>
  );
}