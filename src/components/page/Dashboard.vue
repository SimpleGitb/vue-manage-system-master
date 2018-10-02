<template>
<div>
    <div class="content-tab">
        <div class="statisticalt">
            <ul class="count-list">
                <li class="list-item">
                    <div class="item-top">
                        <span>{{ toauditData.site_count | NumFormat }}</span>
                        <div class="item-box">
                            <div class="item-bg">
                                <div class="item-bg-box">
                                    <img src="../../../static/img/home/total_t.png" class="itembg-t">
                                    <img src="../../../static/img/home/total_b.png" class="itembg-b">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item-bottom">
                        <span>总站点个数</span>
                    </div>
                </li>
                <li class="list-item">
                    <div class="item-top">
                        <span>{{toauditData.monitor_today | NumFormat}}</span>
                        <div class="item-box">
                            <div class="item-bg">
                                <div class="item-bg-box">
                                    <img src="../../../static/img/home/total1_t.png" class="itembg-t">
                                    <img src="../../../static/img/home/total1_b.png" class="itembg-b">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item-bottom">
                        <span>总监测次数</span>
                    </div>
                </li>
                <li class="list-item">
                    <div class="item-top">
                        <span>{{ toauditData.confirm_today | NumFormat }}</span>
                        <div class="item-box">
                            <div class="item-bg">
                                <div class="item-bg-box">
                                    <img src="../../../static/img/home/total2_t.png" class="itembg-t">
                                    <img src="../../../static/img/home/total2_b.png" class="itembg-b">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item-bottom">
                        <span>今日确认威胁</span>
                    </div>
                </li>
                <li class="list-item">
                    <div class="item-top">
                        <span>{{ toauditData.threat_count | NumFormat}}</span>
                        <div class="item-box">
                            <div class="item-bg">
                                <div class="item-bg-box">
                                    <img src="../../../static/img/home/total3_t.png" class="itembg-t">
                                    <img src="../../../static/img/home/total3_b.png" class="itembg-b">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item-bottom">
                        <span>历史威胁事件</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="toaudit">
            <el-container>
                <el-header class="header">
                    <p class="header_title">数据统计</p>
                    <div class="header_btn">
                        <ul class="btn-list">
                            <li :class="{'list-item':listItem,'active':index == 1}" v-for="(index,item) in Math.ceil(tabdata.length/4)" :key="item.count"
                                @mouseover="swiper(index,$event,0)"></li>
                        </ul>
                    </div>
                </el-header>
                <el-main>
                    <div class="toaudit-box" :style="{left:toauditLeft}">
                        <div class="toaudit-content">
                            <ul class="content-list">
                                <li class="list-item">
                                    <div class="item-content">
                                        <span class="item-count">{{toauditData.confirm_count}}</span>
                                        <p class="item-msg">总确认威胁</p>
                                    </div>
                                </li>
                                <li class="list-item">
                                    <div class="item-content">
                                        <span class="item-count">{{toauditData.deal_wait}}</span>
                                        <p class="item-msg">总待处置威胁(站点数)</p>
                                    </div>
                                </li>
                                <li class="list-item">
                                    <div class="item-content">
                                        <span class="item-count">{{toauditData.threat_today}}</span>
                                        <p class="item-msg">今日故障站点</p>
                                    </div>
                                </li>
                                <li class="list-item">
                                    <div class="item-content">
                                        <span class="item-count">{{toauditData.site_stop}}</span>
                                        <p class="item-msg">已暂停网站 </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="toaudit-content">
                            <ul class="content-list">
                                <li class="list-item">
                                    <div class="item-content contentpage">
                                        <span class="item-count">{{toauditData.site_audit}}</span>
                                        <p class="item-msg">待审核网站</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </div>
        <div class="application toaudit">
            <el-container>
                <el-header class="header">
                    <p class="header_title">应用分布</p>
                    <div class="header_btn">
                        <ul class="btn-list">
                            <li :class="{'list-item':listItem,'active':item == 0}" v-for="(index1,item) in distribution" :key="item.id" @mouseover="swiper(item,$event,1)"></li>
                        </ul>
                    </div>
                </el-header>
                <div class="toaudit-box" style="left:0%">
                    <el-main class="app_content" style="overflow:hidden;">
                        <div id="Accounted" :style="{width: '380px', height: '250px'}"></div>
                    </el-main>
                    <el-main class="app_content" style="overflow:hidden;">
                        <div id="Accounted1" :style="{width: '370px', height: '300px'}"></div>
                    </el-main>
                    <el-main class="app_content" style="overflow:hidden;">
                        <div id="Accounted2" :style="{width: '370px', height: '300px'}"></div>
                    </el-main>
                    <el-main class="app_content" style="overflow:hidden;">
                        <div id="Accounted3" :style="{width: '370px', height: '300px'}"></div>
                    </el-main>
                    <el-main class="app_content" style="overflow:hidden;">
                        <div id="Accounted4" :style="{width: '370px', height: '300px'}"></div>
                    </el-main>
                </div>
            </el-container>
        </div>
        <div class="website-statistical toaudit">
            <el-container>
                <el-header class="header">
                    <p class="header_title">数据统计</p>
                    <div class="header_btn">
                        <ul class="btn-list">
                            <li :class="{'list-item':listItem,'active':item == 0}" v-for="(index, item) in statisticalData" :key="item.id" @mouseover="swiper(item,$event,2)"></li>
                        </ul>
                    </div>
                </el-header>
                <div class="toaudit-box" style="left:0%">
                    <el-main>
                        <div class="toaudit-content">
                            <div id="webSite-statistical" :style="{width: '100%', height: '840px'}"></div>
                        </div>
                    </el-main>
                    <el-main>
                        <div class="toaudit-content">
                            <div id="webSiteCms" :style="{width: '100%', height: '840px'}"></div>
                        </div>
                    </el-main>
                </div>
            </el-container>
        </div>
        <div class="distribution toaudit">
            <el-container>
                <el-header class="header">
                    <p class="header_title">威胁趋势</p>
                    <div class="header_btn">
                        <ul class="btn-list">
                            <li :class="{'list-item':listItem,'active':active2 = index !== 1}" v-for="(item,index) in switchData" :key="item.key" @mouseover="swiper(index,$event,3)"></li>
                        </ul>
                    </div>
                </el-header>
                <el-main>
                    <div class="toaudit-box" style="left:0%;">
                        <div class="toaudit-content">
                            <div id="broken" style="width:920px;height:500px;margin-left:50px"></div>
                        </div>
                        <div class="toaudit-content">
                            <ve-line :data="chartData" ref="chart4" style="width:920px;height:500px;margin-left:50px"></ve-line>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </div>
        <div class="clear"></div>
    </div>
