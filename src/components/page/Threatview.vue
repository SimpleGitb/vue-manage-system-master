<template>
    <div class="table threatview">
        <div class="crumbss">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 威胁详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container"  v-loading="loading2">
            <div class="handle-box">
            <div class="left">
                </div>
                <div>
                    <el-tabs>
                        <el-tab-pane label="最新威胁">
                            <div class="left_l">
                                <!-- 省市区三级联动 -->
                                <img src="../../../static/img/monitoring/screening.png">
                                <span>筛选:</span>
                                  <el-select v-model="valueSelect1" multiple placeholder="请选择">
                                        <el-option
                                        v-for="item in options1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                                <!-- 搜索类型 -->
                                <el-button type="primary" icon="el-icon-search" @click="sendSearch">确定</el-button>
                            </div>
                            <div class="right">
                                <el-input placeholder="请输入关键词"></el-input>
                                <el-button type="primary" icon="el-icon-search" @click="sendSearch">搜索</el-button>
                            </div>
                            <div class="table-threat">
                                     <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark"  @selection-change="handleSelectionChange">
                                        <el-table-column type="selection" width="55">
                                        </el-table-column> 
                                        <el-table-column label="主管单位" width="120">
                                            <template slot-scope="scope">{{ scope.row.directorUnit }}</template>
                                        </el-table-column>
                                        <el-table-column prop="" label="单位">
                                            <template slot-scope="scope">{{ scope.row.unit }}</template>
                                        </el-table-column>
                                         <el-table-column prop="" label="URL">
                                            <template slot-scope="scope">{{ scope.row.url }}</template>
                                        </el-table-column>
                                          <el-table-column prop="" label="敏感链接">
                                            <template slot-scope="scope">{{ scope.row.sensitiveUrl }}</template>
                                        </el-table-column> 
                                          <el-table-column prop="" label="发生时间">
                                            <template slot-scope="scope">{{ scope.row.happenTime }}</template>
                                        </el-table-column>                                                    
                                         <el-table-column prop="" label="关键词">
                                            <template slot-scope="scope">{{ scope.row.keywords }}</template>
                                        </el-table-column>           
                                        <el-table-column prop="" label="类型">
                                            <template slot-scope="scope">{{ scope.row.type }}</template>
                                        </el-table-column>
                                        <el-table-column prop="" label="快照">
                                            <template slot-scope="scope">
                                                <i class="el-icon-picture"></i>
                                            </template>
                                        </el-table-column>
                                    <el-table-column prop="" label="操作">
                                    <template slot-scope="scope">
                                        <div class="btn-list">
                                            <el-button type="primary" class="list-item blue">确认</el-button>
                                            <el-button type="primary" class="list-item orange">忽略</el-button>
                                            <el-button type="primary" class="list-item pink">误报</el-button>
                                        </div>
                                    </template> 
                                    </el-table-column>
                                    </el-table>
                                    </div>
                        </el-tab-pane>
                        <el-tab-pane label="待处置" class="waiteSetting">
                            <div class="left_l">
                                <!-- 省市区三级联动 -->
                                <img src="../../../static/img/monitoring/screening.png">
                                <span>筛选:</span>
                                  <el-select v-model="valueSelect1" multiple placeholder="请选择">
                                        <el-option
                                        v-for="item in options1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                                <!-- 搜索类型 -->
                                <el-button type="primary" icon="el-icon-search" @click="sendSearch">确定</el-button>
                            </div>
                            <div class="right">
                                <el-input placeholder="请输入关键词"></el-input>
                                <el-button type="primary" icon="el-icon-search" @click="sendSearch">搜索</el-button>
                            </div>
                          <div class="table-threat">
                              <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark"  @selection-change="handleSelectionChange">
                                    <el-table-column type="selection" width="55">
                                    </el-table-column>
                                    <el-table-column label="主管单位" width="120">
                                        <template slot-scope="scope">{{ scope.row.directorUnit }}</template>
                                    </el-table-column>
                                    <el-table-column prop="" label="单位">
                                        <template slot-scope="scope">{{ scope.row.unit }}</template>
                                    </el-table-column>
                                    <el-table-column prop="" label="URL">
                                        <template slot-scope="scope">{{ scope.row.url }}</template>
                                    </el-table-column>
                                    <el-table-column prop="" label="敏感链接">
                                    <template slot-scope="scope">{{ scope.row.sensitiveUrl }}</template>
                                </el-table-column>
                                    <el-table-column prop="" label="发生时间">
                                    <template slot-scope="scope">{{ scope.row.happenTime }}</template>
                                </el-table-column>
                                    <el-table-column prop="" label="关键词">
                                    <template slot-scope="scope">{{ scope.row.keywords }}</template>
                                </el-table-column>
                                    <el-table-column prop="" label="类型">
                                    <template slot-scope="scope">{{ scope.row.type }}</template>
                                </el-table-column>
                                        <el-table-column prop="" label="快照">
                                            <template slot-scope="scope">
                                                <i class="el-icon-picture"></i>
                                            </template>
                                        </el-table-column>
                                <el-table-column prop="" label="操作">
                                <template slot-scope="scope">
                                         <div class="btn-list">
                                            <el-button type="primary" class="list-item">处置</el-button>
                                        </div>
                                </template>
                                </el-table-column>
                                </el-table>
                          </div>
                        </el-tab-pane>
                        <el-tab-pane label="已处置">
                               <div class="left_l">
                                <!-- 省市区三级联动 -->
                                <img src="../../../static/img/monitoring/screening.png">
                                <span>筛选:</span>
                                  <el-select v-model="valueSelect1" multiple placeholder="请选择">
                                        <el-option
                                        v-for="item in options1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                                <!-- 搜索类型 -->
                                <el-button type="primary" icon="el-icon-search" @click="sendSearch">确定</el-button>
                            </div>
                            <div class="right">
                                <el-input placeholder="请输入关键词"></el-input>
                                <el-button type="primary" icon="el-icon-search" @click="sendSearch">搜索</el-button>
                            </div>
                            <div class="table-threat">
                                      <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" @selection-change="handleSelectionChange">
                                        <el-table-column type="selection" width="55">
                                        </el-table-column> 
                                        <el-table-column label="主管单位" width="120">
                                            <template slot-scope="scope">{{ scope.row.directorUnit }}</template>
                                        </el-table-column>
                                        <el-table-column prop="" label="单位">
                                            <template slot-scope="scope">{{ scope.row.unit }}</template>
                                        </el-table-column>
                                         <el-table-column prop="" label="URL">
                                            <template slot-scope="scope">{{ scope.row.url }}</template>
                                        </el-table-column>
                                          <el-table-column prop="" label="敏感链接">
                                            <template slot-scope="scope">{{ scope.row.sensitiveUrl }}</template>
                                        </el-table-column> 
                                          <el-table-column prop="" label="发生时间">
                                            <template slot-scope="scope">{{ scope.row.happenTime }}</template>
                                        </el-table-column>                                                    
                                         <el-table-column prop="" label="关键词">
                                            <template slot-scope="scope">{{ scope.row.keywords }}</template>
                                        </el-table-column>           
                                        <el-table-column prop="" label="类型">
                                            <template slot-scope="scope">{{ scope.row.type }}</template>
                                        </el-table-column>
                                        <el-table-column prop="" label="快照">
                                            <template slot-scope="scope">
                                                <i class="el-icon-picture"></i>
                                            </template>
                                        </el-table-column>
                                    <el-table-column prop="" label="操作">
                                    <template slot-scope="scope">
                                        <div class="btn-list">
                                            <el-button type="primary" class="list-item">处置</el-button>
                                        </div>
                                    </template> 
                                    </el-table-column>
                                    </el-table>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="误报回收站" class="positivesRecycling">
                             <div class="left_l">
                                <!-- 省市区三级联动 -->
                                <img src="../../../static/img/monitoring/screening.png">
                                <span>筛选:</span>
                                  <el-select v-model="valueSelect1" multiple placeholder="请选择">
                                        <el-option
                                        v-for="item in options1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                                <!-- 搜索类型 -->
                                <el-button type="primary" icon="el-icon-search" @click="sendSearch">确定</el-button>
                            </div>
                                <div class="right">
                                    <el-input placeholder="请输入关键词"></el-input>
                                    <el-button type="primary" icon="el-icon-search" @click="sendSearch">搜索</el-button>
                                </div>
                                <div class="table-threat">
                                     <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" @selection-change="handleSelectionChange">
                                        <el-table-column type="selection" width="55">
                                        </el-table-column> 
                                        <el-table-column label="主管单位" width="120">
                                            <template slot-scope="scope">{{ scope.row.directorUnit }}</template>
                                        </el-table-column>
                                        <el-table-column prop="" label="单位">
                                            <template slot-scope="scope">{{ scope.row.unit }}</template>
                                        </el-table-column>
                                         <el-table-column prop="" label="URL">
                                            <template slot-scope="scope">{{ scope.row.url }}</template>
                                        </el-table-column>
                                          <el-table-column prop="" label="敏感链接">
                                            <template slot-scope="scope">{{ scope.row.sensitiveUrl }}</template>
                                        </el-table-column> 
                                          <el-table-column prop="" label="发生时间">
                                            <template slot-scope="scope">{{ scope.row.happenTime }}</template>
                                        </el-table-column>                                                    
                                         <el-table-column prop="" label="关键词">
                                            <template slot-scope="scope">{{ scope.row.keywords }}</template>
                                        </el-table-column>           
                                        <el-table-column prop="" label="类型">
                                            <template slot-scope="scope">{{ scope.row.type }}</template>
                                        </el-table-column>
                                        <el-table-column prop="" label="快照">
                                            <template slot-scope="scope">
                                                <i class="el-icon-picture"></i>
                                            </template>
                                        </el-table-column>
                                    <el-table-column prop="" label="操作">
                                    <template slot-scope="scope">
                                        <div class="btn-list">
                                            <el-button type="primary" class="list-item">撤销</el-button>
                                        </div>
                                    </template> 
                                    </el-table-column>
                                    </el-table>
                                </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
             <div class="pagination">
                <el-pagination layout="prev, pager, next" :total="totalpage" 
                @current-change="changepage"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import {regionDataPlus} from 'element-china-area-data';
    import echarts from 'echarts';
    import leftContent from './leftContent';
    export default {
        data() {
            return {
                labelPosition: 'center',
                activeName2: 'first',
                loading2:true,
                tableData3: [
                    {
                        id:'1',
                        directorUnit:'合肥网安2', 
                        unit :'芜湖扬子农村商业银行',
                        url:'www.baidu.com',
                        sensitiveUrl:'www.baidu.com',
                        happenTime:'2018.07.04',
                        keywords:'博狗体育,百家乐,乐百家,博狗,葡京',
                        type:'暗链'
                    },
                      {
                        id:'2',
                        directorUnit:'合肥网安2', 
                        unit :'芜湖扬子农村商业银行',
                        url:'www.baidu.com',
                        sensitiveUrl:'www.baidu.com',
                        happenTime:'2018.07.04',
                        keywords:'博狗体育,百家乐,乐百家,博狗,葡京',
                        type:'暗链'
                    },
                    {
                        id:'3',
                        directorUnit:'合肥网安2', 
                        unit :'芜湖扬子农村商业银行',
                        url:'www.baidu.com',
                        sensitiveUrl:'www.baidu.com',
                        happenTime:'2018.07.04',
                        keywords:'博狗体育,百家乐,乐百家,博狗,葡京',
                        type:'暗链'
                    },
                    {
                        id:'4',
                        directorUnit:'合肥网安2', 
                        unit :'芜湖扬子农村商业银行',
                        url:'www.baidu.com',
                        sensitiveUrl:'www.baidu.com',
                        happenTime:'2018.07.04',
                        keywords:'博狗体育,百家乐,乐百家,博狗,葡京',
                        type:'暗链'
                    },
                    {
                        id:'5',
                        directorUnit:'合肥网安2', 
                        unit :'芜湖扬子农村商业银行',
                        url:'www.baidu.com',
                        sensitiveUrl:'www.baidu.com',
                        happenTime:'2018.07.04',
                        keywords:'博狗体育,百家乐,乐百家,博狗,葡京',
                        type:'暗链'
                    },
                    {
                        id:'6',
                        directorUnit:'合肥网安2', 
                        unit :'芜湖扬子农村商业银行',
                        url:'www.baidu.com',
                        sensitiveUrl:'www.baidu.com',
                        happenTime:'2018.07.04',
                        keywords:'博狗体育,百家乐,乐百家,博狗,葡京',
                        type:'暗链'
                    }
                ],
                  alertData:{
                    name:'',
                    password:'',
                    email:'', 
                    contact:'', 
                    phone :'',
                    role :'',
                    remark :'',
                    delivery :'',
                    area:true
                },
                tableData6: [{
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                        }],
               options1: [{
                    value: 'name',
                    label: '劫持事件'
                    }, {
                    value: 'phone',
                    label: '敏感词'
                    }, {
                    value: 'email',
                    label: '可疑链接'
                }],
                fullscreenLoading:false,
                cpage:1,
                isdsable:false,
                delVisible:false,
                multipleSelection: [],
                options: regionDataPlus,
                selectedOptions: [],
                select_word: '',
                editVisible:false,
                totalpage:0,
                deleteArr:[],
                fullscreenLoading:false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                left:'1920px',
                cpage:1,
                alertAdress: regionDataPlus,
                selectedAlertAdress: [],
                options2: [],
                // 弹出框搜索类型
                id:'',
                valueSelect1:'',
                selectType:''
            }
        },

        methods: {
            handleChange(value) {
                this.alertData.province=value[0];
                this.alertData.city=value[1];
                this.alertData.county=value[2]
                this.selectedAlertAdress=value;
            },
            changepage(t){
            //    this.$axios.get("http://monitor.yunsee.vuln.cn/owner?page="+t+"&limit=10").then((res)=>{
            //             let data = res.data;
            //             this.tableData3 = data.data;
            //    }).catch(v=>{
            //         console.log(v)
            //    })
            },
            addunit(){
               this.$router.push({
                    name:'addUnit'
                })
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            alertAccount(val){  
                this.alertData.role=val;
                // console.log(val);
                for(var i=0;i<this.options2.length;i++){
                    if(!this.options2[i].name.indexOf(val)){
                        this.alertData.salesman_id = this.options2[i].id;
                    }
                }
            },
             handleChange1(val){
                this.alertData.province=val[0];
                this.alertData.city=val[1];
                this.alertData.county=val[2]
                this.selectedAlertAdress=val;
                    // 弹框的地址
           },
           getAlertData(n){
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            sendSearch() {
                if(!this.select_word){
                    alert('请输入单位名称');
                    return;
                };
                if(!this.alertData.province&&!this.alertData.city&&!this.alertData.county){
                        this.$axios.get("http://monitor.yunsee.vuln.cn/owner?page=1&limit=10&province="+(this.alertData.province ? this.alertData.province :'')+'&'+'city='+(this.alertData.city ? this.alertData.city : '')+'&'+
                            'county='+(this.alertData.county ? this.alertData.county : '')+'&'+'owner='+this.select_word
                        ).then((res)=>{
                            let data = res.data
                            this.tableData3 = data.data.data;
                        });
                    }
            },
            deleteAllInput() {
                if(!this.multipleSelection.length){
                    alert('请选择单位');
                }else{
                   this.delVisible = true;
                }
            },
            deleteRow(){
                 this.deleteArr = [];
               for(var i=0;i<this.multipleSelection.length;i++){
                    this.deleteArr.push(this.multipleSelection[i].id);
                };
               this.$axios.delete('http://monitor.yunsee.vuln.cn/owner',{
                    data: {id: this.deleteArr}
               }).then((res)=>{
                    let data = res.data;
                    this.$message.success(data.msg);
                    this.delVisible = false;
                    this.getUnitList();
                }).catch((v)=>{
                    this.$message.error('发生了错误');
                    this.delVisible = false;
                    this.getUnitList();
                })
            },
            getUnitList(){
            //     this.$axios.get("http://monitor.yunsee.vuln.cn/owner?limit=1&"+this.cpage+"&limit=10",).then((res)=>{
            //         this.totalpage = Math.ceil(res.data.data.count / res.data.data.data.length)*10;
            //         let data = res.data.data;
            //         this.tableData3 = data.data;
            //   });
            },
            edit(scope){
                this.editVisible = true;
                this.id = scope.row.id;
                this.$axios.get("http://monitor.yunsee.vuln.cn/owner/"+scope.row.id+"").then((res)=>{
                        let data = res.data.data;
                        this.selectedAlertAdress=[data.province,data.city,data.county];
                        this.alertData.name = data.owner;
                        this.alertData.email = data.email;
                        this.alertData.phone = data.phone;
                        this.alertData.owner = data.owner;
                        this.alertData.contact = data.name;
                        this.alertData.remark = data.remark;
                        this.alertData.client  = Boolean(data.client) ;
                        this.alertData.area   = Boolean(data.area);
                        this.alertData.province = data.province;
                        this.alertData.city =  data.city;
                        this.alertData.county = data.county;
                        this.alertData.role = data.salesman;
                });
            },
            saveEdit(){
                this.$axios.post("http://monitor.yunsee.vuln.cn/owner/"+this.id,{
                        province:this.alertData.province,
                        city:this.alertData.city,
                        county:this.alertData.county,
                        owner:this.alertData.owner,
                        email:this.alertData.email,
                        name:this.alertData.name,
                        phone:this.alertData.phone,
                        salesman_id:this.alertData.salesman_id,
                        remark:this.alertData.remark,
                        client:Number(this.alertData.delivery),
                        area:Number(this.alertData.area)
                }).then((res)=>{
                        alert(res.data.msg);
                        if(res.data.status){
                            this.editVisible = false;
                            this.getUnitList();
                        }
                        
                })
            },
        },
        created(){
            this.loading2 = false;
            // this.getUnitList();
            // this.$axios.get("http://monitor.yunsee.vuln.cn/user/select/all").then((res)=>{ 
            //     let data = res.data;
            //     this.options2 = data.data;
            // });
        },
        components:{
            leftContent
        }
    }

</script>

<!--<style lang="scss" scoped>
    ul,li{
        list-style: none;
    }
    .crumbs{
        border-width: 0px;
        width: 130px;
        height: 32px;
        color: #FFF;
        background: #409eff;
        float: left;
        margin-right: 10px;
        border-radius: 5px;
        cursor: pointer;
    }



    .threatview .handle-box .left_l{
        float: left;
        img{
                margin-top: 7px;
                float: left;
                margin-right: 15px;
        }
    }
    .threatview .handle-box .right{
        float: left;
        margin-left: 30px;
        .el-input{
            width: 150px
        }
    }

    .btn-list{
        .list-item{
            width: 43px;
            height: 20px;
            line-height: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            float: left;
            color: #fff;
            border-color: transparent;
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
        }
        li:hover{
            background: #f2f2f2;
        }
        
    }

    .el-breadcrumb{
        text-align: center;
        line-height: 32px;
        cursor: pointer;
    }

    .el-breadcrumb__item:last-child .el-breadcrumb__inner{
        color: #fff;
        cursor: pointer;
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
        width: 100%;
    }

    .el-table__header thead{
          background: #f2f2f2
    }



    .handle-input {
        width: 100px;
    }

    .selectType {
        width: 35%;
    }

    .el-form-item--small,
    .el-form-item__label {
        line-height: 40px;
        height: 40px;
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

    thead th{
      text-align: center
    }

    .is-leaf:last-child{
        border-right: 1px solid #ddd!important;
    }

</style>
<style>
    .threatview .el-table .cell{
            display: flex;
            justify-content: center;
    }
    .el-table__footer-wrapper, .el-table__header-wrapper{
        margin-top: 10px;
    }

    button{
        cursor: pointer;
    }

 .el-table td:first-child .cell, .el-table th:first-child .cell{
        padding-left: 15px;
    }

    table{
        border-top: 1px solid #ddd;
    }
    .el-table__header .has-gutter th:first-child{
        border-left: 1px solid #ddd;
    }

    .has-gutter tr{
        border-right: 1px solid #ddd;
    }

    tbody td{
        text-align: center;
    }

    .el-table th{
        text-align: center;
    }

    td{
        border-left: 1px solid #ddd
    }

  
.el-table td.is-leaf:first-child{
    border-left:none;
}

 .el-table th.is-leaf{
    border-bottom: none;
    border-left: 1px solid #ddd;
}


</style>-->
