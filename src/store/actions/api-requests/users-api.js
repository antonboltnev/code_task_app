import axios from "axios";
import {https, host, path, order} from './api-params'
import {orderId} from './order-api'

export default {

  //ПОЛУЧАЕМ ИНФОРМАЦИЮ ПО ПОЛЬЗОВАТЕЛЯМ (КОНТАКНОЕ ЛИЦО, ПОЛУЧАТЕЛЬ И КЛИЕНТ КП)
  REQUEST_USER_INFO({commit}) {
    return axios(https + host + path + order + '/' + orderId + '/userInfo', {
      withCredentials: true,
      method: 'GET'
    })
        .then(users => {
          if (users.data.data) {
            throw users.data.message ? users.data.message : users.data.data.message;
          }
            commit('GET_USER_INFO', users.data);
            commit('LOADING', false);
        })
        .catch(error => {
          let url = https + host + path + order + '/' + orderId + '/userInfo';
          commit('THROW_API_RESPONSE_ERROR', {error, url});
        });
  },
  //МОКА ДЛЯ ПОЛУЧЕНИЯ ПОЛЬЗОВАТЕЛЕЙ
  REQUEST_ORDER_INFO_MOC({commit}) {
    return axios('http://localhost:3000/mocOrderlines', {
      withCredentials: true,
      method: "GET"
    })
        .then((wareId) => {
          commit('SET_ORDER_INFO_MOC', wareId.data);
          commit('LOADING', false);
          return wareId;
        })
        .catch((error) => {
          return error;
        })
  },
  //РЕДАКТИРОВАНИЕ ИНФОРМАЦИИ КОНТАКТНОГО ЛИЦА И ПОЛУЧАТЕЛЯ
  EDIT_USER_INFO({commit, dispatch}, {recipient, contact}) {
    return axios(https + host + path + order + '/' + orderId + '/editPerson', {
      withCredentials: true,
      method: "POST",
      data: {recipient, contact}
    })
        .then(response => {
          dispatch('REQUEST_USER_INFO');
          return response;
        })
        .catch((error) => {
          commit('THROW_API_RESPONSE_ERROR', error);
          return error;
        })
  },
  //УДАЛЕНИЕ ПОЛЬЗОВАТЕЛЯ КП
  DELETE_KP_USER({commit, dispatch}) {
    return axios(https + host + path + order + '/' + orderId + '/club-pro/removeClient', {
      withCredentials: true,
      method: "POST",
      data: null
    })
        .then(response => {
          dispatch('REQUEST_USER_INFO');
          return response;
        })
        .catch((error) => {
          commit('THROW_API_RESPONSE_ERROR', error);
          return error;
        })
        .finally(() => {
          commit('LOADING', false);
        })
  },
  //ПРОВЕРКА ПОЛЬЗОВАТЕЛЯ КП ПО ВВЕДЕННОМУ ТЕЛЕФОНУ
  SEARCH_KP_USER({commit}, phone) {
    return axios(https + host + path + order + '/' + orderId + '/club-pro/changeClient', {
      withCredentials: true,
      method: "POST",
      data: phone
    })
        .then(response => {
          return response;
        })
        .catch((error) => {
          commit('THROW_API_RESPONSE_ERROR', error);
          return error;
        })
  },
  //ЗАПРОСИТЬ СМС КОД
  REQUEST_SMS_CODE({commit}) {
    return axios(https + host + path + order + '/' + orderId + '/club-pro/client/send ', {
      withCredentials: true,
      method: "POST"
    })
        .then(response => {
          if (response.data.ok) {
            return response;
          } else {
            throw 'По каким-то причинам коод не отправлен О_о';
          }
        })
        .catch((error) => {
          commit('THROW_API_RESPONSE_ERROR', error);
          return error;
        })
  },
  //ОТПРАВИТЬ СМС КОД
  SEND_SMS_CODE({commit}, code) {
    commit("LOADING", true);
    return axios(https + host + path + order + '/' + orderId + '/club-pro/client/confirmChange', {
      withCredentials: true,
      method: "POST",
      data: code
    })
        .then(response => {
          return response;
        })
        .catch((error) => {
          commit('THROW_API_RESPONSE_ERROR', error);
        })
  },
}
