import React, {useState,useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

// import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import LoadingOverlay from 'react-loading-overlay';
import ScaleLoader from 'react-spinners/ScaleLoader';
// import FormLabel from '@material-ui/core/FormLabel';
import {config} from '../../config'
// import Notification from '../../components/_helperComponents/Notification'
import { MenuContext } from '../Calendar/MonthNew';
import {SimpleMenuContext } from '../../components/SimpleCard';


export default function CustomizedDialogs(props) {
  const [failed, setFailed] = useState('');
  const [repeated, setRepeated] = useState('');
  const [value, setValue] = React.useState('');
  const [Formload, setFormload] = useState(false);

  // const [Message, setMessage] = useState({ open: false,color: '',message: ''});

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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const SaveSubmit = () => {
    setFormload(true); 
    
    let ComplaintID =  localStorage.getItem('ComplaintIDPK')

    if(!value){
      // setMessage({ open:true,color:'error',message: 'Please Select Option' })
      return false;
    }

    if(value === '7'){
      if(!failed){
        // setMessage({ open:true,color:'error',message: 'Please enter the Failed Remarks' })
        return false;
      }
    
    }
    if(value === '8'){
      if(!repeated){
        // setMessage({ open:true,color:'error',message: 'Please enter the Repeated Remarks' })
        return false;
      }
    
    }

    

      const param =  config.configurl+`/SupportStatusUpdate.php?Type=${value}&CCMID=${ComplaintID}&FaildRemarks=${failed}&RepetedRemarks=${repeated}`

      fetch(param)
			.then(response => response.json())
			.then(data => {
          if(data.success === '1'){
            // setMessage({ open:true,color:'success',message: data.message }) 
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
            // setMessage({ open:true,color:'error',message: data.message })
            setFormload(false); 
            return false;
          }
          
			});
  }

  const clear = () => {
    setValue('');
    setFailed('');
    setRepeated('');
  }

  return (
    <div>

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
              <p className='tagpadd'>Status</p>
          </div>
          <LoadingOverlay

            active={Formload}
            spinner={<ScaleLoader />}
            text='Processing Your Request...'
            > 
               <div style={{padding:'1rem',marginTop:'-2rem'}}>

        <FormControl component="fieldset" className='width100'>
      <RadioGroup aria-label="Status" name="Status" value={value} onChange={handleChange}>
      <div className="myrow">
            <div className="mycolumn" >
              <FormControlLabel value="1" control={<Radio size="small" />} label="PRODUCTION COMPLETED" /> <br></br>
              <FormControlLabel value="3" control={<Radio size="small" />} label="TEST COMPLETE" /><br></br>
              <FormControlLabel value="5" control={<Radio size="small" />} label="LIVE PUBLISH" /><br></br>
              <FormControlLabel value="7"  control={<Radio size="small"/>} label="FAILED" /><br></br>
            </div>

            <div className="mycolumn" >
              <FormControlLabel value="2" control={<Radio size="small"/>} label="TEST PUBLISHED" /><br></br>
              <FormControlLabel value="4" control={<Radio size="small"/>} label="TEST FAIL" /><br></br>
              <FormControlLabel value="6" control={<Radio size="small"/>} label="CLOSED" /><br></br>
              <FormControlLabel value="8" control={<Radio size="small"/>} label="REPEATED" /><br></br>
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
              value={failed}
              onChange={(e)=>setFailed(e.target.value)}
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
              value={repeated}
              onChange={(e)=>setRepeated(e.target.value)}
              variant="outlined"
            />
        </div>
    </div>
          

          <div style={{paddingTop:'1rem'}} align='right'>

          <Button variant="outlined" color="primary" onClick={SaveSubmit}>
          Update
          </Button>

         
          </div>

          </div>

          

            

            </LoadingOverlay>
        </div>
     
      </Dialog>
    </div>
  );
}