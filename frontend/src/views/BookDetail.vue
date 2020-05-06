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
        <tr>
          <td>{{ books.title }}</td>
          <td>{{ books.price }}</td>
        </tr>
      </tbody>
    </table>
  </b-container>
</template>


<script>
import axios from 'axios';

const params = (new URL(document.location)).searchParams;
const id = params.get('id');

export default {
  data() {
    return {
      books: [{
        ID: '',
        title: '', 
        price: 0,
      }],
    }
  },
  mounted () {
    axios
      .get("http://127.0.0.1:8000/api/v1/books/"+id)
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




