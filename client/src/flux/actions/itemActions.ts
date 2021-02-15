/**
 * We will not be using any of these flux files. They are
 * only examples for making api calls to the backend. Please keep in
 * mind we are not using flux, so we won't be using dispatch like
 * the tutorial. You can export a function like below, and import
 * it into a component to use.
 */

import axios from 'axios';


export const getItems = () => {
  axios
    .get('/api/items') //or use .post if it's a POST request
    .then(res =>
      console.log(res)
    )
    .catch(err =>
        console.log("failed" + err)
    );
};




export const setItemsLoading = () => {
  return {
    type: "example"
  };
};
