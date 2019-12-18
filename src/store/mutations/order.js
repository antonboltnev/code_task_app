import Vue from 'vue'

export default {
  SET_ORDER_CODE: (state, orderCode) => {
    state.orderId = orderCode;
  },
  GET_ORDER: (state, orders) => {
    state.order = orders.data;
    if (orders.data.useBonus === 1) {
      state.useBonuses = true;
    }
    // Добавили ключ SELECTED для операций с ордер лайнами (выбрать / свять выделение)
    for (let ware of orders.data.wareDtoList) {
      if (ware.orderLinesGroups) {
        for (let group of ware.orderLinesGroups) {
          for (let line of group.orderLines) {
            Vue.set(line, 'selected', false);
          }
        }
      }
    }
    state.orderList = orders.data.wareDtoList;
    state.orderNum = orders.data.orderNum;
  },
  SET_ORDER_INFO_MOC: (state, wareId) => {
    state.orderListMoc = wareId;
    state.orderNum = "11111-22233";
  },
  SET_BASKET: (state, basket) => {
    state.basket = basket.data;
    state.isLoading = false;
  },
  GET_CORRECTIONS_LIST: (state, corrections) => {
    state.correctionList = corrections;
  },
  COUNT_DISCOUNTS_TOTAL: (state, discounts) => {
    if (discounts) {
      return new Promise(resolve => {
        state.totalDiscounts.splice(0, state.totalDiscounts.length);
        resolve();
      })
          .then(() => {
            let result;
            state.totalDiscounts.push(discounts);
            result = state.totalDiscounts.reduce(function (sum, el) {
              return sum + el;
            });
            state.totalDiscountsSumm = result;
          });
    } else {
      return 0;
    }
  },
  SET_TOTAL_DISCOUNTS_COLLECTION: (state, collectionItems) => {
    if (collectionItems.length) {
      return new Promise(resolve => {
        state.discountsCollection.splice(0, state.discountsCollection.length);
        resolve();
      })
          .then(() => {
            if (state.discountsCollection.length === 0) {
              for (let item of collectionItems) {
                let temporaryCollectionObj = {...item};
                if (item.applied) {
                  state.discountsCollection.push(temporaryCollectionObj);
                }
              }
            } else {
              collectionItems.map(function (newDiscount) {
                let isFound = false;
                state.discountsCollection.map(function (existDiscount) {
                  if (newDiscount.name === existDiscount.name) {
                    isFound = true;
                    existDiscount.summa += newDiscount.summa;
                  }
                });
                if (!isFound) {
                  let temporaryCollectionObj = {...newDiscount};
                  state.discountsCollection.push(temporaryCollectionObj);
                }
              });
            }
          });
    }
  },
  SET_REMOVE_REASONS_LIST: (state, list) => {
    state.removeReasons = list;
  },
}
