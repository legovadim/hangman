import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PlayerVsComputer from '@/routeComponents/PlayerVsComputer'
import ComputerVsPlayer from '@/routeComponents/ComputerVSPlayer'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Router)
Vue.use(VueAxios, axios)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/pvc',
      name: 'PlayerVsComputer',
      component: PlayerVsComputer
    },
    {
      path: '/cvp',
      name: 'ComputerVsPlayer',
      component: ComputerVsPlayer
    }
  ]
})
