export default {
  /**
   * @return {boolean}
   */
  LOADING(state) {
    return state.isLoading;
  },
  ORDER(state) {
    return state.order;
  },
  PRODUCTS(state) {
    return state.orderList;
  },
  PRODUCTS_MOC(state) {
    return state.orderListMoc;
  },
  ORDER_NUM(state) {
    return state.orderNum;
  },
  /**
   * @return {boolean}
   */
  USE_BONUS(state) {
    return state.useBonuses;
  },
  USERS(state) {
    return state.userList;
  },
  BASKET(state) {
    return state.basket;
  },
  DELIVERY_VARIANTS_NEW(state) {
    return state.delivery;
  },
  PVZ_OPTIONS(state) {
    return state.pvzPoints;
  },
  PVZ_LIST(state) {
    return state.pvzList;
  },
  PVZ_DETAILS(state) {
    return state.pvzDetails;
  },
  PVZ_SELECTED_DATE(state) {
    return state.selectedPvzDate;
  },
  PICKUP_OPTIONS(state) {
    return state.pickupStores;
  },
  DELIVERY(state) {
    return state.deliveryData;
  },
  /**
   * @return {string}
   */
  DELIVERY_WATCHER_DATE(state) {
    return state.headerDeliveryDate;
  },
  /**
   * @return {string}
   */
  DELIVERY_WATCHER_TIME(state) {
    return state.headerDeliveryTime;
  },
  METRO_STATIONS(state) {
    return state.metroStations;
  },
  /**
   * @return {number}
   */
  METRO_PAGE(state) {
    return state.currentMetroPage;
  },
  CITY_SUGGESTIONS(state) {
    return state.citySuggestions;
  },
  STREET_SUGGESTIONS(state) {
    return state.streetSuggestions;
  },
  METRO_SUGGESTIONS(state) {
    return state.metroSuggestions;
  },
  /**
   * @return {number}
   */
  DELIVERY_COST(state) {
    return state.deliveryCost;
  },
  LOGISTICS(state) {
    return state.logisticsData;
  },
  /**
   * @return {number}
   */
  TOTAL_DISCOUNTS_SUM(state) {
    return state.totalDiscountsSumm;
  },
  REMOVE_REASONS(state) {
    return state.removeReasons;
  },
  DISCOUNT_COLLECTION(state) {
    return state.discountsCollection;
  },
  PROMO_COUPONS(state) {
    return state.coupons
  },
  CORRECTION_TYPES(state) {
    return state.correctionList;
  },
  /**
   * @return {boolean}
   */
  COUPON_ADDING_ERROR(state) {
    return state.isCouponAddError;
  },
  COUPON_ADDING_ERROR_MSG(state) {
    return state.couponErrorMsg;
  },
  NOTIFICATION_MESSAGES(state) {
    return state.notificationMessages;
  },
  ORDER_CANCEL_REASONS(state) {
    return state.orderCancelReasons;
  }
}
