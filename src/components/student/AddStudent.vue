<script>
import StudentDataService from "../../services/StudentDataService"

export default {
  name: "add",
  data() {
    return {
      cep: "",
      endereco: null,
      student: {
        id: null,
        name: "",
        last_name: "",
        code: ""
      },
      submitted: false
    };
  },
  methods: {
    saveStudent() {
      const data = {
        student: {
          name: this.student.name,
          last_name: this.student.last_name,
          code: this.student.code
        },
        address: {
          cep: this.endereco.cep,
          logradouro: this.endereco.logradouro,
          complemento: this.endereco.complemento,
          bairro: this.endereco.bairro,
          localidade: this.endereco.localidade,
          uf: this.endereco.uf,
        }
      };

      StudentDataService.create(data)
          .then(response => {
            this.student.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
    },

    getZipCode() {
      StudentDataService.getZipCode(this.cep)
          .then(response => {
            this.endereco = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    newStudent() {
      this.submitted = false;
      this.student = {};
    }
  }
};
</script>

<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Nome</label>
        <input
            type="text"
            class="form-control"
            id="name"
            required
            v-model="student.name"
            name="name"
        />
      </div>

      <div class="form-group">
        <label for="last_name">Sobrenome</label>
        <input
            class="form-control"
            id="last_name"
            required
            v-model="student.last_name"
            name="last_name"
        />
      </div>

      <div class="form-group">
        <label for="code">Matricula</label>
        <input
            class="form-control"
            id="code"
            required
            v-model="student.code"
            name="code"
        />
      </div>

      <div class="form-group">
        <label for="cep">Cep</label>
        <input type="text" id="cep" v-model="cep" required>
        <button @click="getZipCode" class="btn btn-success">Buscar Endereço</button>
      </div>


      <div v-if="endereco">
        <h3>Endereço Encontrado:</h3>
        <p><strong>Nome:</strong> {{ nome }}</p>
        <p><strong>CEP:</strong> {{ endereco.cep }}</p>
        <p><strong>Logradouro:</strong> {{ endereco.logradouro }}</p>
        <p><strong>Bairro:</strong> {{ endereco.bairro }}</p>
        <p><strong>Cidade:</strong> {{ endereco.localidade }}</p>
        <p><strong>Estado:</strong> {{ endereco.uf }}</p>
      </div>


      <button @click="saveStudent" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newStudent">Add</button>
    </div>
  </div>

</template>

<style scoped>

</style>