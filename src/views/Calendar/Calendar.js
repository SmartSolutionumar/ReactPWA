import React, {useState,useRef,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {  format,subDays,subWeeks,subMonths,subYears,addDays,
    addWeeks,addMonths,addYears } from 'date-fns'
import '../../assets/css/calendar.css';
import { SimpleContext } from '../../components/SimpleCard';
import {config} from '../../config';
import Day from './Day';
import Week from './Week';
import Month from './MonthNew';
import Year from './Year';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 0.12,
      textTransform: 'none'
    },
  }));

function Calendar(){
    const classes = useStyles();
    const dayRef = useRef()
    const weekRef = useRef()
    const monthRef = useRef()
    const yearRef = useRef()
    const [calendar, setCalendar] = useState('month')
    const [formate, setFormate] = useState('MMM yyyy')
    const [currentDate,setCurrentDate] = useState(new Date());
    const [Empoption, setEmpoption] = React.useState([]);
    const [Empvalue, setEmpValue] = React.useState(null);
    const [EmpID, setEmpID] = React.useState(null);

    const defaultProps = {
        options: Empoption,
        getOptionLabel: (option) => option.EmpName,
      };

    // const simpleContext = useContext(SimpleContext);

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

    const onClickPrev = () => {

        if(calendar === 'day'){
            setCurrentDate(subDays(currentDate, 1))
            dayRef.current.Prev();
        }
        else if(calendar === 'week'){
            setCurrentDate(subWeeks(currentDate, 1))
            weekRef.current.Prev();
        }

        else if(calendar === 'month'){
            setCurrentDate(subMonths(currentDate, 1))
            monthRef.current.Prev(EmpID);
        }
        
        else if(calendar === 'year'){
            setCurrentDate(subYears(currentDate, 1))
            yearRef.current.Next();
        }
       
    }
    const onClickNext = () => {
        if(calendar === 'day'){
            setCurrentDate(addDays(currentDate, 1))
            dayRef.current.Next();
        }
        else if(calendar === 'week'){
            setCurrentDate(addWeeks(currentDate, 1))
            weekRef.current.Next();
        }
        else if(calendar === 'month'){
            setCurrentDate(addMonths(currentDate, 1))
            monthRef.current.Next(EmpID);
        }
        else if(calendar === 'year'){
            setCurrentDate(addYears(currentDate, 1))
            yearRef.current.Next();
        }
        
    }

    return(
        <div className='calenderwid'> 

            <SimpleContext.Consumer>
            {context => ( 
           <div>
                <Grid container >
          
                    <Grid item xs={4} sm={4} md={1}>
                        <div className=' dpadd8'>
                            <Typography variant="h6" className={classes.title}>Calendar</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={4} sm={4} md={1}>
                        <IconButton aria-label="delete" onClick={()=>onClickPrev()}>
                            <ChevronLeftIcon  />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={()=>onClickNext()}>
                            <ChevronRightIcon  />
                        </IconButton>
                    </Grid>
                    <Grid item xs={4} sm={4} md={1} className='btnlabel dpadd6'>
                        <Button color="inherit" disabled >{format(currentDate, formate)} </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} className='btnlabel dpadd6'>
                        <Button color="inherit" disabled onClick={()=>{setCalendar('day');setFormate('MMM d yyyy')}} >Day</Button>
                        <Button color="inherit" disabled onClick={()=>{setCalendar('week');setFormate('MMM yyyy')}} >Week</Button>
                        <Button color="inherit" onClick={()=>{setCalendar('month');setFormate('MMM yyyy')}} >Month</Button> 
                        <Button color="inherit" disabled onClick={()=>{setCalendar('year');setFormate('yyyy')}} >Year</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} className='btnlabel dpadd6'>
                        <Grid container>
                            <Grid item xs={1} sm={1} md={1}>
                                <span className="callegend lgDR"></span>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                                <span className="legndlabel">DR</span>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                                <span className="callegend lgPR"></span>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                                <span className="legndlabel">PR</span>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                                <span className="callegend lgCR"></span>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                                <span className="legndlabel">CR</span>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                                <span className="callegend lgNR"></span>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                                <span className="legndlabel">NR</span>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                                <span className="callegend lgGR"></span>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                                <span className="legndlabel">GR</span>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                                <span className="callegend lgMR"></span>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                                <span className="legndlabel">MR</span>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                                <span className="callegend lgFR"></span>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                                <span className="legndlabel">FR</span>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                                <span className="callegend lgRR"></span>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                                <span className="legndlabel">RR</span>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                                <span className="callegend lgER"></span>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                                <span className="legndlabel">ER</span>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                                <span className="callegend lgTR"></span>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1}>
                                <span className="legndlabel">TR</span>
                            </Grid>
                        
                        </Grid>    

                    </Grid>
                    
                    <Grid item xs={12} sm={12} md={2} className='dpadd6'>
                    {localStorage.getItem('SuperUser') === '1' &&
                    <Autocomplete
                        style={{width:'100%'}}
                        size="small"
                        {...defaultProps}
                        id="Emp-select"
                        value={Empvalue}
                        onChange={(event, newValue) => {
                            setEmpValue(newValue);
                            if(newValue){
                            setEmpID(newValue.NSEEMPID);
                            monthRef.current.Empwise(newValue.NSEEMPID);
                            }else{
                            setEmpID(null);
                            monthRef.current.Empwise(null);
                            }
                            
                        }}
                        renderInput={(params) => <TextField {...params} label="Select Employee" margin="normal" fullWidth/>}
                        />}
                    </Grid>
                    <Grid item xs={4} sm={2} md={1}>
                        <Button color="inherit" onClick={()=>context.togglePage(false)}>Grid View </Button>
                    </Grid>
                </Grid>
                {/* <div className='divAppbar dtable flex'>
                    


                    <div className='width11'>
                        
                    </div>

                    <div className='btnlabel dpadd6'>
                        
                    </div>

                    <div className='dpadd6 gridbtnpos'>
                        
                    </div>

                </div> */}

                <div>
                 { calendar === 'day' && <Day ref={dayRef}/> }
                 { calendar === 'week' && <Week ref={weekRef} /> } 
                { calendar === 'month' && <Month ref={monthRef}/> } 
                { calendar === 'year' && <Year ref={yearRef} /> }
                </div>
                </div>

                )}
            </SimpleContext.Consumer>
        </div>
    )
}
export default Calendar;