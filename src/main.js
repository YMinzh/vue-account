import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'default-passive-events'
import { List } from 'vant';
import { Dialog } from 'vant';
import { SwipeCell } from 'vant';
import { Button } from 'vant';
import { Cell, CellGroup } from 'vant';

Vue.use(Cell).use(CellGroup);
Vue.use(Button);
Vue.use(SwipeCell);
Vue.use(Dialog);
Vue.use(List);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
