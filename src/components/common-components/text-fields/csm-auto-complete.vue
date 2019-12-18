<template>
  <div class='csm-auto-complete-wrapper'>
    <input
            :type="type"
            class='csm-auto-complete'
            :class="className"
            :readonly="readonly"
            :disabled="disabled"
            v-model="inputVal"
            @input="$emit('update:inputValue', inputVal)"
            @keyup="changeInputValue"
            @blur="blur"
            ref="autocomplete"
    />
    <span class="csm-form-element-label fake_holder">{{placeholder}}</span>
    <div class="csm-auto-complete__options" v-if="isAutoCompleteVisible">
      <div
              class="options__item"
              v-if="options"
              v-for="option in options"
              :key="option.metroId"
              @click="setOption(option)"
      >
        <span>{{option.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "csm-auto-complete",
    props: {
      inputValue: {
        type: [String, Number],
        default: ''
      },
      dataSource: {
        type: String,
        default: ''
      },
      options: {
        type: Array,
        default() {
          return []
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        default: ''
      },
      underlined: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        inputVal: this.inputValue,
        isAutoCompleteVisible: false,
      }
    },
    computed: {
      className() {
        let className = '';
        if (this.inputVal) {
          className += ' has-content'
        }
        if (!this.readonly) {
          className += ' underlined-input'
        }
        if (this.disabled) {
          className += ' disabled-input'
        }
        return className;
      },
    },
    methods: {
      hideOptions() {
        this.isAutoCompleteVisible = false;
      },
      changeInputValue() {
        if (this.inputValue.length >=3) {
          this.$emit('onInputChange');
          this.isAutoCompleteVisible = true;
        }
      },
      blur() {
        this.$emit('onBlur');
      },
      setOption(option) {
        this.$emit('setOption', option);
        this.hideOptions()
      }
    },
    watch: {
      inputValue() {
        this.inputVal = this.inputValue;
      }
    },
    mounted () {
      document.addEventListener('click', this.hideOptions.bind(this), true)
    },

    beforeDestroy () {
      document.removeEventListener('click', this.hideOptions)
    }
  }
</script>

<style lang="scss">
  .csm-auto-complete-wrapper {
    position: relative;
    .csm-auto-complete {
      font-size: $csm-main-font-size;
      padding: $padding 0;
      color: $csm-font-color-dark;
      width: 100%;
      &.underlined-input {
        border-bottom: solid 1px $border-base-color;
      }
      &.disabled-input {
        color: $disabled-form-element;
        pointer-events: none;
      }
    }
  }

  .csm-auto-complete {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
    &__options {
      position: absolute;
      left: 0;
      z-index: 2;
      background: $csm-bg-color-light;
      text-align: left;
      max-width: 310px;
      max-height: 270px;
      overflow-y: auto;
      width: max-content;
      -webkit-box-shadow: 2px 2px 25px 0 rgba(0, 0, 0, 0.15);
      box-shadow: 2px 2px 25px 0 rgba(0, 0, 0, 0.15);
    }

    &__options .options__item {
      padding: $padding;
      margin-bottom: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    &__options .options__item:hover {
      background: $csm-main-bg-color;
    }
  }


</style>
