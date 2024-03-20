<script>
import StudentDataService from "../../services/StudentDataService"

export default {
  name: "students-list",
  data() {
    return {
      students: [],
      currentStudent: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveStudents() {
      StudentDataService.getAll().then(response => {
        this.students = response.data;
        console.log(response.data);
      })
          .catch(e => {
            console.log(e);
          });
    },
    refreshList() {
      this.retrieveStudents();
      this.currentStudent = null;
      this.currentIndex = -1;
    },

    deleteStudent(id) {
      StudentDataService.deleteStudent(id)
          .then(response => {
            console.log(response.data);
           this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.retrieveStudents();
  }

}
</script>

<template>
  <table class="table">
    <thead class="table-dark">
    <tr>
      <th>Nome</th>
      <th>Sobrenome</th>
      <th>Matricula</th>
      <th></th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="student in students" :key="student.id">
      <td>{{ student.name }}</td>
      <td>{{ student.last_name }}</td>
      <td>{{ student.code }}</td>
      <td>
        <router-link :to="'/student/' + student.id" class="badge badge-warning">Edit</router-link>
      </td>
      <td>
        <button class="button button3" @click="deleteStudent(student.id)">
          Deletar
        </button>
      </td>
    </tr>
    </tbody>
  </table>

</template>

<style scoped>

</style>