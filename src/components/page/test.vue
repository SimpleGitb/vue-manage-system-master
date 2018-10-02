<template>
<div class="application">
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="iconfont icon-wangzhan"></i> 应用资产</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <el-form label-width="100px">
            <el-form-item label="所属单位">
                     <el-autocomplete
                        style="width:80%;" 
                        popper-class="my-autocomplete"
                        v-model="urlData.owner"
                        @focus="querySearch"
                        :fetch-suggestions="querySearch"
                        placeholder="请选择该网站直属单位，鼠标点击后支持搜索"
                        @select="selectunit">
                        <i
                            class="el-icon-edit el-input__icon"
                            slot="suffix">
                        </i>
                        <template slot-scope="{ item }">
                            <div class="name">{{ item.owner }}</div>
                            <!-- <span class="addr">{{ item.address }}</span> -->
                        </template>
                    </el-autocomplete>

                <!-- <el-select v-model="urlData.owner" filterable placeholder="请选择该网站直属单位，鼠标点击后支持搜索" @change="selectunit" style="width:60%">
                    <el-option v-for="item in optionssite" :key="item.id" :label="item.owner" :value="item.owner">
                    </el-option>
                </el-select> -->
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="urlData.name" class="alertInput" placeholder="填写该网站名称(全称)"></el-input>
            </el-form-item>
            <el-form-item label="网址">
                <el-input v-model="urlData.url" class="alertInput" @blur="geturl" placeholder="填写该网站网址，格式：http://www.ah.gov.cn/"></el-input>
            </el-form-item>
            <el-form-item label="选择策略">
                <el-select v-model="urlData.strategydata" placeholder="请选择策略" @change="addStrategyselect">
                    <el-option v-for="item in strategydata" :key="item.id" :label="item.name" :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <div v-if="urlData.selectd" class="hideStrate">
                <el-form-item label="监控时间段">
                    <el-date-picker v-model="urlData.startTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" :disabled="isdisable"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                    -
                    <el-date-picker v-model="urlData.endTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" :disabled="isdisable"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="每天时间段">
                    <el-select class="item-mini-select" v-model="urlData.startdaily" :disabled="isdisable">
                        <el-option v-for="item in dayTime" :key="item" :lable="item" :value="item"></el-option>
                    </el-select>
                    -
                    <el-select class="item-mini-select" v-model="urlData.enddaily" :disabled="isdisable">
                        <el-option v-for="item in dayTime" :key="item" :lable="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="首页监测">
                    <div class="icon">
                        <i class="el-icon-question"></i>
                        <div class="tips">
                            <div class="border"></div>
                            网站可用性,首页敏感词、篡改、劫持监测
                        </div>
                    </div>
                    <div class="block">
                        <el-slider v-model="urlData.homemonitoringNum" :format-tooltip="changestep2" :step="16.5" :disabled="isdisable">
                        </el-slider>
                    </div>
                </el-form-item>
                <el-form-item label="图片篡改">
                    <div class="icon">
                        <i class="el-icon-question"></i>
                        <div class="tips">
                            <div class="border"></div>
                            网站首页反共图片监测
                        </div>
                    </div>
                    <div class="block">
                        <el-slider v-model="urlData.photoTamperingNum" :format-tooltip="changestep2" :step="16.5" :disabled="isdisable">
                        </el-slider>
                    </div>
                </el-form-item>
                <el-form-item label="劫持监测">
                    <div class="icon">
                        <i class="el-icon-question"></i>
                        <div class="tips">
                            <div class="border"></div>
                            网站内页劫持、敏感词、暗链篡改、敏感js
                        </div>
                    </div>
                    <div class="block">
                        <el-slider v-model="urlData.hijackedNum" :format-tooltip="changestep3" :step="33" :disabled="isdisable">
                        </el-slider>
                    </div>
                </el-form-item>
                <el-form-item label="深度监测">
                    <div class="icon">
                        <i class="el-icon-question"></i>
                        <div class="tips">
                            <div class="border"></div>
                            深度监测网站内页存在的劫持,敏感词及敏感信息泄露
                        </div>
                    </div>
                    <div class="block">
                        <el-slider v-model="urlData.monitoringNum" :format-tooltip="changestep" :step="25" :disabled="isdisable">
                        </el-slider>
                    </div>
                </el-form-item>
                <el-form-item label="域名监测">
                    <div class="icon">
                        <i class="el-icon-question"></i>
                        <div class="tips">
                            <div class="border"></div>
                            所有人变更、备案、dns、解析ip、过期时间、是否开启泛解析
                        </div>
                    </div>
                    <div class="block">
                        <el-slider v-model="urlData.domainmonitorNum" :format-tooltip="changestep1" :step="33" :disabled="isdisable">
                        </el-slider>
                    </div>
                </el-form-item>
                <el-form-item label="情报威胁">
                    <div class="icon">
                        <i class="el-icon-question"></i>
                        <div class="tips">
                            <div class="border"></div>
                            与该应用相关的威胁信息推送
                        </div>
                    </div>                          
                    <el-switch  v-model="urlData.delivery" style="margin-left:15px;"></el-switch>
                </el-form-item>
            </div>
            <div v-show="urlData.strategydata" class="hidebox">
                <el-form-item label="可用性监测">
                     <div class="icon">
                        <i class="el-icon-question"></i>
                        <div class="tips">
                            <div class="border"></div>
                            分布式监测该应用的可用性与延时状况
                        </div>
                    </div>                   
                    <el-switch v-model="urlData.delivery1"></el-switch>
                </el-form-item>
                <div v-show="urlData.delivery1">
                    告警策略
                    <div class="dborder"></div>
                    <el-form-item label="异常条件" class="abnormal">
                        当响应时间大于&nbsp;
                        <div style="display:inline" class="item-mini-input">
                                 <el-input type="number" v-model="urlData.resTime">
                                    <template slot="append">ms</template>
                                </el-input>
                        </div>&nbsp;&nbsp;或被监控URL出现无法访问；同时，警告次数当有至少
                        <div class="item-mini-input">
                            <el-input min="0" type="number" v-model="urlData.threat_count"></el-input>
                        </div>&nbsp;个监测点出现异常，并且此异常连续出现&nbsp;
                        <div class="item-mini-input">
                            <el-input min="0" v-model="urlData.continue_count" type="number"></el-input>
                        </div>&nbsp;次时进行报警。
                    </el-form-item>
                    <el-form-item label="警告次数">
                        监控将最多发出&nbsp;
                        <div class="item-mini-input">
                            <el-select v-model="urlData.notice_count" placeholder="">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                            </el-select>
                        </div>&nbsp;次警告
                    </el-form-item>
                    <el-form-item label="自定义cookie" class="custom">
                        <el-input type="textarea" placeholder="请输入自定义内容" resize="none" v-model="urlData.custom">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="是否跟随跳转">
                        <el-switch v-model="urlData.jump"></el-switch>
                        <div class="msg">
                            <p class="msg">
                                <span>*</span> 默认监测跳转后的状态码
                            </p>
                        </div>
                    </el-form-item>
                </div>
            </div>
                <el-form-item label="策略备注" class="strategynote">
                    <el-input type="textarea" v-model="urlData.strategynote" class="alertInput" resize="none"></el-input>
                </el-form-item>            
            <el-form-item label="关联单位" class="associatedUnit">
                        <el-autocomplete
                        popper-class="my-autocomplete"
                        style="width:80%"
                        v-model="urlData.unit"
                        @focus="querySearch"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        @select="selectType">
                        <i
                            class="el-icon-edit el-input__icon"
                            slot="suffix">
                        </i>
                        <template slot-scope="{ item }">
                            <div class="name">{{ item.owner }}</div>
                            <!-- <span class="addr">{{ item.address }}</span> -->
                        </template>
                    </el-autocomplete>
                <!-- <el-select v-model="urlData.unit" style="width:80%;" filterable placeholder="表示该单位也需要接受或查看该网站的威胁，支持多个单位共同关注" class="selectType"
                    @change="selectType">
                    <el-option v-for="item in optionssite" :key="item.id" :label="item.owner" :value="item.owner">
                    </el-option>
                </el-select> -->
                <el-button type="primary" @click="addTag()">添加</el-button>
            </el-form-item>
            <el-form-item class="unitTag">
                <el-tag closable @close="closeUnitTag(item)" v-for="(item,index) in unitData" :key="index">
                    {{item}}
                </el-tag>
            </el-form-item>
            <el-form-item label="网站标签:">
                <el-tag closable @close="closeSiteTag(item)" v-for="(item,index) in sitetag" :key="index">
                    {{item}}
                </el-tag>
                    <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
            </el-form-item>
                <el-form-item label="站点备注">
                    <el-input type="textarea" v-model="urlData.remark" class="alertInput" resize="none"></el-input>
                </el-form-item>            
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showdialog = false">取 消</el-button>
            <el-button type="primary" @click="saveaddAsset">确 定</el-button>
        </div> 
    </div>
