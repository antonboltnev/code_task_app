<template>
  <div class='csm-image-popup-modal' v-if="isPopupVisible">
    <div class="popup-modal__close-btn">
      <i class="material-icons" @click="closePopup">cancel</i>
    </div>
    <img
            :src="imageSrc"
            :alt="imageSrc"
            v-click-outside="closePopup"
    >
  </div>
</template>

<script>
  export default {
    name: "csm-image-popup-modal",
    props: {
      imageSrc: {
        type: String,
        default() {
          return ''
        }
      },
      popUpVisibility: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    data() {
      return {
        isPopupVisible: this.popUpVisibility
      }
    },
    methods: {
      closePopup() {
        this.isPopupVisible = !this.isPopupVisible;
        this.$emit('closePopup');
      }
    },
    watch: {
      popUpVisibility() {
        this.isPopupVisible = this.popUpVisibility
      }
    }
  }
</script>

<style lang="scss">

  .csm-image-popup-modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.37);
    & img {
      position: fixed;
      z-index: 10;
      width: auto !important;
      height: auto !important;
      box-shadow: 2px 2px 50px 0 rgba(0, 0, 0, 0.25);
    }

    & .popup-modal__close-btn .material-icons {
      position: absolute;
      top: 21px;
      right: 21px;
      color: #fff;
      cursor: pointer;
    }
  }

</style>

<docs>
  ## Компонент csm-image-popup-modal

  ### Просмотр изображений в режиме full-screen

  ### Примеры:

  ```jsx
  <csm-image-popup-modal
          :popUpVisibility="defaultFalseFlag"
          imageSrc="https://cdn.sptmr.ru/upload/resize_cache/iblock/f40/331_394_1/18385230299.jpg"
          @closePopup="defaultFalseFlag = false"
  />
  <csm-btn
          @click="toggleDefaultFalseFlag"
          title="Показать popup"
  />
  ```
</docs>
