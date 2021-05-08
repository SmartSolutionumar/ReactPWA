import React,{ useState, useEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment'
import Button from '@material-ui/core/Button';

import {config} from '../../config';
import { SimpleContext } from '../../components/SimpleCard';

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background:'#fff',
    width:'90%'
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
//   table style
roottable: {
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
    height: '70vh',
    boxShadow: 'none',
  },
  marginleft: {
    marginleft:'10px'
  }
}));

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {/* {value === index && ( */}
          <div>
            {children}
          </div>
                     
        {/* )} */}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  

export default function CustomizedTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [openData, setOpenData] = useState([]);
  const [closedData, setClosedData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
      monthTask('MONTH');
      monthTask('CLOSE');
      // eslint-disable-next-line
  }, [localStorage.getItem('date')]);

  function monthTask (type) {

    let EmpID =  localStorage.getItem('Employeeid')
    let currmonth = moment(localStorage.getItem('date')).format('yyyy-MM-DD')
    
    const param =  config.configurl+`/SupportnewCalander.php?ColumnIndex=3&value=null&EMPID=${EmpID}&WoDate=${currmonth}&QueryType=${type}`

    fetch(param)
          .then(response => response.json())
          .then(data => {
      if(data.length > 0){
          if(type === 'MONTH'){
            setOpenData(data);
            return false;
          }else{
              setClosedData(data)
              return false;
          }
        
      }
        
          });
  }

  return (
    <div className={classes.root}>
        <SimpleContext.Consumer>
            {context => ( 
                <div>
         <div className='dpadd6 gridbtnpos'>
                <Button color="inherit" onClick={()=>context.togglePage(true)}>Calendar View </Button>
        </div>

        
      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Open Task" />
          <AntTab label="Closed Task" />
        </AntTabs>
        
        <TabPanel value={value} index={0}>
                        
        <CardContent  className='cardtablecon'>
            <TableContainer className={classes.tableroot} component={Paper}>
            <Table stickyHeader className={classes.table} aria-label="simple table">
                <TableHead>
                <StyledTableRow>
                <TableCell className={classes.tablecell} style={{width:'70px'}}>DelvDate</TableCell>
                  <TableCell className={classes.tablecell} style={{width:'70px'}}>TaskType</TableCell>
                  <TableCell className={classes.tablecell} style={{width:'70px'}}>TicketType</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'95px'}}>ComplaintNo</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'70px'}}>Date</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'120px'}}>ContractName</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'80px'}}>RegisteredBy</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'300px'}}>Description</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'80px'}}>ETA Date</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'80px'}}>ETA Time</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'70px'}}>Priority</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'80px'}}>ANAName</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'80px'}}>EXEName</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'80px'}}>ReasonFor Pending</TableCell>  
                    <TableCell className={classes.tablecell} style={{width:'120px'}}>StageName</TableCell>
                </StyledTableRow>
                </TableHead>
                <TableBody>
                {openData.map((row,i) => (
                    <StyledTableRow key={i}>
                    <TableCell className={classes.cellbody}>{row.DeliveryDate}</TableCell>
                    <TableCell className={classes.cellbody}>{row.TaskType}</TableCell>
                    <TableCell className={`ccellbody ${'bg'+row.TicketType}`} >{row.TicketType}</TableCell>
                    <TableCell className={classes.cellbody}>{row.ComplaintNo}</TableCell>
                    <TableCell className={classes.cellbody}>{row.ComplainedDate}</TableCell>
                    <TableCell className={classes.cellbody}>{row.ContractName}</TableCell>
                    <TableCell className={classes.cellbody}>{row.ComplainerName}</TableCell>
                    <TableCell className={classes.cellbody}>{row.RequestDetailsDesc}</TableCell>
                    <TableCell className={classes.cellbody}>{row.ETADate}</TableCell>
                    <TableCell className={classes.cellbody}>{row.ETATime}</TableCell>
                    <TableCell className={classes.cellbody}>{row.PriorityName}</TableCell>
                    <TableCell className={classes.cellbody}>{row.TechName}</TableCell>
                    <TableCell className={classes.cellbody}>{row.bdmempname}</TableCell>
                    <TableCell className={classes.cellbody}>{row.MaintenanceRemarks}</TableCell>
                    <TableCell className={classes.cellbody}>{row.StageName}</TableCell>

                    
                    </StyledTableRow>
                ))} 
                </TableBody>
            </Table>
            </TableContainer>
        </CardContent>
                
        </TabPanel>

        <TabPanel value={value} index={1}>
                        
        <CardContent  className='cardtablecon'>
          <TableContainer className={classes.tableroot} component={Paper}>
          <Table stickyHeader className={classes.table} aria-label="simple table">
              <TableHead>
              <StyledTableRow>
            
              <TableCell className={classes.tablecell} style={{width:'95px'}}>ComplaintNo</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'70px'}}>Date</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'80px'}}>ETA Date</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'80px'}}>ETA Time</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'70px'}}>TicketType</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'120px'}}>ContractName</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'80px'}}>RegisteredBy</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'300px'}}>Description</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'70px'}}>Priority</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'80px'}}>ANAName</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'80px'}}>EXEName</TableCell>
                    <TableCell className={classes.tablecell} style={{width:'80px'}}>ReasonFor Pending</TableCell>  
                    <TableCell className={classes.tablecell} style={{width:'120px'}}>StageName</TableCell>
              </StyledTableRow>
              </TableHead>
              <TableBody>
              {closedData.map((row,i) => (
                  <StyledTableRow key={i}>
                  <TableCell className={classes.cellbody}>{row.ComplaintNo}</TableCell>
                    <TableCell className={classes.cellbody}>{row.ComplainedDate}</TableCell>
                    <TableCell className={classes.cellbody}>{row.ETADate}</TableCell>
                    <TableCell className={classes.cellbody}>{row.ETATime}</TableCell>
                    <TableCell className={`ccellbody ${'bg'+row.TicketType}`} >{row.TicketType}</TableCell>
                    <TableCell className={classes.cellbody}>{row.ContractName}</TableCell>
                    <TableCell className={classes.cellbody}>{row.ComplainerName}</TableCell>
                    <TableCell className={classes.cellbody}>{row.RequestDetailsDesc}</TableCell>
                    <TableCell className={classes.cellbody}>{row.PriorityName}</TableCell>
                    <TableCell className={classes.cellbody}>{row.TechName}</TableCell>
                    <TableCell className={classes.cellbody}>{row.bdmempname}</TableCell>
                    <TableCell className={classes.cellbody}>{row.MaintenanceRemarks}</TableCell>
                    <TableCell className={classes.cellbody}>{row.StageName}</TableCell>

                  
                  </StyledTableRow>
              ))} 
              </TableBody>
          </Table>
          </TableContainer>
      </CardContent>
                
        </TabPanel>

      </div>
      </div>
         )}
         </SimpleContext.Consumer>
    </div>
  );
}


