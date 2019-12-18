<template>
  <div class="csm-text-field-wrapper">
    <input
            :type="type"
            class='csm-text-field'
            :class="className"
            :style="{'width': width}"
            :readonly="readonly"
            :disabled="disabled"
            :value="value"
            :max="max"
            :min="min"
            :maxlength="maxlength"
            @input="input"
            @keyup="typing"
    />
    <span class="csm-form-element-label fake_holder">{{placeholder}}</span>
  </div>
</template>

<script>
  export default {
    name: "csm-text-field",
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      align: {
        type: String,
        default: 'left'
      },
      max: '',
      min: '',
      maxlength: '',
      width: {
        type: String,
        default: '100%'
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
    computed: {
      className() {
        return {
          'has-content': this.value,
          'underlined-input': !this.readonly,
          'disabled-input': this.disabled,
          'text-align-right': this.align === 'right',
          'text-align-left': this.align === 'left',
          'text-align-center': this.align === 'center',
        }
      },
    },
    methods: {
      input(e) {
        let value = e.target.value;
        if (this.type === 'tel') {
          value = value.replace(/[^0-9]/g, '').replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
        }
        this.$emit('input', value);
      },
      typing() {
        this.$emit('typing');
      }
    },
  }
</script>

<style lang="scss">
  .csm-text-field-wrapper {
    position: relative;
    .csm-text-field {
      font-size: $csm-main-font-size;
      padding: $padding 0;
      color: $csm-font-color-dark;
      text-overflow: ellipsis;
      &.underlined-input {
        border-bottom: solid 1px $border-base-color;
      }
      &.disabled-input {
        color: $disabled-form-element;
        pointer-events: none;
      }
    }
  }

  .csm-text-field {
    -webkit-appearance: none;
    appearance: none;
    border: none;
  }
</style>
