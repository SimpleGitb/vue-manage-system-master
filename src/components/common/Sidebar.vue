<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-menu',
                        index: 'dashboard',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: '1',
                        title: '资产管理',
                        subs: [
                            {
                                index: 'assets',
                                title: '应用资产',
                                subs:[
                                    {
                                        // index:'assets',
                                        title:'资产编辑'
                                    }
                                ]
                            },
                            {
                                index: 'serve',
                                title: '服务器资产'
                            },
                            {
                                index: 'normal',
                                title: '正常检测'
                            },
                            {
                                index: 'permission',
                                title: '基线检测'
                            },
                            {
                                index: 'assetsRecord',
                                title: '资产梳理'
                            }
                        ]
                    },
                     {
                        icon: 'el-icon-document',
                        index: '2',
                        title: '信息管理',
                        subs: [
                            {
                                index: 'unitlist',
                                title: '单位列表',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-edit-outline',
                        index: '3',
                        title: '用户管理',
                        subs: [
                            {
                                index: 'table',
                                title: '用户列表',
                            }
                        ]
                    },
                    // {
                    //     icon: 'el-icon-date',
                    //     index: '3',
                    //     title: '表单相关',
                    //     subs: [
                    //         {
                    //             index: 'form',
                    //             title: '用户添加'
                    //         },
                    //         {
                    //             index: 'editor',
                    //             title: '富文本编辑器'
                    //         },
                    //         {
                    //             index: 'markdown',
                    //             title: 'markdown编辑器'
                    //         },
                    //         {
                    //             index: 'upload',
                    //             title: '文件上传'
                    //         }
                    //     ]
                    // },
                    {
                        icon: 'el-icon-star-on',
                        index: '4',
                        title: '监控详情',
                        subs:[
                            {
                                index:'monitoring',
                                title:'威胁详情'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '5',
                        title: '系统设置',
                        subs:[
                            {
                                index:'setting',
                                title:'推送配置'
                            },
                            {
                                index:'setting2',
                                title:'策略管理'
                            }
                        ]
                    }
                    // {
                    //     icon: 'el-icon-star-on',
                    //     index: 'charts',
                    //     title: 'schart图表'
                    // },
                    //  {
                    //     icon: 'el-icon-star-on',
                    //     index: 'UnitList',
                    //     title: '单位列表'
                    // },
//                     {
//                         icon: 'el-icon-warning',
//                         index: 'permission',
//                         title: '基线监测'
//                     },
                    // {
                    //     icon: 'el-icon-error',
                    //     index: '404',
                    //     title: '404页面'
                    // }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
