import React, { useState,useEffect,createContext }  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from "@material-ui/core/Icon";
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import ChartLoader from '../assets/img/Chartloader.gif';

import CardContent from '@material-ui/core/CardContent';
import ReactExport from "react-export-excel";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import 'date-fns';
import MultipleDatePicker from 'react-multiple-datepicker';
import DateFnsUtils from '@date-io/date-fns'; 
import InboxIcon from '@material-ui/icons/MoveToInbox'; 
import SendIcon from '@material-ui/icons/Send';
import PaymentIcon from '@material-ui/icons/Payment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker, 
} from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input'; 
// import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Spinner from './Spinner';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppBar from '@material-ui/core/AppBar'; 
import Grid from "@material-ui/core/Grid";
import '../../src/App.css';
import {config} from '../../src/config.js';
// import {Grid item} from "@material-ui/core/Grid item";
// import {Grid container} from "@material-ui/core/Grid container";
// import CanvasJSReact from '../assets/canvasjs.react';
import { makeStyles } from '@material-ui/core/styles';
// import Smartfm from '../assets/img/smartfm.png';
import Nanosoft from '../assets/img/nanosoft .png';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ConChart from './ConChart';
import EmpChart from './EmpChart';
// import EmpStatchart from './EmpStatchart';
// import EmpEttchart from './EmpEttchart';
// import EmpETAchart from './EmpETAchart';
import MonthlyChart from './MonthlyChart';
import MonthlyChartDR from './MonthlyChartDR';
import MonthlyChartCR from './MonthlyChartCR';
import MonthlyChartNR from './MonthlyChartNR';
import MonthlyChartOTH from './MonthlyChartOTH';
import EmpTaskchart from './EmpTaskchart';
import Holdchart from './Holdchart';
import NewCalendar from '../views/Calendar/Calendar';
import Menu from '@material-ui/core/Menu'; 
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ETAHoldUpdate from '../views/menu/ETA&HoldUpdate'
import ETAReworkRemarks from '../views/menu/ETA&ReworkRemarks'
import ReasonforPending from '../views/menu/ReasonForPending'
import Status from '../views/menu/Status'
import StartWork from '../views/menu/StartWork'
import AddCheckPoint from '../views/menu/AddCheckPoint'
import StandBy from '../views/menu/StandBy'
import ETAProductionDate from '../views/menu/ETA&ProductionDate'
import Analysis from '../views/menu/AnalysisClose';
import Execution from '../views/menu/ExecutionClose';
import UpdateTime from '../views/menu/UpdateTime';
import UpdatePayment from '../views/menu/UpdatePayment';
import StaffAssign from '../views/menu/StaffAssign';

import GridView from '../views/Task/Tableview'


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export const SimpleMenuContext = createContext();
export const SimpleContext = createContext();

// var CanvasJSChart = CanvasJSReact.CanvasJSChart; 
// import Chart from "react-apexcharts";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  tablecell: {
    color: '#fff',
    padding: '8px',
    fontWeight: '600',
    borderRight: '2px solid #ccc',
    fontSize: '13px',
    textAlign: 'center',
    background: '#337ab7'
    
  },
  cellbody: {
    fontSize: '10px',
    fontWeight: '600'
    
  },
  tablesum:{
    height: '25vh',
    boxShadow: 'none',
  },
  tableroot:{
    // ['@media (max-width:950px)'] :{
    //   height: '60vh',
    // },
    height: '40vh',
    boxShadow: 'none',
  },
  marginleft: {
    marginleft:'10px'
  }
 
}));
 
const styles = {
  card: {
    minWidth: 50,
    width:'70%',
    height:'50%',
    margin:'6px 13px'
    
    
  },

  appbar : {

    textAlign:'center',
    fontSize:'25px',  
    fontWeight:'bold',
    backgroundColor:'#2183B0',
    color:'#fff',
    fontStyle:'Roboto,san-serif',
    padding:'5px'
  },
  

  header : {
    fontSize: 8,
    textAlign:'center',
    fontWeight:'bold',
    // backgroundColor:'#1890fff2',
    backgroundColor:'rgb(52, 73, 94)',
    color:'#fff',
    padding: '5px',
  },
 
  title: {
    
    fontSize: 14,
    textAlign:'center',
    fontWeight:'bold',
  },

  height : {
    height: '47vh'
  },


values : {
    fontSize:14,
    textAlign:'left',
    fontWeight:'bold',

    padding:0,
    margin:0
},
};


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



function SimpleCard(props) {
  var UserID = localStorage.getItem('userid');

  const classuse = useStyles();
  const { classes } = props;
  const [loading,setLoading] = useState(false);
  const [formloading,setformLoading] = useState(false);
  const [Sumdet,setSumdet] = useState([]);
  const [Formtitle,setFormtitle] = useState('');
  const [Filtertitle,setFiltertitle] = useState('');
  const [chartchange,setchartchange] = useState(true);
  const [Headval,setHeadval] = useState('DR'); 
  const [refresh,setrefresh] = useState(false);


  const [ContChartLive,setContChartLive] = useState([]);
  const [ContChartAMC,setContChartAMC] = useState([]);
  const [ContChartIMP,setContChartIMP] = useState([]);
  const [ContChartOther,setContChartOther] = useState([]);
 
  const [ContChartDRHold,setContChartDRHold] = useState([]);
  const [ContChartCRHold,setContChartCRHold] = useState([]);
  const [ContChartNRHold,setContChartNRHold] = useState([]);
  const [ContChartOtherHold,setContChartOtherHold] = useState([]);

  const [AllconChartLiveDR,setAllconChartLiveDR] = useState([]);
  const [AllconChartAMCDR,setAllconChartAMCDR] = useState([]);
  const [AllconChartIMPDR,setAllconChartIMPDR] = useState([]);
  const [AllconChartOtherDR,setAllconChartOtherDR] = useState([]);
  const [AllconChartLiveCR,setAllconChartLiveCR] = useState([]);
  const [AllconChartAMCCR,setAllconChartAMCCR] = useState([]);
  const [AllconChartIMPCR,setAllconChartIMPCR] = useState([]);
  const [AllconChartOtherCR,setAllconChartOtherCR] = useState([]);
  const [AllconChartLiveNR,setAllconChartLiveNR] = useState([]);
  const [AllconChartAMCNR,setAllconChartAMCNR] = useState([]);
  const [AllconChartIMPNR,setAllconChartIMPNR] = useState([]);
  const [AllconChartOtherNR,setAllconChartOtherNR] = useState([]);
  const [AllconChartLiveOTH,setAllconChartLiveOTH] = useState([]);
  const [AllconChartAMCOTH,setAllconChartAMCOTH] = useState([]);
  const [AllconChartIMPOTH,setAllconChartIMPOTH] = useState([]);
  const [AllconChartOtherOTH,setAllconChartOtherOTH] = useState([]);

  const [EmpChartLive,setEmpChartLive] = useState([]);
  const [EmpChartAMC,setEmpChartAMC] = useState([]);
  const [EmpChartIMP,setEmpChartIMP] = useState([]);
  const [EmpChartOther,setEmpChartOther] = useState([]);
  
  // const [ETAToday,setETAToday] = useState([]);
  // const [ETAtype,setETAtype] = useState('today');
  // const [ETACharttoday,setETACharttoday] = useState([]);
  // const [ETAChartnext,setETAChartnext] = useState([]);
  // const [EmpWise,setEmpWise] = useState([]);
  // const [ConSummry,setConSummry] = useState([]);
  // const [ConStawise,setConStawise] = useState([]);
  // const [ConOD,setConOD] = useState([]);
  // const [EmpContractDR,setEmpContractDR] = useState([]);
  // const [EmpContractCR,setEmpContractCR] = useState([]);
  // const [EmpContractNR,setEmpContractNR] = useState([]);
  // const [CriticalPriority,setCriticalPriority] = useState([]);
  // const [HighPriority,setHighPriority] = useState([]);
  // const [MediumPriority,setMediumPriority] = useState([]);
  // const [LowPriority,setLowPriority] = useState([]);
  // const[ContractWise,setContractWise] = useState([]);
  const[Countdata,setCountdata] = useState(0);
  const [Slidedata,setSlidedata] = useState([]);
  const [Slidedataserch,setSlidedataserch] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [Message,setMessage] = useState('');
  const [msgColor,setmsgColor] = useState('');
  const [ConTypeFil,setConTypeFil] = useState(2);
  // const [EmpWorkhrs,setEmpWorkhrs] = useState([]);
  // const [EmpEtt,setEmpEtt] = useState([]);
  // const [EmpETA,setEmpETA] = useState([]);
  // const [EmpTodayETA,setEmpTodayETA] = useState([]);
  // const [EmpTodaywork,setEmpTodaywork] = useState([]);
  // const [EmpETAtype,setEmpETAtype] = useState('todayETA');

  const [EmpTaskDet,setEmpTaskDet] = useState([]);
  const [EmpConsol,setEmpConsol] = useState([]);
  const [chartMonthTot,setchartMonthTot] = useState([]);
  const [chartMonthOpn,setchartMonthOpn] = useState([]);
  const [chartMonthCls,setchartMonthCls] = useState([]);
  const [chartMonthTotDR,setchartMonthTotDR] = useState([]);
  const [chartMonthOpnDR,setchartMonthOpnDR] = useState([]);
  const [chartMonthClsDR,setchartMonthClsDR] = useState([]);
  const [chartMonthTotCR,setchartMonthTotCR] = useState([]);
  const [chartMonthOpnCR,setchartMonthOpnCR] = useState([]);
  const [chartMonthClsCR,setchartMonthClsCR] = useState([]);
  const [chartMonthTotNR,setchartMonthTotNR] = useState([]);
  const [chartMonthOpnNR,setchartMonthOpnNR] = useState([]);
  const [chartMonthClsNR,setchartMonthClsNR] = useState([]);
  const [chartMonthTotOTH,setchartMonthTotOTH] = useState([]);
  const [chartMonthOpnOTH,setchartMonthOpnOTH] = useState([]);
  const [chartMonthClsOTH,setchartMonthClsOTH] = useState([]);

  const [btnopen, setbtnOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(2);

  const [Ovropen, setOvrOpen] = React.useState(false);
  const OvrallRef = React.useRef(null); 
  const [OvrallIndex, setOvrallIndex] = React.useState(0);

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedDate2, setSelectedDate2] = React.useState(new Date());
  const Frommon = selectedDate.getMonth()+1; 
  const Tomon = selectedDate2.getMonth()+1; 
  var Fromdate = selectedDate.getDate()+"-"+Frommon+"-"+selectedDate.getFullYear() ;
  var Todate = selectedDate2.getDate()+"-"+Tomon+"-"+selectedDate2.getFullYear() ;
  const Curmon = new Date().getMonth()+1; 
  var Curdate = new Date().getDate()+"-"+Curmon+"-"+new Date().getFullYear() ;
  // const [selectedMonth, setSelectedMonth] = React.useState(new Date());
  const [filteropen,setfilteropen] = useState(false);
  const [slideType,setslideType] = useState('');
  const [exportItem,setexportItem] = useState([]);
  const [Empvalue, setEmpValue] = React.useState(null);
  const [EmpID, setEmpID] = React.useState(null);
  const [Contractvalue, setContractValue] = React.useState(null);
  const [ContractID, setContractID] = React.useState(null);
  const [EmpUpTaskDR,setEmpUpTaskDR] = React.useState([]);
  const [EmpUpTaskCR,setEmpUpTaskCR] = React.useState([]);
  const [EmpUpTaskNR,setEmpUpTaskNR] = React.useState([]);
  const [EmpUpTaskOTH,setEmpUpTaskOTH] = React.useState([]);
  const [Empoption, setEmpoption] = React.useState([]);
  const [Contoption, setContoption] = React.useState([]);
  const [TotproCR, setTotproCR] = React.useState('');
  const [TotproDR, setTotproDR] = React.useState('');
  const [TotproNR, setTotproNR] = React.useState('');
  const [TotproOther, setTotproOther] = React.useState('');
  const [WOtypeID,setWOtypeID] = React.useState('1');
  const [natureval,setnatureval] = React.useState('');
  const [ContID,setContID] = React.useState(''); 
  const [LocID,setLocID] = React.useState('');
  const [BuildID,setBuildID] = React.useState('');
  // const [priorID,setpriorID] = React.useState('');
  const [DivID,setDivID] = React.useState('');
  const [Descval,setDescval] = React.useState('');
  const[Localtime,setLocaltime] = React.useState('');

  const [personName, setPersonName] = React.useState([]);
  const [EmployeeName, setEmployeeName] = React.useState([]);
  const [multiEmp, setmultiEmp] = React.useState('');
  const [ProDate, setProDate] = React.useState([]);
  const [EndDate, setEndDate] = React.useState(null);

  const [tastView, setTastView] = useState(true);
  const [Calendarview, setCalendarview] = useState(false);

  const [SuperUser,setSuperUser] = useState(false);

  // menu
  const [anchMenuEl, setAnchMenuEl] = React.useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [MenuState, setMenuState] = useState(null);
  const [PaymentRow, setPaymentRow] = useState('');

  const handleCloseMenu = (val) => {

    if(val){
      setDialogOpen(true)
    }
    setAnchMenuEl(null);
    setMenuState(val)
    
  };

  
  const handleChange = (event,index) => { 
    // evt.currentTarget.getAttribute("data-name")
    setEmployeeName(e => [...e,index.props.children])  
    setPersonName(event.target.value);
    setmultiEmp(event.target.value.toString())
  };

  const defaultProps = {
    options: Empoption,
    getOptionLabel: (option) => option.EmpName,
  };

  const defaultProps2 = {
    options: Contoption,
    getOptionLabel: (option) => option.ContractName,
  };

  let columnIndex =  ["ComplaintNo","Date","ETA Date","ETA Time","Ageing","ContractName","RegisteredBy","Description","Priority","ANAName","EXEName","StageName"];
  
  const exportData = [
    {
        columns: columnIndex ,
        data:   exportItem
    }
    ];


  const handleDateChange = (date) => {
    // console.log("Date",date)
    setSelectedDate(date);
  };

  const handleEndDateChange = (date) => {
    // console.log("Date",date)
    
    setEndDate(date);
  };

  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
  };



  const btnoptions = ['All', 'V2', 'V3','B2C','Multicom','V4', 'Spare Square', 'Smart Billing', 'SmartFM Xceed', 'SmartFM Sales'];
  const Ovropt = ['ContractWise', 'OverAll'];

  const handleClick = () => {
    // console.log(`You clicked ${btnoptions[selectedIndex]}`);
  };

  const OvrallClick = () => {
    // console.log(`You clicked ${Ovropt[OvrallIndex]}`);
  };
  const openCalendar = () => {
    document.getElementById("calendarslide").style.width = "97vw";
    setCalendarview(true);
  }

  const handleMenuItemClick = (event, index) => {

    
    setSelectedIndex(index);
    setConTypeFil(index);
    setbtnOpen(false);
  };

  const OvrMenuItemClick = (event, index) => {
    setOvrallIndex(index);
    setOvrOpen(false);
    setSelectedIndex(0);
    setConTypeFil(0);
    if(index === 0){
      setContChartLive(ContChartLive)
      setContChartAMC(ContChartAMC)
      setContChartIMP(ContChartIMP)
      setContChartOther(ContChartOther)
    }else{
      if(Headval === 'DR'){
        setContChartLive(AllconChartLiveDR)
        setContChartAMC(AllconChartAMCDR)
        setContChartIMP(AllconChartIMPDR)
        setContChartOther(AllconChartOtherDR)
      }if(Headval === 'CR'){
        setContChartLive(AllconChartLiveCR)
        setContChartAMC(AllconChartAMCCR)
        setContChartIMP(AllconChartIMPCR)
        setContChartOther(AllconChartOtherCR)
      }if(Headval === 'NR'){
        setContChartLive(AllconChartLiveNR)
        setContChartAMC(AllconChartAMCNR)
        setContChartIMP(AllconChartIMPNR)
        setContChartOther(AllconChartOtherNR)
      }if(Headval === 'OTH'){
        setContChartLive(AllconChartLiveOTH)
        setContChartAMC(AllconChartAMCOTH)
        setContChartIMP(AllconChartIMPOTH)
        setContChartOther(AllconChartOtherOTH)
      }
      
    }
    
  };

  const handleToggle = () => {
    setbtnOpen((prevOpen) => !prevOpen);
  };

  const OvrallToggle = () => {
    setOvrOpen((prevOvrOpen) => !prevOvrOpen);
  };

  const handlebtnClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setbtnOpen(false);
  };

  const OvrbtnClose = (event) => {
    if (OvrallRef.current && OvrallRef.current.contains(event.target)) {
      return;
    }

    setOvrOpen(false);
  };
   
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setMessage(Message);
    setmsgColor(msgColor);
  };

