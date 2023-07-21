import React, { useEffect } from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as tf from '@tensorflow/tfjs';

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
};

const MyComponent = () => {
  useEffect(() => {
    const doTraining = async (model) => {
      const history = await model.fit(xs, ys, { 
        epochs: 500,
        callbacks: {
          onEpochEnd: async (epoch, logs) => {
            console.log("Epoch: " + epoch + " Loss: " + logs.loss);
          }
        }
      });
    };

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
    model.summary();

    const xs = tf.tensor2d([-1.0, 0.0, 1.0, 2.0, 3.0, 4.0], [6, 1]);
    const ys = tf.tensor2d([-3.0, -1.0, 2.0, 3.0, 5.0, 7.0], [6, 1]);

    doTraining(model).then(() => {
      alert(model.predict(tf.tensor2d([10], [1, 1])));
    });
  }, []);

  return (
    <div>
      <h1>Hello World</h1>

    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <MyComponent />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
