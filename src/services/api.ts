import { instance as axios } from '@/lib/axios';

import { handleError, handleResponse } from './response';

const get = (resource: string) =>
  axios.get(resource).then(handleResponse).catch(handleError);

const post = (resource: string, model: object, options: object) =>
  axios.post(resource, model, options).then(handleResponse).catch(handleError);

const put = (resource: string, model: object) =>
  axios.put(resource, model).then(handleResponse).catch(handleError);

const patch = (resource: string, model: object) =>
  axios.patch(resource, model).then(handleResponse).catch(handleError);

const remove = (resource: string) =>
  axios
    .delete(resource, {
      headers: {
        'content-type': 'application/json',
      },
      data: {},
    })
    .then(handleResponse)
    .catch(handleError);

const exportedObject = {
  get,
  post,
  put,
  patch,
  remove,
};

export default exportedObject;
