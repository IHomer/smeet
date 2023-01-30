<template>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />

  {{ result }}
</template>

<script lang="ts" set>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<script lang="ts" setup>
import HelloWorld from './components/HelloWorld.vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const { result } = useQuery(gql`
      query getCountry {  
        country(code: "NL") {
          name
          native
          capital
          emoji
          currency
          languages {
            code
            name
          }
        }
      }
    `)
</script>
