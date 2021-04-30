import React,{useState,useEffect} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {todayHrs, todayHours} from './dayjson'
import { format,subDays,addDays,startOfWeek,isSameMonth,startOfMonth,endOfMonth,isSameDay,startOfDay } from 'date-fns'
const { forwardRef, useImperativeHandle } = React;

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Day = forwardRef((props, ref) => {

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHrs, setSelectedHrs] = useState({time:'', date:'', index: ''})
    const [open, setOpen] = React.useState(false);
    const [textevent, settextevent] = useState('');
    const [dayState, setDayState] = useState(todayHrs);
  
   
  const onDateClick = (day,selDate) => { }

  useImperativeHandle(ref, () => ({

    Prev : () => {
      prevDays();
    },
    Next : () => {
      nextDays();
  }

  }));


  const nextDays = () => {
    setCurrentMonth(addDays(currentMonth, 1))
  };

  const prevDays = () => {
    setCurrentMonth(subDays(currentMonth, 1))
  };

function renderDays() {
    const dateFormat = "eee";
    const days = [];

    let startDate = startOfDay(currentMonth);

    for (let i = 0; i < 1; i++) {
      days.push(
        <div className="odcol wcol-center daynames" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="wdays row">{days}</div>;
  }

  function renderCells() {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);


    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = currentMonth;
    let formattedDate = "";

      for (let i = 0; i < 1; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div 
            className={`col weecell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate) ? "selectednull" : ""
            }`}
            key={i}
            onClick={() => {onDateClick(cloneDay,formattedDate) }}
          >
            <span className={`wnumber ${isSameDay(day, selectedDate) ? "dselectdt" : ""}`}>{formattedDate}</span>
            </div>
        );
        
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    return <div className="wbody">{rows}</div>;
  }


function renderCellsHours() {
const startDate = startOfWeek(new Date());

const dateFormat = "d";
const rows = [];

let days = [];
let formattedDate = "";

dayState.map((val,f) => {
  let day = currentMonth;
  for (let i = 0; i < 1; i++) {
    formattedDate = format(day, dateFormat);
    days.push(
      <div id={formattedDate+' index-'+f} style={{ flexBasis: '100%'}} onClick={(e)=> { handleClick(e) }}
        className={`col wcell`}
        key={i} >
        <div >
          {
            val.events.length > 0 && 
            val.events.map((en) => (<div className='tagday'>{en.name}</div>))
          }
          </div>
        </div>
    );
    
    day = addDays(day, 1);
  }
  

  rows.push(
    <div id={todayHours[f]} className="row" key={f}>
      {days}
    </div>
  );
  days = [];
})

return <div className="wbody">{rows}</div>;
}

const renderTimes = () => {
  let days = [];
  const rows = [];
  for (let i = 0; i < todayHours.length; i++) {

      days.push(
        <div
          className={`col wcell`}
          key={i} >
          <span className={`wnumber`}>{todayHours[i]}</span>
          </div>
      );
      
    rows.push(
      <div className="row rowpadd" key={i}>
        {days}
      </div>
    );
    days = [];
    }
  return <div className="wbody">{rows}</div>;
}

const handleClick = (e) => {
  let pDoc = document.getElementById(e.target.id);
  let dateval =  pDoc['id'].split(" ")[0];
  let indexval =  pDoc['id'].split(" ")[1].split('-')[1];
  let time = pDoc.parentNode.id

  setSelectedHrs({ time : time, date: dateval, index: indexval})
  setOpen(true)

}

const handleClose = (params) => {
  setOpen(false);
  if(params == 'save'){
    const prev = dayState.filter(ev => ev.time == selectedHrs.time);

        var newArray = dayState;
        var editData = new Object();
        editData = { 
          time  : prev[0].time,
          date  : selectedHrs.date,
          events: prev[0].events.concat([{ name: textevent }])
        }

        const newData = [...newArray];

        const index = newData.findIndex(item => item.time == selectedHrs.time);

        const item = newData[index];

        newData.splice(index, 1, { ...item, ...editData });

        setDayState(newData)
        settextevent('')
  }

}

return (
  <div >
    <div className='dayhours'>
        {renderTimes()}
    </div>
 
      <div className="wcalendar" style={{float: 'right',width:'95%'}} >

      
        { renderDays() }
        { renderCells() }
        {renderCellsHours()}
          
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Event
        </DialogTitle>
        <DialogContent dividers style={{minWidth:'500px'}}>

        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Events"
            type="text"
            value={textevent}
            onChange={(e)=> settextevent(e.target.value)}
            fullWidth
          />
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>handleClose('save')} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

       
         
      </div>
  </div>
)
})
export default Day;