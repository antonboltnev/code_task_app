import axios from "axios";
import {https, host, path, order} from './api-params'
import {orderId} from './order-api'

export default {

  //ПОЛУЧЕНИЕ СПИСКА ПРИМЕНЕННЫХ КУПОНОВ
  GET_COUPONS({commit}) {
    return axios(https + host + path + order + '/' + orderId + '/getCoupons', {
      withCredentials: true,
      method: 'GET'
    })
        .then(coupons => {
          commit('GET_COUPONS', coupons);
        })
        .catch(error => {
          commit('THROW_API_RESPONSE_ERROR', error);
          return error;
        })
        .finally(() => {
          commit('LOADING', false);
        })
  },
  //ДОБАВЛЕНИЕ НОВОГО КУПОНА
  ADD_NEW_COUPONS({commit, dispatch}, couponName) {
    return axios(https + host + path + order + '/' + orderId + '/addCoupon', {
      withCredentials: true,
      method: "POST",
      data: {coupon: couponName}
    })
        .then(response => {
          commit('ADD_NEW_COUPONS', response);
          dispatch('REQUEST_ORDER_INFO');
        })
        .catch(error => {
          commit('THROW_API_RESPONSE_ERROR', error);
          return error;
        })
  },
  //УДАЛЕНИЕ ПРИМЕНЕННОГО КУПОНА
  REMOVE_COUPONS({commit, dispatch}, {index, coupon}) {
    return axios(https + host + path + order + '/' + orderId + '/deleteCoupon', {
      withCredentials: true,
      method: "POST",
      data: {coupon: coupon}
    })
        .then(response => {
          if (response.data.ok) {
            commit('REMOVE_COUPONS', {index, response});
            dispatch('REQUEST_ORDER_INFO');
            return response;
          }
          return false;
        })
        .catch((error) => {
          commit('THROW_API_RESPONSE_ERROR', error);
          return error;
        })
  },
  //ЧЕКБОКС ИСПОЛЬЗОВАТЕНИЯ БОНУСОВ
  USE_BONUSES({commit, dispatch}, isChecked) {
    return axios(https + host + path + order + '/' + orderId + '/useBonus', {
      withCredentials: true,
      method: "POST",
      data: {useBonus: parseInt(isChecked, 10)}
    })
        .then(response => {
          dispatch('REQUEST_ORDER_INFO');
          return response;
        })
        .catch((error) => {
          commit('THROW_API_RESPONSE_ERROR', error);
          return error;
        })
  },
}
