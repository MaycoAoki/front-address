<script>
import AddressDataService from '../../services/AddressDataService'
import addressDataService from "../../services/AddressDataService";

export default {
  name: "address",
  data() {
    return {
      op: 'logradouro',
      clear: null,
      cep: "",
      uf: "",
      localidade: "",
      logradouro: "",
      selectedUF: '',
      addresses: null,
      ufs: [
        {sigla: 'AC', nome: 'Acre'},
        {sigla: 'AL', nome: 'Alagoas'},
        {sigla: 'AP', nome: 'Amapá'},
        {sigla: 'AM', nome: 'Amazonas'},
        {sigla: 'BA', nome: 'Bahia'},
        {sigla: 'CE', nome: 'Ceará'},
        {sigla: 'DF', nome: 'Distrito Federal'},
        {sigla: 'ES', nome: 'Espírito Santo'},
        {sigla: 'GO', nome: 'Goiás'},
        {sigla: 'MA', nome: 'Maranhão'},
        {sigla: 'MT', nome: 'Mato Grosso'},
        {sigla: 'MS', nome: 'Mato Grosso do Sul'},
        {sigla: 'MG', nome: 'Minas Gerais'},
        {sigla: 'PA', nome: 'Pará'},
        {sigla: 'PB', nome: 'Paraíba'},
        {sigla: 'PR', nome: 'Paraná'},
        {sigla: 'PE', nome: 'Pernambuco'},
        {sigla: 'PI', nome: 'Piauí'},
        {sigla: 'RJ', nome: 'Rio de Janeiro'},
        {sigla: 'RN', nome: 'Rio Grande do Norte'},
        {sigla: 'RS', nome: 'Rio Grande do Sul'},
        {sigla: 'RO', nome: 'Rondônia'},
        {sigla: 'RR', nome: 'Roraima'},
        {sigla: 'SC', nome: 'Santa Catarina'},
        {sigla: 'SP', nome: 'São Paulo'},
        {sigla: 'SE', nome: 'Sergipe'},
        {sigla: 'TO', nome: 'Tocantins'}
      ]
    }
  },
  methods: {

    filterZipCode() {
      const data = {
        cep: this.cep
      }
      AddressDataService.searchPublicPlace(data)
          .then(response => {
            this.addresses = response.data
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    filterPublicPlace() {
      const data = {
        localidade: this.localidade,
        logradouro: this.logradouro,
        uf: this.selectedUF,
      }
      AddressDataService.searchPublicPlace(data)
          .then(response => {
            this.addresses = response.data
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    formatCep() {
      // Remove caracteres não numéricos
      this.cep = this.cep.replace(/\D/g, '');

      // Aplica a máscara
      if (this.cep.length > 5) {
        this.cep = this.cep.replace(/^(\d{5})(\d{0,2})/, '$1-$2');
      }
    },
    DeleteAddress(id) {
      addressDataService.deleteAddress(id)
          .then(response => {
            this.addresses = response.data
            console.log(response.data);

          })
          .catch(e => {
            console.log(e);
          });
    },

    cleanFilter() {
      this.cep = "";
      this.uf = "";
      this.localidade = "";
      this.logradouro = "";
      this.selectedUF = '';
      this.addresses = null
    }

  }
}
</script>

<template>

  <div class="container m-2">
    <div class="row">
      <div class="col" v-if="op === 'logradouro'">
        <div class="row">
          <div class="col">
            <select class="form-control" v-model="selectedUF">
              <option value="">Selecione...</option>
              <option v-for="(uf, index) in ufs" :key="index" :value="uf.sigla">{{ uf.nome }}</option>
            </select>
          </div>
          <div class="col">
            <input type="text" id="logradouro" class="form-control" v-model="logradouro" placeholder="Logradouro"
                   aria-label="Logradouro">
          </div>
          <div class="col">
            <input type="text" id="localidade" class="form-control" v-model="localidade" placeholder="Cidade"
                   aria-label="Cidade">
          </div>
          <div class="col">
            <button @click="filterPublicPlace" class="btn btn-primary mb-3">Buscar</button>
            <button @click="cleanFilter" class="btn btn-secondary mb-3">Limpar</button>
          </div>
        </div>
      </div>

      <div class="col" v-if="op === 'cep'">
        <div class="row g-3 align-items-center">
          <div class="col-auto">
            <label for="cep" class="col-form-label">CEP</label>
          </div>
          <div class="col-auto">
            <input type="text" id="cep" class="form-control" v-model="cep" @input="formatCep" aria-describedby="CEP">
          </div>
          <div class="col-auto">
            <span id="cep" class="form-text">
          <button @click="filterZipCode" class="btn btn-primary">Buscar</button>
          <button @click="cleanFilter" class="btn btn-secondary">Limpar</button>
        </span>
          </div>
        </div>
      </div>

      <div class="col-3">
        <select class="form-control" aria-label="Default select example" v-model="op">
          <option selected>Filtrar por</option>
          <option value="cep">Cep</option>
          <option value="logradouro">Logradouro</option>
        </select>
      </div>
    </div>

    <div v-if="addresses" class="container mt-5">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">CEP</th>
          <th scope="col">Logradouro</th>
          <th scope="col">Complemento</th>
          <th scope="col">Bairro</th>
          <th scope="col">Localidade</th>
          <th scope="col">UF</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="address in addresses" :key="address.id" @click="ShowAddress">
          <td>{{ address.cep }}</td>
          <td>{{ address.logradouro }}</td>
          <td>{{ address.complemento }}</td>
          <td>{{ address.bairro }}</td>
          <td>{{ address.localidade }}</td>
          <td>{{ address.uf }}</td>
          <td>
            <router-link :to="'/address-edit/' + address.id" class="btn btn-warning">Editar</router-link>
          </td>
          <td>
            <button type="button" class="btn btn-danger" @click="DeleteAddress(address.id)">Deletar</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>


<style scoped>

</style>