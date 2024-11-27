<template>
    <div class="announcement-bar">
      <div class="announcement-text" :style="{ transform: `translateX(${translateX}%)` }">
        <div class="announcement-item" v-for="item in items">{{ item }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [
          "Free delivery from £30 and free returns",
          "Returns extended to 60 days",
          "Life-time Guarantee",
          "Free delivery from £30 and free returns",
          "Returns extended to 60 days",
          "Life-time Guarantee",
          "Free delivery from £30 and free returns",
          "Returns extended to 60 days",
          "Life-time Guarantee",
          "Free delivery from £30 and free returns",
          "Returns extended to 60 days",
          "Life-time Guarantee"
        ],
        translateX: 0,
        intervalId: null,
        width: 0
      };
    },
    mounted() {
      this.width = this.$el.offsetWidth;
      this.intervalId = setInterval(() => {
        this.translateX -= 1;
        if (this.translateX <= -100) {
          this.translateX = 0;
        }
      }, 20);
    },
    beforeDestroy() {
      clearInterval(this.intervalId);
    }
  };
  </script>
  
  <style>
  .announcement-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #f2f2f2;
    padding: 10px;
    display: flex;
    align-items: center;
  }
  
  .announcement-text {
    display: flex;
    white-space: nowrap;
    overflow: hidden;
  }
  
  .announcement-item {
    margin-right: 10px;
  }
  </style>
  