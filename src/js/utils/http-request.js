import { API_BASE_URL } from '../constants/api';

async function httpRequest(method, body = null, url = API_BASE_URL) {
  const options = { method };
  if (body) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = body;
  }
  fetch(url, options)
    .then((response) => {
      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`Network response was not ok ${response.statusText}`);
      }
      // Parse the JSON from the response
      return response.json();
    })
    .then((data) => {
      // Handle the data from the response
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error);
    });
}

export default httpRequest;
