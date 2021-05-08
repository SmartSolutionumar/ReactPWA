import React, {useState,useContext,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

// import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// import TextField from '@material-ui/core/TextField';
import {config} from '../../config';
import LoadingOverlay from 'react-loading-overlay';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Notification from '../../components/_helperComponents/Notification'
import { MenuContext } from '../Calendar/MonthNew';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import '../../assets/css/calendar.css';
import {SimpleMenuContext } from '../../components/SimpleCard';
import axios from 'axios';


export default function CustomizedDialogs(props) {
    const [Message, setMessage] = useState({ open: false,color: '',message: ''});
    const [Empoption, setEmpoption] = React.useState([]);
    const [Empvalue, setEmpValue] = React.useState(null);
    const [EmpID, setEmpID] = React.useState(null);
    const [Formload, setFormload] = useState(false);

  const monthContext = useContext(MenuContext);
  const SimpleContext = useContext(SimpleMenuContext);

  const defaultProps = {
    options: Empoption,
    getOptionLabel: (option) => option.EmpName,
  };
  
  const handleClose = () => {
     
    if(monthContext){
      monthContext.dialogClose();
    }
    if(SimpleContext){
      SimpleContext.dialogClose();
    }
  };

  useEffect(( ) => {
    Emplist();
    // eslint-disable-next-line
   },[]);

   
function Emplist(){
    const url = config.Api+'VwAPINSEIPLALL/';
      const params = {
        "data":
        {
        "QryType_int": 21,
        "ProType_int": null,
        "EmpID_int": null,
        "ConID_int": null,
        "month_int": null,
        "year_int": null,
        "FromDate_date": null,
        "Todate_date": null
        }
        }
  
        fetch(url,{
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            
          },
          body: JSON.stringify(params)
        })
        .then((res)=>res.json())
        .then((data)=>{ 
          setEmpoption(data.Output.data) 
        })
  }


  const SaveSubmit = val => {
    setFormload(true); 
    let ComplaintID =  localStorage.getItem('ComplaintIDPK')

    if(!EmpID){
        setMessage({ open:true,color:'error',message: 'Please Select Employee' })
        return false;
    }
      const url =  config.configurl+"/SupportStaffAssign.php?EmployeeID="+EmpID+"&CCMComplaintID="+ComplaintID+"&DivisionExe=DivisionExe";

      axios.post(url)
      .then(res => {
        console.log(res,"Staff");
        if(res.data === '0'){
            setMessage({ open:true,color:'error',message: 'Kindly Update DIvision ID' });
            setFormload(false); 
            return false;
          }else{
            setMessage({ open:true,color:'success',message: 'Staff Assigned Successfully' })
            if(monthContext){
              monthContext.refresh();
            }
            if(SimpleContext){
              SimpleContext.refresh();
            }
            handleClose();
            setFormload(false); 
            return false;
          }
      })
      
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
              <p className='tagpadd'>Staff Assign</p>
          </div>
          <LoadingOverlay

            active={Formload}
            spinner={<ScaleLoader />}
            text='Processing Your Request...'
            > 
              <div style={{padding:'10px 1rem'}}>
            
          <Autocomplete
                style={{width:'100%'}}
                size="small"
                {...defaultProps}
                value={Empvalue}
                onChange={(event, newValue) => {
                  setEmpValue(newValue);
                  if(newValue){
                    setEmpID(newValue.NSEEMPID); 
                  }else{
                    setEmpID(null);
                  }
                  
                }}
                renderInput={(params) => <TextField {...params} label="Select Employee" margin="normal" fullWidth/>}
            />
          <div style={{paddingTop:'1rem'}} align='right'>

          <Button variant="outlined" color="primary" style={{margin:'0 1rem'}} onClick={()=>SaveSubmit()}>
          Assign
          </Button>
         
          </div>

          </div>

            </LoadingOverlay>
        </div>
     
      </Dialog>
    </div>
  );
}