import React, {useState,useEffect,useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

// import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {config} from '../../config'
import Notification from '../../components/_helperComponents/Notification'
import { MenuContext } from '../Calendar/MonthNew';
// import moment from 'moment'
import { differenceInMinutes,format } from 'date-fns'

// const top100Films = [
//   { title: 'Bilal', year: 1994 },
//   { title: 'Umar', year: 1972 }
// ]

export default function CustomizedDialogs(props) {
  
  const [value, setValue] = React.useState('1');
  const [Message, setMessage] = useState({ open: false,color: '',message: ''});
  const [fromDate, handleFromChange] = useState(new Date());
  const [toDate, handleToChange] = useState(new Date());
  const [observation, setObservation] = useState('');
  const [rootCause, setRootCause] = useState('');
  const [totalMin, setTotalMin] = useState('');
  const [carriedOut, setCarriedOut] = useState('');
  const [corrective, setCorrective] = useState('');
  const [staffData,setStaffData] = useState([]);
  const [staff, setStaff] = useState({ Id: '', Name: ''})
  const monthContext = useContext(MenuContext);

  
  useEffect(() => {
    EmployeeList()
  }, []);

  const handleClose = () => {
    monthContext.dialogClose()
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const EmployeeList = () => {

    const param =  config.configurl+`/SupportStaffList.php?Type=1`

      fetch(param)
			.then(response => response.json())
			.then(data => {
        if(data.length > 0){
          setStaffData(data)
        }
          
			});
  }
  function endAfterStart(start, end) {
    var startDate = new Date(start);
    var endDate   = new Date(end);

    return endDate.getTime() >= startDate.getTime();
} 

  const fromDatecalc = (e)=> {
    handleFromChange(e)
    
    if(endAfterStart(e, toDate)){
      let diffdate = differenceInMinutes(new Date(toDate), new Date(e)) + 1;
      setTotalMin(diffdate)
    }
  }
  const toDatecalc = (e)=> {
    handleToChange(e)

    if(endAfterStart(fromDate, e)){
      let diffdate = differenceInMinutes(new Date(e), new Date(fromDate)) + 1;
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
    if(!rootCause){
      setMessage({ open:true,color:'error',message: 'Please enter RootCause' })
      return false;
    }
    if(value === '0'){

      if(!carriedOut){
        setMessage({ open:true,color:'error',message: 'Please enter CarriedOut' })
        return false;
      }
      if(!corrective){
       
        setMessage({ open:true,color:'error',message: 'Please enter Corrective Action' })
        return false;
      }
    }
    

    let ComplaintID =  localStorage.getItem('ComplaintIDPK')
    let EmpID =  localStorage.getItem('Employeeid')

    const param1 =  config.configurl+`/SupportAnalysis.php?CCMEmployeeIDPK=${EmpID}&EmployeeID=${EmpID}&CCMComplaintID=${ComplaintID}&OberVation=${observation}&Rootcause=${rootCause}`

     fetch(param1)
    .then(response => response.json())
    .then(data => {
        if(data.success === 1){
          
        }else{
          setMessage({ open:true,color:'error',message: data.message })
          return false;
        }
        
    });

    if(val === 'test publish'){

      testPublish()
    }
    if(val === 'forward'){

      forward()
    }
    if(val === 'save'){

      save()
    }

  }

  const testPublish = () => {

    let ComplaintID =  localStorage.getItem('ComplaintIDPK')
    let EmpID =  localStorage.getItem('Employeeid')
    let fromdate = format(fromDate, 'yyyy/MM/dd hh:mm a')
    let todate = format(toDate, 'yyyy/MM/dd hh:mm a')
  

    const param2 =  config.configurl+`/SupportAnalysisUpdate.php?CCMComplaintID=${ComplaintID}&CCMStartTime=${fromdate}&CCMEndTime=${todate}&OberVation=${observation}&Rootcause=${rootCause}&EmployeeID=${EmpID}&ResolutionTime=${totalMin}&MaintenanceHrs=${totalMin}&TotalMin=${totalMin}&CorrectiveAction=${corrective}&ServiceCarriedOut=${carriedOut}&Type=TestPublish&ExecEmpID=5`

   fetch(param2)
    .then(response => response.json())
    .then(data => {
        if(data === 1){
          setMessage({ open:true,color:'success',message: 'successfully' })
          monthContext.refresh()
          handleClose();
          clear();
          return false;
        }else{
          setMessage({ open:true,color:'error',message: data })
          return false;
        }
        
    });

  }

  const forward = () => {

    let ComplaintID =  localStorage.getItem('ComplaintIDPK')
    let EmpID =  localStorage.getItem('Employeeid')
    let fromdate = format(fromDate, 'yyyy/MM/dd hh:mm a')
    let todate = format(toDate, 'yyyy/MM/dd hh:mm a')

    const param2 =  config.configurl+`/SupportAnalysisUpdate.php?CCMComplaintID=${ComplaintID}&CCMStartTime=${fromdate}&CCMEndTime=${todate}&OberVation=${observation}&Rootcause=${rootCause}&EmployeeID=${EmpID}&ResolutionTime=${totalMin}&MaintenanceHrs=${totalMin}&TotalMin=${totalMin}&CorrectiveAction=${corrective}&ServiceCarriedOut=${carriedOut}&Type=Forward&ExecEmpID=${staff.Id}`

     fetch(param2)
    .then(response => response.json())
    .then(data => {
        if(data === 1){
          setMessage({ open:true,color:'success',message: 'successfully' })
          monthContext.refresh()
          handleClose();
          clear();
          return false;
        }else{
          setMessage({ open:true,color:'error',message: data })
          return false;
        }
        
    });

    
  }

  const save = () => {

    let ComplaintID =  localStorage.getItem('ComplaintIDPK')
    let EmpID =  localStorage.getItem('Employeeid')
    let fromdate = format(fromDate, 'yyyy/MM/dd hh:mm a')
    let todate = format(toDate, 'yyyy/MM/dd hh:mm a')

    var radio = ''

    if(value === '0'){
       radio = 'AnalizeCloseYes';
      
    } if(value === '1'){
       radio = 'AnalizeCloseNo';
    }

    const param2 =  config.configurl+`/SupportAnalysisUpdate.php?CCMComplaintID=${ComplaintID}&CCMStartTime=${fromdate}&CCMEndTime=${todate}&OberVation=${observation}&Rootcause=${rootCause}&EmployeeID=${EmpID}&ResolutionTime=${totalMin}&MaintenanceHrs=${totalMin}&TotalMin=${totalMin}&CorrectiveAction=${corrective}&ServiceCarriedOut=${carriedOut}&Type=${radio}&ExecEmpID=${staff.Id}`
       fetch(param2)
    .then(response => response.json())
    .then(data => {
        if(data === 1){
          setMessage({ open:true,color:'success',message: 'successfully' })
          monthContext.refresh()
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
    setCarriedOut('');
    setCorrective('');
    setObservation('');
    setRootCause('');
    setTotalMin('');
    handleFromChange(new Date());
    handleToChange(new Date())
    setValue('1')
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
              <p className='tagpadd'>ANALYSIS CLOSE</p>
          </div>

          <div >

          <div className="myrow">
            <div className="column70" >
              <div className="myrow">
                <div className="mycolumn" >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                          autoOk
                          variant="inline"
                          inputVariant="outlined"
                          label="From"
                          fullWidth
                          format="dd-MM-yyyy hh:mm a"
                          value={fromDate}
                          InputAdornmentProps={{ position: "start" }}
                          onChange={date => fromDatecalc(date)}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div className="mycolumn" >
                     <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                          autoOk
                          variant="inline"
                          inputVariant="outlined"
                          label="To"
                          fullWidth
                          format="dd-MM-yyyy hh:mm a"
                          value={toDate}
                          minDate={fromDate}
                          InputAdornmentProps={{ position: "start" }}
                          onChange={date => toDatecalc(date)}
                        />
                     </MuiPickersUtilsProvider>
                </div>
              </div>

              <div style={{padding:'10px'}}>
                <TextField
                    id="ObserVation"
                    label="ObserVation"
                    multiline
                    fullWidth
                    rows={4}
                    value={observation}
                    onChange={(e)=>setObservation(e.target.value)}
                    variant="outlined"
                  />
              </div>
              <div style={{padding:'10px'}}>
                <TextField
                    id="RootCause"
                    label="RootCause"
                    multiline
                    fullWidth
                    rows={4}
                    value={rootCause}
                    onChange={(e)=>setRootCause(e.target.value)}
                    variant="outlined"
                  />
              </div>

            </div>

            <div className="column30" >
              <div className='myrow'>
                <div className='mycolumn'>
                <TextField
                    id="TotalMinutes"
                    label="Total Min"                    
                    disabled={true}
                    value={totalMin}
                    onChange={(e)=>setTotalMin(e.target.value)}
                    variant="outlined"
                  />
                </div>
                <div className='mycolumn'>
                <Button variant="contained" color="primary" style={{fontSize:'12px'}}>
                  view CheckPoints
                </Button>
                </div>
              </div>

              <div style={{padding:'10px'}}>
                <TextField
                    id="CarriedOut"
                    label="Carried Out"
                    multiline
                    fullWidth
                    rows={4}
                    disabled={value === '1' ? true : false}
                    value={carriedOut}
                    onChange={(e)=>setCarriedOut(e.target.value)}
                    variant="outlined"
                  />
              </div>
              <div style={{padding:'10px'}}>
                <TextField
                    id="CorrectiveAction"
                    label="Corrective Action"
                    multiline
                    fullWidth
                    rows={4}
                    disabled={value === '1' ? true : false}
                    value={corrective}
                    onChange={(e)=>setCorrective(e.target.value)}
                    variant="outlined"
                  />
              </div>

              


            </div>
          </div> 

         
        <div className='flex padd10'>
          <div className='padd10'>
                <FormControl component="fieldset" className='width100'>
                <FormLabel component="legend">INTIMATE TO</FormLabel>
                  <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <div className='flex'>
                  <FormControlLabel value="0" control={<Radio size="small" />} label="Yes" /> 
                  <FormControlLabel value="1" control={<Radio size="small" />} label="No" />
                  </div>
                  </RadioGroup>
                </FormControl>
              </div>
              <div className='padd10'>
              <Autocomplete
                id="combo-box-demo"
                options={staffData}
                onChange={(e)=>setStaff({ Id:e.NSEEMPID , Name:e.EmpName }) }
                getOptionLabel={(option) => option.EmpName}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Select Staff" variant="outlined" />}
              />
              </div>

              <div style={{padding:'1rem 2rem'}} align='right'>

              <Button variant="outlined" color="primary" onClick={()=>SaveSubmit('test publish')}>
              Test Publish
              </Button>

              <Button variant="outlined" color="primary" style={{margin:'0 1rem'}} onClick={()=>SaveSubmit('forward')}>
              forward
              </Button>

              <Button variant="outlined" color="primary" onClick={()=>SaveSubmit('save')}>
              Save
              </Button>
              </div>



        </div>















         

          </div>

          
        </div>
     
      </Dialog>
    </div>
  );
}