</div>
</template>
<script>
    import Vue from 'vue'
    import echarts from 'echarts'
    import line from 'v-charts/lib/line.common';
    import {
        CodeToText
    } from 'element-china-area-data';
    Vue.component(line.name, line);


    export default {
        name: 'dashboard',
        data() {
            return {
                toauditData: {
                    site_count: '0',
                    monitor_today: '0',
                    confirm_today: '0',
                    threat_count: '0',
                    confirm_count: '0',
                    deal_wait: '0',
                    threat_today: '0',
                    site_stop: '0',
                    site_audit: '0'
                },
                distribution: [{
                        id: 1,
                        name: 'asdada',
                        age: '180',
                        sex: 'nan'
                    },
                    {
                        id: 2,
                        name: 'asdada',
                        age: '180',
                        sex: 'nan'
                    },
                    {
                        id: 3,
                        name: 'asdada',
                        age: '180',
                        sex: 'nan'
                    },
                    {
                        id: 4,
                        name: 'asdada',
                        age: '180',
                        sex: 'nan'
                    },
                    {
                        id: 5,
                        name: 'asdada',
                        age: '180',
                        sex: 'nan'
                    }
                ],
                statisticalData: [{
                        id: 1,
                        name: 'asdada',
                        age: '180',
                        sex: 'nan'
                    },
                    {
                        id: 2,
                        name: 'asdada',
                        age: '180',
                        sex: 'nan'
                    }
                ],
                active: false,
                active2: false,
                header_title: '站点地图分布',
                index: 0,
                activeName: 1,
                chartData: {
                    type: 'line',
                    columns: ['时间', '确认', '处置'],
                    rows: [{
                            '时间': '2018-06-1',
                            '确认': 1393,
                            '处置': 1093
                        },
                        {
                            '时间': '2018-06-02',
                            '确认': 3530,
                            '处置': 3230
                        },
                        {
                            '时间': '2018-06-03',
                            '确认': 2923,
                            '处置': 2623
                        },
                        {
                            '时间': '2018-06-04',
                            '确认': 1123,
                            '处置': 4552
                        },
                        {
                            '时间': '2018-06-05',
                            '确认': 1723,
                            '处置': 1233
                        },
                        {
                            '时间': '2018-06-06',
                            '确认': 123,
                            '处置': 3223
                        },
                        {
                            '时间': '2018-06-07',
                            '确认': 3253,
                            '处置': 1234
                        },
                        {
                            '时间': '2018-06-08',
                            '确认': 6565,
                            '处置': 3213
                        },
                        {
                            '时间': '2018-06-09',
                            '确认': 1232,
                            '处置': 3454
                        },
                        {
                            '时间': '2018-06-10',
                            '确认': 876,
                            '处置': 5464
                        },
                        {
                            '时间': '2018-06-11',
                            '确认': 4353,
                            '处置': 345
                        },
                        {
                            '时间': '2018-06-12',
                            '确认': 1723,
                            '处置': 2342
                        },
                        {
                            '时间': '2018-06-13',
                            '确认': 2543,
                            '处置': 1231
                        },
                        {
                            '时间': '2018-06-14',
                            '确认': 3209,
                            '处置': 7652
                        },
                        {
                            '时间': '2018-06-15',
                            '确认': 6534,
                            '处置': 8233
                        },
                        {
                            '时间': '2018-06-16',
                            '确认': 4543,
                            '处置': 1321
                        },
                        {
                            '时间': '2018-06-17',
                            '确认': 1723,
                            '处置': 1423
                        },
                        {
                            '时间': '2018-06-18',
                            '确认': 1232,
                            '处置': 2423
                        },
                        {
                            '时间': '2018-06-19',
                            '确认': 5323,
                            '处置': 3143
                        },
                        {
                            '时间': '2018-06-20',
                            '确认': 7652,
                            '处置': 1211
                        },
                        {
                            '时间': '2018-06-21',
                            '确认': 2342,
                            '处置': 2212
                        },
                        {
                            '时间': '2018-06-22',
                            '确认': 5343,
                            '处置': 5321
                        },
                        {
                            '时间': '2018-06-23',
                            '确认': 1324,
                            '处置': 3222
                        },
                        {
                            '时间': '2018-06-24',
                            '确认': 6234,
                            '处置': 4234
                        },
                        {
                            '时间': '2018-06-25',
                            '确认': 2356,
                            '处置': 6544
                        },
                        {
                            '时间': '2018-06-26',
                            '确认': 5623,
                            '处置': 2343
                        },
                        {
                            '时间': '2018-06-27',
                            '确认': 2461,
                            '处置': 2344
                        },
                        {
                            '时间': '2018-06-28',
                            '确认': 2156,
                            '处置': 2344
                        },
                        {
                            '时间': '2018-06-29',
                            '确认': 1324,
                            '处置': 2343
                        },
                        {
                            '时间': '2018-06-30',
                            '确认': 4324,
                            '处置': 5342
                        },
                        {
                            '时间': '2018-07-01',
                            '确认': 3324,
                            '处置': 6543
                        },
                        {
                            '时间': '2018-07-02',
                            '确认': 2123,
                            '处置': 1233
                        },
                        {
                            '时间': '2018-07-03',
                            '确认': 2156,
                            '处置': 3453
                        },
                        {
                            '时间': '2018-07-04',
                            '确认': 6542,
                            '处置': 1414
                        }
                    ]
                },
                toauditLeft: 0,
                tabdata: [{
                        count: 66
                    },
                    {
                        count: 99
                    },
                    {
                        count: 10
                    },
                    {
                        count: 78
                    },
                    {
                        count: 65
                    }
                ],
                switchData: [{
                        'name': '1122',
                        'key': 'asdsada'
                    },
                    {
                        'name': '1133',
                        'key': 'dvdsver'
                    },
                ],
                listItem: true,
            }
            // name: localStorage.getItem('ms_username'),
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        methods: {
            drawLine() {
                var names = [];
                this.$axios.get('http://monitor.yunsee.vuln.cn/count/pieChart?type=server').then((res) => {
                    let data = res.data.data;
                    for (var key in data) {
                        names.push({
                            name: key,
                            value: data[key]
                        })
                    };
                    let Accounted = echarts.init(document.getElementById('Accounted'));
                    Accounted.hideLoading();
                    // 绘制图表
                    Accounted.setOption({
                        title: {
                            text: 'web容器占比',
                            x: 'center',
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: 14,
                                color: '#666'
                            }
                        },
                        series: [{

                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '62%'],
                            data: names,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                    });
                })
            },
            drawLine1() {
                var names = [];
                this.$axios.get('http://monitor.yunsee.vuln.cn/count/pieChart?type=os').then((res) => {
                    let data = res.data.data;
                    for (var key in data) {
                        names.push({
                            name: key,
                            value: data[key]
                        })
                    };
                    // 基于准备好的dom，初始化echarts实例
                    let Accounted = echarts.init(document.getElementById('Accounted1'));
                    Accounted.hideLoading();
                    // 绘制图表
                    Accounted.setOption({
                        title: {
                            text: '操作系统占比',
                            x: 'center',
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: 14,
                                color: '#666'
                            }
                        },
                        series: [{

                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: names,
                            grid: {
                                left: '3%',
                                right: '4%',
                                containLabel: true
                            },
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                    });
                })
            },
            drawLine2() {
                var names = [];
                this.$axios.get('http://monitor.yunsee.vuln.cn/count/pieChart?type=language').then((res) => {
                    let data = res.data.data;

                    for (var key in data) {
                        names.push({
                            name: key,
                            value: data[key]
                        })
                    };
                    // 基于准备好的dom，初始化echarts实例
                    let Accounted = echarts.init(document.getElementById('Accounted2'));
                    Accounted.hideLoading();
                    Accounted.setOption({
                        title: {
                            text: '开发语言占比',
                            x: 'center',
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: 14,
                                color: '#666'
                            },
                            lineHeight: 56
                        },
                        series: [{

                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '43%'],
                            data: names,
                            grid: {
                                left: '3%',
                                right: '4%',
                                containLabel: true
                            },
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                    });
                })
            },
            drawLine3() {
                var names = [];
                this.$axios.get('http://monitor.yunsee.vuln.cn/count/pieChart?type=cdn').then((res) => {
                    let data = res.data.data;
                    for (var key in data) {
                        names.push({
                            name: key,
                            value: data[key]
                        })
                    };
                    let Accounted = echarts.init(document.getElementById('Accounted3'));
                    Accounted.hideLoading();
                    // 绘制图表
                    Accounted.setOption({
                        title: {
                            text: 'CDN',
                            x: 'center',
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: 14,
                                color: '#666'
                            }
                        },
                        series: [{

                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '40%'],
                            data: names,
                            grid: {
                                left: '3%',
                                right: '4%',
                                containLabel: true
                            },
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                    });
                })
            },
            drawLine4() {
                var names = [];
                this.$axios.get('http://monitor.yunsee.vuln.cn/count/pieChart?type=waf').then((res) => {
                    let data = res.data.data;
                    for (var key in data) {
                        names.push({
                            name: key,
                            value: data[key]
                        })
                    };
                    let Accounted = echarts.init(document.getElementById('Accounted4'));
                    Accounted.hideLoading();
                    Accounted.setOption({
                        title: {
                            text: 'waf',
                            x: 'center',
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: 14,
                                color: '#666'
                            }
                        },
                        series: [{
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '51%'],
                            data: names,
                            grid: {
                                left: '3%',
                                right: '4%',
                                containLabel: true
                            },
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                    });
                })
            },
            drawBar() {
                var owner = [],
                    event = [],
                    photo = [],
                    script = [],
                    sensitive = [],
                    url = [];
                this.$axios.get('http://monitor.yunsee.vuln.cn/count/barGraph').then((res) => {
                    let data = res.data.data;
                    for (var i = 0; i < data.length; i++) {
                        owner.push(data[i].owner);
                        event.push(data[i]['劫持事件']);
                        photo.push(data[i]['图片篡改']);
                        script.push(data[i]['恶意脚本']);
                        sensitive.push(data[i]['敏感词']);
                        url.push(data[i]['敏感链接']);
                    };

                    let webSiteStatistical = echarts.init(document.getElementById('webSite-statistical'));
                    webSiteStatistical.hideLoading();
                    webSiteStatistical.setOption({
                        dataZoom: [{
                                type: 'slider',
                                show: true,
                                yAxisIndex: [0],
                                left: '3%',
                                start: 50,
                                end: 100
                            },
                            {
                                type: 'inside',
                                yAxisIndex: [0],
                                start: 29,
                                end: 36
                            }
                        ],
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data: ['图片篡改', '敏感词', '网站劫持', '敏感链接', '恶意脚本']
                        },
                        grid: {
                            left: '0%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'value'
                        },
                        yAxis: {
                            type: 'category',
                            data: owner
                        },
                        series: [{
                                name: '图片篡改',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'insideRight'
                                    }
                                },
                                data: photo
                            },
                            {
                                name: '敏感词',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'insideRight'
                                    }
                                },
                                data: sensitive
                            },
                            {
                                name: '网站劫持',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'insideRight'
                                    }
                                },
                                data: event
                            },
                            {
                                name: '敏感链接',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'insideRight'
                                    }
                                },
                                data: [150, 212, 201, 154, 190, 150, 212, 201, 154, 190]
                            },
                            {
                                name: '恶意脚本',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'insideRight'
                                    }
                                },
                                data: script
                            }
                        ]
                    })
                });

            },
            drawBar1() {
                var name = [],
                    arr2 = [],
                    abnormal = [],
                    normal = [];
                this.$axios.get('http://monitor.yunsee.vuln.cn/count/cmsHack').then((res) => {
                    let data = res.data.data;
                    for (var key in data) {
                        name.push(key);
                        arr2.push(data[key])
                        for (var i = 0; i < arr2.length; i++) {
                            abnormal.push(arr2[i].abnormal);
                            normal.push(arr2[i].normal);
                        }
                    };

                    let webSiteCms = echarts.init(document.getElementById('webSiteCms'));
                    webSiteCms.hideLoading();
                    webSiteCms.setOption({
                        dataZoom: [{
                                type: 'slider',
                                show: true,
                                yAxisIndex: [0],
                                left: '3%',
                                start: 65,
                                end: 100
                            },
                            {
                                type: 'inside',
                                yAxisIndex: [0],
                                start: 29,
                                end: 36
                            }
                        ],
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data: ['正常站点', '异常站点'],
                            top: '20px'
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'value'
                        },
                        yAxis: {
                            type: 'category',
                            data: name
                        },
                        series: [{
                                name: '正常站点',
                                type: 'bar',
                                stack: '总量',
                                data: normal,
                                color: ['#2F4554']
                            },
                            {
                                name: '异常站点',
                                type: 'bar',
                                stack: '总量',
                                data: abnormal,
                                color: ['#D53A35']
                            }
                        ]
                    })
                });

            },
            swiper(n, ev, num) {
                var $this = this,
                    s = n;
                var obtnList = ev.target.parentElement;
                var aBtn = obtnList.children;
                var toauditBox = document.getElementsByClassName('toaudit-box')[num];
                for (var i = 0; i < aBtn.length; i++) {
                    aBtn[i].className = 'list-item';
                }
                if (num == 0) {
                    aBtn[n - 1].className = 'list-item active';
                    toauditBox.style.left = -(n - 1) * 110 + '%';
                } else if (num == 3) {
                    aBtn[n].className = 'list-item active';
                    toauditBox.style.left = -(n) * 105 + '%';
                } else {
                    aBtn[n].className = 'list-item active';
                    toauditBox.style.left = -(n) * 100 + '%';
                }



            },
            broken() {
                var city = [],
                    site_count = [],
                    site_hack = [];
                this.$axios.get('http://monitor.yunsee.vuln.cn/count/siteMap').then((res) => {
                    let data = res.data.data;
                    for (var i = 0; i < data.length; i++) {
                        city.push(CodeToText[data[i].city]);
                        site_count.push(data[i].site_count);
                        site_hack.push(data[i].site_hack);
                    };
                    let broken = echarts.init(document.getElementById('broken'));
                    broken.hideLoading();
                    broken.setOption({
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow',
                                label: {
                                    show: true
                                }
                            }
                        },
                        calculable: true,
                        legend: {
                            data: ['Growth', '正常站点', '异常站点'],
                            itemGap: 5
                        },
                        grid: {
                            top: '12%',
                            left: '1%',
                            right: '10%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: city
                        }],
                        yAxis: [{

                        }],
                        series: [{
                                name: '正常站点',
                                type: 'bar',
                                data: site_count
                            },
                            {
                                name: '异常站点',
                                type: 'bar',
                                data: site_hack
                            }
                        ]
                    })
                })
            },
            switchTab(k, ev) {
                this.index = k;
                this.$nextTick(_ => {
                    this.$refs['chart4'].echarts.resize()
                });
                var $this = this,
                    s = k;
                var obtnList = ev.target.parentElement;
                var aBtn = obtnList.children;
                for (var i = 0; i < aBtn.length; i++) {
                    aBtn[i].className = 'list-item';
                };
                aBtn[k].className = 'list-item active';
            },
            getHeaderData() {
                // this.$axios.get('http://monitor.yunsee.vuln.cn/count').then((res) => {
                //     let data = res.data.data;
                //     this.toauditData.site_count = data.site_count;
                //     this.toauditData.monitor_today = data.monitor_today;
                //     this.toauditData.confirm_today = data.confirm_today;
                //     this.toauditData.threat_count = data.threat_count;
                //     this.toauditData.confirm_count = data.confirm_count;
                //     this.toauditData.deal_wait = data.deal_wait;
                //     this.toauditData.threat_today = data.threat_today;
                //     this.toauditData.site_stop = data.site_stop;
                //     this.toauditData.site_audit = data.site_audit;
                // })
            }
        },
        mounted() {
            let Accounted = echarts.init(document.getElementById('Accounted'));
            let Accounted1 = echarts.init(document.getElementById('Accounted1'));
            let Accounted2 = echarts.init(document.getElementById('Accounted2'))
            let Accounted3 = echarts.init(document.getElementById('Accounted3'));
            let Accounted4 = echarts.init(document.getElementById('Accounted4'));
            let webSiteStatistical = echarts.init(document.getElementById('webSite-statistical'));
            let webSiteCms = echarts.init(document.getElementById('webSiteCms'));
            let broken = echarts.init(document.getElementById('broken'));
            Accounted.showLoading();
            Accounted1.showLoading();
            Accounted2.showLoading();
            Accounted3.showLoading();
            Accounted4.showLoading();
            webSiteStatistical.showLoading();
            webSiteCms.showLoading();
            broken.showLoading();
            var $this = this;
            _this = this;
        },
        created() {
            this.$axios.get('http://monitor.yunsee.vuln.cn/count').then((res) => {
                let data = res.data.data;
                this.toauditData.site_count = data.site_count;
                this.toauditData.monitor_today = data.monitor_today;
                this.toauditData.confirm_today = data.confirm_today;
                this.toauditData.threat_count = data.threat_count;
                this.toauditData.confirm_count = data.confirm_count;
                this.toauditData.deal_wait = data.deal_wait;
                this.toauditData.threat_today = data.threat_today;
                this.toauditData.site_stop = data.site_stop;
                this.toauditData.site_audit = data.site_audit;
                this.drawLine();
                this.drawLine1();
                this.drawLine2();
                this.drawLine3();
                this.drawLine4();
                this.drawBar();
                this.drawBar1();
                this.broken();
            })
        },
        filters: {
            NumFormat: function (value) {
                // if(!value) return '0.00'
                value = value.toFixed ? value.toFixed(2) : value;
                var intPart = Number(value).toFixed(0) // 获取整数部分
                var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
                var floatPart = '.00' // 预定义小数部分
                var value2Array = value.split('.')
                // =2表示数据有小数位
                if (value2Array.length === 2) {
                    floatPart = value2Array[1].toString() // 拿到小数部分
                    if (floatPart.length === 1) { // 补0,实际上用不着
                        return intPartFormat //+ '.' + floatPart
                    } else {
                        return intPartFormat //+ '.' + floatPart
                    }
                } else {
                    return intPartFormat //+ floatPart
                }
            }
        }
    };

    let _this;

    window.onscroll = function () {
        _this.drawLine();
        _this.drawBar();
        _this.broken();
    }


