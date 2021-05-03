import React, {useState,useRef} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import {  format,subDays,subWeeks,subMonths,subYears,addDays,
    addWeeks,addMonths,addYears } from 'date-fns'
import '../../assets/css/calendar.css'
import { SimpleContext } from '../../components/SimpleCard';

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
    const [currentDate,setCurrentDate] = useState(new Date())

    // const simpleContext = useContext(SimpleContext);

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
            monthRef.current.Prev();
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
            monthRef.current.Next();
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
                <div className='divAppbar dtable flex'>
                    <div className='dtablecell width15 dpadd8'>
                        <Typography variant="h6" className={classes.title}>Calendar</Typography>
                    </div>


                <div className='width11'>
                    <IconButton aria-label="delete" onClick={()=>onClickPrev()}>
                        <ChevronLeftIcon  />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={()=>onClickNext()}>
                        <ChevronRightIcon  />
                    </IconButton>
                </div>

                <div className='btnlabel dpadd6'>
                    <Button color="inherit" disabled >{format(currentDate, formate)} </Button>
                    <Button color="inherit" disabled onClick={()=>{setCalendar('day');setFormate('MMM d yyyy')}} >Day</Button>
                    <Button color="inherit" disabled onClick={()=>{setCalendar('week');setFormate('MMM yyyy')}} >Week</Button>
                    <Button color="inherit" onClick={()=>{setCalendar('month');setFormate('MMM yyyy')}} >Month</Button> 
                    <Button color="inherit" disabled onClick={()=>{setCalendar('year');setFormate('yyyy')}} >Year</Button>
                </div>

                <div className='dpadd6 gridbtnpos'>
                    <Button color="inherit" onClick={()=>context.togglePage(false)}>Grid View </Button>
                </div>

                </div>

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