// Canvas Charts
  // const options = {
  //   height: 200,
  //     animationEnabled: true,
  //       toolTip: {
  //         shared: true
  //       },
        
  //       axisX : {
  //         gridThickness:0, 
  //       },
  //       axisY:{
  //         gridThickness: 0
  //       },
  //       data: [
  //     {
  //         indexLabel: "{y}",
  //         indexLabelPlacement: "outside", 
  //         indexLabelFontSize:9,
  //         indexLabelFontWeight:800,  
  //         type: "column",
  //         name: "P1 - Critical",
  //         legendText: "P1-Critical",
  //         showInLegend: true,
  //         indexLabelFontColor: "#5A5757",
  //         dataPoints: CriticalPriority,
        
          
          
  //       },
  //       {
  //       indexLabel: "{y}",
  //       indexLabelPlacement: "outside", 
  //       indexLabelFontSize:9,
  //       indexLabelFontWeight:800,  
  //         type: "column",	
  //         name: "P2 - High",
  //         legendText: "P2 - High", 
  //         showInLegend: true, 
  //         indexLabelFontColor: "#5A5757",
  //         dataPoints:HighPriority,
          
  //       },
  //       {
  //         indexLabel: "{y}",
  //         indexLabelPlacement: "outside", 
  //         indexLabelFontSize:9,
  //         indexLabelFontWeight:800,  
  //         type: "column",	
  //         name: "P3 - Medium",
  //         legendText: "P3 - Medium", 
  //         showInLegend: true, 
  //         dataPoints: MediumPriority,
  //       },
  //       {
  //         indexLabel: "{y}",
  //         indexLabelPlacement: "outside", 
  //         indexLabelFontSize:9,
  //         indexLabelFontWeight:800,  
  //         type: "column",	
  //         name: "P4 - Low",
  //         legendText: "P4 - Low", 
  //         showInLegend: true, 
  //         dataPoints:LowPriority,
          
  //       }
  //     ]
  // }


  // const ETAModal = (e) =>{
  //   var id = e.dataPoint.data;
  //   setFormtitle(e.dataPoint.label);
  //   // if(ETAtype === 'today'){
  //   //   OverlaySlide(9,id,0,e.dataPoint.label +" - ("+ e.dataPoint.y+")"); 
  //   // }else{
  //   //   OverlaySlide(10,id,0,e.dataPoint.label +" - ("+ e.dataPoint.y+")"); 
  //   // }
    
  // }

  // const ETAoption = {
  //   height: 250, 
  //   zoomEnabled: true,
  //     animationEnabled: true,
        
  //       axisX : {
  //         gridThickness:0, 
  //         labelMaxWidth: 80,
  //         labelAngle: 50,
  //         labelFontSize: 10,
  //         interval:1,
  //       },
  //       axisY:{
  //         gridThickness: 0
  //       },
  //       data: [
  //     {
  //         type: "spline",
  //         indexLabel: "{y}",
  //         indexLabelPlacement: "outside", 
  //         toolTipContent: " <span style='\"'color: #4C9CA0;'\"'>Name</span> : {text}</br>Total : {y}",
  //         indexLabelFontSize:12,
  //         indexLabelFontWeight:800, 
  //         indexLabelFontColor: "#5A5757",
  //         click: ETAModal,
  //         dataPoints: ETAToday, 
  //       } 
  //     ]
  // }
  // employee and contract wise chart


// const options1 = {
//     height: 250,
//     animationEnabled: true,
//      zoomEnabled: true,
//       toolTip: {
//         shared: true
//       },
      
//       axisX : {
//         gridThickness:0,
//         labelFontSize: 7,
//         labelFontWeight: 'bold',
//         labelMaxWidth: 50
    
//       },
     
//       axisY : {
//         gridThickness:0,
     
//       },
//       data: [{
//         indexLabel: " {y}", 
//         indexLabelFontColor:'red',
//         indexLabelFontSize:9,
//         indexLabelFontWeight:800,   
//         type: "stackedColumn",
//         name: "DR",
//         legendText: "DR", 
//         showInLegend: true,
//         indexLabelFontColor: "#5A5757",
//         dataPoints:  EmpContractDR

       
//       },
//       {
//         indexLabel: "{y}", 
//         indexLabelFontColor:'blue',
//         indexLabelFontSize:9,
//         indexLabelFontWeight:800,    
//         type: "stackedColumn",
//         name: "CR",
//         legendText: "CR",
       
//         showInLegend: true,
//         indexLabelFontColor: "#5A5757",
//         dataPoints:  EmpContractCR

       
//       },
//       {
//         indexLabel: "{y}",
//         indexLabelFontColor:'blue',
//         indexLabelFontSize:9,
//         indexLabelFontWeight:800,   
//         type: "stackedColumn",
//         name: "NR",
//         legendText: "NR",
       
//         showInLegend: true,
//         indexLabelFontColor: "#5A5757",
//         dataPoints:  EmpContractNR
//       }
  
  
//     ]
// }
  
// useEffect
useEffect(( ) => {
    var count = Countdata;//4
    if(refresh){
      setTimeout(() => {
        count ++; 
        setCountdata(count)  
      }, 300000);  // 2 call after 5 min
    }

   if(count > 0){
    if(Headval === 'Total'){
      Conchange('Total');
    }
      getData();
   } // 1 
   // eslint-disable-next-line
},[Countdata]) // 3 count incr/decr

useEffect(( ) => {
 if(Headval === 'Total'){
  Conchange('Total');
 }
  getData();
   // 1 
   // eslint-disable-next-line
},[ConTypeFil,SuperUser]);

useEffect(( ) => {
  Emplist();
  var time = new Date();
  var n = time.getHours() + ":" + time.getMinutes();
  setLocaltime(n);
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
      //Contract Dropdown
      const params2 = {
        "data":
        {
        "QryType_int": 28,
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
          body: JSON.stringify(params2)
        })
        .then((res)=>res.json())
        .then((data)=>{  
          setContoption(data.Output.data)
        })

}

   
function Conchange(type){
  for(let i=0;i<16;i++){
    let addcls = document.getElementsByClassName('borderradius')[i];
    addcls.classList.remove('activereq')
  }
  
  setchartchange(false)
  setTimeout(() => {
    setchartchange(true)
  }, 100); 

  const url = 'https://smartfm.in/NSEIPLSERVICE/DashboardService/VwAPINSEIPL/';
  const params2 = {
    "data":
    {
    "QryType_int": type,
    "ProType_int": ConTypeFil,
    "EmpID_int": null,
    "ConID_int": EmpID ? EmpID : SuperUser ? null : localStorage.getItem('Employeeid')
    }
    } 
    // localStorage.getItem('Employeeid')

  const params3 = {
    "data":
    {
    "QryType_int": "EMP"+type,
    "ProType_int": ConTypeFil,
    "EmpID_int": null,
    "ConID_int": EmpID ? EmpID : null
    }
    } 

  setHeadval(type)
  if(type === 'Total'){
    const url = 'https://smartfm.in/NSEIPLSERVICE/DashboardService/VwAPINSEIPLALL/';
    const params = {
      "data":
      {
      "QryType_int": 1,
      "ProType_int": ConTypeFil,
      "EmpID_int": null,
      "ConID_int": null,
      "month_int": null,
      "year_int": null,
      "FromDate_date": null,
      "Todate_date": null
      }
      } 
      const params2 = {
        "data":
        {
        "QryType_int": 2,
        "ProType_int": ConTypeFil,
        "EmpID_int": null,
        "ConID_int": null,
        "month_int": null,
        "year_int": null,
        "FromDate_date": null,
        "Todate_date": null
        }
        } 
      // ConTypeFil
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
      // console.log(data,"TOtal")
      let res = data.Output.data;
      let ConLiveTotal = [];
      let ConAMCTotal = [];
      let ConIMPTotal = [];
      let ConOtherTotal = [];

      res.map((val)=>{
        ConLiveTotal.push({
          'label':val.ContractCode,
          'y':Number(val.LIVE),
          'text':val.ContractName,
          'data': val.ContractIDPK
        })
        ConAMCTotal.push({
          'label':val.ContractCode,
          'y':Number(val.AMC),
          'text':val.ContractName,
          'data': val.ContractIDPK
        })
        ConIMPTotal.push({
          'label':val.ContractCode,
          'y':Number(val.IMP),
          'text':val.ContractName,
          'data': val.ContractIDPK
        })
        ConOtherTotal.push({
          'label':val.ContractCode,
          'y':Number(val.Other),
          'text':val.ContractName,
          'data': val.ContractIDPK
        })
        return null;
      })
      setContChartLive(ConLiveTotal)
      setContChartAMC(ConAMCTotal)
      setContChartIMP(ConIMPTotal)
      setContChartOther(ConOtherTotal)
    })

    // Emp Wise
    fetch(url,{
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(params2)
    })
    .then((res)=>res.json())
    .then((data)=>{ 
      let res = data.Output.data;
      let EmpLiveTotal = [];
      let EmpAMCTotal = [];
      let EmpIMPTotal = [];
      let EmpOtherTotal = [];

      res.map((val)=>{
        EmpLiveTotal.push({
          'label':val.EmployeeName,
          'y':Number(val.LIVE),
          'data': val.EmployeeIDPK
        })
        EmpAMCTotal.push({
          'label':val.EmployeeName,
          'y':Number(val.AMC),
          'data': val.EmployeeIDPK
        })
        EmpIMPTotal.push({
          'label':val.EmployeeName,
          'y':Number(val.IMP),
          'data': val.EmployeeIDPK
        })
        EmpOtherTotal.push({
          'label':val.EmployeeName,
          'y':Number(val.Other),
          'data': val.EmployeeIDPK
        })
        return null;
      })
      setEmpChartLive(EmpLiveTotal)
      setEmpChartAMC(EmpAMCTotal)
      setEmpChartIMP(EmpIMPTotal)
      setEmpChartOther(EmpOtherTotal)
    })


    let addcls = document.getElementsByClassName('borderradius')[0];
    addcls.classList.add('activereq')

  }
  if(type === 'CR' || type === 'DR' || type === 'NR' || type === 'OTH' || type === 'MR' || type === 'FR' || type === 'RR'
  || type === 'ER' || type === 'TR' || type === 'OVD' || type === 'PYM' || type === 'SNA' || type === 'NOETA'){
    if(OvrallIndex === 0){
      fetch(url,{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(params2)
      })
      .then((res)=>res.json())
      .then((data)=>{
        const result = data.Output.data;
        let ConLiveDR = [];
        let ConAMCDR = [];
        let ConIMPDR = [];
        let ConOtherDR = [];
        if(result.length > 0) {
          result.map((val) => {
            ConLiveDR.push({
              'label':val.Descriptions1,
              'y':Number(val.LIVE),
              'text':val.Descriptions,
              'data': val.WorkOrderID
            })
            ConAMCDR.push({
              'label':val.Descriptions1,
              'y':Number(val.AMC),
              'text':val.Descriptions,
              'data': val.WorkOrderID
            })
            ConIMPDR.push({
              'label':val.Descriptions1,
              'y':Number(val.IMP),
              'text':val.Descriptions,
              'data': val.WorkOrderID
            })
            ConOtherDR.push({
              'label':val.Descriptions1,
              'y':Number(val.Other),
              'text':val.Descriptions,
              'data': val.WorkOrderID
            })  
               
              return null;
          })  
          setContChartLive(ConLiveDR);
          setContChartAMC(ConAMCDR);
          setContChartIMP(ConIMPDR);
          setContChartOther(ConOtherDR);
    
        }else { 
            setContChartLive([]);
            setContChartAMC([]);
            setContChartIMP([]);
            setContChartOther([]);  
        }
      })
    }else{
      setContChartLive(AllconChartLiveCR)
      setContChartAMC(AllconChartAMCCR)
      setContChartIMP(AllconChartIMPCR)
      setContChartOther(AllconChartOtherCR)
    }
    fetch(url,{
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(params3)
    })
    .then((res)=>res.json())
    .then((data)=>{
      const result = data.Output.data;
      let EmpLiveDR = [];
      let EmpAMCDR = [];
      let EmpIMPDR = [];
      let EmpOtherDR = [];
      if(result.length > 0) {
        result.map((val) => {
          EmpLiveDR.push({
            'label':val.Descriptions,
            'y':Number(val.LIVE),
            'data': val.WorkOrderID
          })
          EmpAMCDR.push({
            'label':val.Descriptions,
            'y':Number(val.AMC),
            'data': val.WorkOrderID
          })
          EmpIMPDR.push({
            'label':val.Descriptions,
            'y':Number(val.IMP),
            'data': val.WorkOrderID
          })
          EmpOtherDR.push({
            'label':val.Descriptions,
            'y':Number(val.Other),
            'data': val.WorkOrderID
          }) 
          return null;
        })  
          setEmpChartLive(EmpLiveDR);
          setEmpChartAMC(EmpAMCDR);
          setEmpChartIMP(EmpIMPDR);
          setEmpChartOther(EmpOtherDR);
      }else{ 
          setEmpChartLive([]);
          setEmpChartAMC([]);
          setEmpChartIMP([]);
          setEmpChartOther([]);
        
      }
    })
    if(type === 'CR'){
      let addcls = document.getElementsByClassName('borderradius')[3];
      addcls.classList.add('activereq')
    }if(type === 'DR'){
      let addcls = document.getElementsByClassName('borderradius')[1];
      addcls.classList.add('activereq')
    }if(type === 'NR'){
      let addcls = document.getElementsByClassName('borderradius')[4];
      addcls.classList.add('activereq')
    }if(type === 'OTH'){
      let addcls = document.getElementsByClassName('borderradius')[5];
      addcls.classList.add('activereq')
    }if(type === 'MR'){
      let addcls = document.getElementsByClassName('borderradius')[6];
      addcls.classList.add('activereq')
    }if(type === 'FR'){
      let addcls = document.getElementsByClassName('borderradius')[7];
      addcls.classList.add('activereq')
    }if(type === 'RR'){
      let addcls = document.getElementsByClassName('borderradius')[8];
      addcls.classList.add('activereq')
    }if(type === 'ER'){
      let addcls = document.getElementsByClassName('borderradius')[9];
      addcls.classList.add('activereq')
    }if(type === 'TR'){
      let addcls = document.getElementsByClassName('borderradius')[10];
      addcls.classList.add('activereq')
    }if(type === 'OVD'){
      let addcls = document.getElementsByClassName('borderradius')[11];
      addcls.classList.add('activereq')
    }if(type === 'PYM'){
      let addcls = document.getElementsByClassName('borderradius')[12];
      addcls.classList.add('activereq')
    }if(type === 'SNA'){
      let addcls = document.getElementsByClassName('borderradius')[14];
      addcls.classList.add('activereq')
    }if(type === 'NOETA'){
      let addcls = document.getElementsByClassName('borderradius')[15];
      addcls.classList.add('activereq')
    } 
    
  }
   
}