</script>

<style>
        @font-face {
            font-family: pictos;
            src: url('../../assets/font/QTypePro-SquareLight.otf');
        }
</style>

<style lang="scss" scoped>


    ul,
   li {
       list-style: none;
   }

   .clear {
       clear: both;
   }

   .statisticalt {
       margin-top: 15px;
       height: 150px;
       .list-item:nth-of-type(1) {
           .item-top {
               color: #009688;
           }
           .item-bg {
               background: #008d7f;
           }
       }
       .list-item:nth-of-type(2) {
           .item-top {
               color: #409EFF;
           }
           .itembg-t {
               transform: rotateY(180deg);
           }
           .itembg-b {
               transform: rotate(180deg);
           }
           .item-bg {
               background: #369aff;
           }
       }
       .list-item:nth-of-type(3) {
           .item-top {
               color: #EA3C77;
           }
           .itembg-b {
               transform: rotate(180deg);
           }
           .item-bg {
               background: #dd2667;
           }
       }
       .list-item:nth-of-type(4) {
           .item-top {
               color: #FEA321;
           }
           .item-bg {
               background: #fd9f1a;
           }
       }
       .list-item {
           width: 24%;
           background: #fff;
           float: left;
           margin-right: 10px;
           box-shadow: 2px 2px 5px #ddd;
           border-radius: 6px;
           .item-box {
               .item-bg {
                   position: absolute;
                   width: 23%;
                   height: 100%;
                   left: 20px;
                   top: -25px;
                   border-radius: 5px;
                   .item-bg-box {
                       width: 50%;
                       height: 100%;
                       margin: 0 auto;
                       position: relative;
                   }
               }
               .itembg-t {
                   position: absolute;
                   left: 50%;
                   margin-left: -20px;
                   top: 16px;
               }
               .itembg-b {
                   position: absolute;
                   opacity: 0.1;
                   bottom: 0;
                   left: 50%;
                   margin-left: -20px;
               }
           }
           .item-top {
               font-family: pictos;
               position: relative;
               text-align: center;
               line-height: 90px;
               height: 90px;
               margin: 0 auto;
               border-bottom: 1px solid #f6f6f6;
               span {
                   text-align: center;
                   font-size: 36px;
               }
           }
           .item-bottom {
               text-align: center;
               height: 50px;
               line-height: 50px;
               color: #666;
               font-size: 14px;
           }
       }
   }

   .toaudit {
       width: 36%;
       background: #fff;
       margin-top: 10px;
       float: left;
       box-shadow: 1px 1px 10px #eee;
       border-radius: 6px;
       header{
           border-radius: 6px;
       }
       .header {
           height: 45px !important;
           border-bottom: 1px solid #f6f6f6;
           line-height: 45px !important;
           display: flex;
           justify-content: space-between;
           align-items: center;
           background: #fff;
           font-size: 14px;
           color: #333;
           .header_title {
               display: inline;
           }
           .header_btn {
               float: right;
               .list-item {
                   width: 10px;
                   height: 10px;
                   background: #e3e3e3;
                   border-radius: 50px;
                   float: left;
                   margin-left: 5px;
                   cursor: pointer;
               }
               .list-item.active {
                   background: #999;
               }
           }
       }
       .el-main {
           overflow: hidden;
       }
       .toaudit-box {
           width: 1000%;
           height: 230px;
           position: relative;
           transition: 0.3s linear;
       }
       .toaudit-content {
           float: left;
           width: 10%;
           overflow: hidden;
           margin-right: 50px;
           .content-list {
               width: 124%;
           }
           .list-item {
               width: 39%;
               height: 100px;
               background: #f8f8f8;
               margin-bottom: 15px;
               text-align: center;
               line-height: 75px;
               border: 1px solid transparent;
               float: left;
               cursor: pointer;
               margin-right: 2%;
               .item-content {
                   .item-count {
                       font-size: 36px;
                       font-family: pictos;
                   }
                   .item-msg {
                       line-height: 0;
                       font-size: 14px;
                       color: #666;
                   }
               }
               .contentpage {
                   .item-count {
                       color: #009688 !important;
                   }
               }
           }
           .list-item:nth-of-type(1) {
               .item-count {
                   color: #ea3c77;
               }
           }
           .list-item:nth-of-type(2) {
               .item-count {
                   color: #FEA321;
               }
           }
           .list-item:nth-of-type(3) {
               .item-count {
                   color: #409EFF;
               }
           }
           .list-item:hover {
               border: 1px solid #409EFF;
           }
           .list-item:nth-of-type(4) {
               .item-count {
                   color: #009688;
               }
           }
       }
   }

   .application {
       width: 26%;
       height: 320px;
       background: #fff;
       float: left;
       margin-left: 10px;
       overflow: hidden;
       border-radius: 6px;
       .box {
           width: 1000%;
       }
       .el-main {
           width: 10%;
           height: 300px;
           float: left;
       }
   }

   .website-statistical {
       width: 34.5%;
       margin-left: 10px;
       float: left;
       overflow: hidden;
       height: 840px;
       border-radius: 6px;
       .toaudit-content {
           width: 100%;
           position: relative
       }
       .toaudit-box {
           height: 100%;
       }
       .el-main {
           width: 10%;
           float: left;
       }
   }

   .distribution {
       width: 61.5%;
       position: absolute;
       top: 540px;
       height: 510px;
       overflow: hidden;
       border-radius: 6px;
       .toaudit-box {
           height: 500px;
           .toaudit-content {
               width: 10.2%;
               float: left;
               overflow: hidden;
           }
       }
   }

