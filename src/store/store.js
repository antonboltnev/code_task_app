import Vue from 'vue'
import Vuex from 'vuex'
//import actions
import componentActions from './actions/actions';
import apiParams from './actions/api-requests/api-params'
import orderSaveCancelApi from './actions/api-requests/order-save-cancel-api'
import bonusesApi from './actions/api-requests/bonuses-api'
import usersApi from './actions/api-requests/users-api'
import orderApi from './actions/api-requests/order-api'
import deliveryApi from './actions/api-requests/delivery-api'
// import mutations
import commonMutations from './mutations/common-mutations'
import bonuses from './mutations/bonuses'
import order from './mutations/order'
import delivery from './mutations/delivery'
import users from './mutations/users'
import orderSaveCancel from './mutations/order-save-cancel'
import getters from './getters';

const actions = {...componentActions, ...apiParams, ...orderApi, ...usersApi, ...deliveryApi, ...bonusesApi, ...orderSaveCancelApi};
const mutations = {...commonMutations, ...bonuses, ...order, ...delivery, ...users, ...orderSaveCancel};

Vue.use(Vuex);

export let store = new Vuex.Store({
  state: {
    locale: 'ru',
    order: [],
    orderId: '',
    orderNum: '',
    useBonuses: false,
    isLoading: false,
    orderList: [],
    orderListMoc: [],
    basket: [],
    userList: {},
    deliveryData: {},
    headerDeliveryDate: '',
    headerDeliveryTime: '',
    discountsCollection: [],
    promoDiscount: 0,
    totalSum: 0,
    totalDiscounts: [],
    totalDiscountsSumm: 0,
    removeReasons: [],
    orderCancelReasons: [],
    delivery: {},
    pvzPoints: [],
    pvzList: [],
    pvzDetails: {},
    selectedPvzDate: '',
    pickupStores: {},
    currentMetroPage : 0,
    citySuggestions: [],
    streetSuggestions: [],
    metroSuggestions: [],
    deliveryCost: 0,
    wareId: null,
    npp: null,
    correctionList: [],
    coupons: [],
    isCouponAddError: false,
    couponErrorMsg: '',
    notificationMessages: {
      apiResponseErrors: [],
      coupons: {
        couponAddingSuccessMsg: 'Купон добавлен',
        couponRemoveSuccessMsg: 'Купон удален'
      },
      wareId: {
        incrementWareIdSuccess: 'Товар добавлен',
        incrementWareIdError: 'В этот заказ нельзя добавить товар',
        incrementWareIdNeedOption: 'Выберите способ доставки и дату (если уже выбрано - смиритесь, система сдохла...)',
        incrementToBusket: 'Товар добавлен в нераспределенную корзину!',
        incrementWareIdServerError: 'Неизвестная ошибка сервера...',
        needReselectDeliveryOption: 'Текущая опция доставки не подходит. Выберите другую'
      }
    }
  },
  actions,
  mutations,
  getters,
});
export let orderId = store.state.orderId;
