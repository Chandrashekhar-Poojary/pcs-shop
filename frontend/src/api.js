/* eslint-disable no-underscore-dangle */
/* eslint-disable spaced-comment */
/* eslint-disable no-shadow */
/* eslint-disable no-empty */

import axios from "axios"
//import { response } from "express";
import { apiUrl } from "./config"
import { getUserInfo } from "./localStorage";

export const getProducts = async (searchKeyword) =>
{
    try{
        let queryString = '?';
        if(searchKeyword) queryString += `searchKeyword=${searchKeyword}&`;
        const response = await axios({
            url: `${apiUrl}/api/products${queryString}`,
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message); // msg will store request failed with status code 404
        }
        return response.data;
    } catch(err){
        console.log(err);
        return { error: err.response.data.message || err.message};
    }
};
export const getProduct = async (id) =>
{
    try{
        const response = await axios({
            url: `${apiUrl}/api/products/${id}`,
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message); // msg will store request failed with status code 404
        }
        return response.data;
    } catch(err){
        console.log(err);
        return { error: err.response.data.message || err.message};
    }
};

// products

export const createProduct = async () => {
    try {
      const { token } = getUserInfo();
      const response = await axios({
        url: `${apiUrl}/api/products`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.statusText !== 'Created') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      return { error: err.response.data.message || err.message };
    }
  };

  export const createReview = async (productId, review) => {
    try {
      const { token } = getUserInfo();
      const response = await axios({
        url: `${apiUrl}/api/products/${productId}/reviews`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: review,
      });
      if (response.statusText !== 'Created') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      return { error: err.response.data.message || err.message };
    }
  };

  export const deleteProduct = async (productId) => {
    try {
      const { token } = getUserInfo();
      const response = await axios({
        url: `${apiUrl}/api/products/${productId}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      return { error: err.response.data.message || err.message };
    }
  };

  export const updateProduct = async (product) => {
    try {
      const { token } = getUserInfo();
      const response = await axios({
        url: `${apiUrl}/api/products/${product._id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: product,
      });
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      return { error: err.response.data.message || err.message };
    }
  };

  export const uploadProductImage = async (formData) => {
    try {
      const { token } = getUserInfo();
      const response = await axios({
        url: `${apiUrl}/api/uploads`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });
      if (response.statusText !== 'Created') {
        throw new Error(response.data.message);
      } else {
        return response.data;
      }
    } catch (err) {
      return { error: err.response.data.message || err.message };
    }
  };

export const signin = async({ email, password})=>
{
    try {
        const response = await axios({
            url: `${apiUrl}/api/users/signin`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data:{
                email,
                password,
            },
        });

        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }

        return response.data; // valid data

    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message};
    }
};

export const register = async({ name, email, password})=>
{
    try {
        const response = await axios({
            url: `${apiUrl}/api/users/register`,
            method: 'POST', // post method is for creating new resource
            headers: {
                'Content-Type': 'application/json',
            },
            data:{
                name,
                email,
                password,
            },
        });

        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }

        return response.data; // valid data

    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message};
    }
};

// update Profile
export const update = async({ name, email, password})=>
{
    try {
        const { _id, token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/users/${_id}`, // should update it on backend also
            method: 'PUT', // put method is a updating new resource
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data:{
                name,
                email,
                password,
            },
        });

        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }

        return response.data; // valid data

    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message};
    }
};

export const createOrder = async(order) =>
{
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders`,
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },

            data: order,
        });

        if(response.statusText !== 'Created'){
            throw new Error(response.data.message);
        }
        return response.data;

    } catch (err) {
        return {error: err.response? err.response.data.message : err.message };
    } 
};

export const getOrders = async () => {
    try {
      const { token } = getUserInfo();
      const response = await axios({
        url: `${apiUrl}/api/orders`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      console.log(err);
      return { error: err.response.data.message || err.message };
    }
  };

  export const deleteOrder = async (orderId) => {
    try {
      const { token } = getUserInfo();
      const response = await axios({
        url: `${apiUrl}/api/orders/${orderId}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      return { error: err.response.data.message || err.message };
    }
  };

export const getOrder = async(id) =>
{
    try {
        const { token } = getUserInfo();
        const response = await axios({
        url: `${apiUrl}/api/orders/${id}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if(response.statusText !== 'OK'){
        throw new Error(response.data.message);
    }
    return response.data;
    } catch (err) {
        return { error: err.message };
    }

};

// Paypal Payment id

export const getMyOrders = async () =>{
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/mine`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
            return response.data;
    } catch (err) {
        return {error: err.response? err.response.data.message : err.message };
    }  
};

export const getPaypalClientId = async ()=>
{
    const response = await axios({
        url: `${apiUrl}/api/paypal/clientId`,
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if(response.statusText !== 'OK'){
        throw new Error(response.data.message);
    }
    else{
        return response.data.clientId;
    }
};

export const payOrder = async(orderId, paymentResult) =>
{
    try {
        const { token } = getUserInfo();
        const response = await axios({
            method: 'PUT',
            url: `${apiUrl}/api/orders/${orderId}/pay`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: paymentResult,
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err) {
        return {error: err.response? err.response.data.message : err.message };
    } 
};

export const deliverOrder = async (orderId) => {
    try {
      const { token } = getUserInfo();
      const response = await axios({
        url: `${apiUrl}/api/orders/${orderId}/deliver`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      return { error: err.response ? err.response.data.message : err.message };
    }
  };
  export const getSummary = async () => {
    try {
      const { token } = getUserInfo();
      const response = await axios({
        url: `${apiUrl}/api/orders/summary`,
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      });
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      } else {
        return response.data;
      }
    } catch (err) {
      return { error: err.response ? err.response.data.message : err.message };
    }
  };