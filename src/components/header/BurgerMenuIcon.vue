<template>
    <button id="buger-menu" class="w-6 p-3" :class="{'open': isMenuOpen}" @click="emitEvent">
        <span></span>
        <span></span>
        <span></span>
    </button>
</template>

<script>
    export default {
        name: 'BurgerMenuIcon',
        data: () => {
            return {
                isMenuOpen: false,
            }
        },
        methods: {
            emitEvent() {
                this.isMenuOpen = ! this.isMenuOpen;
                this.$emit("event", this.isMenuOpen);
            }
        }
    }
</script>

<style>
    #buger-menu {
        position: relative;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: .5s ease-in-out;
        -moz-transition: .5s ease-in-out;
        -o-transition: .5s ease-in-out;
        transition: .5s ease-in-out;
        cursor: pointer;
    }
    
    #buger-menu span {
        display: block;
        position: absolute;
        height: 2px;
        width: 100%;
        background: #000000;
        border-radius: 9px;
        opacity: 1;
        left: 0;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
    }
    
    #buger-menu span:nth-child(1) {
        top: 0px;
    }
    
    #buger-menu span:nth-child(2) {
        top: 8px;
    }
    
    #buger-menu span:nth-child(3) {
        top: 16px;
    }
    
    #buger-menu.open span:nth-child(1) {
        top: 8px;
        -webkit-transform: rotate(135deg);
        -moz-transform: rotate(135deg);
        -o-transform: rotate(135deg);
        transform: rotate(135deg);
    }
    
    #buger-menu.open span:nth-child(2) {
        opacity: 0;
        left: -60px;
    }
    
    #buger-menu.open span:nth-child(3) {
        top: 8px;
        -webkit-transform: rotate(-135deg);
        -moz-transform: rotate(-135deg);
        -o-transform: rotate(-135deg);
        transform: rotate(-135deg);
    }
</style>