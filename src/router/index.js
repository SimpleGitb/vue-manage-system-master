import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/User.vue'], resolve),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/unitlist',
                    component: resolve => require(['../components/page/UnitList.vue'], resolve),
                    meta: { title: '单位列表' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/AddUser.vue'], resolve),
                    meta: { title: '用户添加' },
                    name:'form'
                },
                {
                    path: '/assets',
                    component: resolve => require(['../components/page/ApplicationAssets.vue'], resolve),
                    meta: { title: '应用资产' },
                    name:'assets'
                },                
                {
                    path: '/serve',
                    component: resolve => require(['../components/page/ServerAssets.vue'], resolve),
                    meta: { title: '服务器资产' },
                    name:'serve'
                },
				
                {
                    path: '/addUnit',
                    component: resolve => require(['../components/page/AddUnit.vue'], resolve),
                    meta: { title: '添加单位' },
                    name:'addUnit'
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 权限页面
                    path: '/normal',
                    component: resolve => require(['../components/page/NormalObserver.vue'], resolve),
                    meta: { title: '正常监测', permission: true }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/BaselineObserver.vue'], resolve),
                    meta: { title: '基线监测', permission: true }
                },
                {
                    path: '/monitoring',
                    component: resolve => require(['../components/page/Threatview.vue'], resolve),
                    meta: { title: '威胁详情', permission: true }
                },
                {
                    path: '/addAssets',
                    component: resolve => require(['../components/page/AddAssets.vue'], resolve),
                    meta: { title: '添加资产', permission: true },
                    name:'addAssets'
                },
                {
                    path: '/setting2',
                    component: resolve => require(['../components/page/StrategicManage.vue'], resolve),
                    meta: { title: '策略管理', permission: true },
                    name:'setting2'
                },
                {
                    path: '/addManage',
                    component: resolve => require(['../components/page/AddManage.vue'], resolve),
                    meta: { title: '添加策略', permission: true },
                    name:'addManage'
                },
                {
                    path: '/assetsPopup',
                    component: resolve => require(['../components/page/AssetsPopup.vue'], resolve),
                    meta: { title: '资产梳理', permission: true },
                    name:'assetsPopup'
                },
                {
                    path: '/assetsResult',
                    component: resolve => require(['../components/page/AssetsResult.vue'], resolve),
                    meta: { title: '资产梳理', permission: true },
                    name:'assetsResult'
                },
                {
                    path: '/assetsRecord',
                    component: resolve => require(['../components/page/AssetsRecord.vue'], resolve),
                    meta: { title: '消息通知', permission: true },
                    name:'assetsRecord'
                },
                {
                    path: '/test',
                    component: resolve => require(['../components/page/test.vue'], resolve),
                    meta: { title: '测试', permission: true },
                    name:'test'
                },
                {
                    path: '/test1',
                    component: resolve => require(['../components/page/test1.vue'], resolve),
                    meta: { title: '测试', permission: true },
                    name:'test'
                }
                
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
