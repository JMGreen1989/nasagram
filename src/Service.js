import jwtDecode from 'jwt-decode';

function checkStatus(resp) {
  if (!resp.ok) throw new Error(resp.statusMessage);
  return resp.json();
}

function saveToken(respBody) {
  localStorage.setItem('authToken', respBody.token)
  const user = jwtDecode(respBody.token);
  return user;
}

// Quote requests

function getQuotes() {
  return fetch('/api/quotes').then(checkStatus);
}

function createQuote(quote) {
  return fetch('/api/quotes', {
    method: 'POST',
    body: JSON.stringify(quote),
    headers: {
      'content-type': 'application/json'
    }
  }).then(checkStatus);
}

function deleteQuote(id) {
  return fetch(`/api/quotes/${id}`, {
    method: 'DELETE',
  }).then(checkStatus)
}

function updateQuote(quote, id) {
  return fetch(`/api/quotes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(quote),
    headers: {
      'content-type': 'application/json'
    }
  }).then(checkStatus)
}

// Auth requests

function login(creds) {
  return fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(creds),
    headers: {
      'content-type': 'application/json'
    }
  }).then(checkStatus).then(saveToken)
}

function register(creds) {
  return fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(creds),
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(checkStatus)
  .then(saveToken)
}


export {
  getQuotes,
  createQuote,
  deleteQuote,
  updateQuote,
  login
}
