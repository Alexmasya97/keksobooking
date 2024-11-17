const GET_API_URL = 'https://25.javascript.htmlacademy.pro/keksobooking/data';
const POST_API_URL = 'https://25.javascript.htmlacademy.pro/keksobooking';

const getData = (onSuccess) => {
  fetch(GET_API_URL,
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    }
    )
    .then((offers) => {
      onSuccess(offers);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    POST_API_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    });
};

export {
  getData,
  sendData
};
