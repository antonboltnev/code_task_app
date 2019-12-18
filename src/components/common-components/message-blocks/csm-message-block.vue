<template>
  <div class="block__item row align-center">
    <i
            v-if="type === 'warning'"
            class="block__message-icon material-icons"
            :class="[type === 'error' ? 'error-color' : 'warning-color', {'hidden': !isIconVisible}] "
            :style="{'color': iconColor}"
    >warning
    </i>
    <i
            v-if="type === 'error'"
            class="block__message-icon material-icons"
            :class="[type === 'error' ? 'error-color' : 'warning-color', {'hidden': !isIconVisible}] "
            :style="{'color': iconColor}"
    >cancel
    </i>
    <div
            class="special-mark__content triangle-pointer error row no-wrap text-align-left align-baseline text-black small-text"
            :class="type === 'error' ? 'error' : 'warning' "
    >
      <div class="content__text text-align-left">
        <span :class="type === 'error' ? 'error' : 'warning' ">
          <slot name="text"></slot>
        </span>
      </div>
      <div>
        <csm-link-btn
                class="content__btn"
                :title="btnTitle"
                @click="click"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import csmLinkBtn from '../buttons/csm-link-btn'

  export default {
    name: "csm-message-block",
    components: {
      csmLinkBtn
    },
    props: {
      text: {
        type: String,
        default: 'Какой-то текст какого-то сообщения'
      },
      type: {
        type: String,
        default: 'warning'
      },
      iconColor: {
        type: String,
        default: 'orange'
      },
      btnTitle: {
        type: String,
        default: 'Кнопка'
      },
      isIconVisible: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      click() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
  .block__item {
    margin: 0 0 $padding $padding*2;

    .block {
      &__message-icon {
        margin-right: 19px;
        color: orange;
        font-size: 16px;
        position: relative;

        &.error-color {
          color: $csm-bg-color-error;
        }
        &.hidden {
          display: none;
        }
      }

      & .special-mark__content {
        color: $csm-bg-color-error;
      }
    }

    .special-mark__content .content__text {
      margin-right: 0;
    }

    .special-mark__content.error span.error {
      color: $csm-bg-color-error;
    }

    .special-mark__content.warning span.warning {
      color: $csm-font-color-dark;
    }

    .special-mark__content.triangle-pointer:before {
      top: 11px;
      left: -5px;
      z-index: 1;
      transform: rotate(-136deg);
    }

    .special-mark__content.error.triangle-pointer:before {
      border-color: $csm-bg-color-error;
      background: $csm-bg-color-light;
    }
    .special-mark__content.warning.triangle-pointer:before {
      border-color: $csm-bg-color-light-yellow;
      background: $csm-yellow-bg-color;
    }
  }
</style>
