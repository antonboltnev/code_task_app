import axios from "axios";
import {https, host, path, order, port, contextPath} from './api-params.js'

export let orderId = '';

export default {
  // ПСЕВДО-АВТОРИЗАЦИЯ ДЛЯ ДОСТУПА К СТРАНИЦЕ РЕДАКТИРОВАНИЯ ЗАКАЗА
  LOGIN_REQUEST({commit}) {
    return axios(https + host + port + contextPath + '/login', {
      withCredentials: true,
      method: "GET",
    })
        .then((response) => {
              return response;
            }
        )
        .catch(error => {
          commit('THROW_API_RESPONSE_ERROR', error);
          return error;
        });
  },

  //ПОЛУЧЕНИЕ ORDERID ИЗ URL ПРИ ПЕРЕХОДЕ ИЗ CSM1
  GET_ORDER_CODE({commit}) {
    return new Promise(resolve => {
      let urlParams = new URLSearchParams(window.location.search);
      let params = {};
      urlParams.forEach((p, key) => {
        params[key] = p;
      });
      orderId = params.order_id;
      commit('SET_ORDER_CODE', params.order_id);
      resolve();
    })
  },
  //ПОЛУЧАЕМ ИФОРМАЦИЮ ПО ЗАКАЗУ (WARE)
  REQUEST_ORDER_INFO({commit}) {
    return axios(https + host + path + order + "/" + orderId + '/getOrder', {
      withCredentials: true,
      method: "GET"
    })
        .then(orders => {
          if (orders.data.data) {
            throw orders.data.message ? orders.data.message : orders.data.data.message;
          } else {
            commit('GET_ORDER', orders);
            commit('LOADING', false);
            return orders;
          }
        })
        .catch((error) => {
          let url = https + host + path + order + '/' + orderId + '/getOrder';
          commit('THROW_API_RESPONSE_ERROR', {error, url});
          commit('LOADING', false);
        })
  },
  //ПРИНЯТИЯ ДЕФЕКТА У ТОВАРА
  ACCEPT_SPECIALWARE({commit, dispatch}, params) {
    commit('LOADING', true);
    return axios(https + host + path + order + '/' + orderId + '/accept', {
      withCredentials: true,
      method: 'POST',
      data: {npp: params.npp, wareId: params.wareId}
    })
        .then(() => {
          dispatch('REQUEST_ORDER_INFO');
          commit('LOADING', false);
        })
  },
  //ПРОВЕРЯЕМ, НУЖНО ЛИ ПРОСИТЬ ПОЛЬЗОВАТЕЛЯ ВЫБРАТЬ ПРИЧИНУ УДАЛЕНИЯ ТОВАРА
  MASS_LINE_DELETE_CHECK({commit}, {wareId, nppList}) {
    return axios(https + host + path + order + '/' + orderId + '/ware/' + wareId + '/mass/delete/check', {
      withCredentials: true,
      method: 'POST',
      data: {'nppList': nppList}
    })
        .then(response => {
          for (let item of response.data.data.reasons) {
            item.name = item.reasonName;
            item.selected = false;
          }
          commit('SET_REMOVE_REASONS_LIST', response.data.data.reasons)
          return response.data;
        })
        .catch(error => {
          commit('THROW_API_RESPONSE_ERROR', error);
          return error;
        })
  },
  //УДАЛЕНИЕ НЕСКОЛЬКИХ ИЛИ ВСЕХ ТОВАРОВ В WARE
  MASS_LINE_DELETE({dispatch, commit}, {wareId, params}) {
    return axios(https + host + path + order + '/' + orderId + '/ware/' + wareId + '/mass/delete', {
      withCredentials: true,
      method: 'POST',
      data: params
    })
        .then(response => {
          dispatch('REQUEST_ORDER_INFO');
          return response.data;
        })
        .catch(error => {
          commit('THROW_API_RESPONSE_ERROR', error);
          return error;
        })
  },
  //ДОБАВЛЕНИЕ ТОВАРОВ (УВЕЛИЧЕНИЕ КОЛ-ВА)
  INCREMENT_PRODUCT_QTY({commit}, {wareId, qty}) {
    return axios(https + host + path + order + '/' + orderId + '/addWare', {
      withCredentials: true,
      method: 'POST',
      data: {'wareId': wareId, 'quantity' : qty}
    })
        .then(response => {
          if (!response.data.ok) {
            throw response.data.message;
          } else {
            return response;
          }
        })
        .catch(error => {
          commit('THROW_API_RESPONSE_ERROR', error);
        })
        .finally(() => {
          commit('LOADING', false);
        })
  },
  //ПОЛУЧЕНИЕ СПИСКА ПРИМЕНЕННЫХ КОРРЕКТИРОВОК ДЛЯ ТОВАРА
  GET_CORRECTIONS_LIST({commit}) {
    return axios(https + host + port + contextPath + '/api/reference/adjustments', {
      withCredentials: true,
      method: 'GET',
    })
        .then((corrections) => {
          commit('GET_CORRECTIONS_LIST', corrections.data);
        })
        .catch(error => {
          commit('THROW_API_RESPONSE_ERROR', error);
          return error;
        })
  },
  //ДОБАВЛЕНИЕ КОРРЕКТИРОВОК К ТОВАРУ
  ADD_NEW_CORRECTION({commit, dispatch}, {params, wareId, npp}) {
    commit('LOADING', true);
    return axios(https + host + path + order + '/' + orderId + '/ware/' + wareId + '/line/' + npp + '/assignDiscount', {
      withCredentials: true,
      method: 'POST',
      data: params
    })
        .then(response => {
          if (response.data.ok) {
            dispatch('REQUEST_ORDER_INFO');
            return response.data;
          } else {
            return response.data;
          }
        })
        .catch(error => {
          commit('THROW_API_RESPONSE_ERROR', error);
          return error;
        })
        .finally(() => {
          commit('LOADING', false);
        })
  },
  //УДАЛЕНИЕ КОРРЕКТИРОВКИ
  REMOVE_CORRECTION({commit, dispatch}, {wareId, npp, paramObj}) {
    return axios(https + host + path + order + '/' + orderId + '/ware/' + wareId + '/line/' + npp + '/removeDiscount', {
      withCredentials: true,
      method: 'POST',
      data: {kisId: paramObj['kisId'], internalNum: paramObj['internalNum']}
    })
        .then(response => {
          if (response.data.ok) {
            dispatch('REQUEST_ORDER_INFO')
                .then(() => {
                  return response;
                })
          }
        })
        .catch(error => {
          commit('THROW_API_RESPONSE_ERROR', error);
          return error;
        })
  },

  // -----------------------------  КОРЗИНА  ------------------------------


  //ПОЛУЧАЕМ ДАННЫЕ О ТОВАРАХ, ПОПАВШИХ В КОРЗИНУ ЕСЛИ ТАКИЕ ЕСТЬ
  GET_BASKET({commit}) {
    return axios(https + host + path + order + '/' + orderId + '/getBasket', {
      withCredentials: true,
      method: 'GET',
    })
        .then(response => {
          if (!response.data.ok) {
            throw response.data.message ? response.data.message : response.data.data.message;
          } else {
            commit('SET_BASKET', response.data);
            return response.data;
          }
        })
        .catch(error => {
          let url = https + host + path + order + '/' + orderId + '/getBasket';
          commit('THROW_API_RESPONSE_ERROR', {error, url});
          return error;
        })
  },
}