function MonthChange(type,empname){
    const url = 'https://smartfm.in/NSEIPLSERVICE/DashboardService/VwAPINSEIPLALL/';
    document.getElementById("filterslide").style.width = "97vw";
    document.getElementById("filDiv").style.height = "0vh";
    setfilteropen(false);
    setslideType(type)
    if(type === 'Empstat'){
      setFiltertitle("Employee Status")

      let mon = selectedDate.getMonth()+1; 
      
      const params = {
        "data":
        {
        "QryType_int": 7,
        "ProType_int": ConTypeFil,
        "EmpID_int": EmpID ? EmpID :  SuperUser ? null : localStorage.getItem('Employeeid'),
        "ConID_int": null,
        "month_int": null,
        "year_int": 2021,
        "FromDate_date": selectedDate.getFullYear()+"-"+mon+"-"+ selectedDate.getDate(),
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
        setEmpTaskDet(data.Output.data)
      })
    }
    if(type === 'Monthly'){
      let Fmon = selectedDate.getMonth()+1; 
      let Tmon = selectedDate2.getMonth()+1; 
      
      setFiltertitle("MonthWise - "+Headval+"( "+selectedDate.getFullYear()+"-"+Fmon+"-"+ selectedDate.getDate()+" -"+selectedDate2.getFullYear()+"-"+Tmon+"-"+ selectedDate2.getDate()+" )")
      var qrytype = '';
      if(Headval === 'DR'){
        qrytype = 11;
      }if(Headval === 'CR'){
        qrytype = 12;
      }if(Headval === 'NR'){
        qrytype = 13;
      }if(Headval === 'OTH'){
        qrytype = 14;
      }
      if(Headval === 'Total'){
        const paramsDR = {
          "data":
          {
          "QryType_int": 11,
          "ProType_int": ConTypeFil,
          "EmpID_int": null,
          "ConID_int": null,
          "month_int": null,
          "year_int": null,
          "FromDate_date": selectedDate.getFullYear()+"-"+Fmon+"-"+ selectedDate.getDate(),
          "Todate_date": selectedDate2.getFullYear()+"-"+Tmon+"-"+ selectedDate2.getDate(),
          }
          }
  
        fetch(url,{
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            
          },
          body: JSON.stringify(paramsDR)
        })
        .then((res)=>res.json())
        .then((data)=>{ 
          // console.log(data,"datamonth")
          let res = data.Output.data;
          let monthTot = [];
          let monthOp = [];
          let monthCls = [];
          let total = 0;
          let open = 0;
          let close = 0;
          res.map((val) => {
            total += Number(val.TotalCnt);
            open += Number(val.OpenCnt);
            close += Number(val.ClosedCnt);
            return null;
          })
          res.map((val) =>{
            monthTot.push({ "label" : val.dt,
              "y" : Number(val.TotalCnt),
              "text": val.WoDate,
              "total": total
            })
            monthOp.push({ "label" : val.dt,
              "y" : Number(val.OpenCnt),
              "text": val.WoDate,
              "open": open
            })
            monthCls.push({ "label" : val.dt,
              "y" : Number(val.ClosedCnt),
              "text": val.WoDate,
              "close": close
            })
            return null;
          })  
          // console.log(monthTot,"Total")
          setchartMonthTotDR(monthTot)
          setchartMonthOpnDR(monthOp)
          setchartMonthClsDR(monthCls)
        })
        // MOnthly CR
        const paramsCR = {
          "data":
          {
          "QryType_int": 12,
          "ProType_int": ConTypeFil,
          "EmpID_int": null,
          "ConID_int": null,
          "month_int": null,
          "year_int": null,
          "FromDate_date": selectedDate.getFullYear()+"-"+Fmon+"-"+ selectedDate.getDate(),
          "Todate_date": selectedDate2.getFullYear()+"-"+Tmon+"-"+ selectedDate2.getDate(),
          }
          }
  
        fetch(url,{
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            
          },
          body: JSON.stringify(paramsCR)
        })
        .then((res)=>res.json())
        .then((data)=>{ 
          // console.log(data,"datamonth")
          let res = data.Output.data;
          let monthTot = [];
          let monthOp = [];
          let monthCls = [];
          let total = 0;
          let open = 0;
          let close = 0;
          res.map((val) => {
            total += Number(val.TotalCnt);
            open += Number(val.OpenCnt);
            close += Number(val.ClosedCnt);
            return null;
          })
          res.map((val) =>{
            monthTot.push({ "label" : val.dt,
              "y" : Number(val.TotalCnt),
              "text": val.WoDate,
              "total": total
            })
            monthOp.push({ "label" : val.dt,
              "y" : Number(val.OpenCnt),
              "text": val.WoDate,
              "open": open
            })
            monthCls.push({ "label" : val.dt,
              "y" : Number(val.ClosedCnt),
              "text": val.WoDate,
              "close": close
            })
            return null;
          })  
          // console.log(monthTot,"Total")
          setchartMonthTotCR(monthTot)
          setchartMonthOpnCR(monthOp)
          setchartMonthClsCR(monthCls)
        })
        // MOnthly NR
        const paramsNR = {
          "data":
          {
          "QryType_int": 13,
          "ProType_int": ConTypeFil,
          "EmpID_int": null,
          "ConID_int": null,
          "month_int": null,
          "year_int": null,
          "FromDate_date": selectedDate.getFullYear()+"-"+Fmon+"-"+ selectedDate.getDate(),
          "Todate_date": selectedDate2.getFullYear()+"-"+Tmon+"-"+ selectedDate2.getDate(),
          }
          }
  
        fetch(url,{
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            
          },
          body: JSON.stringify(paramsNR)
        })
        .then((res)=>res.json())
        .then((data)=>{ 
          // console.log(data,"datamonth")
          let res = data.Output.data;
          let monthTot = [];
          let monthOp = [];
          let monthCls = [];
          let total = 0;
          let open = 0;
          let close = 0;
          res.map((val) => {
            total += Number(val.TotalCnt);
            open += Number(val.OpenCnt);
            close += Number(val.ClosedCnt);
            return null;
          })
          res.map((val) =>{
            monthTot.push({ "label" : val.dt,
              "y" : Number(val.TotalCnt),
              "text": val.WoDate,
              "total": total
            })
            
            monthOp.push({ "label" : val.dt,
              "y" : Number(val.OpenCnt),
              "text": val.WoDate,
              "open": open
            })
            monthCls.push({ "label" : val.dt,
              "y" : Number(val.ClosedCnt),
              "text": val.WoDate,
              "close": close
            })
            return null;
          })  
          
          setchartMonthTotNR(monthTot)
          setchartMonthOpnNR(monthOp)
          setchartMonthClsNR(monthCls)
        })

        // MOnthly Other
        const paramsOTH = {
          "data":
          {
          "QryType_int": 14,
          "ProType_int": ConTypeFil,
          "EmpID_int": null,
          "ConID_int": null,
          "month_int": null,
          "year_int": null,
          "FromDate_date": selectedDate.getFullYear()+"-"+Fmon+"-"+ selectedDate.getDate(),
          "Todate_date": selectedDate2.getFullYear()+"-"+Tmon+"-"+ selectedDate2.getDate(),
          }
          }
  
        fetch(url,{
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            
          },
          body: JSON.stringify(paramsOTH)
        })
        .then((res)=>res.json())
        .then((data)=>{ 
          // console.log(data,"datamonth")
          let res = data.Output.data;
          let monthTot = [];
          let monthOp = [];
          let monthCls = [];
          let total = 0;
          let open = 0;
          let close = 0;
          res.map((val) => {
            total += Number(val.TotalCnt);
            open += Number(val.OpenCnt);
            close += Number(val.ClosedCnt);
            return null;
          })
          res.map((val) =>{
            monthTot.push({ "label" : val.dt,
              "y" : Number(val.TotalCnt),
              "text": val.WoDate,
              "total": total
            })
            monthOp.push({ "label" : val.dt,
              "y" : Number(val.OpenCnt),
              "text": val.WoDate,
              "open": open
            })
            monthCls.push({ "label" : val.dt,
              "y" : Number(val.ClosedCnt),
              "text": val.WoDate,
              "close": close
            })
            return null;
          })  
          // console.log(monthTot,"Total")
          setchartMonthTotOTH(monthTot)
          setchartMonthOpnOTH(monthOp)
          setchartMonthClsOTH(monthCls)
        })
      }else{
        const params = {
          "data":
          {
          "QryType_int": qrytype,
          "ProType_int": ConTypeFil,
          "EmpID_int": null,
          "ConID_int": null,
          "month_int": null,
          "year_int": null,
          "FromDate_date": selectedDate.getFullYear()+"-"+Fmon+"-"+ selectedDate.getDate(),
          "Todate_date": selectedDate2.getFullYear()+"-"+Tmon+"-"+ selectedDate2.getDate(),
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
          // console.log(data,"datamonth")
          let res = data.Output.data;
          let monthTot = [];
          let monthOp = [];
          let monthCls = [];
          res.map((val) =>{
            monthTot.push({ "label" : val.dt,
              "y" : Number(val.TotalCnt),
              "text": val.WoDate,
            })
            monthOp.push({ "label" : val.dt,
              "y" : Number(val.OpenCnt),
              "text": val.WoDate,
            })
            monthCls.push({ "label" : val.dt,
              "y" : Number(val.ClosedCnt),
              "text": val.WoDate,
            })
            return null;
          })  
          // console.log(monthTot,"Total")
          setchartMonthTot(monthTot)
          setchartMonthOpn(monthOp)
          setchartMonthCls(monthCls)
        })
      }
      
    }
    if(type === 'EmpConsol'){
      setFiltertitle("Employee Consolidate")

      let mon = selectedDate.getMonth()+1; 
      
      const params = {
        "data":
        {
        "QryType_int": 8,
        "ProType_int": ConTypeFil,
        "EmpID_int": null,
        "ConID_int": null,
        "month_int": null,
        "year_int": null,
        "FromDate_date": selectedDate.getFullYear()+"-"+mon+"-"+ selectedDate.getDate(),
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
        // console.log("console",data)
        setEmpConsol(data.Output.data)
      })
    }
    if(type === 'Employee'){
      if(!EmpID){
        document.getElementById("filterslide").style.width = "0vw";
        setOpen(true);
        setMessage('Please select Employee!');
        setmsgColor("warning");
        return false;
      }
      let Fmon = selectedDate.getMonth()+1; 
      let Tmon = selectedDate2.getMonth()+1; 
      var Nameval = '';
      if(empname){
        Nameval = empname;
      }else{
        Nameval = Empvalue.EmpName
      }
      setFiltertitle("Employee Upcoming Task -("+Nameval+")")
      
      const params = {
        "data":
        {
        "QryType_int": 20,
        "ProType_int": ConTypeFil,
        "EmpID_int": EmpID,
        "ConID_int": null,
        "month_int": null,
        "year_int": null,
        "FromDate_date": selectedDate.getFullYear()+"-"+Fmon+"-"+ selectedDate.getDate(),
        "Todate_date": selectedDate2.getFullYear()+"-"+Tmon+"-"+ selectedDate2.getDate(),
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
        // console.log("Task",data)
        let res = data.Output.data;
        let TaskEmpDR = [];
        let TaskEmpCR = [];
        let TaskEmpNR = [];
        let TaskEmpOTH = [];

        res.map((val) => {
          TaskEmpDR.push({
            "y": Number(val.DR),
            "label": val.dt,
            "date": val.WoDate
          });
          TaskEmpCR.push({
            "y": Number(val.CR),
            "label": val.dt,
            "date": val.WoDate
          });
          TaskEmpNR.push({
            "y": Number(val.NR),
            "label": val.dt,
            "date": val.WoDate
          });
          TaskEmpOTH.push({
            "y": Number(val.oths),
            "label": val.dt,
            "date": val.WoDate
          });
          return null;
        }) 
        setEmpUpTaskDR(TaskEmpDR);
        setEmpUpTaskCR(TaskEmpCR);
        setEmpUpTaskNR(TaskEmpNR);
        setEmpUpTaskOTH(TaskEmpOTH);
      })
    }
    if(type === 'HOLD'){
      const url2 = 'https://smartfm.in/NSEIPLSERVICE/DashboardService/VwAPINSEIPL/';
      const params2 = {
        "data":
        {
        "QryType_int": type,
        "ProType_int": ConTypeFil,
        "EmpID_int": null,
        "ConID_int": EmpID ? EmpID :  SuperUser ? null : localStorage.getItem('Employeeid')
        }
        } 
        fetch(url2,{
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            
          },
          body: JSON.stringify(params2)
        })
        .then((res)=>res.json())
        .then((data)=>{
          const result = data.Output.data;
          let ConDRHold = [];
          let ConCRHold = [];
          let ConNRHold = [];
          let ConOtherHold = [];
          if(result.length > 0){
            result.map((val) => {
              ConDRHold.push({
                'label':val.Descriptions1,
                'y':Number(val.DR),
                'text':val.Descriptions,
                'data': val.WorkOrderID
              })
              ConCRHold.push({
                'label':val.Descriptions1,
                'y':Number(val.CR),
                'text':val.Descriptions,
                'data': val.WorkOrderID
              })
              ConNRHold.push({
                'label':val.Descriptions1,
                'y':Number(val.NR),
                'text':val.Descriptions,
                'data': val.WorkOrderID
              })
              ConOtherHold.push({
                'label':val.Descriptions1,
                'y':Number(val.oths),
                'text':val.Descriptions,
                'data': val.WorkOrderID
              }) 
              return null;
            })
            
          }
          setContChartDRHold(ConDRHold);
          setContChartCRHold(ConCRHold);
          setContChartNRHold(ConNRHold);
          setContChartOtherHold(ConOtherHold);
          setFiltertitle(type)
          
        })
        
    }
    if(type === 'WStatus'){
      if(!EmpID){
        document.getElementById("filterslide").style.width = "0vw";
        setOpen(true);
        setMessage('Please select Employee!');
        setmsgColor("warning");
        return false;
      }
      let Fmon = selectedDate.getMonth()+1; 
      let Tmon = selectedDate2.getMonth()+1; 
      let Nameval = '';
      if(empname){
        Nameval = empname;
      }else{
        Nameval = Empvalue.EmpName
      }
      setFiltertitle("Employee Work Status -("+Nameval+")")
      
      const params = {
        "data":
        {
        "QryType_int": 22,
        "ProType_int": ConTypeFil,
        "EmpID_int": EmpID,
        "ConID_int": null,
        "month_int": null,
        "year_int": null,
        "FromDate_date": selectedDate.getFullYear()+"-"+Fmon+"-"+ selectedDate.getDate(),
        "Todate_date": selectedDate2.getFullYear()+"-"+Tmon+"-"+ selectedDate2.getDate(),
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
        // console.log("Work statsu",data)
        // let res = data.Output.data;
        // let TaskEmpDR = [];
        // let TaskEmpCR = [];
        // let TaskEmpNR = [];
        // let TaskEmpOTH = [];

        // res.map((val) => {
        //   TaskEmpDR.push({
        //     "y": Number(val.DR),
        //     "label": val.dt,
        //     "date": val.WoDate
        //   });
        //   TaskEmpCR.push({
        //     "y": Number(val.CR),
        //     "label": val.dt,
        //     "date": val.WoDate
        //   });
        //   TaskEmpNR.push({
        //     "y": Number(val.NR),
        //     "label": val.dt,
        //     "date": val.WoDate
        //   });
        //   TaskEmpOTH.push({
        //     "y": Number(val.oths),
        //     "label": val.dt,
        //     "date": val.WoDate
        //   });
        //   return null;
        // }) 
        // setEmpUpTaskDR(TaskEmpDR);
        // setEmpUpTaskCR(TaskEmpCR);
        // setEmpUpTaskNR(TaskEmpNR);
        // setEmpUpTaskOTH(TaskEmpOTH);
      })
    }
    if(type === 'Day progress'){
      
      let Fmon = selectedDate.getMonth()+1; 
      let Tmon = selectedDate2.getMonth()+1; 
      setFiltertitle("Day wise Progress ( "+Fromdate+" - "+Todate+" )")
      
      const params = {
        "data":
        {
        "QryType_int": 24,
        "ProType_int": ConTypeFil,
        "EmpID_int": EmpID,
        "ConID_int": ContractID,
        "month_int": null,
        "year_int": null,
        "FromDate_date": selectedDate.getFullYear()+"-"+Fmon+"-"+ selectedDate.getDate(),
        "Todate_date": selectedDate2.getFullYear()+"-"+Tmon+"-"+ selectedDate2.getDate(),
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
        let res = data.Output.data;
        let TaskEmpDR = [];
        let TaskEmpCR = [];
        let TaskEmpNR = [];
        let TaskEmpOTH = [];

        res.map((val) => {
          TaskEmpDR.push({
            "y": Number(val.DR),
            "label": val.dt,
            "date": val.WoDate
          });
          TaskEmpCR.push({
            "y": Number(val.CR),
            "label": val.dt,
            "date": val.WoDate
          });
          TaskEmpNR.push({
            "y": Number(val.NR),
            "label": val.dt,
            "date": val.WoDate
          });
          TaskEmpOTH.push({
            "y": Number(val.Others),
            "label": val.dt,
            "date": val.WoDate
          });
          return null;
        }) 
        setEmpUpTaskDR(TaskEmpDR);
        setEmpUpTaskCR(TaskEmpCR);
        setEmpUpTaskNR(TaskEmpNR);
        setEmpUpTaskOTH(TaskEmpOTH);
      })

      // Totals
      const params2 = {
        "data":
        {
        "QryType_int": 27,
        "ProType_int": ConTypeFil,
        "EmpID_int": EmpID,
        "ConID_int": null,
        "month_int": null,
        "year_int": null,
        "FromDate_date": selectedDate.getFullYear()+"-"+Fmon+"-"+ selectedDate.getDate(),
        "Todate_date": selectedDate2.getFullYear()+"-"+Tmon+"-"+ selectedDate2.getDate(),
        }
        }

        fetch(url,{
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            
          },
          body: JSON.stringify(params2)
        })
        .then((res)=>res.json())
        .then((data)=>{  
          let res = data.Output.data;
        //  console.log("Total",res)
         setTotproCR(res[0].CR);
         setTotproDR(res[0].DR);
         setTotproNR(res[0].NR);
         setTotproOther(res[0].Other);
  
         
        })
    }
    if(type === 'Contract closed'){
      
      let Fmon = selectedDate.getMonth()+1; 
      let Tmon = selectedDate2.getMonth()+1; 
      setFiltertitle("Contract wise Closed ( "+Fromdate+" - "+Todate+" )")
      
      const params = {
        "data":
        {
        "QryType_int": 26,
        "ProType_int": ConTypeFil,
        "EmpID_int": EmpID,
        "ConID_int": null,
        "month_int": null,
        "year_int": null,
        "FromDate_date": selectedDate.getFullYear()+"-"+Fmon+"-"+ selectedDate.getDate(),
        "Todate_date": selectedDate2.getFullYear()+"-"+Tmon+"-"+ selectedDate2.getDate(),
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
        let res = data.Output.data;
        let TaskEmpDR = [];
        let TaskEmpCR = [];
        let TaskEmpNR = [];
        let TaskEmpOTH = [];

        res.map((val) => {
          TaskEmpDR.push({
            "y": Number(val.DR),
            "label": val.ContractCode,
            "date": val.ContractName,
            "conid": val.ContractIDPK
          });
          TaskEmpCR.push({
            "y": Number(val.CR),
            "label": val.ContractCode,
            "date": val.ContractName,
            "conid": val.ContractIDPK
          });
          TaskEmpNR.push({
            "y": Number(val.NR),
            "label": val.ContractCode,
            "date": val.ContractName,
            "conid": val.ContractIDPK
          });
          TaskEmpOTH.push({
            "y": Number(val.Others),
            "label": val.ContractCode,
            "date": val.ContractName,
            "conid": val.ContractIDPK
          });
          return null;
        }) 
        setEmpUpTaskDR(TaskEmpDR);
        setEmpUpTaskCR(TaskEmpCR);
        setEmpUpTaskNR(TaskEmpNR);
        setEmpUpTaskOTH(TaskEmpOTH);
      })

      // Totals
      const params2 = {
        "data":
        {
        "QryType_int": 27,
        "ProType_int": ConTypeFil,
        "EmpID_int": EmpID,
        "ConID_int": null,
        "month_int": null,
        "year_int": null,
        "FromDate_date": selectedDate.getFullYear()+"-"+Fmon+"-"+ selectedDate.getDate(),
        "Todate_date": selectedDate2.getFullYear()+"-"+Tmon+"-"+ selectedDate2.getDate(),
        }
        }

        fetch(url,{
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            
          },
          body: JSON.stringify(params2)
        })
        .then((res)=>res.json())
        .then((data)=>{  
          let res = data.Output.data;
        //  console.log("Total",res)
         setTotproCR(res[0].CR);
         setTotproDR(res[0].DR);
         setTotproNR(res[0].NR);
         setTotproOther(res[0].Other);
  
         
        })
    }
    if(type === 'Contract raised'){
      
      let Fmon = selectedDate.getMonth()+1; 
      let Tmon = selectedDate2.getMonth()+1; 
      setFiltertitle("Contract wise Raised ( "+Fromdate+" - "+Todate+" )")
      
      const params = {
        "data":
        {
        "QryType_int": 29,
        "ProType_int": ConTypeFil,
        "EmpID_int": EmpID,
        "ConID_int": null,
        "month_int": null,
        "year_int": null,
        "FromDate_date": selectedDate.getFullYear()+"-"+Fmon+"-"+ selectedDate.getDate(),
        "Todate_date": selectedDate2.getFullYear()+"-"+Tmon+"-"+ selectedDate2.getDate(),
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
        let res = data.Output.data;
        let TaskEmpDR = [];
        let TaskEmpCR = [];
        let TaskEmpNR = [];
        let TaskEmpOTH = [];

        res.map((val) => {
          TaskEmpDR.push({
            "y": Number(val.DR),
            "label": val.ContractCode,
            "date": val.ContractName,
            "conid": val.ContractIDPK
          });
          TaskEmpCR.push({
            "y": Number(val.CR),
            "label": val.ContractCode,
            "date": val.ContractName,
            "conid": val.ContractIDPK
          });
          TaskEmpNR.push({
            "y": Number(val.NR),
            "label": val.ContractCode,
            "date": val.ContractName,
            "conid": val.ContractIDPK
          });
          TaskEmpOTH.push({
            "y": Number(val.Others),
            "label": val.ContractCode,
            "date": val.ContractName,
            "conid": val.ContractIDPK
          });
          return null;
        }) 
        setEmpUpTaskDR(TaskEmpDR);
        setEmpUpTaskCR(TaskEmpCR);
        setEmpUpTaskNR(TaskEmpNR);
        setEmpUpTaskOTH(TaskEmpOTH);
      })

      // Totals
      const params2 = {
        "data":
        {
        "QryType_int": 30,
        "ProType_int": ConTypeFil,
        "EmpID_int": EmpID,
        "ConID_int": null,
        "month_int": null,
        "year_int": null,
        "FromDate_date": selectedDate.getFullYear()+"-"+Fmon+"-"+ selectedDate.getDate(),
        "Todate_date": selectedDate2.getFullYear()+"-"+Tmon+"-"+ selectedDate2.getDate(),
        }
        }

        fetch(url,{
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            
          },
          body: JSON.stringify(params2)
        })
        .then((res)=>res.json())
        .then((data)=>{  
          let res = data.Output.data;
        //  console.log("Total",res)
         setTotproCR(res[0].CR);
         setTotproDR(res[0].DR);
         setTotproNR(res[0].NR);
         setTotproOther(res[0].Other);
  
         
        })
    }
    
    if(type === 'Complaint'){
      setFiltertitle("Register a Complaint")
      contractlist();
    }


}


