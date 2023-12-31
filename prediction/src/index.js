import React from 'react';
import ReactDOM from 'react-dom';
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
    }
  })
  .then((response) => {
    // response.json()
    console.log(response);
    //alert("response");
  })
  .catch((err) => {
    console.log(err.message);
  });
};

const sha256 = async (data) => { 
  const textAsBuffer = new TextEncoder().encode(data);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const digest = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return digest;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