</style>

<style scoped lang="scss">


    @media screen and (max-width: 1280px) {
       .statisticalt .list-item {
           width: 24%;
           margin-right: 5px
       }
       .el-main {
           padding-left: 0;
       }
       .toaudit .content-list {
           width: 100%;
           height: 220px
       }
       .item-bg {
           display: none;
       }
       .statisticalt {
           width: auto;
           ;
       }
       .toaudit .toaudit-content .list-item {
           width: 30%;
       }
       .toaudit-content .content-list {
           width: 400px;
       }
       .el-main {
           padding-left: 5px;
       }
       .toaudit .toaudit-content .content-list {
           margin: auto;
           width: auto;
       }
       .website-statistical {
           float: left;
       }
       .application {
           margin-left: 10px;
       }
       .distribution {
           width: 61.2%;
           position: absolute;
           top: 535px;
       }
       .website-statistical {
           margin-left: 10px;
           margin-right: 0;
       }
       .toaudit:first-child .toaudit-content {
           width: 13%
       }
   }

   @media screen and (max-width: 1080px) {
       .statisticalt {
           width: 1110px;
       }
   }

   .el-row {
       margin-bottom: 20px;
   }

   .grid-content {
       display: flex;
       align-items: center;
       height: 100px;
   }

   .grid-cont-right {
       flex: 1;
       text-align: center;
       font-size: 12px;
       color: #999;
   }

   .grid-num {
       font-size: 30px;
       font-weight: bold;
   }

   .grid-con-icon {
       font-size: 50px;
       width: 100px;
       height: 100px;
       text-align: center;
       line-height: 100px;
       color: #fff;
   }

   .grid-con-1 .grid-con-icon {
       background: rgb(45, 140, 240);
   }

   .grid-con-1 .grid-num {
       color: rgb(45, 140, 240);
   }

   .grid-con-2 .grid-con-icon {
       background: rgb(100, 213, 114);
   }

   .grid-con-2 .grid-num {
       color: rgb(45, 140, 240);
   }

   .grid-con-3 .grid-con-icon {
       background: rgb(242, 94, 67);
   }

   .grid-con-3 .grid-num {
       color: rgb(242, 94, 67);
   }
   .user-info {
       display: flex;
       align-items: center;
       padding-bottom: 20px;
       border-bottom: 2px solid #ccc;
       margin-bottom: 20px;
   }
   .user-avator {
       width: 120px;
       height: 120px;
       border-radius: 50%;
   }
   .user-info-cont {
       padding-left: 50px;
       flex: 1;
       font-size: 14px;
       color: #999;
   }
   .user-info-cont div:first-child {
       font-size: 30px;
       color: #222;
   }
   .user-info-list {
       font-size: 14px;
       color: #999;
       line-height: 25px;
   }
   .user-info-list span {
       margin-left: 70px;
   }
   .mgb20 {
       margin-bottom: 20px;
   }
   .todo-item {
       font-size: 14px;
   }

   .todo-item-del {
       text-decoration: line-through;
       color: #999;
   }

</style>
