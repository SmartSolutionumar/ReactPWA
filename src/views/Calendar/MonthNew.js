import React, {useState,useEffect} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Icon from "@material-ui/core/Icon";
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ETAHoldUpdate from '../menu/ETA&HoldUpdate'
import ETAReworkRemarks from '../menu/ETA&ReworkRemarks'
import ReasonforPending from '../menu/ReasonForPending'
import Status from '../menu/Status'
import StartWork from '../menu/StartWork'
import AddCheckPoint from '../menu/AddCheckPoint'
import StandBy from '../menu/StandBy'
import ETAProductionDate from '../menu/ETA&ProductionDate'
import Analysis from '../menu/AnalysisClose';
import Execution from '../menu/ExecutionClose';
import UpdateTime from '../menu/UpdateTime';



import {config} from '../../config';
import {format,subMonths,addDays, startOfWeek,addMonths,isSameMonth,startOfMonth,endOfMonth, endOfWeek,isSameDay } from 'date-fns'
const { forwardRef, useImperativeHandle, createContext } = React;

export const MenuContext = createContext();


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

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



const MonthCalendar = forwardRef((props, ref) => {
  
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [open, setOpen] = React.useState(false);
    const [textevent, settextevent] = useState('');
    const [dayState, setDayState] = useState([]);
    const [closedayState, setCloseDayState] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [secPoP, setsecPoP] = useState([])
    const [ThirdPop, setThirdPop] = useState('')
    const [anchorElEveList, setAnchorElEveList] = useState(null);
    const [MenuList, setMenuList] = useState(null)
    const [anchMenuEl, setAnchMenuEl] = React.useState(null);
    const [dialogOpen, setDialogOpen] = useState(false)
    const [PopStatus, setPopStatus] = useState('')
    useEffect(() => {
        monthviewApi(currentMonth,'MONTH');
        monthviewApi(currentMonth,'CLOSE');
        localStorage.setItem('date',currentMonth);
        // eslint-disable-next-line
    }, []);

    useImperativeHandle(ref, () => ({
      Empwise : (id) => {
        monthviewApi(currentMonth,'MONTH',id);
        monthviewApi(currentMonth,'CLOSE',id);
        // alert(id);
      },
      Prev : (id) => {
        prevMonth(id);
        
      },
      Next : (id) => {
        nextMonth(id);
    }
  
    }));

    const nextMonth = (EMPID) => {
      const next = addMonths(currentMonth, 1)
      monthviewApi(next,'MONTH',EMPID);
      monthviewApi(next,'CLOSE',EMPID);
      setCurrentMonth(next)
      localStorage.setItem('date',next)
    };
  
    const prevMonth = (EMPID) => {
      
      const prev = subMonths(currentMonth, 1)
      monthviewApi(prev,'MONTH',EMPID);
      monthviewApi(prev,'CLOSE',EMPID);
      setCurrentMonth(prev)
      localStorage.setItem('date',prev)
     
    };

    // const openTask = (event) => {
    //   event.stopPropagation();
    // }
    // const closeTask = (event) => {
    //   event.stopPropagation();
    // }

    const monthviewApi = (month,type,EmpID) => {

        let current = format(month, 'yyyy/MM/dd') //localStorage.getItem('Employeeid')

        const url = config.configurl+`/SupportnewCalander.php?ColumnIndex=3&value=null&EMPID=${EmpID ? EmpID : localStorage.getItem('Employeeid')}&WoDate=${current}&QueryType=${type}`
        fetch(url).then(response => response.json())
        .then(data => {
          if(data.length > 0){
             
            if(type === 'CLOSE'){
              const arrFilter =  getUniqueListBy(data, 'LogDate')

              var arrcls = []
              arrFilter.map(a => {

                var arrEvntcls = data.filter(f=> f.LogDate === a.LogDate)

                arrcls.push({
                  day  : a.LogDate.split("-")[0],
                  month: a.LogDate.split("-")[1],
                  year: a.LogDate.split("-")[2],
                  events: arrEvntcls
                })
                return null;
              })
            }else{
              const arrFilter =  getUniqueListBy(data, 'DeliveryDate')

              var arr = []
              arrFilter.map(a => {

                var arrEvnt = data.filter(f=> f.DeliveryDate === a.DeliveryDate)

                arr.push({
                  day  : a.DeliveryDate.split("-")[0],
                  month: a.DeliveryDate.split("-")[1],
                  year: a.DeliveryDate.split("-")[2],
                  events: arrEvnt
                })
                return null;
              })
            }
           
           if(type === 'MONTH'){
            setDayState(arr)
           }else{
            setCloseDayState(arrcls)
           }
           
           setAnchorElEveList(null);
           setAnchMenuEl(null);
          }
        });
    }
  function reverse(s){
      return s.split("-").reverse().join("-");
  }
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }
  // const calcPercentage = (a) => {

  //   if(Number(a) > 0){
  //       return Math.round((Number(a) / 420) * 100)
  //   }

  // }
  
  function renderDays() {
    const dateFormat = "eee";
    const days = [];

    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center daynames" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  const handlePoplist = (event,params,pop,status) => {
    event.stopPropagation();

    if(status){
      setPopStatus(status)
    }
   

        if(pop){
          setAnchorEl(event.currentTarget);
          setsecPoP(params)
        }else{
          setAnchorElEveList(event.currentTarget);
          setThirdPop(params)
          localStorage.setItem('ComplaintIDPK', params[0].ComplaintIDPK); 
          localStorage.setItem('ComplaintNo', params[0].ComplaintNo); 

        }

        
        
        // const result = params.map(function(el) {
        //   let o = Object.assign({}, el);
        //   o.day = day;
        //   return o;
        // })
     
  }

  const eventBinding = (day, monthStart) => {
    const FilrMon = dayState.filter(m =>m.month === format(currentMonth, "MM"));
    const listday = format(day,'dd');
    
    const dayfilt = FilrMon.filter(n => n.day === listday);
    // console.log(dayfilt,"Nalysis")
 
   
    if(dayfilt.length === 0){ return false}
    
      if(isSameMonth(day, monthStart)){
          if(dayfilt.length > 0){
           
              if(dayfilt[0].events.length > 0 ){
                var arr = [];
                var per = '';
                dayfilt[0].events.map(d => {
                  arr.push(Number(d.ManMinPer));
                  return null;
                })
                per = arr.reduce((a, b) => a + b, 0);
                
                if(dayfilt[0].events.length > 3 ){
                  
                return dayfilt[0].events.slice(0,4).map((en,i) => {
                  if(i < 2){
                    return(<span key={i}><span className="openperc">{per ? per+"%" : "?"}</span><div className={`tagday ${'bg'+en.TicketType}`} title={en.TicketType+" - "+en.ComplaintNo +'\n'+en.ContractName+'\n'+ en.RequestDetailsDesc} onClick={(event)=>handlePoplist(event,[en],false,'open')} ><Icon className="ExeIcon">{en.CCMStage === '1' ? 'timeline' : 'autorenew'}</Icon>{en.TaskType+" - "+en.RequestDetailsDesc} </div></span> )  
                                   
                  }
                   
                    else if(i === 3){
                        return(<div key={i} className='tagdaymore' onClick={(event)=>handlePoplist(event,dayfilt[0].events,true,'open')} >+{ dayfilt[0].events.length - 2 +' more'}</div> )                  
                    }
                    return null;
                  })

                }else{
                
                return dayfilt[0].events.slice(0,4).map((en,i) => <span key={i}><span className="openperc">{en.ManMinPer ? en.ManMinPer+"%" : "?"}</span><div key={i} className={`tagday ${'bg'+en.TicketType}`} title={en.TicketType+" - "+en.ComplaintNo +'\n'+en.ContractName+'\n'+ en.RequestDetailsDesc} onClick={(event)=>handlePoplist(event,[en],false,'open')}><Icon className="ExeIcon">{en.CCMStage === '1' ? 'timeline' : 'autorenew'}</Icon>{en.TaskType+" - "+en.RequestDetailsDesc}</div></span> )
                
                }
              }

            }
          }

      }

      const closeEventBind = (day, monthStart) => {
        const FilrMon = closedayState.filter(m =>m.month === format(currentMonth, "MM"));
        const listday = format(day,'dd');
        
        const dayfilt = FilrMon.filter(n => n.day === listday);
        // console.log(dayfilt,"Closed")
        if(dayfilt.length > 0){
          // if(dayfilt[0].events.length > 0){
            console.log(dayfilt[0].events,'ClosedSU')
          // }
        }
       
        if(dayfilt.length === 0){ return false}
        
          if(isSameMonth(day, monthStart)){
              if(dayfilt.length > 0){
               
                  if(dayfilt[0].events.length > 0 ){

                    var arr = [];
                    var per = '';
                    dayfilt[0].events.map(d => {
                      arr.push(Number(d.UtilizePer));
                      return null;
                    })
                    per = arr.reduce((a, b) => a + b, 0);
                    return dayfilt[0].events.slice(0,1).map((en,i) => 
                     
                      <span key={i} className={`spnclose ${ per > 100 ? 'moreperc' : '' }`} badge={dayfilt[0].events.length} onClick={(e)=> handlePoplist(e,dayfilt[0].events,true,'closed')}>{per}%</span>
                    )
                    
                  }
    
                }
              }
    
          }


  function renderCells() {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate) ? "selectednull" : ""
            }`}
            key={day}
            // eslint-disable-next-line no-loop-func
            onClick={() => { onDateClick(cloneDay,formattedDate) }}
          >
            <span className={`number ${isSameDay(day, selectedDate) ? "selectdt" : ""}`}>{formattedDate}</span>
            
            {closeEventBind(cloneDay,monthStart)}
            <div style={{marginTop:'1.9rem'}}> 

            {eventBinding(cloneDay,monthStart)}
           
            
            </div>
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
    }
    return <div className="body">{rows}</div>;
  }

  const onDateClick = (day) => {
    setSelectedDate(day)
    setOpen(true);
    
  };

 

  const handleClose = (params) => {
    setOpen(false);
    if(!textevent){ return false }
    if(params === 'save'){
      const slDate = format(selectedDate, "d");
      const prev = dayState.filter(ev => ev.day === slDate);

      if(prev.length > 0){

        let newArray = dayState;
        // eslint-disable-next-line no-new-object
        let editData = new Object();
        editData = { 
          day  : prev[0].day,
          month: prev[0].month,
          events: prev[0].events.concat([{ tag: textevent }])
        }

        const newData = [...newArray];

        const index = newData.findIndex(item => item.day === slDate);

        const item = newData[index];

        newData.splice(index, 1, { ...item, ...editData });

        setDayState(newData)
        settextevent('')

      }else{

        // eslint-disable-next-line no-new-object
        let editData = new Object();
        editData = { 
          day  : slDate,
          month: format(currentMonth, "MM"),
          events: [{ tag: textevent }]
        }

        const newarr = dayState.concat([editData])

        setDayState(newarr);
        settextevent('')
        }

      }
     

  }
      // const handleClickPOP = (event,params,day) => {
      //   event.stopPropagation();
      //   setAnchorEl(event.currentTarget);
      //   const result = params.map(function(el) {
      //     let o = Object.assign({}, el);
      //     o.day = day;
      //     return o;
      //   })

      //   setsecPoP(result)
      
      // }
      const handleClosepop = () => {
        setAnchorEl(null);
      };

      const openPop = Boolean(anchorEl);
      const id = openPop ? 'simple-popover' : undefined;

      const openEveList = Boolean(anchorElEveList);
      const idEveList = openEveList ? 'simple-popover' : undefined;
    
      // const handleClickEveList = (event,params) => {
      //   event.stopPropagation();
      //   setAnchorElEveList(event.currentTarget);
      //   setThirdPop(params.tag)
        
       
      // }

      const handleCloseEveList = () => {
        setAnchorElEveList(null);
      };

      const handleClickMenu = (event) => {
        // console.log(event.currentTarget)
        setAnchMenuEl(event.currentTarget);
      };
      const handleCloseMenu = (val) => {

        if(val){
          setDialogOpen(true)
        }
        setAnchMenuEl(null);
        setMenuList(val)
      };

    return (
      <div className="calendar"  >
  
          <div>
           
        { renderDays() }
        { renderCells() }
          </div>
        
        
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


      <Popover
        id={id}
        open={openPop}
        anchorEl={anchorEl}
        onClose={handleClosepop}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <div style={{padding:'0.6rem'}}>
          <div>
            <div style={{textAlign:'center'}}>
              <span className='headerday'>{secPoP.length > 0 &&  format(new Date(reverse(PopStatus === 'open' ? secPoP[0].DeliveryDate : secPoP[0].LogDate)), 'eee')  }</span>
              <div style={{float:'right'}}><CloseIcon style={{width:'17px'}} onClick={handleClosepop}/></div>
            </div>

            <div className='subTitpopDate'> {secPoP.length > 0 && (PopStatus === 'open' ? secPoP[0].DeliveryDate.split('-')[0] : secPoP[0].LogDate.split('-')[0]) }</div>

          </div>
          
            <div style={{width:'210px'}}>
          <div >
                {
                  secPoP.length > 0 &&
                  
                  secPoP.map((ev, i) => { 
                    return (<div key={i} className={`tagday ${'bg'+ev.TicketType}`} title={ev.TicketType+" - "+ev.ComplaintNo +'\n'+ev.ContractName+'\n'+ ev.RequestDetailsDesc} onClick={(e)=> handlePoplist(e,[ev],false)}><Icon className="ExeIcon">{ev.CCMStage === '1' ? 'timeline' : 'autorenew'}</Icon>{ev.TaskType+" - "+ev.RequestDetailsDesc}</div> )  
                    /* <span className='fright'>{ev.ManMin}</span>    */
                  
                  })

                } 
          </div>
          </div>

       
        </div>
        
      </Popover>

      <Popover
        id={idEveList}
        open={openEveList}
        anchorEl={anchorElEveList}
        onClose={handleCloseEveList}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div style={{padding:'0.6rem',width:'20rem'}}>
        
        <div style={{float:'right'}}>
          
          {
            PopStatus === 'open' && 
            <MenuIcon className='menuIcpnpos' onClick={handleClickMenu} />
          }
          <CloseIcon style={{width:'17px'}} onClick={handleCloseEveList}/>
          </div>

        {ThirdPop.length > 0 &&
        ThirdPop.map((a,i)=>(
              <div key={i}>
              <div  className='flex'>
              <p className='poplistlf'>ComplainedDate</p> 
              <p className='poplistlr'>{a.ComplainedDate} </p>
              </div>

              <div  className='flex'>
              <p className='poplistlf'>ComplaintNo</p> 
              <p className='poplistlr'>{a.ComplaintNo} </p>
              </div>

              <div  className='flex'>
              <p className='poplistlf'>ContractName</p> 
              <p className='poplistlr'>{a.ContractName} </p>
              </div>

              <div  className='flex'>
              <p className='poplistlf'>RequestDetailsDesc</p> 
              <p className='poplistlr'>{a.RequestDetailsDesc} </p>
              </div>

              <div  className='flex'>
              <p className='poplistlf'>{PopStatus === 'open' ? 'ManMin' : 'UtilizedMin'}</p> 
              <p className='poplistlr'>{PopStatus === 'open' ? a.ManMin: a.UtilizMins} </p>
              </div>

              <div  className='flex'>
              <p className='poplistlf'>ETA</p> 
              <p className='poplistlr'>{a.ETA} </p>
              </div>

              <div  className='flex'>
              <p className='poplistlf'>PriorityName</p> 
              <p className='poplistlr'>{a.PriorityName} </p>
              </div>

              </div>
        ))
      }
        


        </div>
      
        
      </Popover>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchMenuEl}
        keepMounted
        open={Boolean(anchMenuEl)}
        onClose={handleCloseMenu}
      >
        <StyledMenuItem onClick={()=>handleCloseMenu('Hold Remarks')}>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Hold Remarks" />
        </StyledMenuItem>
        <StyledMenuItem onClick={()=>handleCloseMenu('Rework Remarks') }>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Rework Remarks" />
        </StyledMenuItem>
        <StyledMenuItem onClick={()=>handleCloseMenu('ETA & Production Date') }>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="ETA & Production Date" />
        </StyledMenuItem>
        <StyledMenuItem onClick={()=>handleCloseMenu('Analysis Close') }>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Analysis Close" />
        </StyledMenuItem>
        <StyledMenuItem onClick={()=>handleCloseMenu('Reason for Pending')}>
          <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Reason for Pending" />
        </StyledMenuItem>

        <StyledMenuItem onClick={()=>handleCloseMenu('Status')}>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Status" />
        </StyledMenuItem>
        <StyledMenuItem onClick={()=>handleCloseMenu('Update Time')}>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Update Time" />
        </StyledMenuItem>
        <StyledMenuItem onClick={()=>handleCloseMenu('Add CheckPoints')}>
          <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Add CheckPoints" />
        </StyledMenuItem>
      

      <StyledMenuItem onClick={()=>handleCloseMenu('Execution Close')}>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Execution Close" />
        </StyledMenuItem>
        <StyledMenuItem onClick={()=>handleCloseMenu('Start Work')}>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Start Work" />
        </StyledMenuItem>
        <StyledMenuItem onClick={()=>handleCloseMenu('StandBy')}>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="StandBy" />
        </StyledMenuItem>

    </StyledMenu>

    <MenuContext.Provider value={{ 
          value:'monthview',
          dialogClose: () => setDialogOpen(false),
          refresh: () => {monthviewApi(currentMonth,'MONTH');monthviewApi(currentMonth,'CLOSE')},
        }}>
    
    {
      MenuList === 'Hold Remarks' && <ETAHoldUpdate open={dialogOpen}/>
    }
    {
      MenuList === 'Rework Remarks' && <ETAReworkRemarks open={dialogOpen} />
    }
    {
      MenuList === 'ETA & Production Date' && <ETAProductionDate open={dialogOpen}/>
    }
    {
      MenuList === 'Reason for Pending' && <ReasonforPending open={dialogOpen} />
    }
    {
      MenuList === 'Status' && <Status open={dialogOpen}/>
    }
    {
      MenuList === 'Add CheckPoints' && <AddCheckPoint open={dialogOpen}/>
    }
    {
      MenuList === 'Start Work' && <StartWork open={dialogOpen}/>
    }
    {
      MenuList === 'StandBy' && <StandBy open={dialogOpen}/>
    }
    {
      MenuList === 'Analysis Close' && <Analysis open={dialogOpen}/>
    }
    {
      MenuList === 'Execution Close' && <Execution open={dialogOpen}/>
    }
    {
      MenuList === 'Update Time' && <UpdateTime open={dialogOpen}/>
    }


    </MenuContext.Provider>


      </div>
    );
  
})

export default MonthCalendar;
