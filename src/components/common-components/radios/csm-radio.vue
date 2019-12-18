<template>
  <label
          class='csm-radio'
          :class="{'checked': isChecked}"
  >
    <i class="material-icons">
      {{checkBoxIcon}}
    </i>
    <input
            type="radio"
            :name="name"
            :checked="isChecked"
            @change="change"
            :value="isChecked"
    >{{title}}
  </label>
</template>

<script>
  export default {
    name: "csm-radio",
    props: {
      title: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: 'name'
      },
      isChecked: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    computed: {
      checkBoxIcon() {
        if (this.isChecked) {
          return 'radio_button_checked'
        } else {
          return 'radio_button_unchecked'
        }
      }
    },
    methods: {
      change() {
        this.$emit('change');
      }
    }
  }
</script>

<style lang="scss">
  .csm-radio {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    padding: $padding $padding/2*3;
    border: solid 1px transparent;
    &:hover {
      border: solid 1px $border-base-color;
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
      margin-right: 8px;
    }
  }
</style>

<docs>
  ## Компонент csm-checkbox

  ### Чекбокс

  ### Примеры:
  ```jsp
  <label class='csm-radio'>
    <input
            type="radio"
            :checked="true"
            @change="change"
            :value="true"
    >Label
  </label>
  <style>
    .csm-radio:before {
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
