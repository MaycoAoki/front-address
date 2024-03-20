<script>
import AddressDataService from "@/services/AddressDataService";

export default {
  name: "address-edit",
  data() {
    return {
      currentAddress: null,
      message: ''
    }
  },
  methods: {
    getAddress(id) {
      AddressDataService.getAddress(id).then(response => {
        this.currentAddress = response.data;
        console.log(response.data);
      })
          .catch(e => {
            console.log(e);
          });
    },

    updateAddress() {
      AddressDataService.updateAddress(this.currentAddress.id, this.currentAddress)
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
    this.getAddress(this.$route.params.id)

  }
};


</script>

<template>
  <div v-if="currentAddress">
    <div class="container-fluid">
      <div class="container">
        <div class="mb-3">
          <label for="cep" class="form-label">Example label</label>
          <input type="text" class="form-control" id="cep" v-model="currentAddress.cep" placeholder="CEP">
        </div>
        <div class="mb-3">
          <label for="logradouro" class="form-label">Logradouro</label>
          <input type="text" class="form-control" id="logradouro" v-model="currentAddress.logradouro"
                 placeholder="Logradouro">
        </div>
        <div class="mb-3">
          <label for="complemento" class="form-label">Complemento</label>
          <input type="text" class="form-control" id="complemento" v-model="currentAddress.complemento"
                 placeholder="Complemento">
        </div>
        <div class="mb-3">
          <label for="bairro" class="form-label">Bairro</label>
          <input type="text" class="form-control" id="bairro" v-model="currentAddress.bairro" placeholder="Bairro">
        </div>
        <div class="mb-3">
          <label for="localidade" class="form-label">Localidade</label>
          <input type="text" class="form-control" id="localidade" v-model="currentAddress.localidade"
                 placeholder="Localidade">
        </div>
        <div class="mb-3">
          <label for="uf" class="form-label">Another label</label>
          <input type="text" class="form-control" id="uf" v-model="currentAddress.uf" placeholder="UF">
        </div>

        <button type="button" class="btn btn-warning" @click="updateAddress">Alterar</button>

      </div>

      <p>{{ message }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>