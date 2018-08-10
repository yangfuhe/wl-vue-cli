import Vue from 'vue'
import Router from 'vue-router'
//访问时才去加载，提高效率
const Hello = () =>
    import ('@/page/Hello');

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Hello',
        component: Hello
    }]
})