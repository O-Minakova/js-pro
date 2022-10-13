export function service(url) {
  return fetch(url)
  .then((res) => res.json())
}

export function servicePost(url, body) {
  return fetch(url, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(body)
  }).then((res) => res.json())
}

export function serviceDelete(url, body) {
  return fetch(url, {
    method: 'DELETE',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(body)
  }).then((res) => res.json())
}