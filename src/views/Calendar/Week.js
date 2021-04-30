import React,{useState,forwardRef, useImperativeHandle} from 'react'
import { format,subWeeks,addDays,startOfWeek,addWeeks,isSameMonth,startOfMonth,endOfMonth,endOfWeek,isSameDay } from 'date-fns'

const Week = forwardRef((props, ref) => {

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const todayHours = [ '12 AM','1 AM','2 AM','3 AM','4 AM','5 AM','6 AM','7 AM','8 AM','9 AM','10 AM','11 AM'
  ,'12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM','9 PM','10 PM','11 PM']


  useImperativeHandle(ref, () => ({

    Prev : () => {
      prevWeek();
    },
    Next : () => {
      nextWeek();
    }

  }));


  const nextWeek = () => {
    setCurrentMonth(addWeeks(currentMonth, 1))
  };

  const prevWeek = () => {
    setCurrentMonth(subWeeks(currentMonth, 1))
  };


    const onDateClick = (day,selDate) => {
    }

    function renderDays() {
        const dateFormat = "eee";
        const days = [];
    
        let startDate = startOfWeek(currentMonth);
    
        for (let i = 0; i < 7; i++) {
          days.push(
            <div className="col wcol-center daynames" key={i}>
              {format(addDays(startDate, i), dateFormat)}
            </div>
          );
        }
    
        return <div className="wdays row">{days}</div>;
      }

      function renderCells() {
        //const { currentMonth, selectedDate } = this.state;
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(currentMonth);
        const endDate = endOfWeek(monthEnd);
    
        const dateFormat = "d";
        const rows = [];
    
        let days = [];
        let day = startDate;
        let formattedDate = "";
    
        // while (day <= endDate) {
          for (let i = 0; i < 7; i++) {
            formattedDate = format(day, dateFormat);
            const cloneDay = day;
            days.push(
              <div
                className={`col weecell ${
                  !isSameMonth(day, monthStart)
                    ? "disabled"
                    : isSameDay(day, selectedDate) ? "selectednull" : ""
                }`}
                key={day}
                onClick={() => {onDateClick(cloneDay,formattedDate) }}
              >
                <span className={`wnumber ${isSameDay(day, selectedDate) ? "wselectdt" : ""}`}>{formattedDate}</span>
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
        // }
        return <div className="wbody">{rows}</div>;
      }


  function renderCellsHours() {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(new Date());


    const dateFormat = "d";
    const rows = [];

    let days = [];
    let formattedDate = "";

    for (let f = 0; f < todayHours.length; f++) {
      let day = startDate;
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div id={formattedDate+' index'+f} onClick={(e)=> { handleClick(e) }}
            className={`col wcell`}
            key={day} >
            <div >{}</div>
            </div>
        );
        
        day = addDays(day, 1);
      }
      
    
      rows.push(
        <div id={todayHours[f]} className="row" key={day}>
          {days}
        </div>
      );
      days = [];
      }
    return <div className="wbody">{rows}</div>;
  }

    const renderHours = () => {
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
      // console.log('e',e.target.id,pDoc.parentNode)

    }

    return (
      <div >
        <div className='dayhours'>
            {renderHours()}
        </div>
     
          <div className="wcalendar" style={{float: 'right',width:'95%'}} >
              {renderDays()}
              {renderCells()}
              {renderCellsHours()}
          </div>
      </div>
    )
})

export default Week
