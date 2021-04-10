import React, { useState } from "react";
import { config } from "./config"; //common main url for all the API
// Main render functin of Token
export default function Token(type) {
  let url = config.Api + "LoginAuthentication/"; //Token Url
  let username = localStorage.getItem("username"); //logged in username from local storage
  let password = localStorage.getItem("password"); //logged in user password from local storage
  let userid = localStorage.getItem("userid"); //logged in user id from local storage
  // parameter for Token Request
  let param = {
    data: {
      UserName: username,
      Password: password,
      UserID: userid,
      IsActive : type
    }
  };
  // fetch request method for token
  return fetch(url, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    keepalive: false,
    body: JSON.stringify(param)
  })
    .then(res => res.json())
    .then(res => {      
      return res;
    }).catch(error => {
      return error;
    });
}
