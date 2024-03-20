import http from "../http-common";

class StudentDataService {
    getAll() {
        return http.get("/student");
    }

    get(id) {
        return http.get(`/student/${id}/show`);
    }

    create(data) {
        return http.post("/student", data);
    }

    update(id, data) {
        return http.put(`/student/${id}/update`, data);
    }

    deleteStudent(id) {
        return http.delete(`/student/${id}/delete`);
    }

    deleteAll() {
        return http.delete(`/student`);
    }

    findByTitle(name) {
        return http.get(`/student?title=${name}`);
    }

    getZipCode(zip){
        return http.get(`/zip-code?zipCode=${zip}`);
    }
}

export default new StudentDataService();