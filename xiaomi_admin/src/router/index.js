import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


export default new Router({
    routes: [
        //修改默认地址路由
        {
            path: '/',
            redirect: '/dashboard'
        },
        //默认路由及子路由
        {
            path: '/',
            component: () => import('../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import('../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                // {
                //     path: '/user_table',
                //     component: () => import('../components/page/UserTable.vue'),
                //     meta: { title: '用户表' }
                // },
                // {
                //     path: '/order_table',
                //     component: () => import('../components/page/OrderTable.vue'),
                //     meta: { title: '订单表' }
                // },
                // {
                //     path: '/goods_table',
                //     component: () => import('../components/page/GoodsTable.vue'),
                //     meta: { title: '商品表' }
                // },
                // {
                //     path: '/classify_table',
                //     component: () => import('../components/page/ClassifyTable.vue'),
                //     meta: { title: '商品类别表' }
                // },
                // {
                //     path: '/goodsform',
                //     component: () => import('../components/page/GoodsForm.vue'),
                //     meta: { title: '商品添加' }
                // },
                // {
                //     path: '/classifyform',
                //     component: () => import('../components/page/ClassifyForm.vue'),
                //     meta: { title: '商品类别添加' }
                // },
                // {
                //     path: '/charts',
                //     component: () => import('../components/page/BaseCharts.vue'),
                //     meta: { title: 'schart图表' }
                // },
                {
                    path: '/functionA',
                    component: () => import('../components/weChat/functionA.vue'),
                    meta: { title: '功能A' }
                },
                {
                    path: '/functionB',
                    component: () => import('../components/page/OrderTable.vue'),
                    meta: { title: '功能B' }
                },
                {
                    path: '/functionC',
                    component: () => import('../components/page/ClassifyTable.vue'),
                    meta: { title: '功能C' }
                },
                {
                    path: '/functionD',
                    component: () => import('../components/page/GoodsForm.vue'),
                    meta: { title: '功能D' }
                },
                {
                    path: '/functionE',
                    component: () => import('../components/page/ClassifyForm.vue'),
                    meta: { title: '功能E' }
                },
                {
                    path: '/functionF',
                    component: () => import('../components/page/weChat.vue'),
                    meta: { title: '功能F' }
                },
                // {
                //     path: '/*',
                //     component: () => import('../components/page/404.vue'),
                //     meta: { title: '404' }
                // }
            ]
        },
        {
            path: '/login',
            component: () => import('../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