// ********************************** API Section *************************************************** //

const getData = ( ) => {
  setLoading(true);
  const url = 'https://smartfm.in/NSEIPLSERVICE/DashboardService/VwAPINSEIPL/';
  const params = {
    "data":
    {
    "QryType_int": 'ALL',
    "ProType_int": ConTypeFil,
    "EmpID_int": null,
    "ConID_int": EmpID ? EmpID :  SuperUser ? null : localStorage.getItem('Employeeid')
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
    const result = data.Output.data;
    // const arr = [];
    let summary = [];
    let empWise = [];
    let contractWise  = [];
    let criticalPriority = [];
    let highPriority = [];
    let mediumPriority = [];
    let lowPriority = [];
    // var DR = [];
    // var CR = [];
    // var NR = [];
    // let Constasum = [];
    // let Constatuswise = [];
    // let ConOverdue = [];
    
    let Todayeta = [];
    let ETAnext = [];
    let ConOVD = [];
    let AllConDRLive = [];
    let AllConDRAMC = [];
    let AllConDRIMP = [];
    let AllConDROther = [];
    let AllConCRLive = [];
    let AllConCRAMC = [];
    let AllConCRIMP = [];
    let AllConCROther = [];
    let AllConNRLive = [];
    let AllConNRAMC = [];
    let AllConNRIMP = [];
    let AllConNROther = [];
    let AllConOTHLive = [];
    let AllConOTHAMC = [];
    let AllConOTHIMP = [];
    let AllConOTHOther = [];
    let Empwork = [];
    let EmpEtime = [];
    let EmployeeETA = [];
    let EmployeeTodaywork = [];

    result.map((val)=> {
      
     if(val.Header === '23') {
      if(val.Descriptions){
        AllConDRLive.push({
          'label':val.Descriptions,
          'y':Number(val.LIVE),
          'data': val.WorkOrderID
        })
        AllConDRAMC.push({
          'label':val.Descriptions,
          'y':Number(val.AMC),
          'data': val.WorkOrderID
        })
        AllConDRIMP.push({
          'label':val.Descriptions,
          'y':Number(val.IMP),
          'data': val.WorkOrderID
        })
        AllConDROther.push({
          'label':val.Descriptions,
          'y':Number(val.Other),
          'data': val.WorkOrderID
        }) 
      }
      setAllconChartLiveDR(AllConDRLive);
      setAllconChartAMCDR(AllConDRAMC);
      setAllconChartIMPDR(AllConDRIMP);
      setAllconChartOtherDR(AllConDROther);
    }else if(val.Header === '24') {
      if(val.Descriptions){
        AllConCRLive.push({
          'label':val.Descriptions,
          'y':Number(val.LIVE),
          'data': val.WorkOrderID
        })
        AllConCRAMC.push({
          'label':val.Descriptions,
          'y':Number(val.AMC),
          'data': val.WorkOrderID
        })
        AllConCRIMP.push({
          'label':val.Descriptions,
          'y':Number(val.IMP),
          'data': val.WorkOrderID
        })
        AllConCROther.push({
          'label':val.Descriptions,
          'y':Number(val.Other),
          'data': val.WorkOrderID
        }) 
      }
      setAllconChartLiveCR(AllConCRLive);
      setAllconChartAMCCR(AllConCRAMC);
      setAllconChartIMPCR(AllConCRIMP);
      setAllconChartOtherCR(AllConCROther);
    }else if(val.Header === '25') {
      if(val.Descriptions){
        AllConNRLive.push({
          'label':val.Descriptions,
          'y':Number(val.LIVE),
          'data': val.WorkOrderID
        })
        AllConNRAMC.push({
          'label':val.Descriptions,
          'y':Number(val.AMC),
          'data': val.WorkOrderID
        })
        AllConNRIMP.push({
          'label':val.Descriptions,
          'y':Number(val.IMP),
          'data': val.WorkOrderID
        })
        AllConNROther.push({
          'label':val.Descriptions,
          'y':Number(val.Other),
          'data': val.WorkOrderID
        }) 
      }
      setAllconChartLiveNR(AllConNRLive);
      setAllconChartAMCNR(AllConNRAMC);
      setAllconChartIMPNR(AllConNRIMP);
      setAllconChartOtherNR(AllConNROther);
    }else if(val.Header === '26') {
      if(val.Descriptions){
        AllConOTHLive.push({
          'label':val.Descriptions,
          'y':Number(val.LIVE),
          'data': val.WorkOrderID
        })
        AllConOTHAMC.push({
          'label':val.Descriptions,
          'y':Number(val.AMC),
          'data': val.WorkOrderID
        })
        AllConOTHIMP.push({
          'label':val.Descriptions,
          'y':Number(val.IMP),
          'data': val.WorkOrderID
        })
        AllConOTHOther.push({
          'label':val.Descriptions,
          'y':Number(val.Other),
          'data': val.WorkOrderID
        }) 
      }
      setAllconChartLiveOTH(AllConOTHLive);
      setAllconChartAMCOTH(AllConOTHAMC);
      setAllconChartIMPOTH(AllConOTHIMP);
      setAllconChartOtherOTH(AllConOTHOther);
    }

      if(val.Header === '5'){
        // let sumtot = (Number(val.CR) + Number(val.NR) + Number(val.DR) + Number(val.NOETA));
        // setSumtot(sumtot);
        summary.push({
          val
        })
      }else if(val.Header === '1') {
         empWise.push({'Descriptions':val.Descriptions,
                        'Descriptions1':val.descriptions1,
                        'DR':val.DR,
                        'CR':val.CR,
                        'oths': val.oths,
                        'NR':val.NR,
                        "WorkOrderID": val.WorkOrderID})
                        // setEmpWise(empWise);
                        
      }else if(val.Header === '4') {
              contractWise.push({'Descriptions':val.Descriptions,
                          'Descriptions1':val.descriptions1,
                          'DR':val.DR,
                          'CR':val.CR,
                          'NR':val.NR,
                          'oths': val.oths,
                          "WorkOrderID": val.WorkOrderID})
                          // setContractWise(contractWise);
      }else if(val.Header === '27') {
        Empwork.push({'Comno':val.Descriptions,
                    'Descriptions1':val.Descriptions1,
                    'label':val.ConType,
                    'y':Number(val.IMP),
                    "WorkOrderID": val.WorkOrderID})
                    // setEmpWorkhrs(Empwork);
      }else if(val.Header === '29') {
        EmpEtime.push({'Total':val.IMP,
                    'Descriptions1':val.Descriptions1,
                    'label':val.Descriptions,
                    'y':Number(val.LIVE),
                    "WorkOrderID": val.WorkOrderID})
                    // setEmpEtt(EmpEtime);
      }else if(val.Header === '30') {
        EmployeeETA.push({
                    'label':val.Descriptions,
                    'y':Number(val.DR),
                    "WorkOrderID": val.WorkOrderID})
                    // setEmpETA(EmployeeETA);
                    // setEmpTodayETA(EmployeeETA); 
      }else if(val.Header === '31') {
        EmployeeTodaywork.push({
                    'label':val.Descriptions,
                    'y':Number(val.DR),
                    "WorkOrderID": val.WorkOrderID})
                    // setEmpTodaywork(EmployeeTodaywork);
      }
      else if(val.Header === '14') {
        if(val.OVD > 0){
          ConOVD.push({
            'label':val.Descriptions,
            'y':Number(val.OVD),
            'data': val.WorkOrderID
          })
          // setContChartOD(ConOVD);
        }
      }
      else if(val.Header === '12') {
        Todayeta.push({'label':val.Descriptions1,
                       'y':Number(val.DR),
                       'text':val.Descriptions,
                       "data": val.WorkOrderID})
                      // setETACharttoday(Todayeta)
                      // setETAToday(Todayeta);

      }
      else if(val.Header === '3') {
        
            if(val.Descriptions === 'P1 - CRITICAL') {
              criticalPriority.push({
                'label' : 'DR' ,
                'y' : Number(val.DR)
              },{
                'label' : 'CR',
                'y' :Number(val.CR)
              },{
                'label': 'NR',
                'y': Number(val.NR)
              })
              // setCriticalPriority(criticalPriority);

            } else if(val.Descriptions === 'P2 - HIGH'){

            highPriority.push({
              'label':'DR',
              'y':Number(val.DR)
            },
              {'label':'CR',
              'y':Number(val.CR)
            },
              {'label':'NR',
              'y':Number(val.NR)
              })
            // setHighPriority(highPriority);

            }
            else if(val.Descriptions === 'P3 - MEDIUM'){
              mediumPriority.push(
                {
                  'label':'DR',
                  'y':Number(val.DR)
                },
                  {'label':'CR',
                  'y':Number(val.CR)
              },
                  {'label':'NR',
                  'y':Number(val.NR)
                })
              // setMediumPriority(mediumPriority);
              
            }
            else if(val.Descriptions === 'P4 - LOW'){
              lowPriority.push({
                'label':'DR',
                'y':Number(val.DR)
              },
                {'label':'CR',
                'y':Number(val.CR)
              },
                {'label':'NR',
                'y':Number(val.NR)
              })
              // setLowPriority(lowPriority);
            }
 

      }
      // else if(val.Header === '2'){
      //   DR.push({
      //     'label':val.Descriptions1,
      //     'y':Number(val.DR)},
      //   )
          
      //     CR.push({
      //       'label':val.Descriptions1,
      //       'y':Number(val.CR)},
      //   )
        
      //   NR.push({
      //     'label':val.Descriptions1,
      //     'y':Number(val.NR)},
      //   )
     
      // }
      // else if(val.Header === '9') {
      //   Constasum.push({'ConType':val.ConType,'DtCount':val.DtCount})
      //   setConSummry(Constasum);

      // }
      // else if(val.Header === '10') {
      //   Constatuswise.push({'Descriptions':val.Descriptions,'DR':val.DR,'CR':val.CR,'NR':val.NR})
      //   setConStawise(Constatuswise);

      // }
      // else if(val.Header === '11') {
      //   ConOverdue.push({'Descriptions':val.Descriptions,'DR':val.DR,'CR':val.CR,'NR':val.NR})
      //   setConOD(ConOverdue);

      // }
      else if(val.Header === '13') {
        ETAnext.push({'label':val.Descriptions,
                       'y':Number(val.DR),
                       "data": val.WorkOrderID})
        // setETAChartnext(ETAnext);

      }
      
      
      return null;
    })
    // setEmpContractDR(DR);
    // setEmpContractCR(CR);
    // setEmpContractNR(NR);


   setSumdet(summary);
      setLoading(false);
      if(SuperUser){
        document.getElementById('appbarbg').style.backgroundColor='#48730f';
      }else{
        document.getElementById('appbarbg').style.backgroundColor='#2183B0';
      }
      
      
  }); 

  // Contract Wise
  const params2 = {
    "data":
    {
    "QryType_int": Headval,
    "ProType_int": ConTypeFil,
    "EmpID_int": null,
    "ConID_int": EmpID ? EmpID :  SuperUser ? null : localStorage.getItem('Employeeid')
    }
    } 
  fetch(url,{
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      
    },
    body: JSON.stringify(params2)
  })
  .then((res)=>res.json())
  .then((data)=>{
    const result = data.Output.data;
    let ConLiveDR = [];
    let ConAMCDR = [];
    let ConIMPDR = [];
    let ConOtherDR = [];
    if(result.length > 0) {
      result.map((val) => {
        ConLiveDR.push({
          'label':val.Descriptions1,
          'y':Number(val.LIVE),
          'text':val.Descriptions,
          'data': val.WorkOrderID
        })
        ConAMCDR.push({
          'label':val.Descriptions1,
          'y':Number(val.AMC),
          'text':val.Descriptions,
          'data': val.WorkOrderID
        })
        ConIMPDR.push({
          'label':val.Descriptions1,
          'y':Number(val.IMP),
          'text':val.Descriptions,
          'data': val.WorkOrderID
        })
        ConOtherDR.push({
          'label':val.Descriptions1,
          'y':Number(val.Other),
          'text':val.Descriptions,
          'data': val.WorkOrderID
        })  
          return null;
      })  
      setContChartLive(ConLiveDR);
      setContChartAMC(ConAMCDR);
      setContChartIMP(ConIMPDR);
      setContChartOther(ConOtherDR); 

    }else { 
        setContChartLive([]);
        setContChartAMC([]);
        setContChartIMP([]);
        setContChartOther([]);
       
    }
  })

  // Employee WIse
  const params3 = {
    "data":
    {
    "QryType_int": "EMP"+Headval,
    "ProType_int": ConTypeFil,
    "EmpID_int": null,
    "ConID_int": EmpID ? EmpID :  SuperUser ? null : localStorage.getItem('Employeeid')
    }
    } 
  fetch(url,{
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      
    },
    body: JSON.stringify(params3)
  })
  .then((res)=>res.json())
  .then((data)=>{
    const result = data.Output.data;
    let EmpLiveDR = [];
    let EmpAMCDR = [];
    let EmpIMPDR = [];
    let EmpOtherDR = [];
    if(result.length > 0) {
      result.map((val) => {
        EmpLiveDR.push({
          'label':val.Descriptions,
          'y':Number(val.LIVE),
          'data': val.WorkOrderID
        })
        EmpAMCDR.push({
          'label':val.Descriptions,
          'y':Number(val.AMC),
          'data': val.WorkOrderID
        })
        EmpIMPDR.push({
          'label':val.Descriptions,
          'y':Number(val.IMP),
          'data': val.WorkOrderID
        })
        EmpOtherDR.push({
          'label':val.Descriptions,
          'y':Number(val.Other),
          'data': val.WorkOrderID
        }) 
        return null;
      })  
        setEmpChartLive(EmpLiveDR);
        setEmpChartAMC(EmpAMCDR);
        setEmpChartIMP(EmpIMPDR);
        setEmpChartOther(EmpOtherDR);
    }else{ 
        setEmpChartLive([]);
        setEmpChartAMC([]);
        setEmpChartIMP([]);
        setEmpChartOther([]);
      
    }
  })
 }

 function OverlaySlide(type,id,empid,title,conname,Fdate,Tdate){
   var locEMp = localStorage.getItem('Employeeid');
  setFormtitle(title);
  const url = 'https://smartfm.in/NSEIPLSERVICE/DashboardService/VwAPINSEIPLDetails/';
  const params = {
    "data":
    {
    "p1_int": type,
    "p2_int": 0,
    "p3_int": empid ? empid : (EmpID ? EmpID : (SuperUser ? null : locEMp)),
    "p4_int": id,
    "p5_int": conname,
    "p6_int": ConTypeFil,
    "P7_date": Fdate && Fdate, 
    "P8_date": Tdate,
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
    // console.log("Log",data)
    let res =data.Output.data;
    if(res.length > 0){
      document.getElementById("Tableslide").style.width = "97vw";
      let exportarry=[];
      if(type === 23){
        res.map((value) => {
          exportarry.push([value.ContractName,value.EmpName,value.TaskNo,value.TaskDescription,value.TaskStartTime,value.TaskEndTime,
            value.TotalHrs]); 
          return null;  
        });
        
      }else{
        res.map((value) => {
          exportarry.push([value.ComplaintNo,value.ComplainedDate,value.ETADate,value.ETATime,value.AgeingInDays,value.ContractName,
            value.ComplainerName,value.RequestDetailsDesc,value.PriorityName,value.TechName,value.bdmempname,value.StageName]); 
          return null;  
        });
      }      
      
      setexportItem(exportarry);
      setSlidedata(res);
      setSlidedataserch(res);
    }else{
      setOpen(true);
      setMessage('No Record Found!');
      setmsgColor("warning");
    }
    
  }); 
  
 }

 function tablepopClose(){
  document.getElementById("Tableslide").style.width = "0vw";
 }

 function filterpopClose(){
  document.getElementById("filterslide").style.width = "0vw";
 }
 function caldpopClose(){
  document.getElementById("calendarslide").style.width = "0vw";
  setCalendarview(false);
  setTastView(true)
 }

 function filterchange(){
   
   if(filteropen === true){
    document.getElementById("filDiv").style.height = "0vh";
    setfilteropen(false);
   }else{
    document.getElementById("filDiv").style.height = "auto";
    setfilteropen(true);
   }
  
 }

