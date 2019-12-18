export default {
  GET_COUPONS: (state, coupons) => {
    state.coupons = coupons.data;
  },
  ADD_NEW_COUPONS: (state, response) => {
    if (response.data.code === 1) {
      state.isCouponAddError = false;
    } else {
      state.isCouponAddError = true;
      state.couponErrorMsg = response.data.message;
    }
  },
  REMOVE_COUPONS: (state, index) => {
    state.coupons.splice(index, 1);
  },
}
