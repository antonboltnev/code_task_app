export default {
  SET_DELIVERY_COST({commit}, deliveryCost) {
    commit('SET_DELIVERY_COST', deliveryCost);
  },
  COUNT_DISCOUNTS_TOTAL({commit}, discounts) {
    commit('COUNT_DISCOUNTS_TOTAL', discounts);
  },
  GET_TOTAL_DISCOUNTS_COLLECTION({commit}, collectionItem) {
    commit('SET_TOTAL_DISCOUNTS_COLLECTION', collectionItem);
  },
  SET_DELIVERY_INFO_TO_VUEX({commit}, delivery) {
    if (delivery) {
      let arr = delivery.month.split('')
      let char = arr[arr.length - 1];
      if (char === 'т') {
        arr.splice(arr.length - 1, 1);
        arr.push('а');
      } else {
        arr.splice(arr.length - 1, 1);
        arr.push('я');
      }
      let month = arr.join('');
      let deliveryDate = delivery.date + ' ' + month + ' ' + delivery.year + ' ' + '(' + delivery.day + ')';
      let deliveryTime = delivery.time;
      let params = {
        date: deliveryDate,
        time: deliveryTime
      }
      commit('SET_DELIVERY_INFO_TO_HEADER', params);
    }
  },
  SET_SELECTED_PVZ_DATE({commit}, date) {
    commit('SET_PVZ_DATE_TO_VUEX', date);
  }
}
