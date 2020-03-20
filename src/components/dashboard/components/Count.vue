<template>
  <div class="fr">
    {{ number }}
  </div>
</template>

<script>
  export default {
    data () {
      return {
        number: 0
      }
    },
    props: {
      state: {
        type: String,
      },
      userId: {
      },
    },
    mounted () {
      this.getTotalNumber()
    },
    methods: {
      getTotalNumber () {
        
        let self = this
        let states
        let config = {
          method: "get",
          url: `${self.common.basePath}/project/count/${this.state}`,
          params: {
//             declareUnit: self.userId,
//             stage: self.state,
//             curStatus: null
          }
        }
        self.axios(config).then((response) => {
          self.number = response.data.data
          self.$emit("finish")
        })
      },
    }
  }
</script>
<style scoped>
  * {
    font-size: 18px;
  }
</style>