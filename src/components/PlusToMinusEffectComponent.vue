<template>
    <button class="plus-minus-effect">
      <span :class="classStyle" :style="{ transform: isToggled ? 'rotate(90deg)' : '' }"></span>
      <span  :class="classStyle" :style="{ left: isToggled ? '50%' : '25%', right: isToggled ? '50%' : '25%', transform: isToggled ? 'translateY(-50%)' : '' }"></span>
    </button>
  </template>
  
<script>
    export default {
        name: 'PlusToMinusEffectComponent',
        props: {
            isToggled: {
                type: Boolean,
                default: false
            },
            classStyle: {
                type: String,
                default: 'bg-white'
            }
        }
    }
</script>
  
  <style scoped>
  .plus-minus-effect {
    width: 30px;
    height: 30px;
    border: 0;
    font-size: 1.5em;
    position: relative;
  }
  
  .plus-minus-effect span {
    position: absolute;
    transition: 300ms;
    border-radius: 2px;
  }
  
  button span:first-child {
  top: 25%;
  bottom: 25%;
  width: 10%;
  left: 45%;
}

button span:last-child {
  left: 25%;
  right: 25%;
  height: 10%;
  top: 45%;
}
  </style>
  