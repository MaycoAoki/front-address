<script>
import StudentDataService from "../../services/StudentDataService"

export default {
  name: 'student',
  data() {
    return {
      currentStudent: null,
      currentAddress: null,
      message: ''
    };
  },
  methods: {
    getStudent(id) {
      StudentDataService.get(id)
          .then(response => {
            this.currentStudent = response.data[0] ?? response.data;
            this.currentAddress = this.currentStudent.address ?? ""
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    updateStudent() {
      const data = {
        student: {
          id: this.currentStudent.id,
          name: this.currentStudent.name,
          last_name: this.currentStudent.last_name,
          code: this.currentStudent.code
        },
        address: this.currentAddress
      }
      StudentDataService.update(this.currentStudent.id, data)
          .then(response => {
            console.log(response.data);
            this.message = 'The tutorial was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.message = '';
    this.getStudent(this.$route.params.id);
  }
};
</script>

<template>
  <div v-if="currentStudent" class="edit-form">
    <h4>Aluno</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
               v-model="currentStudent.name"
        />
      </div>
      <div class="form-group">
        <label for="last_name">Sobrenome</label>
        <input type="text" class="form-control" id="last_name"
               v-model="currentStudent.last_name"
        />
      </div>
      <div class="form-group">
        <label for="code">Matricula</label>
        <input type="text" class="form-control" id="code"
               v-model="currentStudent.code"
        />
      </div>
      <div v-if="currentAddress">
        <div class="form-group">
          <label for="cep">Cep</label>
          <input type="text" class="form-control" id="cep"
                 v-model="currentAddress.cep"
          />
        </div>
        <div class="form-group">
          <label for="logradouro">Logradouro</label>
          <input type="text" class="form-control" id="logradouro"
                 v-model="currentAddress.logradouro"
          />
        </div>
        <div class="form-group">
          <label for="complemento">Complemento</label>
          <input type="text" class="form-control" id="complemento"
                 v-model="currentAddress.complemento"
          />
        </div>
        <div class="form-group">
          <label for="bairro">Bairro</label>
          <input type="text" class="form-control" id="bairro"
                 v-model="currentAddress.bairro"
          />
        </div>
        <div class="form-group">
          <label for="localidade">Name</label>
          <input type="text" class="form-control" id="localidade"
                 v-model="currentAddress.localidade"
          />
        </div>
        <div class="form-group">
          <label for="uf">Uf</label>
          <input type="text" class="form-control" id="uf"
                 v-model="currentAddress.uf"
          />
        </div>
      </div>

    </form>

    <button type="submit" class="badge badge-success" @click="updateStudent">
      Update
    </button>

    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br/>
    <p>Please click on a Student...</p>
  </div>
</template>

<style scoped>

</style>