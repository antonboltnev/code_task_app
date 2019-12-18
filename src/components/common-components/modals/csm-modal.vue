<template>
  <div class='csm-modal-wrapper' v-show="isActive">
    <div
            class="csm-modal__dialog"
            :style="{'width': width + 'px', 'top': offSet}"
    >
      <div class="csm-modal__header">
        <slot name="modal-header"></slot>
      </div>
      <div class="csm-modal__content">
        <slot name="modal-content"></slot>
      </div>
      <div class="csm-modal__footer row justify-between align-center no-wrap" v-if="isFooterVisible">
        <slot name="modal-footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "csm-modal",
    props: {
      isActive: {
        type: Boolean,
        default: false
      },
      isFooterVisible: {
        type: Boolean,
        default() {
          return true;
        }
      },
      width: {
        type: Number,
        default: 850
      },
      offSet: {
        type: String,
        default: '15%'
      }
    }
  }
</script>

<style lang="scss">
  .csm-modal-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 9;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.37);
    & .csm-modal__dialog {
      position: absolute;
      top: 15%;
      z-index: 10;
      margin-bottom: 30px;
      background: #fff;
      border: solid 1px transparent;
      border-radius: 4px;
      line-height: normal;
      box-shadow: 0 11px 15px -7px rgba(0, 0, 0, .2), 0 24px 38px 3px rgba(0, 0, 0, .14), 0 9px 46px 8px rgba(0, 0, 0, .12);
    }

    & .modal-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: $csm-popup-header-bg;
      padding: $padding*2;
      font-size: $csm-big-font-size;
      color: #434343;
      i {
        cursor: pointer;
        padding: $padding*2;
        margin: -$padding*2;
      }
      i:hover {
        color: $csm-bg-color-dark-grey;
      }
    }

    & .csm-modal__content, & .csm-modal__footer {
      padding: $padding*2;
    }
  }
</style>

<docs>
  ## Компонент csm-modal

  ### Модальное окно со слотами

  ### Примеры:

  ```jsx
  <csm-modal
          class="change-delivery-modal"
          :isActive="defaultFalseFlag"
  >
    <template v-slot:modal-header>
      <div class="modal-title">
        <span>Название окна</span>
        <i class="material-icons" @click="toggleDefaultFalseFlag">close</i>
      </div>
    </template>
    <template v-slot:modal-content>
    </template>
    <template v-slot:modal-footer>
      <csm-btn
              title="left btn"
      />
      <csm-btn
              title="right btn"
      />
    </template>
  </csm-modal>
  <csm-btn
          @click="toggleDefaultFalseFlag"
          title="Показать popup"
  />
  ```

</docs>
