<template>
  <b-container>
    <table class="table">
      <thead>
        <tr>
          <th>title</th>
          <th>price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.title }}</td>
          <td>{{ book.price }}</td>
          <td><button v-on:click="detail_open(book.id)">詳細</button></td>
          <td><button v-on:click="delete_book(book.id)">削除</button></td>
        </tr>
      </tbody>
    </table>
    <!-- <b-table striped hover :items="books" id="id" :fields="fields" @row-clicked="detail_open(id)"></b-table> -->
  </b-container>
</template>


<script>
import axios from 'axios';
// import api from '@/services/api'

export default {
  data() {
    return {
      fields: ['title', 'price'],
      books: [{
        id: '',
        title: '', 
        price: 0,
      }],
    }
  },
  methods: {
    detail_open (id) {
      console.log(id);
      document.location.href = "/booklist/detail?id="+id;
    },
    delete_book (id) {
      axios
        .delete("http://127.0.0.1:8000/api/v1/books/"+id,)
        .then(response => {
          const message = '削除しました'
          this.$store.dispatch('message/setInfoMessage', { message: message })
          response.data
        })
        .finally(function() {
          setTimeout(1000);
          document.location.href = "/booklist/";
        })
    },
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




