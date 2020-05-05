<template>
  <b-container>
    <b-table striped hover :items="books" :fields="fields"></b-table>
  </b-container>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      fields: ['title', 'price'],
      books: [
        {
          title: '', 
          price: 0
        }
      ]
    }
  },
  mounted () {
    axios
      .get('http://127.0.0.1:8000/api/v1/books/')
      .then(response => {
        this.books = response.data
        console.log(this.books)
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
  },
}

</script>




