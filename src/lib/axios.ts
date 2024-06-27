/* eslint-disable no-param-reassign */
import axios from 'axios';

// create a new axios instance
export const instance = axios.create({
  baseURL: process.env.API_URL,
});

instance.interceptors.request.use((config) => config);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      !error.response ||
      !error.response.data ||
      !error.response.data.message
    ) {
      error = {
        response: {
          data: {
            ...error.response.data,
            message: 'Unable to complete request',
          },
        },
      };
    } else if (error.response.status === 401) {
      error = {
        response: {
          data: {
            ...error.response.data,
            message:
              error.response.data.message ===
              'Unauthorized, please provide a jwt token'
                ? 'Unauthorized access! please login first'
                : error.response.data.message,
          },
        },
      };
    } else if (error.response.status === 404) {
      error = {
        response: {
          data: error.response.data,
        },
      };
    } else if (error.response.status === 409) {
      // Add a 409 response interceptor

      error = {
        response: {
          data: error.response.data,
        },
      };
    } else if (error.response.status === 500) {
      error = {
        response: {
          data: {
            ...error.response.data,
            message: 'Ooops! an error occurred',
          },
        },
      };
    } else {
      return Promise.reject(error);
    }
    throw error;
  },
);
