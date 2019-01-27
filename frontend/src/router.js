import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from "./views/login.vue"
import SecureComponent from "./views/secure.vue"
import DashboardComponent from "./views/dashboard.vue"
import RetroComponent from "./components/RetroBoard.vue"
import ProfileComponent from "./views/profile.vue"
import TemplatesComponent from "./views/templates.vue"
import ExportComponent from "./views/export.vue"
import Backlog from "./components/Backlog.vue"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/login",
            name: "login",
            component: LoginComponent
        },
        {
            path: "/secure",
            name: "secure",
            component: SecureComponent
        },
        {
            path: '/dashboard',
            name: "dashboard",
            component: DashboardComponent
        },
        {
            path: '/board',
            name: "board",
            component: RetroComponent
        },
        {
            path: '/profile',
            name: "profile",
            component: ProfileComponent
        },
        {
            path: '/templates',
            name: "templates",
            component: TemplatesComponent
        },
        {
            path: '/export',
            name: "export",
            component: ExportComponent
        },
        {
            path: '/backlog',
            component: Backlog,
        }
    ]
})
