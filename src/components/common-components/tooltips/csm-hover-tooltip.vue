<template>
  <div
          class='csm-hover-tooltip'
          :style="{'top': top + 'px', 'right': right + 'px'}"
  >
    <p class="small-text text-align-left bold-text">{{message}}</p>
  </div>
</template>

<script>
  export default {
    name: "csm-hover-tooltip",
    props: {
      message: {
        type: String,
        default: 'Tooltip message'
      },
      top: {
        type: Number,
        default: 10
      },
      right: {
        type: Number,
        default: 0
      },
    }
  }
</script>

<style lang="scss">
  .csm-hover-tooltip {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: $padding*2;
    border-radius: $padding/2;
    background: rgba(29, 44, 52, 1);
    color: #ffffff;
    z-index: 3;
    &:before {
      content: '';
      position: absolute;
      border-right: solid 1px rgba(29, 44, 52, 1);
      border-top: solid 1px rgba(29, 44, 52, 1);
      border-radius: 2px;
      background: rgba(29, 44, 52, 1);
      width: 11px;
      height: 11px;
      z-index: 2;
      top: 40px;
      transform: rotate(-45deg);
    }
    p {
      white-space: nowrap;
    }
  }
</style>
