<template>
  <label
          class='csm-checkbox'
          :class="{'checked': isCheckBoxChecked}"
  >
    <i class="material-icons">
      {{checkBoxIcon}}
    </i>
    <input
            type="checkbox"
            :checked="isChecked"
            @change="change"
            :value="isChecked"
    >{{title}}
  </label>
</template>

<script>
  export default {
    name: "csm-checkbox",
    props: {
      title: {
        type: String,
        default: ''
      },
      isChecked: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    data() {
      return {
        isCheckBoxChecked: this.isChecked
      }
    },
    computed: {
      checkBoxIcon() {
        if (this.isCheckBoxChecked) {
          return 'check_box'
        } else {
          return 'check_box_outline_blank'
        }
      }
    },
    methods: {
      change() {
        this.$emit('change');
        this.isCheckBoxChecked = !this.isCheckBoxChecked
      }
    }
  }
</script>

<style lang="scss">
  .csm-checkbox {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: baseline;
    padding: $padding/2 $padding/2*3;
    &.checked {
      background: rgb(247, 247, 247);
      border-radius: $base-radius;
    }
    & input {
      position: relative;
      appearance: none;
      -webkit-appearance: none;
    }
    & .material-icons {
      color: #41474c;
      font-size: 16px;
      margin-left: 7px;
    }
  }
</style>

<docs>
  ## Компонент csm-checkbox

  ### Чекбокс

  ### Примеры:
  ```jsp
  <label class='csm-checkbox'>
    <input
            type="checkbox"
            :checked="true"
            @change="change"
            :value="true"
    >Label
  </label>
  <style>
    .csm-checkbox:before {
      content: '';
      position: absolute;
      left: -14px;
      top: 14px;
      height: 18px;
      width: 18px;
      border: solid 2px #41474c;
      border-radius: 4px;
    }
  </style>
  ```
</docs>
