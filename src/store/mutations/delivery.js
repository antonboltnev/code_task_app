export default {
  GET_DELIVERY: (state, deliveryData) => {
    state.deliveryData = deliveryData;
  },
  SET_DELIVERY: (state, deliveryData) => {
    if (deliveryData.deliveryViewOptionsResponseDto) {
      state.delivery = deliveryData.deliveryViewOptionsResponseDto;
    } else if (deliveryData.pointsOfDelivery) {
      state.pvzPoints = deliveryData.pointsOfDelivery;
    } else {
      state.pickupStores = deliveryData.pickupViewOptions;
    }
  },
  SET_PVZ_LIST: (state, pvzList) => {
    state.pvzList = pvzList;
  },
  SET_PVZ_DETAILS: (state, pvzDetails) => {
    state.pvzDetails = pvzDetails;
  },
  SET_PVZ_DATE_TO_VUEX: (state, date) => {
    state.selectedPvzDate = date;
  },
  SET_DELIVERY_INFO_TO_HEADER: (state, delivery) => {
    state.headerDeliveryDate = delivery.date;
    state.headerDeliveryTime = delivery.time
  },
  SET_CITY_INPUT_SUGGESTIONS: (state, cities) => {
    state.citySuggestions = cities;
  },
  SET_STREET_INPUT_SUGGESTIONS: (state, streets) => {
    state.streetSuggestions = streets;
  },
  SET_METRO_INPUT_SUGGESTIONS: (state, metros) => {
    state.metroSuggestions = metros;
  },
  SET_DELIVERY_COST: (state, deliveryCost) => {
    state.deliveryCost = deliveryCost;
  },
}
