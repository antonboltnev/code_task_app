<template>
  <button
          class='csm-btn'
          :class="className"
          :disabled="disabled"
          @click="click"
  >{{title}}
  </button>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "csm-btn",
    props: {
      title: {
        type: String,
        default: 'Кнопка'
      },
      simple: {
        type: Boolean,
        default() {
          return false;
        }
      },
      type: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default() {
          return false
        }
      },
      size: {
        type: String,
        default: ''
      },
      width: {
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapGetters([
          'LOADING'
      ]),
      className() {
        return {
          'simple-btn': this.simple,
          'disabled': this.disabled,
          'csm-btn__long': (this.width === 'long'),
          'csm-btn__success': (this.type === 'success'),
          'csm-btn__error': (this.type === 'error'),
          'csm-btn__small': (this.size === 'small'),
          'csm-btn__large': (this.size === 'large')
        }
      }
    },
    methods: {
      click() {
        if (!this.LOADING) {
          this.$emit('click');
        }
      }
    }
  }
</script>

<style lang="scss">
  .csm-btn {
    border: none;
    background: none;
    @include border;
    outline: none;
    cursor: pointer;
    line-height: normal;
    text-align: center;
    color: $csm-font-color-dark;
    font-size: $csm-main-font-size;
    &:hover {
      background: darken($csm-bg-color-light, 5%);
    }
    &__error {
      @extend .csm-btn;
      border-color: $csm-bg-color-error;
      color: $csm-bg-color-error;
      &:hover {
        background: lighten($csm-bg-color-error, 10%);
        color: $csm-bg-color-light;
      }
    }
    &__success {
      @extend .csm-btn;
      border-color: $csm-bg-color-success;
      color: $csm-bg-color-success;
      &:hover {
        background: lighten($csm-bg-color-success, 10%);
        color: $csm-bg-color-light;
      }
    }
    &__small {
      font-size: $csm-small-font-size;
      padding: $padding/2 $padding;
    }
    &__large {
      font-size: $csm-big-font-size;
    }
    &__long {
      width: 100%;
    }
    &.disabled {
      color: $disabled-form-element;
      border-color: $disabled-form-element;
      pointer-events: none;
    }
    &.simple-btn {
      border: 0;
      padding: 0;
      font-weight: bold;
    }
    &.simple-btn:hover {
      background: none;
    }
  }
</style>

<docs>
  ## Компонент csm-btn

  ### Простая многофункциональная кнопка

  ### Примеры:

  ```jsx
  <csm-btn
          class='csm-btn'
          @click="click"
          title="Обычная"
  />
  <csm-btn
          class='csm-btn disabled'
          @click="click"
          title="Неактивная"
  />
  <csm-btn
          class='csm-btn simple-btn'
          @click="click"
          title="Без рамок"
  />
  <csm-btn
          class='csm-btn csm-btn__small'
          @click="click"
          title="Маленькая"
  />
  <csm-btn
          class='csm-btn csm-btn__large'
          @click="click"
          title="Большая"
  />
  <csm-btn
          class='csm-btn csm-btn__success'
          @click="click"
          title="Success"
  />
  <csm-btn
          class='csm-btn csm-btn__error'
          @click="click"
          title="Error"
  />
  <csm-btn
          class='csm-btn csm-btn__long'
          @click="click"
          title="100% width"
  />
  ```
</docs>
