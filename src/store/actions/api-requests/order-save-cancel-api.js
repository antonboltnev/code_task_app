import axios from "axios";
import {https, host, path, order} from './api-params'
import {orderId} from './order-api'

export default {
  
  //СОХРАНИТЬ ИЗМЕНЕНИЯ В ЗАКАЗЕ
  SAVE_ORDER({commit}, needSaveBasket) {
    return axios(https + host + path + order + '/' + orderId + '/saveOrder', {
      withCredentials: true,
      method: "POST",
      data: {needSaveBasket: needSaveBasket}
    })
        .then(response => {
          if (response.data.ok) {
            return response;
          } else {
            throw 'Заказ не сохранился';
          }
        })
        .catch((error) => {
          commit('THROW_API_RESPONSE_ERROR', error);
        })
  },
  // ПОЛУЧАЕМ ПРИЧИНЫ УДАЛЕНИЯ ЗАКАЗА
  GET_ORDER_CANCEL_REASONS({commit}) {
    return axios(https + host + path + order + '/' + orderId + '/reasons-cancel', {
      withCredentials: true,
      method: 'GET'
    })
        .then((reasons) => {
          console.log(reasons)
          for (let item of reasons.data.data) {
            item.name = item.reasonName;
            item.selected = false;
          }
          commit('SET_ORDER_DELETE_REASONS', reasons.data.data);
        })
  },

  CANCEL_ORDER({commit}, params) {
    return axios(https + host + path + order + '/' + orderId + '/cancel', {
      withCredentials: true,
      method: 'POST',
      data: {
        cancelComment: params.cancelComment,
        cancelReasonCode: params.cancelReasonCode,
        needSaveBasket: params.needSaveBasket
      }
    })
  },

  //ОТМЕНИТЬ ЗАКАЗА И СБРОСИТЬ СЕССИЮ
  REMOVE_ORDER_FROM_SESSION({}) {
    return axios(https + host + path + order + '/' + orderId + '/removeOrder', {
      withCredentials: true,
      method: "POST"
    })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        })
  }
}
