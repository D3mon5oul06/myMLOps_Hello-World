import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

   const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

   const callWorkFlow = async (url, urlbin, modelname) => {
    //alert(GITHUB_TOKEN);        
    let datakey = "i-love-adsoftsito|" + Date.now();
    console.log(datakey);
    let mysha = await sha256(datakey);
     console.log("SHA : " + mysha);
    await fetch('https://api.github.com/repos/adsoftsito/aiops/dispatches', {
       method: 'POST',
       body: JSON.stringify({
         event_type: "predictionjs",
         client_payload: {
                 "codeurl": url,
                 "codebin": urlbin,
                 "MODEL_NAME": modelname,
                 "sha": mysha
         }    

       }),  
       headers: {
         'Authorization': 'Bearer ' + GITHUB_TOKEN,
         'Accept': 'application/vnd.github.v3+json',
         'Content-type': 'application/json',
       },   
     })
     .then((response) => {
            // response.json()
            console.log(response);
            //alert("response");

     })
     .then((data) => {
       console.log(data);
     //  URL_ENDPOINT = "https://" + PROJECT_NAME + "-service-adsoftsito.cloud.okteto.net/v1/models/" + PROJECT_NAME + ":predict";
       setEndpoint(URL_ENDPOINT)
     })
     .catch((err) => {
       console.log(err.message);
     });
   };
