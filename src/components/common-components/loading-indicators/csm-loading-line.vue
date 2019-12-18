<template>
  <div class='csm-loading-line'
       :class="{'loading': isLoading}"
  >
  </div>
</template>

<script>

  export default {
    name: "csm-loading-line",
    data() {
      return {
        isLoading: false
      }
    },
    methods: {
      toggleLoading() {
        this.isLoading = !this.isLoading;
      }
    },
    created() {
      let vm = this;
      setInterval(function () {
        vm.toggleLoading()
      }, 1000)
    }
  }
</script>

<style lang="scss">

  .csm-loading-line {
    position: fixed;
    top: 0;
    margin-left: -2000px;
    width: 100%;
    height: 5px;
    background: #20e2be;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    z-index: 999;
    &.loading {
      margin-left: 2500px;
      transition: margin-left ease 2s;
    }
  }
</style>
