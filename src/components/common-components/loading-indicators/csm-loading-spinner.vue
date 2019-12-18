<template>
  <div class='csm-loading-spinner'>
    <div class="loading-spinner__wrapper">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "csm-loading-spinner",
  }
</script>

<style lang="scss">
  .loading-spinner__wrapper {
    @include position-fixed;
    z-index: 209;
    display: flex;
    justify-content: center;
    align-items: center;
    &.demo {
      position: relative;
    }
    .loading_spinner {
      @include position-absolute-center;
      z-index: 210;
    }
  }

  .lds-ellipsis {
    display: inline-block;
    position: fixed;
    width: 64px;
    height: 64px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 27px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: $csm-bg-color-success;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 6px;
    animation: lds-ellipsis1 0.6s infinite;
    background: $csm-bg-color-success;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 6px;
    animation: lds-ellipsis2 0.6s infinite;
    background: $csm-bg-color-error;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 26px;
    animation: lds-ellipsis2 0.6s infinite;
    background: $csm-bg-color-warning;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 45px;
    animation: lds-ellipsis3 0.6s infinite;
    background: $csm-link-btn-color;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(19px, 0);
    }
  }
</style>

<docs>
  ## Компонент csm-loading-spinner

  ### Индикатор загрузки при выполнении запросов к API

  ```jsx
  <div class='csm-loading-spinner'>
    <div class="loading-spinner__wrapper demo">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
  ```
</docs>
