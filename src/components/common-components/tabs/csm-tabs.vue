<template>
  <div class='csm-tabs'>
    <div class="tabs">
      <ul class="tabs__wrapper">
        <li
                class="tabs__tab"
                :class="{ 'active' : tab.active }"
                v-for="tab in tabs"
                @click="setActive(tab)"
        >
          {{tab.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "csm-tabs",
    props: {
      tabs: {
        type: Array,
        default() {
          return [``]
        }
      }
    },
    methods: {
      setActive(tab) {
        this.tabs.forEach(el => {
          el.active = el === tab;
        });
        this.$emit('tabClicked');
      }
    }
  }
</script>

<style lang="scss">
  .csm-tabs .tabs__wrapper {
    display: flex;
    list-style: none;
    padding-left: 0;
  }

  .tabs__tab {
    margin: 0 $padding/2;
    padding: $padding/2 $padding;
    border: solid 1px transparent;
    border-radius: 4px;
    font-size: 12px;
    color: #2d2d2d;
    line-height: normal;
    cursor: pointer;
    &:hover {
      border-color: $border-base-color;
    }

    &.active {
      border-color: $csm-bg-color-dark-grey;
      font-weight: bold;
    }
  }
</style>
