import Token from './Token';
import {config} from './config.js';

export default function CommonAPISelect(url,data,token) {    
    let userID = localStorage.getItem("userid");  
   
    return fetch(url, {
        method: "GET",
        headers: { 
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            TOKEN_ID: token && token.TokenIDPK ,
            TOKEN_NAME: token && token.TokenName,
            USER_ID:userID,
            FORM_ID:1
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
          throw new Error('Something went wrong');
          alert("error")
        }
      })
      .then((responseJson) => {
        return responseJson;
          console.log(url,responseJson)
        // Do something with the response
      })
      .catch((error) => {
        if(error){ 
          var currentUrl = window.location.href;
          var getHttp = currentUrl.split('/'); 
        
          if(getHttp.length > 5){
            window.location.href = getHttp[0]+'//'+getHttp[2]+'/'+getHttp[3]+'/'+getHttp[4]+'/Page404';
          }else{
            window.location.href = getHttp[0]+'//'+getHttp[2]+'/'+getHttp[3]+'/Page404';
          }
        
        }
      });
}
