<template>
  <div id="app">
    <GlobalHeader/>
    <GlobalMessage/>
    <router-view/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalMessage from '@/components/GlobalMessage.vue'

export default {
  name: 'App',
  components: {
  // HelloWorld,
    GlobalHeader,
    GlobalMessage
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
}  

main.container {
  border: 1px solid #cccccc;
  margin-top: 4em;
  padding: 2em;
  width: 600px;
} 

</style>
