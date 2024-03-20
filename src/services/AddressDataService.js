import http from "../http-common";

class AddressDataService {
    searchPublicPlace(data) {
        return http.post("/zip-code", data);
    }

    getAddress(id) {
        return http.get(`/zip-code/${id}/show`)
    }

    updateAddress(id, data) {
        return http.put(`/zip-code/${id}/update`, data)
    }

    deleteAddress(id){
        return http.delete(`/zip-code/${id}/delete`)
    }

}

export default new AddressDataService();