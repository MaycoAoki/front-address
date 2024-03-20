import { createWebHistory, createRouter } from "vue-router";

const routes =  [
    {
        path: "/",
        alias: "/address",
        name: "address",
        component: () => import("./components/address/Address.vue")
    },
    {
        path: "/address-edit/:id",
        name: "address-edit",
        component: () => import("./components/address/AddressEdit.vue")
    },
    {
        path: "/students",
        alias: "/students",
        name: "students",
        component: () => import("./components/student/StudentList.vue")
    },
    {
        path: "/student/:id",
        name: "student-details",
        component: () => import("./components/student/Student.vue")
    },
    {
        path: "/add",
        name: "add",
        component: () => import("./components/student/AddStudent.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;