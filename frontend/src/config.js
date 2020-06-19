const env = process.env.REACT_APP_ENV;

let apiURL = "http://localhost:8000";

if (env === 'test') {
  apiURL = "http://localhost:8010";
}

if (env === 'production') {
  apiURL = 'http://188.166.69.86:8000'
}

const config = {
  apiURL
}

export default config;