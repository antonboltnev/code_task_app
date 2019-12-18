<template>
  <div class='csm-split-btn small-text row justify-center align-center'>
    <button
            class="btn__content csm-btn"
            :disabled="disabled"
            @click="btnClick"
    >
      {{title}}
    </button>
    <div
            class="dropdown__content"
    >
      <i class="material-icons" @click="isDropDownVisible = true">arrow_drop_down</i>
      <transition name="csm-select">
        <div
                class="content__option-wrapper"
                v-if="isDropDownVisible"
        >
          <div
                  class="option-wrapper__option"
                  v-for="option in drpDwnOpts"
                  :key="option.id"
                  @click="chooseOption(option)"
          >
            <span>{{option}}</span>
          </div>
          <div
                  class="option-wrapper__option"
                  @click="chooseSpecialOption"
          >
            <span>{{specialOption}}</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "csm-split-btn",
    props: {
      title: {
        type: String,
        default: 'Btn'
      },
      drpDwnOpts: {
        type: Array,
        default() {
          return []
        }
      },
      specialOption: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isDropDownVisible: false,
      }
    },
    computed: {
      ...mapGetters([
        'LOADING'
      ])
    },
    methods: {
      btnClick() {
        if (!this.LOADING) {
          this.$emit('btnClick');
          this.hideOptions();
        }
      },
      chooseOption(selectedOption) {
        if (!this.LOADING) {
          this.$emit('selectOption', selectedOption);
          this.hideOptions();
        }
      },
      chooseSpecialOption() {
        if (!this.LOADING) {
          this.$emit('chooseSpecialOption');
        }
      },
      hideOptions() {
        if (this.isDropDownVisible) {
          this.isDropDownVisible = false;
        }
      },
    },
    mounted() {
      document.addEventListener('click', this.hideOptions, true)
    },

    beforeDestroy() {
      document.removeEventListener('click', this.hideOptions)
    }
  }
</script>

<style lang="scss">
  .csm-split-btn {
    position: relative;
    background: #fff;

    & .btn__content {
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
      border-right: none;
      padding: 4px 8px;
      box-sizing: border-box;
      height: 26px;
    }

    & .dropdown__content {
      position: relative;
      border: solid 1px $border-base-color;
      border-radius: 0 4px 4px 0;
      border-left: 0;
      box-sizing: border-box;
      height: 26px;
      cursor: pointer;

      &:hover {
        background: darken($csm-bg-color-light, 5%);;
      }
    }

    & .material-icons {
      font-size: 14px;
      position: relative;
      top: 5px;
    }

    & .content__option-wrapper {
      position: absolute;
      right: -14px;
      top: 28px;
      z-index: 2;
      background: #ffffff;
      border-radius: 4px;
      text-align: left;
      max-width: 310px;
      max-height: 270px;
      overflow-y: auto;
      width: max-content;
      box-shadow: 2px 2px 25px 0 rgba(0, 0, 0, 0.15);

      & .option-wrapper__option {
        padding: $padding $padding*2;
        color: $csm-font-color-dark;
        cursor: pointer;

        &:hover {
          background: $csm-main-bg-color;
        }
      }

      &-enter-active {
        transition: all .2s ease;
      }

      &-leave-active {
        transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
      }

      &-enter, &-leave-to {
        transform: translateY(-10px);
        opacity: 0;
      }
    }
  }
</style>
