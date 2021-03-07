import axios from '../axios';
// import Cookies from 'js-cookie';


export const getAll = async () => {
    const response = await axios.get('/categories/GetAll.php')
    return response.data
};

export const getDropdown = async () => {
  let list = []
  const response = await axios.get('/categories/GetDropdown.php')
  let i = 0;
  response['data']['categories'].map(value => {
      list[i] = {
          id: value.id, value: value.name, label: value.name,
          target: { type: 'select', name: 'list', value: value.id, label: value.name }
      }
      i++;
      return i;
  })
  return list
};

export const fDelete = async (id) => {
    var bodyFormData = new FormData();
    bodyFormData.append('id',id);
    const response = await axios({
      method: 'post',
      url: '/categories/Delete.php',
      data: bodyFormData,
      headers: {'Content-Type' : 'multipart/form-data'}
    });
    return response.data;
};

export const fUpdate = async (id, name) => {
    var bodyFormData = new FormData();
    bodyFormData.append('id',id);
    bodyFormData.append('name',name);
    const response = await axios({
      method: 'post',
      url: '/categories/Update.php',
      data: bodyFormData,
      headers: {'Content-Type' : 'multipart/form-data'}
    });
    return response.data;
};

export const fInsert = async (name) => {
    
    var bodyFormData = new FormData();
    bodyFormData.append('name', name);
    const response = await axios({
      method: 'post',
      url: '/categories/Insert.php',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};