function scrollTotop (){ 
  document.documentElement.scrollTop = 0;
}

useEffect(() => {
  const onScroll = e => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  const scrolled = winScroll / height;
  // console.log("scrolled",scrolled,"body",document.documentElement.scrollTop,height);
      
      if(scrolled > 0){
        document.getElementById("scrolltop").style.display = "block";
        
      }else{
        document.getElementById("scrolltop").style.display = "none";
      }
     
  };
  window.addEventListener("scroll", onScroll);

  return () => window.removeEventListener("scroll", onScroll);
}, []);

function autorefresh(){
  if(refresh){
    setrefresh(false);
  }else{
    setrefresh(true);
  }
  
}

function LogOutBtn(){ 
  localStorage.setItem('authBill', true); 
  localStorage.clear(); 
  props.history.push('/login');
}
 
function contractlist(e){
    
  const url = config.submiturl + "WebPortalLocDetailsNew.php?TypeID=101&UserID="+UserID;
         
      fetch(url)
      .then(res=>res.json())
      .then(res=>{    
          // console.log(res,"Conta")
          var Contview = res;
          let select = document.getElementById("contractval");
            let length = select.options.length;
            for (let i = length-1; i >= 0; i--) {
                select.options[i] = null;
            } 
          if(e){
            
            res.map(val => {
              var description = val.ContractName.toLowerCase();
              // var titleMatch = title.includes("smart");
              var descriptionMatch = description.includes(e.toLowerCase());
              
              if(descriptionMatch){
                var ele = document.getElementById('contractval');
                    // POPULATE SELECT ELEMENT WITH JSON.
                    ele.innerHTML = ele.innerHTML +
                        '<option title="' + val.ContractName + '" value="' +val.ContractID + '">' + val.ContractName + '</option>';
                // return {...val
                // };
                // console.log(...val);
              }
              return null;
             })
          }else{
            
            var ele = document.getElementById('contractval');
            for (var i = 0; i < Contview.length; i++) {
                // POPULATE SELECT ELEMENT WITH JSON.
                ele.innerHTML = ele.innerHTML +
                    '<option title="' + Contview[i]['ContractName'] + '" value="' + Contview[i]['ContractID'] + '">' + Contview[i]['ContractName'] + '</option>';
            }
          }
            
          //  console.log('0',staffview)  
         
      }) 
      // const url2 = config.submiturl + "WebPortalLocDetailsNew.php?TypeID=9";

      // fetch(url2)
      // .then(res=>res.json())
      // .then(res=>{
      //     var Prioview = res;
      //       var ele = document.getElementById('priority');
      //       for (var i = 0; i < Prioview.length; i++) {
      //           // POPULATE SELECT ELEMENT WITH JSON.
      //           ele.innerHTML = ele.innerHTML +
      //               '<option value="' + Prioview[i]['PriorityIDPK'] + '">' + Prioview[i]['PriorityName'] + '</option>';
      //       }
      
      // })
      // WOType
       
      let url3 = config.submiturl + "WebPortalLocDetailsNew.php?TypeID=8";
      fetch(url3)
            .then(res=>res.json())
            .then(res=>{
              var selectdiv = document.getElementById("division");
              var lengthdiv = selectdiv.options.length;
              for (let i = lengthdiv-1; i >= 0; i--) {
                  selectdiv.options[i] = null;
              }
            var Divisionview = res;
            var ele = document.getElementById('division');
            for (var i = 0; i < Divisionview.length; i++) {
                // POPULATE SELECT ELEMENT WITH JSON.
                ele.innerHTML = ele.innerHTML +
                    '<option value="' + Divisionview[i]['DivisionIDPK'] + '">' + Divisionview[i]['DivisionName'] + '</option>';
            }            
      }) 
}

function ContChange(e){ 
var skillsSelect = document.getElementById("contractval");
var selectedText = skillsSelect.options[skillsSelect.selectedIndex].text;
document.getElementById("continput").value = selectedText;
setContID(e);
let url = config.submiturl + "WebPortalLocDetailsNew.php?TypeID=102&UserID="+UserID+"&ContractID="+e;
  fetch(url)
  .then(res=>res.json())
  .then(res=>{
      setLocID(res[0].LocalityID);
      GetBuilding(res[0].LocalityID,e);
  })
}

function GetBuilding(locid,conid){
  let url = config.submiturl + "WebPortalLocDetailsNew.php?TypeID=103&UserID="+UserID+"&ContractID="+conid+"&LocalityID="+locid;
  fetch(url)
  .then(res=>res.json())
  .then(res=>{
    // console.log(res)
      setBuildID(res[0].BuildingIDPK);
  })
}

function WOChange(e){
  setWOtypeID(e.target.value);
  setProDate([]);
  setEndDate(null);
  setmultiEmp('');
  setPersonName([]);
  
}

function DivChange(divid){
  setDivID(divid);
  var select = document.getElementById("nature");
  var length = select.options.length;
  for (let i = length-1; i >= 0; i--) {
      select.options[i] = null;
  }

  let url = config.submiturl + "WebPortalLocDetailsNew.php?TypeID=5&DivisionID="+divid+"&CategoryID="+WOtypeID;
  fetch(url)
        .then(res=>res.json())
        .then(res=>{
          var Natureview = res;
          var ele = document.getElementById('nature');
          for (var i = 0; i < Natureview.length; i++) {
              // POPULATE SELECT ELEMENT WITH JSON.
              ele.innerHTML = ele.innerHTML +
                  '<option value="' + Natureview[i]['ComplaintNatureName'] + '">' + Natureview[i]['ComplaintNatureName'] + '</option>';
          }         
  }) 
      
}

function multidatechange(date){

var muldate = [];
date.map((val) => {
  let mon = val.getMonth()+1; 
  muldate.push(val.getFullYear()+"-"+mon+"-"+val.getDate())
  return null;
}) 
setProDate(muldate) 
}

function submitComp(){ 
var UserName = localStorage.getItem('username');
var EID = localStorage.getItem('Employeeid');
var Todate = '';
if(EndDate){
  const DateEnd = EndDate.getMonth()+1; 
  Todate = EndDate.getFullYear()+"-"+DateEnd+"-"+EndDate.getDate();
}
var Startdate = ''; 
if(ProDate.length > 0){
  Startdate = ProDate.toString();
}

var EMPassgn =  '';
if(WOtypeID === '2'){
  if(multiEmp){
    EMPassgn =  multiEmp;
  }else{
    EMPassgn =  EID;
  }
} 
var dataString ="NatureOfComplaint="+natureval+"&UserID="+EID+"&Email=null&Description="+Descval+"&ContractID="+ContID+"&LocalityID="+LocID+"&BuildingID="+BuildID+"&FloorID=0&SpotID=0&ComplainerName="+UserName+"&ContactNo=null&PortalType=2&DocID=null&DivisionID="+DivID+"&PriorityID=1&EmpID="+EMPassgn+"&ProDate="+Startdate+"&TaskType="+WOtypeID+"&EndDate="+Todate;
// console.log(dataString);
// return false;
      if(WOtypeID === '2'){
        if (Startdate === '' || Todate === ''){
          setOpen(true);
          setMessage("Please select Date fields");
          setmsgColor("error"); 
          return false;
        }
      }
      if (natureval === '' || DivID === '' || Descval === '' || ContID === ''){
          setOpen(true);
          setMessage("Please fill all mandatory fields");
          setmsgColor("error"); 
        return false;
      }else{
        setformLoading(true); 
        let url = config.submiturl + "NsetrackComplaintRegistry.php";

        axios.post(url,dataString)
        .then(res => {
          // console.log(res.data);
          if (res.data > 0) {
              setOpen(true);
              setMessage("Task Raised ,Complaint registered successfully");
              setmsgColor("success");
              staffassign(res.data);
              // contractlist();
              if(WOtypeID === '2'){
                var contSelect = document.getElementById("contractval");
                var contText = contSelect.options[contSelect.selectedIndex].text;
                var Emploname = localStorage.getItem('username');
                if(personName.length > 0){
                  Emploname = EmployeeName.toString();
                }
                Connectmsg('@'+Emploname,'',contText,Curdate,'',natureval,Descval,'High','',Startdate); 
              }else{
                let contSelect = document.getElementById("contractval");
                let contText = contSelect.options[contSelect.selectedIndex].text;
                Connectmsg('@Nasrullah,Thoufeeq,Yasar','',contText,Curdate,'',natureval,Descval,'High','',''); 
              }
              setEmployeeName([]);
              setformLoading(false);
              setPersonName([]);
              setmultiEmp('');
              setDescval('');
              // document.getElementById("filterslide").style.width = "0vw";
          }else{
              setOpen(true);
              if(res.data === 'Failed'){
                setMessage("Contract Expired");  
              }else{
                setMessage("Problem During Submission");
              }
              setmsgColor("error");
              setformLoading(false);
              //contractlist();
          }
          
            
        }) 
        // fetch(url,{
        //   crossDomain:true,
        //   method: "POST",
        //   headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json',
        //       'Access-Control-Allow-Origin': '*'
        //   },
        //   body: dataString
        // })
        // .then((res)=>res.json())
        // .then((data)=>{
        //   if (data > 0) {
        //       setOpen(true);
        //       setMessage("Task Raised ,Complaint registered successfully");
        //       setmsgColor("success");
        //       staffassign(data);
        //       setformLoading(false);
        //       setPersonName([]);
        //       setDescval('');
        //       document.getElementById("filterslide").style.width = "0vw";
        //   }else{
        //       setOpen(true);
        //       setMessage("Problem during submission");
        //       setmsgColor("error");
        //       setformLoading(false);
        //   }
        // })
      }

}

function staffassign(id){

let url = config.configurl + "/SupportStaffAssign.php?EmployeeID="+EmpID+"&CCMComplaintID="+id+"&DivisionExe=STAFFASIGN";
  fetch(url)
        .then(res=>res.json())
        .then(res=>{
          // console.log(res,"Assigned")
        })
}

function Connectmsg(Empname, Taskno, Cont , ComDate ,type,nature,Desc,Prior,devdt,prodt){
  
  
  let url = 'http://smartfm.in/mattermost-php/tests/test.php';
  var dataString ="EmpID="+Empname+"&Taskno="+Taskno+"&Cont="+Cont+"&ComDate="+ComDate+"&type="+type+"&nature="+nature+"&Desc="+Desc+"&Prior="+Prior+"&devdt="+devdt+"&prodt="+prodt;

  axios.post(url,dataString)
  .then(res => {
    console.log(res);
  }) 

}

function Tablecontext(e,id,row){  
  setPaymentRow(row);
  localStorage.setItem('ComplaintIDPK',id); 
  localStorage.setItem('ComplaintNo',row.ComplaintNo);
  setAnchMenuEl(e.currentTarget);
}

function TableSearch(e){
  var tabarr = [];
  Slidedata.map(val => {
      let descComplaintNo =  val.ComplaintNo.toLowerCase();  
      let descComplainedDate = val.ComplainedDate.toLowerCase();  
      let descComplainerName = val.ComplainerName.toLowerCase();  
      let descRequestDetailsDesc = val.RequestDetailsDesc.toLowerCase(); 
    
    // var titleMatch = title.includes("smart");
    let ComplaintNoMatch = descComplaintNo.includes(e.toLowerCase());
    let ComplainedDateMatch = descComplainedDate.includes(e.toLowerCase());
    let ComplainerNameMatch = descComplainerName.includes(e.toLowerCase());
    let RequestDetailsDescMatch = descRequestDetailsDesc.includes(e.toLowerCase());
    
    if(ComplaintNoMatch || ComplainedDateMatch || ComplainerNameMatch || RequestDetailsDescMatch){ 
      tabarr.push(val) ;
    }
    return null;
   });
   setSlidedataserch(tabarr) 
}

