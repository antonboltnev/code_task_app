<template>
  <div class="csm-select-wrapper" :style="{'width': width}">
    <div
            class="csm-select"
            :class="className"
            tabindex="0"
    >
      <span class="csm-select__selected-option" @click="toggleDropdown">{{selectedOption}}</span>
      <i
              class="material-icons"
              v-if="isArrowVisible"
              @click="toggleDropdown"
      >
        expand_more
      </i>
      <transition name="csm-select">
        <div
                class="csm-select__option-wrapper"
                v-if="isDropDownVisible"
        >
          <div
                  class="csm-select__option"
                  v-for="option in options"
                  :key="option.id"
                  @click="chooseOption(option)"
          >
            <span>{{option.name}}</span>
          </div>
        </div>
      </transition>
    </div>
    <span class="csm-form-element-label fake_holder">{{label}}</span>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "csm-select",
    props: {
      label: {
        type: String,
        default: ''
      },
      width: {
        type: String,
        default: '100%'
      },
      padding: {
        type: Boolean,
        default: true
      },
      isArrowVisible: {
        type: Boolean,
        default: true
      },
      options: {
        type: Array,
        default() {
          return []
        }
      },
      selectedOption: '',
      dropDownVisibility: {
        type: Boolean,
        default: false
      },
      bordered: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isDropDownVisible: this.dropDownVisibility,
      }
    },
    computed: {
      className() {
        return {
          'bordered': this.bordered,
          'has-content': this.selectedOption,
          'no-padding': !this.padding
        }
      }
    },
    methods: {
      toggleDropdown() {
        this.isDropDownVisible = true;
      },
      hideOptions() {
        if (this.isDropDownVisible) {
          this.$emit('clickOutSide');
          this.isDropDownVisible = false;
        }
      },
      chooseOption(selectedOption) {
        this.$emit('selectOption', selectedOption);
        this.hideOptions();
      },
    },
    watch: {
      dropDownVisibility() {
        this.isDropDownVisible = this.dropDownVisibility;
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
  .csm-select-wrapper {
    position: relative;
    &.demo {
      width: 200px;
      & .csm-select__option-wrapper {
        width: 200px;
      }
    }
  }

  .csm-select {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    padding: $padding 0;
    position: relative;

    &__selected-option {
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow-x: hidden;
    }

    &__option-wrapper {
      position: absolute;
      right: 0;
      z-index: 2;
      background: #ffffff;
      text-align: left;
      max-width: 310px;
      max-height: 270px;
      overflow-y: auto;
      width: max-content;
      box-shadow: 2px 2px 25px 0 rgba(0, 0, 0, 0.15);
    }

    &__option {
      padding: $padding;
      cursor: pointer;
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

    &__option:hover {
      background: $csm-main-bg-color;
    }

    &.bordered {
      border-bottom: solid 1px $border-base-color;
    }

    &.no-padding {
      padding: 0;
    }
  }
</style>

<docs>
  ## Компонент csm-select

  ### Выпадающий список (select)

  ### Примеры:
  ```jsx
  <csm-select
          class="demo"
          :bordered="true"
          label="Выберите"
          :options="selectOptions"
          :selectedOption="selectOptions[0].name"
  />
  ```
</docs>
