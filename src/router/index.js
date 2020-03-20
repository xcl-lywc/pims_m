import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'

import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import projectIndex from '@/views/project/Index.vue'
import projectList from '@/views/project/projectList.vue'
import projectDetail from '@/views/project/projectDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
		{
			path: '/',
			// name: 'Dashboard',
			component: projectIndex,
			meta: {
				showNav: true,
			},
			children:[
				{
					path: '',
					name: 'Dashboard',
					component: Dashboard,
					redirect: '',
					meta: {
						showNav: true,
					},
				},
				{
					path: '/list/:id',
					name: 'projectList',
					component: projectList,
					redirect: '',
					meta: {
						showNav: true,
					}
				},
				{
					path: '/detail/:id',
					name: 'projectDetail',
					component: projectDetail,
					redirect: '',
					meta: {
						showNav: true,
					}
				},
			]
		},
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
			meta: {
				showNav: false,
			}
    },
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				showNav: false,
			}
		},
		
  ]
})
