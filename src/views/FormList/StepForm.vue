<template>
  <div>StepForm</div>
</template>

<script>
import {getCurrentInstance } from 'vue'
export default {
    setup(){
      const  inter = getCurrentInstance()
      console.log(inter)
        
    }
}
</script>

<style>

</style>