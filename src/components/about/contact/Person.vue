<template>
  <div class="person">
    <h3 class="mt-3" >法人代表：{{person}}</h3>
  </div>
</template>

<script>
export default {
  name: 'Person',
  data () {
    return {
      person:'花城'
    }
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
