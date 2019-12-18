<template>
  <div
          class='csm-notification-bar'
  >
    <transition-group name="csm-notifications">
      <div class="csm-notification-bar__content"
           v-for="(message, index) in messages"
           :class="message.type"
           :key="message.id"
      >
        <div class="content__text-content col12 align-baseline">
          <p class="content__url" v-if="message.name.url">{{message.name.url}}</p>
          <p class="content__time" v-if="message.error_type === 'system_error'">Время ошибки: {{message.id}}</p>
          <p v-if="message.name.name">{{message.name.name}}</p>
          <span v-else>{{message.name}}</span>
          <i
                  v-if="!leftBtnText && !rightBtnText"
                  class="material-icons"
                  :class="message.type"
          >
          </i>
        </div>
        <div class="content_action-btns col2 row align-end justify-end" v-if="leftBtnText || rightBtnText">
          <csm-btn
                  v-if="leftBtnText"
                  :title="leftBtnText"
                  size="small"
                  @click="leftBtnClick(index)"
          />
          <csm-btn
                  v-if="rightBtnText"
                  :title="rightBtnText"
                  size="small"
                  @click="rightBtnClick(index)"
          />
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
  import csmBtn from '../buttons/csm-btn'

  export default {
    name: "csm-notification-bar",
    components: {
      csmBtn
    },
    props: {
      notificationType: {
        type: String,
        default: ''
      },
      permanent: {
        type: Boolean,
        default() {
          return false;
        }
      },
      timeOut: {
        type: Number,
        default: 3000
      },
      messages: {
        type: Array,
        default() {
          return []
        }
      },
      leftBtnText: {
        type: String,
        default: ''
      },
      rightBtnText: {
        type: String,
        default: ''
      }

    },
    computed: {
      className() {
        return {
          'success': this.notificationType === 'success',
          'error': this.notificationType === 'error',
          'warning': this.notificationType === 'warning',
        }
      },
    },
    methods: {
      leftBtnClick() {
        this.$emit('leftBtnClick');
      },
      rightBtnClick(index) {
        this.messages.splice(index, 1);
        this.$emit('rightBtnClick');
      },
      removeNotificationMsg() {
        if (this.messages.length) {
          let vm = this;
          setTimeout(function () {
            vm.messages.splice(vm.messages.length - 1, 1);
          }, vm.timeOut)
        }
      }
    },
    watch: {
      messages() {
        this.removeNotificationMsg();
      }
    },
    mounted() {
      this.removeNotificationMsg();
    }
  }
</script>

<style lang="scss">
  .csm-notification-bar {
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 10;
  }

  .csm-notification-bar__content {
    border: solid 1px transparent;
    border-radius: 4px;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: $padding*2;
    margin-bottom: $padding*2;
    color: $csm-bg-color-light;
    box-shadow: 0 11px 15px -7px rgba(0, 0, 0, .2), 0 24px 38px 3px rgba(0, 0, 0, .14), 0 9px 46px 8px rgba(0, 0, 0, .12);

    &.check_circle {
      background-color: $csm-bg-color-success;
    }

    &.error {
      background-color: $csm-bg-color-error;
    }

    &.warning {
      background-color: $csm-bg-color-warning;
    }

    & .material-icons {
      font-size: 14px;
      margin-left: 32px;
      border-radius: 50%;
      padding: 2px;
    }
  }

  .content {
    &__url {
      margin-bottom: $padding*2;
    }
  }

  .content_action-btns {
    margin-left: 20px;
  }

  /*notification animation*/
  .csm-notifications {
    &-enter {
      transform: translateX(120px);
      opacity: 0;
    }

    &-enter-active {
      transition: all .6s ease;
    }

    &-enter-to {
      opacity: 1;
    }

    &-leave {
      height: 50px;
      opacity: 1;
    }

    &-leave-active {
      transition: transform .6s ease,
      opacity .6s,
      height .6s .2s;
    }

    &-leave-to {
      height: 0;
      transform: translateX(120px);
      opacity: 0;

      &:first-child {
        height: 50px;
      }
    }

    &-move {
      transition: transform .6s ease;
    }
  }
</style>

<docs>
  ## Компонент csm-notification-bar

  ### Кнопка-ссылка

  ### Примеры:

  ```jsx
  <csm-notification-bar
          v-if="notifications"
          :messages="notificationMsgs"
  />
  <csm-btn
          title="Показать уведомление"
          @click="showNotifications"
  />
  ```
</docs>