</div>
</template>
<script>
    export default {
        data() {
            return {
                labelPosition: 'center',
                batchchoice: '',
                selectdstrategyUnitId: [],
                activeName2: 'first',
                activeName:'',
                showdialog: false,
                iscustom: false,
                isdisable: false,
                restaurants:[],
                inputVisible: false,
                inputVisible2:false,
                inputValue: '',
                inputValue2: '',
                urlData: {
                    ownerId: '',
                    owner: '',
                    name: '',
                    url: '',
                    unit: '',
                    strategydata: '',
                    startTime: new Date(),
                    endTime: new Date(2018, 11, 30),
                    startdaily: 0,
                    enddaily: 24,
                    selectd: false,
                    resTime:200,
                    domainmonitor: '1天',
                    homemonitoring: '1小时',
                    photoTampering: '15分钟',
                    hijacked: '1天',
                    monitoring: '1天',
                    remark: '',
                    delivery: false,
                    delivery1: false,
                    jump:false,
                    threat_count:2,
                    continue_count:3,
                    notice_count:3,
                    strategynote: '',
                    sitenote: '',
                    homemonitoringNum: 0,
                    photoTamperingNum: 0,
                    hijackedNum: 0,
                    monitoringNum: 0,
                    domainmonitorNum: 0,
                    homemonitoringNum1: 0,
                    photoTamperingNum1: 0,
                    hijackedNum1: 0,
                    monitoringNum1: 0,
                    domainmonitorNum1: 0
                },
                sitetag: [],
                sitetag2: [],
                unitData: [],
                unitData2: [],
                strategydata: [],
                alertData: {
                    name: '',
                    password: '',
                    email: '',
                    contact: '',
                    phone: '',
                    role: '',
                    remark: '',
                    delivery: '',
                    area: true
                },
                fullscreenLoading: false,
                isdsable: false,
                select_word: '',
                editVisible: false,
                unitId: [],
                unitId1: [],
                selectUnitId: [],
                configure_id: '',
                right: '-200%',
                selectedAlertAdress: [],
                optionssite: [],
                configureData:{},
                // 弹出框搜索类型
                id: '',
                unitRowId: '',
                dayTime:[],
                rowId:'',
                selectTypeUnitId:[],
                timeout:null,
            }
        },
        methods: {
            loadAll() {
                   this.$axios.get('api/owner/select/all').then((res)=>{
                       this.optionssite = res.data.data;
                   });
            },
            selectstrategydata(val){
                    this.batchAdd.strategy = val.name;
                    this.batchchoice = val.name;
                    for (var i = 0; i < this.strategydata.length; i++) {
                        if (!this.strategydata[i].name.indexOf(val.name)) {
                            this.configure_id = this.strategydata[i].id;
                        }
                    };
            },            
            querySearch(queryString, cb) {
                var restaurants = this.optionssite;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                this.timeout = setTimeout(() => {
                    cb && cb(results);
                }, 1000 * Math.random());
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.owner.indexOf(queryString) === 0);
                };
            },
            selectTypeUnit(val){
                this.editAssets.unit = val;
            },
            selectdstrategy() {
                var selecedId = [];
                for (var i = 0; i < this.multipleSelection.length; i++) {
                    selecedId.push(this.multipleSelection[i].id);
                };
                this.$axios.post('api/site/configure', {
                    id: selecedId,
                    configure_id: this.configure_id
                }).then((res) => {
                    if (res.data.status == 1) {
                        this.$message.success(res.data.msg);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                        this.allocationDialog = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            selectunit(obj) {
                 this.urlData.owner = obj.owner;
                for (var i = 0; i < this.optionssite.length; i++) {
                    if (this.optionssite[i].owner.indexOf(this.urlData.owner) !== -1) {
                        this.selectedUnit = this.optionssite[i];
                    }
                }
            },
            showInput() {
                    this.inputVisible = true;
                    this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                    });
            },
            handleInputConfirm() {
                    let inputValue = this.inputValue;
                    if(!inputValue){
                        this.inputVisible = false;
                        return;
                    }
                    if (this.sitetag.indexOf(this.inputValue) !== -1) {
                        this.$message.error('请勿重复添加');
                        this.inputVisible = false;
                        this.inputValue = '';
                        return;
                    }else{
                        this.sitetag.push(this.inputValue);
                        this.inputValue = '';
                    }
                    this.inputVisible = false;
            },
            addTag() {
                if (!this.tagVal) {
                    this.$message.error('请选择关联单位');
                    return;
                } else {
                    if (this.unitData.indexOf(this.tagVal) !== -1) {
                        this.$message.error('请勿重复添加');
                        return;
                    } else {
                        this.unitData.push(this.tagVal);
                        for (var i = 0; i < this.optionssite.length; i++) {
                            if (this.optionssite[i].owner.indexOf(this.tagVal) !== -1) {
                                this.unitId.push(this.optionssite[i].id);
                                this.urlData.unit = '';
                            }
                        }
                    };
                }
            },
            addStrategyselect(val) {
                for (var i = 0; i < this.strategydata.length; i++) {
                    if (this.strategydata[i].name.indexOf(val) == 0) {
                        this.configure_id = this.strategydata[i].id;
                    }
                };

                    this.$axios.get('api/siteConfigure/'+this.configure_id).then((res)=>{
                        let data = res.data.data;
                            
                            this.urlData.startTime = data.start;
                            this.urlData.endTime = data.end;
                            this.urlData.startTime = data.start;
                            this.urlData.startdaily = data.daily_start;
                            this.urlData.enddaily = data.daily_end;
                            this.urlData.homemonitoringNum1 = data.index;
                            this.urlData.photoTamperingNum1 = data.picture;
                            this.urlData.hijackedNum1 = data.hack;
                            this.urlData.monitoringNum1 = data.deep;
                            this.urlData.domainmonitorNum1 = data.domain;
                            this.urlData.delivery1 = Boolean(data.usability);
                            this.urlData.resTime = data.delay;
                            this.urlData.threat_count = data.threat_count;
                            this.urlData.continue_count = data.continue_count;
                            this.urlData.notice_count = data.notice_count;
                            this.urlData.custom = data.cookie;
                            this.urlData.jump = Boolean(data.jump);
                            this.iscustom = true;
                            this.urlData.selectd = true;
                            this.editAssets.selectd = true;
                            if(this.configure_id == 22){
                                this.isdisable = true;
                            }else{
                                this.isdisable = false;
                            }

                        switch (this.urlData.homemonitoringNum1) {
                            case 5:
                            this.urlData.homemonitoringNum = 99;
                                break;
                            case 15:
                            this.urlData.homemonitoringNum = 82.5;
                                break;
                            case 30:
                            this.urlData.homemonitoringNum = 66;
                                break;                    
                            case 60:
                            this.urlData.homemonitoringNum = 49.5;
                                break;
                            case 360:
                            this.urlData.homemonitoringNum = 33;
                                break;
                            case 1440:
                            this.urlData.homemonitoringNum = 16.5;
                                break;                                       
                            default:
                            this.urlData.homemonitoringNum = 0;
                                break;
                        };
                    
                        switch (this.urlData.photoTamperingNum1) {
                            case 5:
                            this.urlData.photoTamperingNum = 99;
                                break;
                            case 15:
                            this.urlData.photoTamperingNum = 82.5;
                                break;
                            case 30:
                            this.urlData.photoTamperingNum = 66;
                                break;
                            case 60:
                            this.urlData.photoTamperingNum = 49.5;
                                break;                    
                            case 360:
                            this.urlData.photoTamperingNum = 33;
                                break;  
                            case 1440:
                            this.urlData.photoTamperingNum = 16.5;
                                break;                                       
                            default:
                            this.urlData.photoTamperingNum = 0;
                                break;
                        };
                        switch (this.urlData.hijackedNum1) {
                            case 360:
                            this.urlData.hijackedNum = 99;
                                break;
                            case 1440:
                            this.urlData.hijackedNum = 66;
                                break;
                            case 4320:
                            this.urlData.hijackedNum = 33;
                                break;                                                        
                            default:
                            this.urlData.hijackedNum = 0;
                                break;
                        };

                        switch (this.urlData.monitoringNum1) {
                            case 60:
                            this.urlData.monitoringNum = 100;
                                break;
                            case 360:
                            this.urlData.monitoringNum = 75;
                                break;
                            case 1440:
                            this.urlData.monitoringNum = 50;
                                break;
                            case 4320:
                            this.urlData.monitoringNum = 25;
                                break;                          
                            default:
                            this.urlData.monitoringNum = 0;
                                break;
                        };
                    
                            switch (this.urlData.domainmonitorNum1) {
                                case 1440:
                                this.urlData.domainmonitorNum = 99;
                                    break;
                                case 4320:
                                this.urlData.domainmonitorNum = 66;
                                    break;
                                case 10080:
                                this.urlData.domainmonitorNum = 33;
                                    break;                                                            
                                default:
                                this.urlData.domainmonitorNum = 0;
                                    break;
                            };

                            this.editAssets.startTime = data.start;
                            this.editAssets.endTime = data.end;
                            this.editAssets.startTime = data.start;
                            this.editAssets.startdaily = data.daily_start;
                            this.editAssets.enddaily = data.daily_end;
                            this.editAssets.homemonitoringNum1 = data.index;
                            this.editAssets.photoTamperingNum1 = data.picture;
                            this.editAssets.hijackedNum1 = data.hack;
                            this.editAssets.monitoringNum1 = data.deep;
                            this.editAssets.domainmonitorNum1 = data.domain;
                            this.editAssets.delivery1 = Boolean(data.usability);
                            this.editAssets.resTime = data.delay ?  data.delay : '';
                            this.editAssets.threat_count = data.threat_count;
                            this.editAssets.continue_count = data.continue_count;
                            this.editAssets.notice_count = data.notice_count;
                            this.editAssets.custom = data.cookie;
                            this.editAssets.jump = Boolean(data.jump);
                            this.iscustom = true;
                            this.editAssets.selectd = true;
                            this.editAssets.selectd = true;
                            if(this.configure_id == 22){
                                this.isdisable = true;
                            }else{
                                this.isdisable = false;
                            };
                            switch (this.editAssets.homemonitoringNum1) {
                                case 5:
                                this.editAssets.homemonitoringNum = 1440;
                                    break;
                                case 15:
                                this.editAssets.homemonitoringNum = 360;
                                    break;
                                case 30:
                                this.editAssets.homemonitoringNum = 60;
                                    break;                    
                                case 60:
                                this.editAssets.homemonitoringNum = 60;
                                    break;                    
                                case 360:
                                this.editAssets.homemonitoringNum = 15;
                                    break;  
                                case 1440:
                                this.editAssets.homemonitoringNum = 5;
                                    break;                                       
                                default:
                                this.editAssets.homemonitoringNum = 0;
                                    break;
                            };
                            switch (this.editAssets.photoTamperingNum1) {
                                case 5:
                                this.editAssets.photoTamperingNum = 1440;
                                    break;
                                case 15:
                                this.editAssets.photoTamperingNum = 360;
                                    break;
                                case 30:
                                this.editAssets.photoTamperingNum = 60;
                                    break;
                                case 60:
                                this.editAssets.photoTamperingNum = 30;
                                    break;                    
                                case 360:
                                this.editAssets.photoTamperingNum = 15;
                                    break;  
                                case 1440:
                                this.editAssets.photoTamperingNum = 5;
                                    break;                                       
                                default:
                                this.editAssets.photoTamperingNum = 0;
                                    break;
                            };
                            switch (this.editAssets.hijackedNum1) {
                                case 360:
                                this.editAssets.hijackedNum = 4320;
                                    break;
                                case 1440:
                                this.editAssets.hijackedNum = 1440;
                                    break;
                                case 4320:
                                this.editAssets.hijackedNum = 360;
                                    break;                                                        
                                default:
                                this.editAssets.hijackedNum = 0;
                                    break;
                            };

                            switch (this.editAssets.monitoringNum1) {
                                case 60:
                                this.editAssets.monitoringNum = 4320;
                                    break;
                                case 360:
                                this.editAssets.monitoringNum = 1440;
                                    break;
                                case 1440:
                                this.editAssets.monitoringNum = 360;
                                    break;
                                case 4320:
                                this.editAssets.monitoringNum = 60;
                                    break;                          
                                default:
                                this.editAssets.monitoringNum = 0;
                                    break;
                            };
                    
                            switch (this.editAssets.domainmonitorNum1) {
                                case 1440:
                                this.editAssets.domainmonitorNum = 10080;
                                    break;
                                case 4320:
                                this.editAssets.domainmonitorNum = 4320;
                                    break;
                                case 10080:
                                this.editAssets.domainmonitorNum = 1440;
                                    break;                                                            
                                default:
                                this.editAssets.domainmonitorNum = 0;
                                    break;
                        };
                })
            },
            selectType(value) {
                this.urlData.unit = value.owner;
                this.tagVal = value.owner;
            },
            selectType1(value) {
                this.editAssets.unit = value.owner;
                this.tagVal1 = value.owner;
            },
            closeUnitTag(tag) {
                this.unitData.splice(this.unitData.indexOf(tag), 1);
                this.unitData2.splice(this.unitData2.indexOf(tag), 1);
            },
            closeSiteTag(tag) {
                this.sitetag.splice(this.sitetag.indexOf(tag), 1);
                this.sitetag2.splice(this.sitetag2.indexOf(tag), 1);
            },
            geturl() {
                this.$axios.get('api/getTags', {
                    params: {
                        url: this.urlData.url
                    }
                }).then((res) => {
                    this.sitetag = res.data.data;
                }).catch(v => {
                    console.log(v);
                });
            },
            geturl2() {
                this.$axios.get('api/getTags', {
                    params: {
                        url: this.editAssets.url
                    }
                }).then((res) => {
                    this.sitetag2 = res.data.data;
                }).catch(v => {
                    console.log(v);
                });
            },
            changestep(val){
                console.log(val)
                switch (val) {
                    case 25:
                        return 3+'天1次'
                        break;
                    case 60:
                        return 1+'小时1次'
                        break;
                    case 360:
                        return 6+'小时1次'
                        break;                                         
                    case 50:
                        return 1+'天1次'
                        break;
                    case 1440:
                        return 1+'天1次'
                        break;                                          
                    case 75:
                        return 6+'小时1次'
                        break; 
                    case 4320:
                        return 3+'天1次'
                        break;
                    case 33:
                        return 3+'天1次'
                        break;
                    case 66:
                        return 1+'天1次'
                        break;
                    case 99:
                        return 1+'小时1次'
                        break;
                    case 100:
                        return 1+'小时1次'
                        break;                                                                                                                     
                    default:
                        return val
                        break;
                }
            },
            changestep1(val){
                switch (val) {
                    case 33:
                        return 7+'天1次'
                        break;
                    case 66:
                        return 3+'天1次'
                        break;
                    case 99:
                        return 1+'天1次'
                        break;
                    case 100:
                        return 1+'天1次'
                        break;
                    case 1440:
                        return 1+'天1次'
                        break;     
                    case 4320:
                        return 3+'天1次'
                        break;                      
                    case 10080:
                        return 7+'天1次'
                        break;                       
                    default:
                        return val
                        break;
                }
            },
            changestep2(val){  
                switch (val) {
                    case 16.5:
                        return 1+'天1次'
                        break;
                    case 5:
                        return 5+'分钟1次'
                        break;                      
                    case 15:
                        return 15+'分钟1次'
                        break;
                    case 30:
                        return 30+'分钟1次'
                        break;                      
                    case 60:
                        return 1+'小时1次'
                        break;                      
                    case 33:
                        return 6+'小时1次'
                        break;
                    case 49.5:
                        return 1+'小时1次'
                        break;
                    case 66:
                        return 30+'分钟1次'
                        break;
                    case 82.5:
                        return 15+'分钟1次'
                        break;
                    case 99:
                        return 5+'分钟1次'
                    case 100:
                        return 5+'分钟1次'
                        break;
                    case 360:
                        return 6+'小时1次'
                        break;     
                    case 1440:
                        return 1+'天1次'
                        break;                                                               
                    default:
                        return val;
                        break;
                }
            },
            changestep3(val){
                 switch (val) {
                    case 33:
                        return 3+'天1次'
                        break;
                    case 66:
                        return 1+'天1次'
                        break;
                    case 99:
                        return 6+'小时1次'
                        break;
                    case 100:
                        return 6+'小时1次'
                        break;
                 }
            },        
            saveaddAsset() {
                //   5分钟 30分钟  6小时 15分钟 1小时 1天 3天 7天
                if (!this.urlData.owner) {
                    this.$message.error('请选择所属单位');
                    return;
                } else if (!this.urlData.name) {
                    this.$message.error('请填写网站名称');
                    return;
                } else if (!this.urlData.url) {
                    this.$message.error('请填写网站网址');
                    return;
                };
                if (!this.urlData.strategydata) {
                    this.$message.error('请选择策略');
                    return;
                }
                if (this.isdisable) {
                    this.$axios.post("api/site", {
                        owner_id: this.selectedUnit.id,
                        name: this.urlData.name,
                        domain: this.urlData.url,
                        configure_id: this.configure_id,
                        remark: this.urlData.remark,
                        superior: this.unitId,
                        tags: this.sitetag,
                        usability:Number(this.urlData.delivery1),
                        delay:Number(this.urlData.resTime),
                        threat_count:Number(this.urlData.threat_count),
                        continue_count:Number(this.urlData.continue_count),
                        notice_count:Number(this.urlData.notice_count),
                        cookie:Number(this.urlData.custom),
                        jump:Number(this.urlData.jump)
                    }).then((res) => {
                        let data = res.data;
                        if (data.status == 1) {
                            this.$message.success(data.msg);
                            this.showdialog = false;
                            this.urlData.selectd = false;
                            this.editAssets.selectd = false;
                        } else {
                            this.$message.error(data.msg);
                            this.showdialog = false;
                            // this.urlData.selectd = false;
                            // this.editAssets.selectd = false;
                        }
                    }).catch(v => {
                    console.log(v);
                });
                } else {
                    if (!this.selectedUnit) {
                        this.$message.error('请选择单位');
                        return;
                    };
                let startTime = typeof this.urlData.startTime == 'object' ? this.urlData.startTime.toLocaleDateString().split('/').join('-') : this.urlData.startTime;
                let endTime = typeof this.urlData.endTime == 'object' ? this.urlData.endTime.toLocaleDateString().split('/').join('-') : this.urlData.endTime;
                    this.$axios.post("api/site", {
                        owner_id: this.selectedUnit.id,
                        name: this.urlData.name,
                        domain: this.urlData.url,
                        configure: {
                            start: startTime,
                            end: endTime,
                            daily_start: this.urlData.startdaily,
                            daily_end: this.urlData.enddaily,
                            index: Number(this.urlData.homemonitoringNum1),
                            picture: Number(this.urlData.photoTamperingNum1),
                            hack: Number(this.urlData.hijackedNum1),
                            deep: Number(this.urlData.monitoringNum1),
                            domain: Number(this.urlData.domainmonitorNum1),
                            notice: Number(this.urlData.delivery),
                            remark: this.urlData.strategynote,
                            usability:Number(this.urlData.delivery1),
                            delay:Number(this.urlData.resTime),
                            threat_count:Number(this.urlData.threat_count),
                            continue_count:Number(this.urlData.continue_count),
                            notice_count:Number(this.urlData.notice_count),
                            cookie:Number(this.urlData.custom),
                            jump:Number(this.urlData.jump)
                        },
                        remark: this.urlData.remark,
                        superior: this.unitId,
                        tags: this.sitetag
                    }).then((res) => {
                        let data = res.data
                        if (data.status == 1) {
                            this.$message.success(data.msg);
                            this.showdialog = false;
                            this.urlData.selectd = false;
                            this.editAssets.selectd = false;
                        } else {
                            this.$message.error(data.msg);
                            this.showdialog = false;
                            this.urlData.selectd = false;
                            this.editAssets.selectd = false;
                        }
                    }).catch(v => {
                    console.log(v);
                });
              }
            },
            getsite() {
                this.$axios.get("api/site?limit=10&page=1").then((res) => {
                    this.totalpage = Math.ceil(res.data.data.count / 10);
                    let data = res.data.data.data;
                    this.tableData3 = data;
                    this.loading2 = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            createTime(){
                    for(var i=0;i<25;i++){
                        this.dayTime.push(i);
                    };
            }
        },
        created() {
            this.getsite();
            this.createTime();
            this.loadAll();
            this.$axios.get("api/siteConfigure/select/all").then((res) => {
                let data = res.data;
                this.strategydata = data.data;
            }).catch(v => {
                    console.log(v);
             });
        }
    }

</script>
<style lang="scss" scoped>
    .list{
        position: absolute;
        width: 100%;
        z-index: 2;
        background: #fff;
        border: 1px solid #eee;
        border-top:none;
        li{
            padding-left: 15px;
            cursor: pointer;
        }
        li:hover{
            background: #e5e5e5;
        }
    }
    .historthreat,.assetsEvent{
        background: #f2f2f2;
        overflow: auto;
        .historthreat-title{
            padding: 20px;
            padding-bottom: 0;
            font-weight: 500;
            color: #333;
        }
        .history-list{
            height: 100%;
            margin-left: 222px;
            margin-top: 40px;
            .is-vertical{
                float: left;
                width: 0;
            }
            .box{
                position: relative;
                margin-bottom:15px;
                .createTime{
                    position: absolute;
                    left: -150px;
                    color:#666;
                }
            }
            .border{
                width: 2px;
                background: #d7d7d7;
                position: absolute;
                height: 230px;
                left: 10px;
                top: 20px;
            }
        }
        .item-noText{
            text-align: center;
            height: 800px;
            display: flex;
            align-items: center;
            justify-content: center;
            span{
                margin-left: 10px;
                font-size: 14px;
                color: #5a5e66;
            }
            img{
                width: 21px;
                height: 21px;
            }
        }
        .item-list{
            height: 185px;
            background: #fff;
            padding: 10px;
            margin-left: 35px;
            border-radius: 6px;
            box-shadow: 1px 1px 1px 5px #eee;
            .item-top{
                border-bottom: 1px solid #eee;
            }
            .item-top,.item-bottom{
                padding: 10px;
                font-size: 14px;
                color: #666;
            }

        }
    }
    .historthreat{
        height: 840px;
    }
    .assetsEvent{
        .border{
            height: 50px!important;
        }
        .item-list{
            height: 35px!important;
            .item-top{
                border:none!important;
            }
        }
    }
    .childtab{
        width: 100%;
        margin-left: 30px;
        .tab-header{
            height: 40px;
            background: #f2f2f2;
            .historicalthreat{
                cursor: pointer;
                position: absolute;
                left: 260px;
                top: -61px;
                z-index: 3;
                border-bottom: none;
            }
        }
    }
    .web-assets{
        width: 96%;
        height: 800px;
        border: 1px solid #ddd;
        margin-left: 40px;
        overflow: auto;
        .assets-header{
            height: 40px;
            background: #f2f2f2;
            position: relative;
            padding-left: 10px;
            display: flex;
            justify-content: left;
            align-content: center;
            align-items: center;
            .icon{
                width: 20px;
                height: 16px;
                position: relative;
                img{
                    position: absolute;
                    bottom: 0px;
                }
                img:nth-of-type(1){
                    left: 0;
                }
                img:nth-of-type(2){
                     left: 5px;
                 }
                img:nth-of-type(3){
                     left: 10px;
                 }
                img:nth-of-type(4){
                     left: 15px
                 }
            }
                .header-title{
                    margin-left: 17px;
                }
        }
        .assets-content{
            .list-item{
                .item-header{
                    height: 40px;
                    line-height: 40px;
                    border-bottom: 1px solid #ddd;
                    font-size: 16px;
                    .header-title{
                        border-bottom: 3px solid #409eff;
                        display: inline-block;
                        span{
                            padding-left: 30px;
                            padding-right: 30px;
                        }
                    }
                }
                .item-content{
                    margin-top: 15px;
                    .ipaddress{
                        width: 140px;
                        height: 30px;
                        background: #f2f2f2;
                        display: inline-block;
                        text-align: center;
                        line-height: 30px;
                        border-radius: 15px;
                        margin-left: 20px;
                    }
                }
            }
        }
    }
    .monitoringcount{
        width: 895px;
        height: 676px;
        border: 1px solid #ddd;
        margin-left: 30px;
        display: inline-block;
        position: relative;
        .border{
            position: absolute;
            left: 50%;
            top: 60px;
            margin-left: -231px;
            z-index: 1;
        }
        .count-list{
            width: 600px;
            height: 560px;
            margin: 0 auto;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            li{
                width: 150px;
                height: 150px;
                border:1px solid #ddd;
                border-radius: 50%;
                position: absolute; 
                background: #fff;
                z-index: 2;
            .item-arrow{
                position: absolute;
            }

            .item-box{
                    text-align: center;
                    span{
                        font-size: 48px;
                        line-height: 95px
                    }
                    p{
                        color:#333;
                    }
                }
            }
            .list-bg{
                img{
                    width: 150px;
                    height: 150px;
                }
            }
            li:nth-of-type(1){
                .item-arrow{
                    top: 64px;
                    left: 159px;
                    transform: rotate(11deg);
                }
                top: 0px;
                left: 220px;
                    span{
                        color: #3a92c0;
                    }

            }
            li:nth-of-type(2){
                left: 0px;
                top: 180px;
                span{
                        color: #53a169;
                    }
             .item-arrow{
                top: -21px;
                left: 95px;
                transform: rotate(-50deg);
                }
            }
            li:nth-of-type(3){
                right: 0px;
                top: 180px;
                span{
                        color: #5FB878;
                    }
                 .item-arrow{
                    top: 150px;
                    left: 68px;
                    transform: rotate(100deg);
                }
            }
            li:nth-of-type(4){
                left: 100px;
                top: 405px;
                span{
                        color: #F7A358
                    }
                 .item-arrow{
                    top: 2px;
                    left: 3px;
                    transform: rotate(-135deg);
                }
            }
            li:nth-of-type(5){
                right: 100px;
                top: 405px;
                span{
                        color: #42A7DB
                    }
                  .item-arrow{
                top: 97px;
                transform: rotate(170deg);
                left: -9px;
                }
            }
        }
    }
    .availability{
        width: 1435px;
        height: 675px;
        border: 1px solid #ddd;
        margin-left: 40px;
        .leftContent{
            width: 500px;
            height: 500px;;
        }
    }
    $unit: 170px;
    .assetsEvent{
        margin-bottom: 20px;
           .arrow{
                img{
                    position: absolute;
                    top: 50%;
                    margin-top: -42px;
                    cursor: pointer;
                }    
                img:first-child{
                    left:5px;
                } 
                img:last-child{
                    right:5px;
                }       
            }
        .assetTime{
            width: 1210px;
            height: 3px;
            background: #1D9ED9;
            position: relative;
            top: 240px;
            left: 50px;
            li{
                width: 10px;
                height: 10px;
                background: #199ed8;
                border-radius: 50%;
                float: left;
                position: absolute;
                top: -4px;
                .item-box,.item-box .item-bg{
                    width: 300px;
                    height: 70px;
                    background: #fff;
                    position: absolute;
                    color: #666;
                    font-size: 14px;
                    z-index: 1;
                    cursor: pointer;
                    .item-content{
                        padding-left: 20px;
                        position: relative;
                        z-index: 2;
                        .item-name{
                            margin-top: 8px;
                        }
                        .time{
                            display: flex;
                            align-content: center;
                            align-items: center;
                            margin: 5px auto;
                            p{
                                display: inline;
                                color: #999;
                                margin-left: 5px
                            }
                        }
                    }
                }
            }
            li:nth-of-type(1){
                left: $unit*1-30;
                .item-box{
                    top: -150px;
                    left: -140px;
                }
            }
            li:nth-of-type(2){
                left: $unit*2;
                .item-box{
                    bottom: -150px;
                    left: -140px;
                }     
            }
            li:nth-of-type(3){
                left: $unit*3;
                .item-box{
                    top: -150px;
                    left: -140px;
                }     
            }
            li:nth-of-type(4){
                left: $unit*4;
                .item-box{
                    bottom: -150px;
                    left: -150px;
                }
            }
            li:nth-of-type(5){
                left: $unit*5;
                .item-box{
                    top: -150px;
                    left: -150px;
                }
            }
            li:nth-of-type(6){
                left: $unit*6;
                .item-box{
                    bottom: -150px;
                    left: -150px;
                }
            }
            li:nth-child(2n){
                 .item-box{
                    .item-name{
                            margin-top: 17px;
                    }
                }
            }
            li:last-child{
                width: 20px;
                height: 20px;
                right: 0;
                left: auto;
                top: -9px;
            }
        }

    }

</style>
<style lang="scss" scoped>

    ul,li{
        list-style: none;
    }
    .el-tag{
        margin-right:10px;
    }
    .crumbss{
        border-width: 0px;
        height: 32px;
        color: #FFF;
        background: #409eff;
        float: left;
        margin-right: 10px;
        border-radius: 5px;
        cursor: pointer;
    }

    .intelligence{
        padding{
            left:20px;
            right: 20px;
        }
        li{
            height: 45px;
            line-height: 45px;
            border-bottom: 1px solid #d7d7d7;
            font-size: 14px;
            p{
                float: left;
            }
            span{
                float: right;
                margin-right:50px;
            }
        }
        li:hover{
            background: #f2f2f2;
        }

        
    }

    .el-breadcrumb{
        text-align: center;
        line-height: 32px;
    }
    .application .crumbs .el-breadcrumb{
        font-size:18px;
    }
    .application .eel-breadcrumb__item:last-child .el-breadcrumb__inner .iconfont{
       font-size:18px!important;
    }
    .handle-box {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 200px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center;
    }


    .el-cascader .el-input__inner {
        height: 32px;
        line-height: 32px;
    }


    .el-table--small {
        font-size: 14px;
    }

    .el-table__header thead{
          background: #f2f2f2
    }

    .handle-input {
        width: 100px;
    }

    .el-form-item__content .selectType {
        width: 70%;
    }

    .alertInput {
        width: 80%;
    }

    .selectType1 {
        width: 40%;
    }

    .corn {
        display: inline-block;
        font-size: 20px;
        cursor: pointer;
    }

    .snapshot{
        width: 20px;
        height: 20px;
        background: url('../../../static/img/assets/snapshot.png') -6px 0;
        cursor: pointer;
    }

    .update{
        width: 19px;
        height: 20px;
        background: url('../../../static/img/update.png') no-repeat -41px -25px;
        cursor: pointer;
    }

    .stop{
        width: 24px;
        height: 24px;
        background: url("../../../static/img/update.png") no-repeat -23px 0px;
        display: inline-block;
        margin-right: 15px;
        cursor: pointer;
    }

    .play{
        width: 24px;
        height: 24px;
        background: url("../../../static/img/update.png") no-repeat -60px -22px;
        display: inline-block;
        margin-right: 15px;
        cursor: pointer;
    }

    thead th{
      text-align: center
    }

    .is-leaf:last-child{
        border-right: 1px solid #ddd!important;
    }

</style>
<style>
    body{
        overflow: hidden;
    }
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        height: 24px;
        padding: 0 8px;
        line-height: 22px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        height: 10px;
        line-height: 10px;
        padding: 0 8px;
    }
    .application .left .input-with-select{
        margin-left:20px;
    }
    .application .el-dialog .el-form-item--small:nth-of-type(8){
        left: 38%;
    }
    .application .el-dialog .el-form-item:nth-of-type(7) .border,.application .el-dialog .el-form-item:nth-of-type(8) .border{
        left: 18%;
    }
    .application .el-dialog .el-form-item:nth-of-type(9) .border{
        left: 30%;
    }
    .application .el-dialog .el-form-item:nth-of-type(10) .border{
        left: 25%;
    }
    .popper__arrow{
        display: none!important;
    }
    .application .el-dialog__header {
        background: #f8f8f8;
        border-bottom: 1px solid #e2e2e2;
        padding: 10px 15px 10px;
    }
    .application .el-dialog__title{
        font-size: 16px;
    }
    .application .el-dialog .el-switch{
        margin-left: 5px;
        margin-top: -7px;
        vertical-align: text-bottom
    }
    .application .el-dialog .item-mini-input .el-input__inner{
        height: 21px;
    }    
    .application .el-table__empty-text{
        display: flex;
        align-items:center;
    }
    .application .el-table__empty-text span{
        margin-left: 15px;
    }
    .application .noText{
        width: 24px;
        height: 24px;
    }
    .application .el-table thead{
        color: #666;
    }
   .application .batchAdd .el-form .el-form-item__content .el-textarea .el-textarea__inner{
       height:145px!important;
       width: 80%;
       font-family: 'Microsoft Yahei';
   }

   .application .el-form  .associatedUnit .el-form-item__content{
       display: flex;
   }

   .application .el-form .el-form-item__content .el-button{
       margin-left: 10px;
       height: 31px;
   }

   @media screen and (max-width: 1100px) {
       .application .left .el-input-group {
           width: 50%!important;
       }
       .application .right .el-button+.el-button{
           margin-left: 5px;
       }
       .application .right .el-button--small{
           padding: 9px 7px;
       }
    }
        .application .has-gutter tr{
            background-color: #f2f2f2;
         }
        .application .el-dialog__header{
            background: #f8f8f8;
            border-bottom: 1px solid #e2e2e2;
        }
        .application .showSetting .el-form-item__label {
            color:#409EFF
        }
        .childtab .el-tabs__content .left_l{
            float: left;
            display: flex;
            align-items: center
        }
        .childtab .el-tabs__content .left_l  .left_title{
            font-size:14px;
            color: #5a5e66
         }
        .application .hidebox .el-form-item{
            border:1px solid #e4e4e4;
            border-radius:6px;
            position: relative;
        }
        .application .hidebox .el-form-item:nth-of-type(1){
            border:none;

        }
        .application .hidebox .el-form-item:nth-of-type(1) .el-form-item__label:nth-of-type(1){
            background: none;
        }
        .application .hidebox .el-textarea__inner{
            border:none;
            outline: none;
        }
        .application .block .el-slider__runway{
            margin-left: 20px;
            width: 95%;
            margin-top: 14px;
        }
        .application .block .el-slider__runway .el-slider__button-wrapper{
            outline: none;
        }
        .application .el-dialog .el-icon-question{
                position: absolute;
                top: 9px;
                left: -10px;
                cursor: pointer;
        }
        .application .hidebox .el-form-item:nth-of-type(1) .el-form-item__label{
            line-height:66px;
            border-right:1px solid #fbfbfb;
            background:#f5f5f5;
            padding-right:0;
        }

        .application  .hidebox .dborder{
            border-bottom: 1px dashed  #d7d7d7;
            margin-bottom: 20px;
            margin-top: -11px;
        }
        .application .hidebox .el-form-item:nth-of-type(1) .el-form-item__content,
        .application .hidebox .el-form-item:nth-of-type(2) .el-form-item__content,
        .application .hidebox .el-form-item:nth-of-type(3) .el-form-item__content,
        .application .hidebox .el-form-item:nth-of-type(5) .el-form-item__content{
            padding-left:10px;
            padding-right: 10px;
        }
        .application .hidebox .el-form-item:nth-of-type(5) .el-form-item__content{
            display: flex;
            align-items: center;
        }
        .application .hidebox .el-form-item:nth-of-type(5) .el-form-item__content .el-switch__core{ 
            margin-top:4px;
        }
        .application .hidebox .el-form-item:nth-of-type(2){
            line-height: 100%;
        }
        .application .hidebox .el-form-item:nth-of-type(1) .el-form-item__label,
        .application .hidebox .el-form-item:nth-of-type(2) .el-form-item__label,
        .application .hidebox .el-form-item:nth-of-type(3) .el-form-item__label,
        .application .hidebox .el-form-item:nth-of-type(4) .el-form-item__label,
        .application .hidebox .el-form-item:nth-of-type(5) .el-form-item__label,
        .application .hidebox .el-form-item:nth-of-type(6) .el-form-item__label{
            position: absolute;
            height: 100%;
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;
        }
        .application .hidebox .el-form-item:nth-of-type(2) .el-form-item__label{
            border-right:1px solid #fbfbfb;
            background:#f5f5f5;
        }
        .application .hidebox .el-form-item:nth-of-type(3) .el-form-item__label{
            border-right:1px solid #fbfbfb;
            line-height:35px;
            background:#f5f5f5;
        }
        .application .hidebox .el-form-item:nth-of-type(4) .el-form-item__label{
            border-right:1px solid #fbfbfb;
            background:#f5f5f5;
            line-height:55px;
        }
        .childtab .el-tabs--border-card{
            position: absolute;
            width: 98%;
            height: 100%;
        }
        .application .hidebox .el-form-item:nth-of-type(5) .el-form-item__label{
            border-right:1px solid #fbfbfb;
            background:#f5f5f5;
            line-height:35px;
        }
        .application .hidebox .el-form-item:nth-of-type(6) .el-form-item__label{
            border-right:1px solid #fbfbfb;
            background:#f5f5f5;
            line-height:54px;
        }

        .application .el-form .item-mini-input{
            display: inline-block;
            width: 10%;
        }
        .application .el-form .item-mini-input .el-input-group{
            width: 20%;
        }
        .application .el-form .item-mini-input .el-input-group__append{
            padding:0 13px;
            background:#e4e4e4;
            color:#666
        }
        .application .el-form .item-mini-select{
            width: 20%;
        }
        .application .el-form .el-input.item-mini-input:nth-of-type(1){
            width: 10%;
        }
        .application .el-form .el-input.item-mini-input:nth-of-type(2),.application .el-form .el-input.item-mini-input:nth-of-type(3){
            width: 8%;
        }
        .application .el-form .item-mini-input .el-input__inner{
            padding:0;
            text-align: center;
        } 
        .application .el-dialog .icon:hover .tips{
            display: block;
        }
        .application .el-dialog .tips{
            position: absolute;
            background: rgb(50, 65, 87);
            border-radius:6px;
            color:#eee;
            left: -66px;
            top: -32px;
            padding-left:10px;
            padding-right:10px;
            display: none;
            font-size:12px;
        }
        
        .application .el-dialog .hideStrate .el-form-item:nth-of-type(3) .border{
            left: 23%;
        }
        .application .el-dialog .hideStrate .strategynote .el-form-item__content{
            line-height: 100%
        }
        .application .el-dialog .hideStrate .strategynote .el-form-item__content .el-input--small{
            height: 100%
        }
        .application .el-dialog .hideStrate .abnormal .el-input__inner,.application .el-dialog .hidebox .abnormal .el-input__inner{
            height: 22px;
        }
        .application .el-dialog .hideStrate .custom  .el-input--small,.application .el-dialog .hidebox .custom  .el-input--small{
            height: 52px;
        }
        .application .el-dialog .hideStrate .el-form-item:nth-of-type(4) .border{
            left: 37%;
        }
        .application .el-dialog .hideStrate .el-form-item:nth-of-type(5) .border{
            left: 22%;
        }
        .application .el-dialog .hideStrate .el-form-item:nth-of-type(6) .border{
            left: 18%;
        }
        .application .el-dialog .hideStrate .el-form-item:nth-of-type(7) .border{
            left: 16%;
        } 
        .application .table-threat .tips{
            font-size:14px;
            color:#ddd;
            padding-left: 20px;
            padding-right:20px;
            background: #393D49;
            z-index: 20;
            display:none;
            position: absolute;
            padding-top:5px;
            padding-bottom: 5px;
        }
        .application .table-threat .el-table{
            width: 94.5%;
        }
        .application .table-threat .pagination{
            margin-right:75px;
        }
        .application .table-threat .tips .view{
                color: #6aa5ff
        }
        
        .application .table-threat .tips .border{
            border-left: 5px solid transparent;
            border-right: 5px solid #393D49;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            position: absolute;
            left: -10px;
            top: 32%;
        }
        .application .el-dialog .tips .border{
            border-left:8px solid transparent;
            border-right:8px solid transparent;
            border-top:8px solid rgb(50, 65, 87);
            border-bottom:8px solid transparent;
            position: absolute;
            bottom:-15px;
            left:22%;
        }
        .application .el-form .times{
            background: #E4E4E4;
            border-radius: 0px 4px 4px 0px;
            margin-left: -6px;
            padding-top: 1px;
            padding-left: 9px;
            padding-right: 9px;
            padding-bottom: 2px;
        }
        .application .el-table--enable-row-transition .el-table__body td:hover{
            cursor: pointer;
        }
        .childtab .el-table--enable-row-transition .el-table__body td:hover{
            cursor: initial;
        }
        .childtab .el-tabs__content .right{
            margin-left: 560px;
        }
        .childtab .el-input--small .el-input__inner{
            height: 40px!important;
        }
        .childtab .el-select{
            width: 490px;
        }
        .childtab .el-tabs__content .left_l img{
                float: left;
                margin-right: 10px;
        }
        .childtab .el-tabs__content .right .el-input{
                width: 150px
        }
        .childtab .table-threat{
            margin-top: 20px;
        }
        .content-box{
            overflow-x: hidden;
        }
        .application .confrim .el-form-item__content,.application .ignore .el-form-item__content,.application .positives .el-form-item__content{
            margin-left:0!important;
        }
        .application .el-tabs__content{
                position: absolute;
                width: 98%;
                height: 100%;
        }
        .application .el-tabs__content .el-tabs__content{
            overflow: auto;
        }

        .application .el-step{
            position: relative;
        }
        .assetsEvent .is-horizontal .el-step__main{
            width: 300px;
            height: 60px;
            background: #fff;
            border:2px solid #eee;
            position: absolute;
        }
        .assetsEvent .is-horizontal:nth-of-type(1) .el-step__main{
            top: -100px;
        }
        .assetsEvent .is-horizontal:nth-of-type(2) .el-step__main{
            top: 100px;
        }
        .assetsEvent .is-horizontal:nth-of-type(3) .el-step__main{
            top: -100px;
        }
        .childtab .el-tabs__nav-wrap{
            padding-left: 0!important;
        }
        .application .el-tabs__nav-wrap:first-child{
            padding-left: 30px;
        }
        .application .el-table td:first-child .cell, .application .el-table th:first-child .cell{
            padding-left: 15px;
        }
        .application .cell{
            display: flex;
            justify-content: center;
            color:#5a5e66;
        }
        .application .cell a{
                color:#666;
        }
        .application .cell a .iconfont{
                font-size: 22px;
        }
        .application tbody td{
            text-align: center;
        }
        .application .el-table th{
            text-align: center;
        }
        .application .msg{
            display: inline;
            margin-left: 5px;
        }
        .application .msg span{
            color: red;
        }
        .application .el-tabs__content .el-table__footer-wrapper,application .el-tabs__content .el-table__header-wrapper{
            margin-top: 10px;
        }
        .application .handle-input{
            width: 200px!important;
        }
</style>
<style lang="scss" scoped>
    @font-face {
        font-family: 'iconfont';  /* project id 754796 */
        src: url('//at.alicdn.com/t/font_754796_unuppz69hv.eot');
        src: url('//at.alicdn.com/t/font_754796_unuppz69hv.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_754796_unuppz69hv.woff') format('woff'),
        url('//at.alicdn.com/t/font_754796_unuppz69hv.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_754796_unuppz69hv.svg#iconfont') format('svg');
    }
    .layer{
        width: 74%;
        height: 100%;
        background: #fff;
        position: fixed;
        box-shadow:1px 1px 15px 1px #b7b7b7;
        top: 0;
        z-index: 99;
        transition: all 0.3s linear;
        .layer-header{
            height: 65px;
            padding-left: 30px;
            border-bottom: 1px solid #ddd;
            line-height: 65px;
            .head-content{
                float: left;
                display: flex;
                align-items: center;
                .title{
                    margin-left: 20px;
                }
            }
                .head-close{
                    float: right;
                    margin-right: 20px;
                    cursor: pointer;
                    font-family: '微软雅黑';
                    font-size: 20px;
                    position: absolute;
                    right: 0;
                    z-index: 10001;
                }
        }
        .layer-content{
            margin-top: 12px;
        }
        .btn-list{
            .list-item{
                width: 37px;
                height: 20px;
                line-height: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                float: left;
                color: #fff;
                border-color: transparent;
                margin-right:8px;
                margin-left:5px;
            }
            .list-item.blue{
                background: #409dff
            }
            .list-item.orange{
                background: #ff9933
            }
            .list-item.pink{
                background: #f56b6b;
            }
        }

    }
   
    .information{
        width: 30%;
        height: 676px;
        border:1px solid #ddd;
        margin-left: 40px;
        overflow: auto;
        float: left;
        .infomation-list{
            margin-top:55px;
            .border{
                // color:#d7d7d7;
                border:0.5px dashed #d7d7d7;
            }
            p{
                color:#666;
            }
            li{
                padding-left:31%;
                padding-right:17%;
                margin-bottom: 15px;
                font-size:14px;
                span{
                    color: #409EFF;
                }
            }
        }

    }
    .monitoringcount{
        width: 62%;
        height: 676px;
        border: 1px solid #ddd;
        margin-left: 30px;
        display: inline-block;
        position: relative;
        overflow: auto;
        .border{
            position: absolute;
            left: 50%;
            top: 120px;
            margin-left: -231px;
            z-index: 1;
        }
        .count-list{
            height: 560px;
            margin: 55px auto;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            li{
                width: 150px;
                height: 150px;
                border:1px solid #ddd;
                border-radius: 50%;
                position: absolute; 
                background: #fff;
                z-index: 2;
            .item-arrow{
                position: absolute;
            }

            .item-box{
                    text-align: center;
                    span{
                        font-size: 40px;
                        line-height: 95px
                    }
                }
            }
            .list-bg{
                img{
                    width: 150px;
                    height: 150px;
                }
            }
            li:nth-of-type(1){
                .item-arrow{
                    top: 68px;
                    left: 159px;
                    transform: rotate(11deg);
                }
                top: 0px;
                left: 220px;
                    span{
                        color: #3a92c0;
                    }

            }
            li:nth-of-type(2){
                left: 0px;
                top: 180px;
                span{
                        color: #53a169;
                    }
             .item-arrow{
                top: -21px;
                left: 99px;
                transform: rotate(-50deg);
                }
            }
            li:nth-of-type(3){
                right: 0px;
                top: 180px;
                span{
                        color: #5FB878;
                    }
                 .item-arrow{
                    top: 150px;
                    left: 70px;
                    transform: rotate(100deg);
                }
            }
            li:nth-of-type(4){
                left: 100px;
                top: 405px;
                span{
                        color: #F7A358
                    }
                 .item-arrow{
                    top: 2px;
                    left: 0px;
                    transform: rotate(-135deg);
                }
            }
            li:nth-of-type(5){
                right: 100px;
                top: 405px;
                span{
                        color: #42A7DB
                    }
                  .item-arrow{
                top: 101px;
                transform: rotate(170deg);
                left: -9px;
                }
            }
        }
    }
    .availability{
        width: 1435px;
        height: 675px;
        border: 1px solid #ddd;
        margin-left: 40px;
        .leftContent{
            width: 500px;
            height: 500px;;
        }
    }
    $unit: 170px;
    .assetsEvent{
           .arrow{
                img{
                    position: absolute;
                    top: 50%;
                    margin-top: -42px;
                    cursor: pointer;
                }    
                img:first-child{
                    left:5px;
                } 
                img:last-child{
                    right:5px;
                }       
            }
        .assetTime{
            width: 1210px;
            height: 3px;
            background: #1D9ED9;
            position: relative;
            top: 240px;
            left: 50px;
            li{
                width: 10px;
                height: 10px;
                background: #199ed8;
                border-radius: 50%;
                float: left;
                position: absolute;
                top: -4px;
                .item-box,.item-box .item-bg{
                    width: 300px;
                    height: 70px;
                    background: #fff;
                    position: absolute;
                    color: #666;
                    font-size: 14px;
                    z-index: 1;
                    cursor: pointer;
                    .item-content{
                        padding-left: 20px;
                        position: relative;
                        z-index: 2;
                        .item-name{
                            margin-top: 8px;
                        }
                        .time{
                            display: flex;
                            align-content: center;
                            align-items: center;
                            margin: 5px auto;
                            p{
                                display: inline;
                                color: #999;
                                margin-left: 5px
                            }
                        }
                    }
                }
            }
            li:nth-of-type(1){
                left: $unit*1-30;
                .item-box{
                    top: -150px;
                    left: -140px;
                }
            }
            li:nth-of-type(2){
                left: $unit*2;
                .item-box{
                    bottom: -150px;
                    left: -140px;
                }     
            }
            li:nth-of-type(3){
                left: $unit*3;
                .item-box{
                    top: -150px;
                    left: -140px;
                }     
            }
            li:nth-of-type(4){
                left: $unit*4;
                .item-box{
                    bottom: -150px;
                    left: -150px;
                }
            }
            li:nth-of-type(5){
                left: $unit*5;
                .item-box{
                    top: -150px;
                    left: -150px;
                }
            }
            li:nth-of-type(6){
                left: $unit*6;
                .item-box{
                    bottom: -150px;
                    left: -150px;
                }
            }
            li:nth-child(2n){
                 .item-box{
                    .item-name{
                            margin-top: 17px;
                    }
                }
            }
            li:last-child{
                width: 20px;
                height: 20px;
                right: 0;
                left: auto;
                top: -9px;
            }
        }

    }
    .application .table .showSetting .el-form-item__label {
        color:red
    }
    .application .tips{
        display: none;
    }

</style>