import './assets/css/public.css';
import './assets/css/index.css';

import 'flexslider';

import './modjs/public.js';
import './modjs/nav.js';

import {
	createApp
} from 'vue';
import Index from './index/index.vue';

createApp(Index).mount('#app');