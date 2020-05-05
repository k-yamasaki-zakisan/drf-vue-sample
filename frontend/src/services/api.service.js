function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  function handleResponse(response) {
    if (response.status === 204) {
      return '';
    } else if (response.status === 404) {
      return null;
    } else {
      return response.json();
    }
    
  }

function apiService(endpoint, method, data) {
    // D.R.Y. code to make HTTP requests to the REST API backend using fetch
    const config = {
      method: method || "GET",
      body: data !== undefined ? JSON.stringify(data) : null,
      headers: {
        'content-type': 'application/json',
        'X-CSRFTOKEN': getCookie('csrftoken')
      }
    };
    return fetch(endpoint, config)
             .then(handleResponse)
             .catch(error => console.log(error))
  }
  
  export { apiService };