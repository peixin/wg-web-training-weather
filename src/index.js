import './css/base.scss';
import App from './App';
import Vue from 'vue/dist/vue';
import classNames from 'classnames';
import {getProperty} from "./utils";

Vue.prototype.$classnames = classNames;
Vue.prototype.$getProperty = getProperty;

new Vue({
  el: "#app",
  render: h => h(App),
});