// const handleCloseMenu = (val) => {
//   setAnchMenuEl(null); 
// };

function SuperClick(){
  
  if(SuperUser){
    setSuperUser(false)
  }else{
    setSuperUser(true)
  }
}

// var logofm = Smartfm;

// logofm = 'static/media/smartfm.38ea370b.png';

return (

<div>
 
  {/* <!-----------------------Initial Design -------------------------------------------------------- */}
  {loading ? <Spinner/>  :  
  
  <Grid container justify="center"style={{  background: '#ebeef1',minHeight:'100vh',minWidth:'100%',padding: '5px'}} >
          
          <Grid item xs={12} sm={12} md={12}>
            <AppBar id="appbarbg" className={classes.appbar} style={{padding:'4px' }}>
              <Grid container>
                <Grid item xs={3} sm={2} md={2} style={{ textAlign:'left' }}>
                  <img alt="logo1" src={Nanosoft} className='logo1'></img>
                </Grid>
                <Grid item xs={5} sm={8} md={9} style={{textAlign:'center'}}>
                  <span className="Apphead">NanoSoft Tracker Board</span> 
                </Grid>
                <Grid item xs={4} sm={2} md={1} style={{display: 'flex',alignItems: 'center',justifyContent: 'flex-end'}}>
                  {/* <img alt="logo2" src={logofm} className='logo2'></img> */}
                  <span className="usercss">{localStorage.getItem('username')}</span>
                  <Icon style={{marginLeft: '3%',cursor: 'pointer'}} title={'Logout'} onClick={LogOutBtn}>logout</Icon>
                </Grid>
              </Grid> 
            </AppBar>
          </Grid>
            
          <Grid item xs={12} sm={12} md={12} className="marginTop" >
            <Grid container > 
              <Grid item xs={12} sm={12} md={12} className="Gridpad">

                <Card className="cardshadow">
                        
                        {/* <div className="CardHeader">
                          <div style={{display: 'flex'}}>
                            <span className="cardheadlabel">Summary</span>
                            <span className="headCsscurve"></span>

                          </div>
                        </div> */}
                        {OvrallIndex === 0 &&
                        <span className="multibtn">
                            <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                              <Button onClick={handleClick}>{btnoptions[selectedIndex]}</Button>
                              <Button
                                color="primary"
                                size="small"
                                aria-controls={btnopen ? 'split-button-menu' : undefined}
                                aria-expanded={btnopen ? 'true' : undefined}
                                aria-label="select merge strategy"
                                aria-haspopup="menu"
                                onClick={handleToggle}
                              >
                                <ArrowDropDownIcon />
                              </Button>
                            </ButtonGroup>
                            <Popper open={btnopen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                              <Grow
                                {...TransitionProps}
                                style={{
                                  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                              >
                                <Paper>
                                  <ClickAwayListener onClickAway={handlebtnClose}>
                                    <MenuList id="split-button-menu">
                                      {btnoptions.map((opt, index) => (
                                        <MenuItem
                                          key={opt}
                                          disabled={index === 4}
                                          selected={index === selectedIndex}
                                          onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                          {opt}
                                        </MenuItem>
                                      ))}
                                    </MenuList>
                                  </ClickAwayListener>
                                </Paper>
                              </Grow>
                            )}
                          </Popper>
                        </span>}
                       
                        <IconButton aria-label="delete" className={classes.marginleft} onClick={()=>{MonthChange('Complaint')}}>
                        <Icon title="Register Complaint" className="sendbtn">send</Icon>
                        </IconButton>
                        <IconButton aria-label="delete" className={classes.marginleft} onClick={()=>openCalendar()} >
                        <Icon title="Calender" className="sendbtn">date_range</Icon>
                        </IconButton>
                         
                       
                        {/* <button className="btnsubmit" onClick={()=>{MonthChange('Complaint')}}>Submit</button>
                        <button className="btnsubmit" onClick={()=>openCalendar()}>Calendar</button> */}
                        <Icon style={{float:'right',margin:'0.7rem 2px'}} title={refresh ? 'Disable Autorefresh' : 'Enable Autorefresh'} onClick={autorefresh}>{refresh ? 'update_disabled': 'refresh'}</Icon>
                        {localStorage.getItem('SuperUser') === '1' && <Icon style={{float:'right',margin:'0.7rem 2px'}} title={SuperUser ? 'Disable SuperUser' : 'Enable SuperUser'} onClick={SuperClick}>{SuperUser ? 'person_off' : 'supervised_user_circle'}</Icon>}
                        <button style={{float:'right',margin:'0.7rem 2px'}} className="btnCss" onClick={()=>{filterchange()}}><Icon className="filcss">filter_alt</Icon></button>
                        <div id="filDiv">
                            <Grid container style={{padding:'6px'}}>
                              <Grid item xs={6} sm={4} md={2}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <KeyboardDatePicker
                                    autoOk
                                    disableToolbar
                                    variant="inline"
                                    format="dd-MM-yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="From"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                      'aria-label': 'change date',
                                    }}
                                  />
                                </MuiPickersUtilsProvider>
                              </Grid>
                              
                              <Grid item xs={6} sm={4} md={2}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <KeyboardDatePicker
                                    autoOk
                                    disableToolbar
                                    variant="inline"
                                    format="dd-MM-yyyy"
                                    margin="normal"
                                    id="date-picker-to"
                                    label="To"
                                    value={selectedDate2}
                                    onChange={handleDateChange2}
                                    KeyboardButtonProps={{
                                      'aria-label': 'change date',
                                    }}
                                  />
                                </MuiPickersUtilsProvider>
                              </Grid>
                              <Grid item xs={8} sm={8} md={2} style={{padding: '3px 10px'}}>
                                <div style={{display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                                  <Autocomplete
                                    style={{width:'100%'}}
                                    size="small"
                                    {...defaultProps}
                                    id="Emp-select"
                                    value={Empvalue}
                                    disabled={localStorage.getItem('SuperUser') === '1' ? false : true}
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
                                  
                                  <button className="btnCss btnpad" onClick={()=>{getData()}}><Icon className="searchicon" >search</Icon></button>
                                </div>
                              </Grid>
                              <Grid item xs={4} sm={4} md={2} className="searchdiv">
                                <button className="btnCss btnpad" onClick={()=>{OverlaySlide(38,null,EmpID,'Open Employee List')}}>Open Employee</button>
                              </Grid>
                              <Grid item xs={8} sm={8} md={2} style={{padding: '3px 10px'}}>
                                <Autocomplete
                                  style={{width:'100%'}}
                                  size="small"
                                  {...defaultProps2}
                                  id="Con-select"
                                  value={Contractvalue}
                                  onChange={(event, newValue) => {
                                    setContractValue(newValue);
                                    if(newValue){
                                      setContractID(newValue.ContractID);
                                    }else{
                                      setContractID(null);
                                    }
                                    
                                  }}
                                  renderInput={(params) => <TextField {...params} label="Select Contract" margin="normal" fullWidth/>}
                                />
                                
                              </Grid>
                              <Grid item xs={4} sm={4} md={2} className="searchdiv">
                                <button className="btnCss btnpad" onClick={()=>{OverlaySlide(37,ContractID,null,'Open Contract List')}}>Open Contract</button>
                              </Grid>
                              {/*<Grid item xs={6} sm={4} md={2} style={{ paddingLeft: '1%',borderLeft: '1px solid #ccc'}}>
                                 <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <KeyboardDatePicker
                                    views={["month"]}
                                    disableToolbar
                                    variant="inline"
                                    format="MMM"
                                    margin="normal"
                                    id="date-picker-to"
                                    label="Monthly"
                                    value={selectedMonth}
                                    onChange={handleMonthChange}
                                    KeyboardButtonProps={{
                                      'aria-label': 'change date',
                                    }}
                                  />
                                </MuiPickersUtilsProvider> 
                              </Grid>*/}
                              <Grid item xs={4} sm={3} md={1} className="searchdiv">
                                <button className="btnCss btnpad" onClick={()=>{MonthChange('Empstat')}}>Status</button>
                              </Grid>
                              <Grid item xs={4} sm={3} md={1} className="searchdiv">
                                <button className="btnCss btnpad" onClick={()=>{MonthChange('EmpConsol')}}>Consolidate</button>
                              </Grid>
                              <Grid item xs={4} sm={3} md={1} className="searchdiv">
                                <button className="btnCss btnpad" onClick={()=>{MonthChange('Monthly')}}>Monthly</button>
                              </Grid>
                              
                              
                              {/* <Grid item xs={4} sm={4} md={1} className="searchdiv">
                                <button className="btnCss btnpad" onClick={()=>{MonthChange('WStatus')}}>Status</button>
                              </Grid> */}
                              <Grid item xs={6} sm={3} md={2} className="searchdiv">
                                <button className="btnCss btnpad" onClick={()=>{MonthChange('Day progress')}}>Day Wise Progress</button>
                              </Grid>
                              <Grid item xs={6} sm={4} md={2} className="searchdiv">
                                <button className="btnCss btnpad" onClick={()=>{MonthChange('Contract closed')}}>Contract Wise Closed</button>
                              </Grid>
                              <Grid item xs={6} sm={4} md={2} className="searchdiv">
                                <button className="btnCss btnpad" onClick={()=>{MonthChange('Contract raised')}}>Contract Wise Raised</button>
                              </Grid>
                              <Grid item xs={3} sm={2} md={1} className="searchdiv">
                                <button className="btnCss btnpad" onClick={()=>{MonthChange('Employee')}}>Upcoming</button>
                              </Grid>
                              {/* <Grid item xs={4} sm={4} md={1} className="searchdiv">
                                <button className="btnCss btnpad" onClick={()=>{MonthChange('AllEmployee')}}>Upcoming All</button>
                              </Grid> */}
                              <Grid item xs={3} sm={2} md={1} className="searchdiv">
                                <button className="btnCss btnpad" onClick={()=>{
                                  let Fmon = selectedDate.getMonth()+1; 
                                  let Tmon = selectedDate2.getMonth()+1; 

                                  OverlaySlide(23,null,EmpID,'Log Sheet',null,selectedDate.getFullYear()+"-"+Fmon+"-"+ selectedDate.getDate(),selectedDate2.getFullYear()+"-"+Tmon+"-"+ selectedDate2.getDate())
                                  }}>LogSheet</button>
                              </Grid>
                              

                            </Grid>
                        </div>
                    {Sumdet.length > 0 ? 
                        Sumdet.map((val,i)=>{
      
                          return (
                        <CardContent key={i} className="cardcontent">
                          <Grid container>
                            <Grid item xs={12} sm={12} md={4}>
                              <Grid container style={{width:'100%',margin:'0'}}>
                                <Grid item xs={6} sm={6} md={2} className="borderradius mbmargin" style={{'borderLeft': '4px solid #63c2de'}}>
                                    <p className="Headlabel">Total</p>
                                    <h3  className="Headval" onClick={()=>{Conchange('Total')}}>
                                      {val.val.Total}
                                    </h3>
                              

                                </Grid>

                                <Grid item xs={6} sm={6} md={4} className="borderradius mbmargin" style={{ 'borderLeft':'4px solid #f86c6b',background: 'rgb(8, 147, 245)'}} >
                                  <p className="Headlabel " style={{'color':'#000'}}>DR</p>

                                    <h3 className="Headval" onClick={()=>{Conchange('DR')}}>

                                    {val.val.DR} / {val.val.DRE}
                                    </h3>
                                </Grid>

                                <Grid item xs={6} sm={6} md={2} className="borderradius mbmargin" style={{ 'borderLeft':'4px solid #f86c6b',}}>
                                  <p  className="Headlabel" style={{'color':'#f50057'}}>PR</p>

                                  <h3 className="Headval ">
                                      0
                                    </h3>

                                </Grid>
                                
                                <Grid item xs={6} sm={6} md={2} className="borderradius mbmargin" style={{ 'borderLeft':'4px solid #337ab7'}}>
                                  <p className="Headlabel " style={{'color':'#337ab7'}}>CR</p>
                                  <h3  className="Headval" onClick={()=>{Conchange('CR')}}>

                                    {val.val.CR}
                                    
                                  </h3>
                          
                                </Grid>

                                <Grid item xs={6} sm={6} md={2} className="borderradius mbmargin" style={{ 'borderLeft':'4px solid #337ab7'}}>
                                  <p  className="Headlabel " style={{'color':'#337ab7'}}>NR</p>

                                  <h3   className="Headval" onClick={()=>{Conchange('NR')}}>

                                  {val.val.NR}
                                    
                                  </h3>
                                </Grid>
                              </Grid>
                            </Grid>  
                            
                            <Grid item xs={12} sm={12} md={4}>
                              <Grid container style={{width:'100%',margin:'0'}}>
                                
                                <Grid item xs={6} sm={6} md={2} className="borderradius mbmargin" style={{ 'borderLeft':'4px solid #ffc107'}}>
                                  <p  className="Headlabel">GR</p>

                                  <h3   className="Headval" onClick={()=>{Conchange('OTH')}}>

                                      {val.val.oths}
                                    
                                  </h3>
                                </Grid>

                                <Grid item xs={6} sm={6} md={2} className="borderradius mbmargin" style={{ 'borderLeft':'4px solid #4dbd74'}}>
                                  <p  className="Headlabel " style={{'color':'#4dbd74'}}>MR</p>

                                  <h3   className="Headval" onClick={()=>{Conchange('MR')}}>

                                    {val.val.MR}
                                    
                                    </h3>
                                </Grid>

                                <Grid item xs={6} sm={6} md={2} className="borderradius mbmargin" style={{ 'borderLeft':'4px solid #4dbd74'}}>
                                    <p  className="Headlabel " style={{'color':'#4dbd74'}} >FR</p>

                                      <h3 className="Headval" onClick={()=>{Conchange('FR')}}>

                                        {val.val.FR}
                                      
                                      </h3>
                                </Grid>

                                <Grid item xs={6} sm={6} md={2} className="borderradius mbmargin" style={{ 'borderLeft':'4px solid #4dbd74'}}>
                                      <p  className="Headlabel " style={{'color':'#4dbd74'}} >RR</p>

                                        <h3 className="Headval" onClick={()=>{Conchange('RR')}}>

                                          {val.val.RR}
                                        
                                        </h3>
                                  </Grid>

                                <Grid item xs={6} sm={6} md={2} className="borderradius mbmargin" style={{ 'borderLeft':'4px solid rgb(245, 152, 9)'}}>
                                    <p  className="Headlabel " style={{'color':'rgb(245, 152, 9)'}} >ER</p>

                                      <h3 className="Headval" onClick={()=>{Conchange('ER')}}>

                                        {val.val.ER}
                                      
                                      </h3>
                                </Grid>
                              
                                <Grid item xs={6} sm={6} md={2} className="borderradius mbmargin" style={{ 'borderLeft':'4px solid rgb(245, 152, 9)'}}>
                                      <p  className="Headlabel " style={{'color':'rgb(245, 152, 9)'}} >TR</p>

                                        <h3 className="Headval" onClick={()=>{Conchange('TR')}}>

                                          {val.val.TR}
                                        
                                        </h3>
                                </Grid>
                              </Grid>  
                            </Grid>

                            <Grid item xs={12} sm={12} md={4}>
                              <Grid container style={{width:'100%',margin:'0'}}>

                                  <Grid item xs={6} sm={6} md={2} className="borderradius mbmargin" style={{ 'borderLeft':'4px solid #ffc107'}}>
                                    <p  className="Headlabel">OD</p>

                                    <h3   className="Headval" onClick={()=>{Conchange('OVD')}}>

                                        {val.val.OVD}
                                      
                                    </h3>
                                  </Grid>

                                  <Grid item xs={6} sm={6} md={2} className="borderradius mbmargin" style={{ 'borderLeft':'4px solid #f0e68c','background': '#7fff007a'}}>
                                    <p  className="Headlabel" style={{'color':'#864c99'}}>PYM</p>

                                    <h3 className="Headval" onClick={()=>{Conchange('PYM')}}>

                                      {val.val.PYM}
                                      
                                      </h3>
                                  </Grid>
                                  
                                  <Grid item xs={6} sm={6} md={2} className="borderradius mbmargin" style={{ 'borderLeft':'4px solid #05ffb0'}}>
                                      <p  className="Headlabel">Failed</p>

                                        <h3 
                                        className="Headval">

                                          {val.val.FaildCount}
                                        
                                        </h3>
                                  </Grid>

                                  <Grid item xs={6} sm={6} md={2} className="borderradius mbmargin" style={{ 'borderLeft':'4px solid #008b8b'}}>
                                    <p  className="Headlabel">SNA</p>

                                      <h3 className="Headval  " onClick={()=>{Conchange('SNA')}}>

                                        {val.val.SNA}
                                      
                                      </h3>
                                  </Grid>
                                  
                                  <Grid item xs={6} sm={6} md={2} className="borderradius mbmargin" style={{ 'borderLeft':'4px solid #008b8b'}}>
                                    <p  className="Headlabel">NOETA</p>

                                      <h3 className="Headval" onClick={()=>{Conchange('NOETA')}}>

                                        {val.val.NOETA}
                                      
                                      </h3>
                                  </Grid>
                                  
                                  <Grid item xs={6} sm={6} md={2} className="borderradius mbmargin" style={{ 'borderLeft':'4px solid #008b8b'}}>
                                    <p  className="Headlabel">HOLD</p>

                                      <h3 className="Headval" onClick={()=>{MonthChange('HOLD')}}>

                                        {val.val.Hold}
                                      
                                      </h3>
                                  </Grid>
                              </Grid>
                            </Grid>

                          </Grid>
                        </CardContent>)
                      })
                  : null}
                </Card>
              </Grid>

              <Grid item xs={12} sm={12} md={12} className="Gridpad">
                    <Card className="cardshadow" >
                        
                      <div className="CardHeader">
                        <div style={{display:'flex'}}>
                          <span className="cardheadlabel">Contract Wise -{Headval}</span>
                          <span className="headCsscurve"></span>
                          <div className="multibtn">
                            <ButtonGroup variant="contained" color="primary" ref={OvrallRef} aria-label="split button">
                              <Button onClick={OvrallClick}>{Ovropt[OvrallIndex]}</Button>
                              <Button
                                color="primary"
                                size="small"
                                aria-controls={Ovropen ? 'split-button-menu' : undefined}
                                aria-expanded={Ovropen ? 'true' : undefined}
                                aria-label="select merge strategy"
                                aria-haspopup="menu"
                                onClick={OvrallToggle}
                              >
                                <ArrowDropDownIcon />
                              </Button>
                            </ButtonGroup>
                            <Popper open={Ovropen} anchorEl={OvrallRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                              <Grow
                                {...TransitionProps}
                                style={{
                                  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                              >
                                <Paper>
                                  <ClickAwayListener onClickAway={OvrbtnClose}>
                                    <MenuList id="split-button-menu">
                                      {Ovropt.map((opt, index) => (
                                        <MenuItem
                                          key={opt}
                                          // disabled={index === 2}
                                          selected={index === OvrallIndex}
                                          onClick={(event) => OvrMenuItemClick(event, index)}
                                        >
                                          {opt}
                                        </MenuItem>
                                      ))}
                                    </MenuList>
                                  </ClickAwayListener>
                                </Paper>
                              </Grow>
                            )}
                          </Popper>
                        </div>
                          
                        </div>
                      </div>

                      <CardContent   className='cardcontent' style={{height: '35vh'}}>
                            <Grid container >
                               
                               <Grid item xs={12} sm={12} md={12} >
                                  {chartchange ? 
                                   <ConChart value = {ContChartLive} value2 = {ContChartAMC} value3 = {ContChartIMP} value4 = {ContChartOther} openModal={OverlaySlide} Headprop={Headval}/> : null
                                  }
                               </Grid>
                            </Grid>
                      </CardContent>
                  
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={12} md={12} className="Gridpad">
              
                    <Card className="cardshadow">
                        
                      <div className="CardHeader">
                        <div style={{display: 'flex'}}>
                          <span className="cardheadlabel">Employee Wise -{Headval}</span>
                          <span className="headCsscurve"></span>
                          {/* <span title="Unassigned" className="notify">11</span> */}
                        </div>
                      </div>

                      <CardContent   className='cardcontent' style={{height: '35vh'}}>
                            <Grid container >
                            {(Headval !== 'SNA' && Headval !== 'NOETA' && Headval !== 'MR' && Headval !== 'FR' && Headval !== 'RR') ?    
                               <Grid item xs={12} sm={12} md={12} >
                                  {chartchange ? 
                                   <EmpChart value = {EmpChartLive} value2 = {EmpChartAMC} value3 = {EmpChartIMP} value4 = {EmpChartOther} openModal={OverlaySlide} Headprop={Headval} /> : null
                                  }
                               </Grid>
                               :
                               <Grid item xs={12} sm={12} md={12} >
                                 <div style={{display:'flex',justifyContent: 'center',alignItems: 'center',height: '35vh'}}>
                                   No Data
                                  </div>
                               </Grid>
                            }
                            </Grid>
                      </CardContent>
                  
                </Card>
              
              </Grid>

              {/* <Grid item xs={12} sm={12} md={12} className="Gridpad">
                    <Card className="cardshadow">
                        
                      <div className="CardHeader">
                        <div style={{display: 'flex'}}>
                          <span className="cardheadlabel">Employee ETA& Work</span>
                          <span className="headCsscurve"></span>
                          <button className="btnCss" onClick={()=>{setEmpETA(EmpTodayETA);setEmpETAtype('todayETA')}}>Today ETA</button>
                          <button className="btnCss" onClick={()=>{setEmpETA(EmpTodaywork);setEmpETAtype('todaywork')}}>Today Work</button>
                        </div>
                      </div>

                      <CardContent   className='cardcontent' style={{height: 'fit-content'}}>
                            <Grid container >
                               
                               <Grid item xs={12} sm={12} md={12} >
                                  
                                   <EmpETAchart value = {EmpETA} EmptypeETA={EmpETAtype} openModal={OverlaySlide}/>
                                  
                               </Grid>
                            </Grid>
                      </CardContent>
                  
                </Card>
              </Grid> */}

              {/* <Grid item xs={12} sm={12} md={12} className="Gridpad">
                    <Card className="cardshadow">
                        
                      <div className="CardHeader">
                        <div style={{display: 'flex'}}>
                          <span className="cardheadlabel">ETA</span>
                          <span className="headCsscurve"></span>
                          <button className="btnCss" onClick={()=>{setETAToday(ETACharttoday);setETAtype('today')}}>Today</button>
                          <button className="btnCss" onClick={()=>{setETAToday(ETAChartnext);setETAtype('next')}}>Next 7 Days</button>
                        </div>
                      </div>

                      <CardContent   className='cardcontent' style={{height: 'fit-content'}}>
                            <Grid container >
                               
                               <Grid item xs={12} sm={12} md={12} >
                                  
                                   <CanvasJSChart options = {ETAoption} />
                                  
                               </Grid>
                            </Grid>
                      </CardContent>
                  
                </Card>
              </Grid> */}

              {/* <Grid item xs={12} sm={12} md={12} className="Gridpad">
                    <Card className="cardshadow">
                        
                      <div className="CardHeader">
                        <div style={{display: 'flex'}}>
                          <span className="cardheadlabel">Employee Working Status</span>
                          <span className="headCsscurve"></span>
                        </div>
                      </div>

                      <CardContent   className='cardtablecon'>
                        <Grid container >
                          <Grid item xs={12} sm={12} md={12} >
                            <EmpStatchart value = {EmpWorkhrs} />
                          </Grid>
                        
                        </Grid>
                      </CardContent>
                  
                </Card>
              </Grid> */}

              {/* <Grid item xs={12} sm={12} md={12} className="Gridpad">
                    <Card className="cardshadow">
                        
                      <div className="CardHeader">
                        <div style={{display: 'flex'}}>
                          <span className="cardheadlabel">Employee ETT</span>
                          <span className="headCsscurve"></span>
                        </div>
                      </div>

                      <CardContent   className='cardtablecon'>
                        <Grid container >
                          <Grid item xs={12} sm={12} md={12} >
                            <EmpEttchart value = {EmpEtt} />
                          </Grid>
                          
                        </Grid>
                      </CardContent>
                  
                </Card>
              </Grid> */}
      {/* <!------------------------Contract Wise--------------------------------------------------- */}
              {/* <Grid item xs={12} sm={6} md={6} className="Gridpad">
                    <Card className="cardshadow">
                        
                      <div className="CardHeader">
                        <div style={{display: 'flex'}}>
                          <span className="cardheadlabel">Contract Wise</span>
                          <span className="headCsscurve"></span>
                        </div>
                      </div>

                      <CardContent   className='cardtablecon'>
                          <TableContainer className={classuse.tableroot} component={Paper}>
                            <Table stickyHeader className={classes.table} aria-label="simple table">
                              <TableHead>
                              <StyledTableRow>
                                <TableCell className={classuse.tablecell}>Name</TableCell>
                                  <TableCell className={classuse.tablecell} align="right">DR</TableCell>
                                  <TableCell className={classuse.tablecell} align="right">CR</TableCell>
                                  <TableCell className={classuse.tablecell} align="right">NR</TableCell>
                                  <TableCell className={classuse.tablecell} align="right">Others</TableCell>
                                </StyledTableRow>
                              </TableHead>
                              <TableBody>
                                {ContractWise.map((row,i) => (
                                  <StyledTableRow key={i}>
                                    <TableCell component="th" scope="row">
                                      {row.Descriptions}
                                    </TableCell>
                                    <TableCell style={{cursor:'pointer'}} align="right" onClick={()=>{OverlaySlide(1,row.WorkOrderID,0,row.Descriptions +" - ("+ row.DR+")")}}>{row.DR}</TableCell>
                                    <TableCell style={{cursor:'pointer'}} align="right" onClick={()=>{OverlaySlide(2,row.WorkOrderID,0,row.Descriptions+" - ("+ row.CR+")")}}>{row.CR}</TableCell>
                                    <TableCell style={{cursor:'pointer'}} align="right" onClick={()=>{OverlaySlide(3,row.WorkOrderID,0,row.Descriptions+" - ("+ row.NR+")")}}>{row.NR}</TableCell>
                                    <TableCell style={{cursor:'pointer'}} align="right" onClick={()=>{OverlaySlide(4,row.WorkOrderID,0,row.Descriptions+" - ("+ row.oths+")")}}>{row.oths}</TableCell>
                                  </StyledTableRow>
                                ))} 
                              </TableBody>
                            </Table>
                          </TableContainer>
                      </CardContent>
                  
                </Card>
              </Grid> */}
      {/* <!-----------Priority Wise-------------------------------------------- */}
              {/* <Grid item xs={12} sm={6} md={6} className="Gridpad">
                    <Card  className= "cardshadow" >
                    <div className="CardHeader">
                          <div style={{display: 'flex'}}>
                            <span className="cardheadlabel">Priority Wise</span>
                            <span className="headCsscurve"></span>
                          </div>
                        </div>

                    <CardContent   className='cardcontent priohigh'>
                            <Grid container >
                               
                              <Grid item xs={12} sm={12} md={12}>

                                  <CanvasJSChart options = {options} />
                              
                              </Grid>
                            </Grid>
                           
                      </CardContent>
                  
                </Card>
              </Grid> */}

              {/* <!---------Responsibility Wise------------------------- */}       
              {/* <Grid item xs={12} sm={12} md={12} className="Gridpad">
                    <Card   className= 'cardshadow'>
                    <div className="CardHeader">
                          <div style={{display: 'flex'}}>
                            <span className="cardheadlabel">Responsibility Wise</span>
                            <span className="headCsscurve"></span>
                          </div>
                        </div>

              <CardContent   className='cardtablecon'>
              <TableContainer className={classuse.tableroot}component={Paper}>
                <Table stickyHeader className={classes.table} aria-label="simple table">
                <TableHead>
                <StyledTableRow>
                <TableCell className={classuse.tablecell}>Name</TableCell>
                  <TableCell className={classuse.tablecell} align="right">DR</TableCell>
                  <TableCell className={classuse.tablecell} align="right">CR</TableCell>
                  <TableCell className={classuse.tablecell} align="right">NR</TableCell>
                  <TableCell className={classuse.tablecell} align="right">Others</TableCell>
                </StyledTableRow>
              </TableHead>
              
              <TableBody>
                {EmpWise.map((row,i) => (
                  <StyledTableRow key={i}>
                  <TableCell component="th" scope="row">
                      {row.Descriptions}
                    </TableCell>
                <TableCell style={{cursor:'pointer'}} align="right" onClick={()=>{OverlaySlide(5,0,row.WorkOrderID,row.Descriptions+" - ("+ row.DR+")")}}>{row.DR}</TableCell>
                <TableCell style={{cursor:'pointer'}} align="right" onClick={()=>{OverlaySlide(6,0,row.WorkOrderID,row.Descriptions+" - ("+ row.CR+")")}}>{row.CR}</TableCell>
                <TableCell style={{cursor:'pointer'}} align="right" onClick={()=>{OverlaySlide(7,0,row.WorkOrderID,row.Descriptions+" - ("+ row.NR+")")}}>{row.NR}</TableCell>
                <TableCell style={{cursor:'pointer'}} align="right" onClick={()=>{OverlaySlide(8,0,row.WorkOrderID,row.Descriptions+" - ("+ row.oths+")")}}>{row.oths}</TableCell>
                  </StyledTableRow>
                ))} 
              </TableBody>
            </Table>
          </TableContainer>
                      </CardContent>
                        
                </Card>
              </Grid> */}


            </Grid>
          </Grid>

  </Grid>
  
  }

  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
  }}>
    <Alert onClose={handleClose} severity={msgColor}>
      {Message}
    </Alert>
  </Snackbar>

  <div id="Tableslide">
      <div className="popclosebtn" onClick={() => tablepopClose()}>
            <span className="btnclose">X</span>
      </div>
      <div className="formslide"> 
          <span className="slidetitle">{Formtitle +" -("+Slidedata.length+") "}{(Formtitle === 'Log Sheet') && "("+Fromdate +" - "+ Todate+")"}</span>
          <Grid container>
            <Grid item xs={8} sm={8} md={8} >
              <form noValidate autoComplete="off">
                <TextField 
                    placeholder="Search"
                    id="Tablesearch"
                    style={{width: '100%'}} 
                    onChange={(e)=>{TableSearch(e.target.value) }}
                    // value={Contname}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    />
              </form>               
            </Grid> 
            <Grid item xs={4} sm={4} md={4} >
              <div style={{float:'right'}}>
                  <ExcelFile filename="TaskSummary"  element={<Icon title="Excel Export">present_to_all</Icon>}>
                      <ExcelSheet dataSet={exportData} name="TaskSummary"/>
                  </ExcelFile>
              </div>
            </Grid> 
          </Grid>
          
          <TableContainer component={Paper} style={{height: '80vh'}}>
            <Table stickyHeader className={classes.table} aria-label="simple table">
              <TableHead>
                
                  {(Formtitle === 'Log Sheet') ? 
                  <StyledTableRow>
                    <TableCell className={classuse.tablecell} style={{width:'120px'}}>Contractname</TableCell>
                    <TableCell className={classuse.tablecell} style={{width:'70px'}}>EmployeeName</TableCell>
                    <TableCell className={classuse.tablecell} style={{width:'80px'}}>Task No</TableCell>
                    <TableCell className={classuse.tablecell} style={{width:'300px'}}>Description</TableCell>
                    <TableCell className={classuse.tablecell} style={{width:'70px'}}>Start Time</TableCell>
                    <TableCell className={classuse.tablecell} style={{width:'70px'}}>End Time</TableCell>
                    <TableCell className={classuse.tablecell} style={{width:'70px'}}>Totalhrs</TableCell>
                  </StyledTableRow>
                  :
                  <StyledTableRow>
                    <TableCell className={classuse.tablecell} style={{width:'95px'}}>DelvDate</TableCell>
                    <TableCell className={classuse.tablecell} style={{width:'70px'}}>Type</TableCell>
                    <TableCell className={classuse.tablecell} style={{width:'95px'}}>ComplaintNo</TableCell>
                    <TableCell className={classuse.tablecell} style={{width:'120px'}}>Date</TableCell>
                    <TableCell className={classuse.tablecell} style={{width:'120px'}}>ContractName</TableCell>
                    <TableCell className={classuse.tablecell} style={{width:'80px'}}>RegisteredBy</TableCell>
                    <TableCell className={classuse.tablecell} style={{width:'300px'}}>Description</TableCell>
                    <TableCell className={classuse.tablecell} style={{width:'120px'}}>ETA Date</TableCell>
                    <TableCell className={classuse.tablecell} style={{width:'80px'}}>ETA Time</TableCell>
                    <TableCell className={classuse.tablecell} style={{width:'70px'}}>Ageing</TableCell>
                    <TableCell className={classuse.tablecell} style={{width:'70px'}}>Priority</TableCell>
                    <TableCell className={classuse.tablecell} style={{width:'80px'}}>ANAName</TableCell>
                    <TableCell className={classuse.tablecell} style={{width:'80px'}}>EXEName</TableCell>
                    <TableCell className={classuse.tablecell} style={{width:'80px'}}>ReasonFor Pending</TableCell>  
                    <TableCell className={classuse.tablecell} style={{width:'120px'}}>StageName</TableCell>
                  </StyledTableRow>
                  }
                
              </TableHead>
              
              <TableBody>
                {Slidedataserch.map((row,i) => (
                  (Formtitle === 'Log Sheet') ?
                  <StyledTableRow key={i} >
                    <TableCell className={classuse.cellbody}>{row.ContractName}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.EmpName}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.TaskNo}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.TaskDescription}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.TaskStartTime}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.TaskEndTime}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.TotalHrs}</TableCell>
                  </StyledTableRow>
                  :
                  <StyledTableRow key={i} onClick={(e) => {Tablecontext(e,row.ComplaintIDPK,row)}}>
                    <TableCell className={classuse.cellbody}>{row.DeliveryDate}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.TicketType}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.ComplaintNo}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.ComplainedDate}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.ContractName}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.ComplainerName}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.RequestDetailsDesc}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.ETADate}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.ETATime}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.AgeingInDays}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.PriorityName}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.TechName}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.bdmempname}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.MaintenanceRemarks}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.StageName}</TableCell>
                  </StyledTableRow>
                ))} 
              </TableBody>
            </Table>
          </TableContainer>

          <div>
          <StyledMenu
              id="customized-menu"
              anchorEl={anchMenuEl}
              keepMounted
              open={Boolean(anchMenuEl)}
              onClose={handleCloseMenu}
            >
              <StyledMenuItem onClick={()=>handleCloseMenu('Staff Assign')}>
                <ListItemIcon>
                  <Icon fontSize="small" >how_to_reg</Icon>
                </ListItemIcon>
                <ListItemText primary="Staff Assign" />
              </StyledMenuItem>
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
                  <Icon fontSize="small" >share</Icon>
                </ListItemIcon>
                <ListItemText primary="Analysis Close" />
              </StyledMenuItem>
              <StyledMenuItem onClick={()=>handleCloseMenu('Reason for Pending')}>
                <ListItemIcon>
                  <Icon fontSize="small" >note_add</Icon>
                </ListItemIcon>
                <ListItemText primary="Reason for Pending" />
              </StyledMenuItem>

              <StyledMenuItem onClick={()=>handleCloseMenu('Status')}>
                <ListItemIcon>
                  <Icon fontSize="small" >info</Icon>
                </ListItemIcon>
                <ListItemText primary="Status" />
              </StyledMenuItem>
              <StyledMenuItem onClick={()=>handleCloseMenu('Update Time')}>
                <ListItemIcon>
                  <Icon fontSize="small" >schedule</Icon>
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
                  <Icon fontSize="small" >autorenew</Icon>
                </ListItemIcon>
                <ListItemText primary="Execution Close" />
              </StyledMenuItem>
              <StyledMenuItem onClick={()=>handleCloseMenu('Start Work')}>
                <ListItemIcon>
                  <Icon fontSize="small" >schedule_send</Icon>
                </ListItemIcon>
                <ListItemText primary="Start Work" />
              </StyledMenuItem>
              <StyledMenuItem onClick={()=>handleCloseMenu('StandBy')}>
                <ListItemIcon>
                  <Icon fontSize="small" >pan_tool</Icon>
                </ListItemIcon>
                <ListItemText primary="StandBy" />
              </StyledMenuItem>

              <StyledMenuItem onClick={()=>handleCloseMenu('Payment Update')}>
                <ListItemIcon>
                  <PaymentIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Payment Update" />
              </StyledMenuItem>

          </StyledMenu>


          <SimpleMenuContext.Provider value={{ 
          value:'simplecard',
          paymentrow : PaymentRow,
          dialogClose: () => setDialogOpen(false),
          refresh: () => {tablepopClose()},
          }}>
    
            {
              MenuState === 'Hold Remarks' && <ETAHoldUpdate open={dialogOpen}/>
            }
            {
              MenuState === 'Rework Remarks' && <ETAReworkRemarks open={dialogOpen} />
            }
            {
              MenuState === 'ETA & Production Date' && <ETAProductionDate open={dialogOpen}/>
            }
            {
              MenuState === 'Reason for Pending' && <ReasonforPending open={dialogOpen} />
            }
            {
              MenuState === 'Status' && <Status open={dialogOpen}/>
            }
            {
              MenuState === 'Add CheckPoints' && <AddCheckPoint open={dialogOpen}/>
            }
            {
              MenuState === 'Start Work' && <StartWork open={dialogOpen}/>
            }
            {
              MenuState === 'StandBy' && <StandBy open={dialogOpen}/>
            }
            {
              MenuState === 'Analysis Close' && <Analysis open={dialogOpen}/>
            }
            {
              MenuState === 'Execution Close' && <Execution open={dialogOpen}/>
            }
            {
              MenuState === 'Update Time' && <UpdateTime open={dialogOpen}/>
            }
            {
              MenuState === 'Payment Update' && <UpdatePayment open={dialogOpen}/>
            }
            {
              MenuState === 'Staff Assign' && <StaffAssign open={dialogOpen}/>
            }


            </SimpleMenuContext.Provider>
          </div>

         
         
      </div>
      
  </div>

  <div id="filterslide">
      <div className="popclosebtn" onClick={() => filterpopClose()}>
            <span className="btnclose">X</span>
      </div>
      <div className="formslide"> 
          <span className="slidetitle">{Filtertitle}</span>
          {(slideType === 'Empstat') &&
          <TableContainer component={Paper} style={{height: '80vh'}}>
            <Table stickyHeader className={classes.table} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <TableCell className={classuse.tablecell} style={{width:'95px'}}>EmployeeName</TableCell>
                  <TableCell className={classuse.tablecell} style={{width:'70px'}}>TaskNo</TableCell>
                  <TableCell className={classuse.tablecell} style={{width:'80px'}}>Task Date</TableCell>
                  <TableCell className={classuse.tablecell} style={{width:'300px'}}>Description</TableCell>
                  <TableCell className={classuse.tablecell} style={{width:'70px'}}>StartTime</TableCell>
                  <TableCell className={classuse.tablecell} style={{width:'70px'}}>EndTime</TableCell>
                  <TableCell className={classuse.tablecell} style={{width:'80px'}}>AllocatedMins</TableCell>
                  <TableCell className={classuse.tablecell} style={{width:'80px'}}>UtilizedMins</TableCell>
                  <TableCell className={classuse.tablecell} style={{width:'70px'}}>Difference</TableCell>
                  <TableCell className={classuse.tablecell} style={{width:'80px'}}>DeliveryETA</TableCell>
                  <TableCell className={classuse.tablecell} style={{width:'80px'}}>TargetETA</TableCell>
                  <TableCell className={classuse.tablecell} style={{width:'80px'}}>Status</TableCell>
                  <TableCell className={classuse.tablecell} style={{width:'80px'}}>ReasonPending</TableCell>
                  <TableCell className={classuse.tablecell} style={{width:'80px'}}>TaskStatus</TableCell>
                </StyledTableRow>
              </TableHead>
              
              <TableBody>
                {EmpTaskDet.map((row,i) => (
                  <StyledTableRow key={i}>
                    <TableCell className={classuse.cellbody}>{row.EmployeeName}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.ComplaintNo}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.ComplainedDates}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.Description}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.StartDate}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.EndDate}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.AllocatedMins}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.ANAMins}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.MinDiff}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.DeliveryETA}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.ProductionETA}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.StageName}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.ResonPending}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.TaskStatus}</TableCell>
                  </StyledTableRow>
                ))} 
              </TableBody>
            </Table>
          </TableContainer>
          }
          {(slideType === 'Monthly') ?
              (Headval === 'Total') ? 
                <>
                  <MonthlyChartDR value = {chartMonthTotDR} value2={chartMonthOpnDR} value3={chartMonthClsDR} type={'DR'} openModal={OverlaySlide}/>
                  <MonthlyChartCR value = {chartMonthTotCR} value2={chartMonthOpnCR} value3={chartMonthClsCR} type={'CR'} openModal={OverlaySlide}/>
                  <MonthlyChartNR value = {chartMonthTotNR} value2={chartMonthOpnNR} value3={chartMonthClsNR} type={'NR'} openModal={OverlaySlide}/>
                  <MonthlyChartOTH value = {chartMonthTotOTH} value2={chartMonthOpnOTH} value3={chartMonthClsOTH} type={'OTH'} openModal={OverlaySlide}/>
                </>
                :
                <MonthlyChart value = {chartMonthTot} value2={chartMonthOpn} value3={chartMonthCls} type={Headval} openModal={OverlaySlide}/>
              :
                null
          }
          {(slideType === 'Employee' || slideType === 'Day progress' || slideType === 'Contract closed' || slideType === 'Contract raised') &&
              <>
              {(slideType !== 'Day progress' && slideType !== 'Contract closed' && slideType !== 'Contract raised') &&
             
              <Autocomplete
                style={{width:'100%'}}
                size="small"
                {...defaultProps}
                value={Empvalue}
                onChange={(event, newValue) => {
                  setEmpValue(newValue);
                  if(newValue){
                    setEmpID(newValue.NSEEMPID);
                    MonthChange("Employee",newValue.EmpName);
                  }else{
                    setEmpID(null);
                  }
                  
                }}
                renderInput={(params) => <TextField {...params} label="Select Employee" margin="normal" fullWidth/>}
              /> }
              <EmpTaskchart value = {EmpUpTaskDR} value2={EmpUpTaskCR} value3={EmpUpTaskNR} value4={EmpUpTaskOTH} Emplyid={EmpID} charttype={slideType} datefrom={Fromdate} dateto={Todate} openModal={OverlaySlide}/>
              {(slideType === 'Day progress' || slideType === 'Contract closed' || slideType === 'Contract raised') &&
              <div style={{textAlign:'center'}}>
                <span className="progresslabel">CR : {TotproCR}</span>
                <span className="progresslabel">DR : {TotproDR}</span>
                <span className="progresslabel">NR : {TotproNR}</span>
                <span className="progresslabel">Other : {TotproOther}</span>
              </div>}
              </>
          }
          {(slideType === 'HOLD') &&
              
              <Holdchart value = {ContChartCRHold} value2={ContChartDRHold} value3={ContChartNRHold} value4={ContChartOtherHold} type={Headval} openModal={OverlaySlide}/>
              
          }
          {(slideType === 'EmpConsol') &&
          <TableContainer component={Paper} style={{height: '80vh'}}>
            <Table stickyHeader className={classes.table} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <TableCell className={classuse.tablecell} style={{width:'95px'}}>EmployeeName</TableCell>
                  <TableCell className={classuse.tablecell} style={{width:'70px'}}>Allocated Hrs</TableCell>
                  <TableCell className={classuse.tablecell} style={{width:'80px'}}>utilized Hrs</TableCell>
                  <TableCell className={classuse.tablecell} style={{width:'300px'}}>shortfall/exceed</TableCell>
                </StyledTableRow>
              </TableHead>
              
              <TableBody>
                {EmpConsol.map((row,i) => (
                  <StyledTableRow key={i}>
                    <TableCell className={classuse.cellbody}>{row.EmployeeName}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.AllocatedMins}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.WorkMins}</TableCell>
                    <TableCell className={classuse.cellbody}>{row.diffmins}</TableCell>
                  </StyledTableRow>
                ))} 
              </TableBody>
            </Table>
          </TableContainer>
          }
           {(slideType === 'Complaint') ?
              <>
              {formloading && 
              <div className="Loadingpane">
                <img src={ChartLoader} alt='Loading......'
                    className="Loadingimg"></img>
              </div>
              }
              <Grid container>
              <Grid item xs={12} sm={12} md={4} >
                    <div className="selcontain">
                      <form noValidate autoComplete="off">
                        <TextField label="Contract"
                            placeholder="Search Contract"
                            id="continput"
                            style={{width: '100%'}} 
                            onChange={(e)=>{contractlist(e.target.value) }}
                            // value={Contname}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            />
                      </form>
                      <select className="selectcss" size="11" id="contractval" onChange={(e)=>{ContChange(e.target.value) }}>
                        <option value="">-----Select-----</option>
                      </select>
                    </div>
              </Grid>
              <Grid item xs={12} sm={12} md={8} >
                <Grid container>
                  <Grid item xs={4} sm={4} md={4} >
                    <div className="selcontain">
                      <TextField  label="Date"
                        value={Curdate}
                        disabled={true}
                        />
                    </div>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} >
                      <div className="selcontain">
                        <TextField  label="Time" 
                          value={Localtime}
                          disabled={true}
                          />
                      </div>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} >
                      <div className="selcontain">
                        <TextField  label="Status"
                          value={"Open"}
                          disabled={true}
                          />
                      </div>
                  </Grid>
                  
                  <Grid item xs={12} sm={12} md={3} >
                    <Grid container>
                      <Grid item xs={12} sm={12} md={12}>
                        <div className="selcontain">
                          <label className="labelcompln">Workorder Type<span className="red1">*</span></label>
                          {/* <select className="selectcss" size="2" onChange={(e)=>{WOChange(e.target.value) }}>
                            <option value="1">Complaints</option>
                            <option value="2">Service Request</option>
                          </select> */}
                          <RadioGroup aria-label="gender" name="gender1" value={WOtypeID} onChange={WOChange}>
                            <FormControlLabel value="1" control={<Radio />} label="Client Task" />
                            <FormControlLabel value="2" control={<Radio />} label="Internal Task" />
                          </RadioGroup>
                        </div>
                      </Grid>
                     
                    </Grid>

                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <div className="selcontain">
                      <label className="labelcompln">Complaint Request<span className="red1">*</span></label>
                      <select className="selectcss" size="9" id="division" onChange={(e)=>{DivChange(e.target.value) }}>
                        <option value="">-----Select Division-----</option>
                      </select>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <div className="selcontain">
                      <label className="labelcompln">Nature Of Complaint<span className="red1">*</span></label>
                      <select className="selectcss" size="9" id="nature" onChange={(e)=>{setnatureval(e.target.value)}}>
                        <option value="">-----Select Nature Of complaint-----</option>
                      </select>
                    </div>
                  </Grid>

                </Grid>
              </Grid>
              
              <Grid item xs={12} sm={12} md={12}>
                <div className="selcontain">
                  <TextField
                    style={{width: '100%'}}
                    id="standard-multiline-flexible"
                    label="Description*"
                    multiline
                    rowsMax={4}
                    value={Descval}
                    onChange={(e)=>{setDescval(e.target.value)}}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {WOtypeID === '2' &&
                <div className="selcontain">
                  {/* <Autocomplete 
                    style={{width:'100%'}} 
                    size="small"
                    {...defaultProps}
                    id="Emp-select"
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
                  /> */}
                  <label className="labelcompln">Select Employee</label>
                  <Select
                    style={{width:'100%'}}
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<Input />}
                  >
                    {Empoption.map((name) => (
                      <MenuItem key={name.NSEEMPID} value={name.NSEEMPID}>
                        {name.EmpName}
                      </MenuItem>
                    ))}
                  </Select>

                </div>
                }
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
              {WOtypeID === '2' &&
                <div className="multidate">
                  <label className="labelcompln">Start Date</label>
                  <MultipleDatePicker
                        onSubmit={dates => multidatechange(dates)}
                      />
                </div>
              }
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
              {WOtypeID === '2' &&
                <div className="enddate">
                  <label className="labelcompln">End Date</label>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      disableToolbar
                      variant="inline"
                      format="dd-MM-yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      disabled={ProDate.length > 1 ? true : false}
                      // label="End Date"
                      value={EndDate}
                      onChange={handleEndDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              }
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <div style={{textAlign: 'center'}}>
                  <button id="btnsubmit" className="btnCss btnpad" onClick={()=>{submitComp()}}>Submit</button>
                </div>
              </Grid>
              

            </Grid>
              </>
             :
             null
          }
      </div>
  </div>
  {/* calendar */}
  <div id='calendarslide'>
    <div className="popclosebtn" onClick={() => caldpopClose()}>
          <span className="btnclose">X</span>
    </div>
        {Calendarview && 
        <SimpleContext.Provider value={{ 
              value:'calender',
              togglePage: (val) => {setTastView(val)}
            }}>
              
            {
              tastView ? <NewCalendar /> : <GridView />
            }

        </SimpleContext.Provider>
        
        }
    
  </div>

  

  <div>
    <button id="scrolltop" title="Back to Top" onClick={scrollTotop}><Icon>arrow_upward</Icon></button>
  </div>

</div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);


