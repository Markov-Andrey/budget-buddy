<template>
    <div id="app">
        <ReceiptProcessorGemini />
    </div>
</template>

<script>
// import ReceiptProcessor from './components/ReceiptProcessor.vue';
import ReceiptProcessorGemini from './components/ReceiptProcessorGemini.vue';

export default {
    name: 'App',
    components: {
        ReceiptProcessorGemini
    }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
