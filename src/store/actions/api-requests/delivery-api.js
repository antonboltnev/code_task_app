import axios from "axios";
import {https, host, path, order, geo} from './api-params'
import {orderId} from './order-api'

export default {

  //ВАЛИДАЦИЯ ДАТЫ И ВРЕМЕНИ ДОСТАВКИ ДЛЯ ТЕКУЩЕГО ЗАКАЗА
  ORDER_VALIDATE({commit, dispatch}) {
    return axios(https + host + path + order + '/view/' + orderId + '/delivery/validate', {
      withCredentials: true,
      method: "GET"
    })
        .then((response) => {
          if (response.data.data.code === 1) {
            dispatch('GET_BASKET');
            return false;
          }
          if (response.data.data.code === 2) {
            dispatch('GET_BASKET');
          }
          if (response.data.data.code === 0) {
            dispatch('GET_BASKET');
            return false;
          }
        })
        .catch(error => {
          commit('THROW_API_RESPONSE_ERROR', error);
        })
  },
  //ПОЛУЧАЕМ АДРЕС ДОСТАВКИ, УКАЗАННЫЙ ПРИ ОФОРМЛЕНИИ ЗАКАЗА НА САЙТЕ
  GET_DELIVERY_ADDRESS({commit}) {
    return axios(https + host + path + order + '/' + orderId + '/delivery/address', {
      withCredentials: true,
      method: "GET"
    })
        .then((deliveryData) => {
          commit('GET_DELIVERY', deliveryData.data);
        })
        .catch(error => {
          commit('THROW_API_RESPONSE_ERROR', error);
        })
  },
  //ЗАПРАШИВАЕМ ВАРИАНТЫ ДОСТАВКИ (ДАТЫ, ВРЕМЕННЫЕ СЛОТЫ, СЛУЖБЫ ДОСТАВКИ И Т.Д)
  REQUEST_DELIVERY({commit}) {
    return axios(https + host + path + order + '/' + orderId + '/delivery/options', {
      withCredentials: true,
      method: "GET"
    })
        .then((deliveryData) => {
          if (deliveryData.data.ok) {
            if (deliveryData.data.data.deliveryViewOptionsResponseDto) {
              // Унификация ключей в ответе для передачи в селекты
              for (let item of deliveryData.data.data.deliveryViewOptionsResponseDto.deliveryOptionGroupByDateFromResponseDto) {
                for (let timeSlot of item.deliveryTimeResponseDtoList) {
                  timeSlot.name = timeSlot.nameTime;
                }
              }
            }
            commit('SET_DELIVERY', deliveryData.data.data);
            return deliveryData.data.data
          }
        })
        .catch(error => {
          commit('THROW_API_RESPONSE_ERROR', error);
        })
  },
  //ПОЛУЧАЕМ СПИСОК ВСЕ ПВЗ
  GET_PVZ_LIST({commit}) {
    commit('LOADING', true);
    return axios(https + host + path + order + '/' + orderId + '/delivery/points-of-delivery', {
      withCredentials: true,
      method:'GET'
    })
        .then((response) => {
          commit('SET_PVZ_LIST', response.data.data)
        })
  },
  //ДЕТАЛЬНАЯ ИНФОРМАЦИЯ ПО ПВЗ
  GET_PVZ_DETAILS({commit}, deliveryPointId) {
    return axios(https + host + path + order + '/' + orderId + '/delivery/point-of-delivery/' + deliveryPointId, {
      withCredentials: true,
      method:'GET'
    })
        .then((response) => {
          commit('SET_PVZ_DETAILS', response.data.data)
        })
  },
  //ВЫБОР ПУНКТА ПВЗ
  SELECT_PVZ({dispatch}, params) {
    return axios(https + host + path + order + '/' + orderId + '/delivery/select-point-of-delivery', {
      withCredentials: true,
      method: 'POST',
      data: params
    })
        .then(() => {
          dispatch('REQUEST_DELIVERY');
        })
  },
  //ПОЛУЧЕНИЕ НАСЕЛЕННЫХ ПУНКТОВ ДЛЯ АВТОКОМПЛИТА НАСЕЛЕННЫХ ПУНКТОВ
  GET_CITY_INPUT_SUGGESTIONS({commit}, city) {
    return axios(https + host + path + geo + '/suggestions/territory/' + city, {
      withCredentials: true,
      method: "GET"
    })
        .then((cities) => {
          // Унификация ключей в ответе для передачи в селекты
          for (let item of cities.data) {
            item.name = item.fullName;
          }
          commit('SET_CITY_INPUT_SUGGESTIONS', cities.data);
        })
        .catch(error => {
          commit('THROW_API_RESPONSE_ERROR', error);
        })
  },
  //ПОЛУЧЕНИЕ СПИСКА УЛИЦ ДЛЯ АВТОКОМПЛИТА УЛИЦЫ
  GET_STREET_INPUT_SUGGESTIONS({commit}, {territoryId, streetName}) {
    return axios(https + host + path + geo + '/suggestions/territory/' + territoryId + '/street/' + streetName, {
      withCredentials: true,
      method: "GET"
    })
        .then((street) => {
          // Унификация ключей в ответе для передачи в селекты
          for (let item of street.data) {
            item.name = item.streetName;
          }
          commit('SET_STREET_INPUT_SUGGESTIONS', street.data);
        })
        .catch(error => {
          commit('THROW_API_RESPONSE_ERROR', error);
        })
  },
  //ПОЛУЧЕНИЕ СПИСКА СТАНЦИЙ МЕТРО ДЛЯ АВТОКОМПЛИТА СТАНЦИЙ МЕТРО
  GET_METRO_INPUT_SUGGESTIONS({commit}, {territoryId, stationName}) {
    return axios(https + host + path + geo + '/suggestions/territory/' + territoryId + '/metro/' + stationName, {
      withCredentials: true,
      method: "GET"
    })
        .then((stations) => {
          commit('SET_METRO_INPUT_SUGGESTIONS', stations.data);
        })
        .catch(error => {
          commit('THROW_API_RESPONSE_ERROR', error);
        })
  },
  //СОХРАНЕНИЕ ДАННЫХ ПРИ ИЗМЕНЕНИИ ПОЛЕЙ ФОРМЫ АДРЕСА ДОСТАВКИ
  SAVE_DELIVERY_ADDRESS_FORM_FIELDS({dispatch, commit}, formData) {
    return axios(https + host + path + order + '/' + orderId + '/delivery/address', {
      withCredentials: true,
      method: "POST",
      data: formData
    })
        .then((response) => {
          if (response.data.ok) {
            dispatch('REQUEST_DELIVERY');
          }
        })
        .catch(error => {
          commit('THROW_API_RESPONSE_ERROR', error);
        })
  },
  //ВЫБОР ВАРИАНТА ДОСТАВКИ (ДАТА И ВРЕМЯ)
  SELECT_DELIVERY_VARIANT({commit}, deliveryData) {
    commit('LOADING', true);
    return axios(https + host + path + order + '/' + orderId + '/delivery/select', {
      withCredentials: true,
      method: "POST",
      data: deliveryData
    })
        .then((response) => {
          if (response.data.ok) {
            return response.data;
          } else {
            throw 'Что-то пошло не так... О_о'
          }
        })
        .catch(error => {
          commit('THROW_API_RESPONSE_ERROR', error);
        })
        .finally(() => {
          commit('LOADING', false);
        })
  },
}
