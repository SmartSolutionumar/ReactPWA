import React, {useState,useEffect,useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

// import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { KeyboardDateTimePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {config} from '../../config'
import Notification from '../../components/_helperComponents/Notification'
import { differenceInMinutes,format } from 'date-fns';
import {SimpleMenuContext } from '../../components/SimpleCard';
import { MenuContext } from '../Calendar/MonthNew';



export default function CustomizedDialogs(props) {
  
  const [Message, setMessage] = useState({ open: false,color: '',message: ''});
  const [fromDate, handleFromChange] = useState(new Date());
  const [toDate, handleToChange] = useState(new Date());
  const [observation, setObservation] = useState('');
  const [totalMin, setTotalMin] = useState('');
  const [taskReasonData,setTaskReasonData] = useState([]);
  const [reason, setReason] = useState({ Id: '', Name: ''})
  const monthContext = useContext(MenuContext);
  const SimpleContext = useContext(SimpleMenuContext);

  useEffect(() => {
    clear()
    TaskReasonList()

  }, []);


  const TaskReasonList = () => {

    const param =  config.configurl+`/SupportStaffList.php?Type=2`

      fetch(param)
			.then(response => response.json())
			.then(data => {
        if(data.length > 0){
          setTaskReasonData(data)
        }
          
			});
  }   

  const handleClose = () => { 
    if(monthContext){
        monthContext.dialogClose()
    }
    if(SimpleContext){
      SimpleContext.dialogClose()
    }
  };

 
  
  function endAfterStart(start, end) {
    var startDate = new Date(start);
    var endDate   = new Date(end);

    return endDate.getTime() >= startDate.getTime();
} 

  const fromDatecalc = (e)=> {
    handleFromChange(e)
    
    if(endAfterStart(e, toDate)){
      let diffdate = differenceInMinutes(new Date(toDate), new Date(e));
      setTotalMin(diffdate)
    }
  }
  const toDatecalc = (e)=> {
    handleToChange(e)

    if(endAfterStart(fromDate, e)){
      let diffdate = differenceInMinutes(new Date(e), new Date(fromDate));
      setTotalMin(diffdate)
    }
  }

  const SaveSubmit = (val) => {

    
    if(!fromDate){
      setMessage({ open:true,color:'error',message: 'Please Select From Date' })
      return false;
    }
    if(!toDate){
      setMessage({ open:true,color:'error',message: 'Please Select To Date' })
      return false;
    }
    if(!observation){
      setMessage({ open:true,color:'error',message: 'Please enter Observation' })
      return false;
    }
  
    if(!reason.Id){
        setMessage({ open:true,color:'error',message: 'Please select Task Reason' })
        return false;
    }


    save()

  }

 
  const save = () => {

    let ComplaintID =  localStorage.getItem('ComplaintIDPK')
    let EmpID =  localStorage.getItem('Employeeid')
    let ComplaintNo =  localStorage.getItem('ComplaintNo')
    let fromdate = format(fromDate, 'yyyy/MM/dd hh:mm a')
    let todate = format(toDate, 'yyyy/MM/dd hh:mm a')
  
    const param2 =  config.configurl+`/SupportUserDetailsSave.php?TaskDetailsIDPK_int=0&TaskID_int=${ComplaintID}&TaskResonID_int=${reason.Id}&TaskNo_varchar=${ComplaintNo}&TaskDescription_varchar=${observation}&TaskStartTime_datetime=${fromdate}&TaskEndTime_datetime=${todate}&Totalhrs_int=${totalMin}&TaskUser_int=${EmpID}&IsActive_bit=1`
     fetch(param2)
    .then(response => response.text())
    .then(data => {
        if(data  === 'Updated Successfully'){
          setMessage({ open:true,color:'success',message: 'Updated Successfully' })
          
          if(monthContext){
            monthContext.refresh();
          }
          if(SimpleContext){
            SimpleContext.refresh();
          }
          handleClose();
          clear();
          return false;
        }else{
          setMessage({ open:true,color:'error',message: data })
          return false;
        }
        
    });
    
  }

  const clear = () => {
    setObservation('');
    setTotalMin('');
    setReason({Id:'',Name:''})
    handleFromChange(new Date());
    handleToChange(new Date())
  }

  return (
    <div>

<Notification open={Message.open} color={Message.color} 
            message={Message.message} onClose={()=>setMessage({open: false,color: Message.color,message: Message.message})} />


    <Dialog  
      fullWidth={true}
      maxWidth={'md'}
      open={props.open} 
      onClose={handleClose} 
      aria-labelledby="max-width-dialog-title">

        <div>

          <div >
              <div style={{margin: '0px 17px',color: '#3f95fc',float: 'right'}}>
                <CloseIcon  onClick={handleClose} />
              </div>
              <p className='tagpadd'>Update Time</p>
          </div>

          <div style={{padding:'1rem'}}>

            <div className='upper'>
                        <div >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
                              autoOk
                              variant="inline"
                              inputVariant="outlined"
                              label="From"
                              
                              format="dd-MM-yyyy hh:mm a"
                              value={fromDate}
                              InputAdornmentProps={{ position: "start" }}
                              onChange={date => fromDatecalc(date)}
                            />
                        </MuiPickersUtilsProvider>
                      </div>
                      <div >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
                              autoOk
                              variant="inline"
                              inputVariant="outlined"
                              label="To"
                              
                              format="dd-MM-yyyy hh:mm a"
                              value={toDate}
                              minDate={fromDate}
                              InputAdornmentProps={{ position: "start" }}
                              onChange={date => toDatecalc(date)}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                     <div >
                        <TextField
                            id="TotalMinutes"
                            label="Total Min"                    
                            disabled={true}
                            value={totalMin}
                            onChange={(e)=>setTotalMin(e.target.value)}
                            variant="outlined"
                          />
                    </div>
        </div>

              <div style={{paddingTop:'1rem'}} className='marginright2'>
                    <Autocomplete
                      id="combo-box-demo"
                      fullWidth
                      options={taskReasonData}
                      onChange={(e,a)=>{console.log(e,a);setReason({ Id:a.TaskResonIDPK , Name:a.TaskResonName }) }}
                      getOptionLabel={(option) => option.TaskResonName}
                      
                      renderInput={(params) => <TextField {...params} label="Task Reason" variant="outlined" />}
                    />
                </div>  
              <div style={{paddingTop:'1rem'}} className='marginright2'>
                  <TextField
                      id="Observation"
                      label="Observation"
                      multiline
                      fullWidth
                      rows={4}
                      value={observation}
                      onChange={(e)=>setObservation(e.target.value)}
                      variant="outlined"
                    />
                </div>

                <div style={{paddingTop:'1rem'}} align='right' className='marginright2'>

          <Button variant="outlined" color="primary" onClick={SaveSubmit}>
            Update
          </Button>

         
          </div>





        </div>

        </div>
     
      </Dialog>
    </div>
  );
}