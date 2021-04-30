import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card'; 
import Nanologo from './assets/img/nanosoft .png';
import './App.css';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import cardbg from './assets/img/SmartFMLogo-R.png';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Spinner from './components/Spinner';
import { withRouter  } from "react-router-dom"; 
import {config} from './config';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
 

function LoginForm(props) { 

    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState(""); 
    const [messages, setmessage] = useState({ open: false,color: '',message: '' }); 
    const [loading, setloading] = useState(false); 


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setmessage({ open: false,color: '',message: "" });
      };

    const logSubmit = () => {    
        if(!UserName){
            setmessage({ open: true,color: 'warning',message: "Please Enter Username" });
            return false;
        }else if(!Password){
            setmessage({ open: true,color: 'warning',message: "Please Enter Passowrd" });
            return false;
        }else{       
            //props.history.push('/Home');      
            login();
        }  
    }

    const login = () =>{    
        setloading(false);
        const url = config.configurl + "/UserValidation.php?UserName="+UserName+"&Password="+Password;
           
        fetch(url)
        .then(res=>res.json())
        .then(res=>{  
            const status = res.UserValues;   
            if(status[0].UserIDPK === 0){ 
                setmessage({ open: true,color: 'error',message: "UserName and Password Invalid!" });
                setloading(false)
            }else{
                setloading(false)          
                localStorage.setItem('authBill', true);                
                localStorage.setItem('username', UserName); 
                localStorage.setItem('userid', status[0].UserIDPK);
                localStorage.setItem('Employeeid', status[0].EmployeeID);
                props.history.push('/Home'); 
                
            }
        }) 
        
    }

    function handleSubmitenter(e){
        if (e.key === 'Enter') {
         
            logSubmit();
    
        }
        
      }

return(
        <div className="logincss">
            {loading ? <Spinner/>  :  
            <Grid container justify="center" style={{height: '100%'}}>
                <Grid item xs={12} sm={12} md={4} lg={4} style={{height: '100%',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                    <Card className="cardshadow" >
                        
                        <CardContent  style={{backgroundImage: `url(${cardbg})`}} className='cardcontent'>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6}>
                                    <h3 className="TextWeight500">Welcome Back</h3>
                                    <p className="TextWeight400">Login in to your account</p>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <img src={Nanologo} alt="logo" className="headerImgSize"/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <form autoComplete="off" className="formroot">
                                        <TextField id="Username" label="UserName" 
                                        onChange={(e)=>{setUserName(e.target.value) }}
                                        value={UserName}
                                        onKeyPress={(e)=>handleSubmitenter(e)}
                                        />
                                        <TextField id="password" label="Password" type="password"
                                        onChange={(e)=>{setPassword(e.target.value) }}
                                        value={Password}
                                        onKeyPress={(e)=>handleSubmitenter(e)}
                                        />
                                    </form>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} align="center">
                                    <button className="btnCsslogin" onClick={() => logSubmit()}>Login</button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            }   
            <Snackbar open={messages.open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
            }}>
                <Alert onClose={handleClose} severity="error">
                {messages.message}
                </Alert>
            </Snackbar>
        </div>
  )
}

export default withRouter(LoginForm);