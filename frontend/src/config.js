const env = process.env.REACT_APP_ENV;

let apiURL = "http://localhost:8000";

if (env === 'test') {
  apiURL = "http://localhost:8010";
}

if (env === 'production') {
  apiURL = 'https://deliveryforall.sytes.net/api';
}

const wsURL = () => {
  if (env === 'production') {
    return 'wss://deliveryforall.sytes.net/api';
  } else {
    return 'ws://localhost:8000';
  }
} 

const wsOptions = {
  connectionTimeout: 1000,
  maxReconnectionDelay: 5000,
  maxRetries: 2,
};

const config = {
  apiURL,
  wsURL: wsURL(),
  wsOptions
}

export default config;