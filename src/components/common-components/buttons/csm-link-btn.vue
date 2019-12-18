<template>
  <button
          class='csm-link-btn'
          :class="className"
          @click="click"
  >{{title}}
  </button>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "csm-link-btn",
    props: {
      title: {
        type: String,
        default: 'Ссылка'
      },
      underlined: {
        type: Boolean,
        default() {
          return true;
        }
      }
    },
    computed: {
      ...mapGetters([
          'LOADING'
      ]),
      className() {
        return {
          'underlined': this.underlined
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
  .csm-link-btn {
    border: none;
    background: none;
    color: $csm-link-btn-color;
    &.underlined {
      border-bottom: solid 1px #bfdeef;
      line-height: inherit;
      cursor: pointer;
    }
    &.small {
      font-size: $csm-small-font-size;
    }
  }
</style>

<docs>
  ## Компонент csm-link-btn

  ### Кнопка-ссылка

  ### Примеры:

  ```jsx
  <csm-link-btn
          @click="click"
          title="С URL"
  />
  &nbsp;|&nbsp;
  <csm-link-btn
          @click="click"
          :underlined="false"
          title="Без URL"
  />
  ```
</docs>
