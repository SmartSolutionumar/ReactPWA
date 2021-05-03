import React, {useState,useEffect} from 'react'
import Grid from '@material-ui/core/Grid'; 
import { addYears,getYear,subYears } from 'date-fns'
const { forwardRef, useImperativeHandle } = React;

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// const newdata = new Date();

const Year = forwardRef((props, ref) => {

    // const [yearArr, setyearArr] = useState([])
    const [currentYear, setcurrentYear] = useState(new Date())

    useEffect(() => {
        [...Array(1)].map((e, i) => {
                      
             monthOf(i+1);
             return null;
        })
        // eslint-disable-next-line
    }, [])

    useImperativeHandle(ref, () => ({

        Prev : () => {
          prevYear();
        },
        Next : () => {
          nextYear();
      }
    
      }));


  const nextYear = () => {
    setcurrentYear(addYears(currentYear, 1))
  };

  const prevYear = () => {
    setcurrentYear(subYears(currentYear, 1))
  };



    function daysInMonth (month, year) {

        let name = getDayName(month+"/01/"+year);
       
        let dayarr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var arr = dayarr.indexOf(name);


        var newdy = [];
        let dy = [...Array(new Date(year, month, 0).getDate())]
        dy.map((val, i) => {
            
            newdy.push({ date : i === 0 ? ' 1' : i+1, name: '' });
            return null;
        })

        let dd = [];
        [...Array(parseInt(arr))].map((e,i) => {
            dd.push({ date : (new Date(year, month -1 , 0).getDate() - i), name: '' });
            return null;
        })

        if(name === 'Sun'){
            return newdy;
        }else{

            return dd.reverse().concat(newdy);
        }

       

        
        

    }
    const getDayName = (mydate) => {
        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let d = new Date(mydate);
        return days[d.getDay()];
    }

    const monthOf = (params) => {

        // let day =  daysInMonth(params,getYear(currentYear)); 
        // setyearArr(day)
       
        
    }
    
    return (
        <div style={{borderTop: '1px solid #E8E8E8' }}>
            <Grid container >

          {  
            [...Array(12)].map((e, i) => (
                <Grid item xs={3}>
                <div className='contentyear'>
                    <div className='cont divpadd'> 
                    <div className="spantag"> {months[i]} </div>
                    <div className='divsplit'>
                    <span className="spantag">S</span>
                    <span className="spantag">M</span>
                    <span className="spantag">T</span>
                    <span className="spantag">W</span>
                    <span className="spantag">T</span>
                    <span className="spantag">F</span>
                    <span className="spantag">S</span>
                    </div>
                   
                    <div>
                    <ul className="yearcalendars">  
                   { daysInMonth(i + 1,getYear(currentYear)).map((e, i) => {
                       
                        return <li key={i} >
                            <span>{e.date}</span></li>
                    })}
                 
                    </ul>
                    </div>
                     </div>
                  
   
                </div>
   
                </Grid>
   
   
            ))
                
          } 
        </Grid>


            
         











        </div>
    )
})

export default Year
