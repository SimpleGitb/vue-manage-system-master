<!--<template>
    <div class="table serveTab">
        <div class="crumbss">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 服务器列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container"  v-loading="loading2">
            <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
                <el-table-column label="单位" width="120">
                    <template slot-scope="scope">{{ scope.row.owner }}</template>
                </el-table-column>
                <el-table-column prop="" label="IP">
                    <template slot-scope="scope">{{ scope.row.ip }}</template>
                </el-table-column>
                <el-table-column prop="" label="IDC">
                    <template slot-scope="scope">{{ scope.row.threat }}</template>
                </el-table-column>
                <el-table-column prop="" label="端口" width="520">
                    <template slot-scope="scope">
                        <div class="box"  v-for="item in scope.row.salesman" :key="item.id">
                            <el-popover
                                placement="top-start"
                                title="端口详情"
                                width="200"
                                trigger="hover"
                                :content="scope.row.content"
                                >
                                <el-button slot="reference">{{item}}</el-button>
                            </el-popover>
                        </div>
                    </template>
            </el-table-column>
                <el-table-column prop="" label="事件">
                <template slot-scope="scope">{{ scope.row.event }}</template>
            </el-table-column>
                <el-table-column prop="" label="状态">
                <template slot-scope="scope">{{ scope.row.status }}</template>
            </el-table-column>
            <el-table-column prop="" label="操作">
            <template slot-scope="scope">
                <div class="update" @click="edit(scope)"></div>
            </template> 
            </el-table-column>
            </el-table>
             <div class="pagination">
                <el-pagination layout="prev, pager, next" :total="totalpage" 
                @current-change="changepage"
                >
                </el-pagination>
            </div>
        </div>
         编辑弹出框 
        <el-dialog title="修改" :visible.sync="editVisible" width="23%">
            <el-form  label-width="100px">
                <div class="tip-header">
                    <img src="../../../static/img/assets/qat.png">
                    <p class="tip-msg">提示文字</p>
                </div>
                <div class="editTable">
                    <el-table-column label="姓名" class="list-item item-port">
                        <el-input v-model="alertData.name"></el-input>
                    </el-table-column>
                    <el-table-column label="姓名" class="list-item item-type">
                        <el-input v-model="alertData.name"></el-input>
                    </el-table-column>
                    <el-table-column label="姓名" class="list-item item-value">
                        <el-input v-model="alertData.name" ></el-input>
                    </el-table-column>
                     <el-table-column label="姓名" class="list-item">
                        <img src="../../../static/img/assets/delete.png">
                    </el-table-column>                   
                </div>
                   <div class="editTable">
                    <el-table-column label="姓名" class="list-item item-port">
                        <el-input v-model="alertData.name"></el-input>
                    </el-table-column>
                    <el-table-column label="姓名" class="list-item item-type">
                        <el-input v-model="alertData.name"></el-input>
                    </el-table-column>
                    <el-table-column label="姓名" class="list-item item-value">
                        <el-input v-model="alertData.name" ></el-input>
                    </el-table-column>
                     <el-table-column label="姓名" class="list-item">
                        <img src="../../../static/img/assets/delete.png">
                    </el-table-column>                   
                </div>
                  <div class="editTable">
                    <el-table-column label="姓名" class="list-item item-port">
                        <el-input v-model="alertData.name"></el-input>
                    </el-table-column>
                    <el-table-column label="姓名" class="list-item item-type">
                        <el-input v-model="alertData.name"></el-input>
                    </el-table-column>
                    <el-table-column label="姓名" class="list-item item-value">
                        <el-input v-model="alertData.name" ></el-input>
                    </el-table-column>
                     <el-table-column label="姓名" class="list-item">
                        <img src="../../../static/img/assets/add.png">
                    </el-table-column>                   
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveEdit">确 定</el-button>
                <el-button @click="editVisible = false">取 消</el-button>
            </div>
        </el-dialog>


    </div>
</template>
<script>
    import Vue from 'vue'
    import {regionDataPlus} from 'element-china-area-data';
    import echarts from 'echarts';
    
    export default {
        data() {
            return {
                labelPosition: 'center',
                activeName2: 'first',
                fullscreenLoading:false,
                loading2:true,
                tableData3: [
                    {
                        id:'1',
                        owner:'合肥市政府', 
                        ip :'8.8.8.8',
                        threat:'合肥市电信',
                        salesman :[80,8081,90,80,8081,90], 
                        event:2,
                        status:'基线监测中',
                        content:'当前服务:xxxxxx,当前端口:xxxxx'
                    },
                    {
                        id:'2',
                        owner:'芜湖市政府', 
                        ip :'8.8.8.8',
                        threat:'合肥市电信',
                        salesman :[90,9090,80,21,8081,9011], 
                        event:2,
                        status:'基线监测中',
                        content:'当前服务:xxxxxx,当前端口:xxxxx'
                    },
                    {
                        id:'3',
                        owner:'xxxx市政府', 
                        ip :'8.8.8.8',
                        threat:'合肥市电信',
                        salesman :[8282,80,90,9999,123], 
                        event:2,
                        status:'基线监测中',
                        content:'当前服务:xxxxxx,当前端口:xxxxx'
                    },
                    {
                        id:'4',
                        owner:'合肥市政府', 
                        ip :'8.8.8.8',
                        threat:'合肥市电信',
                        salesman :[9888,8888,123,21,35], 
                        event:2,
                        status:'基线监测中',
                        content:'当前服务:xxxxxx,当前端口:xxxxx'
                    },                    
                    {
                        id:'5',
                        owner:'合肥市政府', 
                        ip :'8.8.8.8',
                        threat:'合肥市电信',
                        salesman :[80,8081,90,80,8081,90], 
                        event:20,
                        status:'基线监测中',
                        content:'当前服务:xxxxxx,当前端口:xxxxx'
                    }
                ],
                  alertData:{
                    name:21,
                    password:'',
                    email:'', 
                    contact:'', 
                    phone :'',
                    role :'',
                    remark :'',
                    delivery :'',
                    area:true
                },
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
            handleClick(tab,event){
                
            },
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
            showTip(){
                        
        },
        getAlertData(n){
                // this.$axios.get("http://monitor.yunsee.vuln.cn/user/"+n,).then((res)=>{
                //    this.alertData=res.data.data
                // //    console.log(this.alertData)
                //    if(this.alertData.role == 1){
                //        this.alertData.role="管理员"
                //    }
                //    if(this.alertData.role == 2){
                //        this.alertData.role="销售"
                //    }
                //    if(this.alertData.role == 3){
                //        this.alertData.role="应急响应"
                //    }                   
                    // console.log(this.alertTotalData);
                    // console.log(this.alertTotalData.status);
                // this.alertData.province=CodeToText[this.alertData.province];
                // this.alertData.city=CodeToText[this.alertData.city];
                // this.alertData.county=CodeToText[this.alertData.city];
                // console.log(this.selectedAlertAdress)
            //    })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
                // this.id = scope.row.id;
                // this.$axios.get("http://monitor.yunsee.vuln.cn/owner/"+scope.row.id+"").then((res)=>{
                //         let data = res.data.data;
                //         this.selectedAlertAdress=[data.province,data.city,data.county];
                //         this.alertData.name = data.owner;
                //         this.alertData.email = data.email;
                //         this.alertData.phone = data.phone;
                //         this.alertData.owner = data.owner;
                //         this.alertData.contact = data.name;
                //         this.alertData.remark = data.remark;
                //         this.alertData.client  = Boolean(data.client) ;
                //         this.alertData.area   = Boolean(data.area);
                //         this.alertData.province = data.province;
                //         this.alertData.city =  data.city;
                //         this.alertData.county = data.county;
                //         this.alertData.role = data.salesman;
                // });
            },
            saveEdit(){
                // this.$axios.post("http://monitor.yunsee.vuln.cn/owner/"+this.id,{
                //         province:this.alertData.province,
                //         city:this.alertData.city,
                //         county:this.alertData.county,
                //         owner:this.alertData.owner,
                //         email:this.alertData.email,
                //         name:this.alertData.name,
                //         phone:this.alertData.phone,
                //         salesman_id:this.alertData.salesman_id,
                //         remark:this.alertData.remark,
                //         client:Number(this.alertData.delivery),
                //         area:Number(this.alertData.area)
                // }).then((res)=>{
                //         alert(res.data.msg);
                //         if(res.data.status){
                //             this.editVisible = false;
                //             this.getUnitList();
                //         }
                        
                // })
            }
        },
        created(){
            // this.getUnitList();
            // this.$axios.get("http://monitor.yunsee.vuln.cn/user/select/all").then((res)=>{ 
            //     let data = res.data;
            //     this.options2 = data.data;
            // });
            this.loading2 = false;
        }
    }

</script>
<style lang="scss" scoped>
    .box{
        .el-button{
            color: #fff;
            padding: 10px;
            float: left;
            border-radius: 20px;
            margin-left: 15px;
            padding-left: 20px;
            padding-right: 20px;
            line-height: 5px;
        }
    }
    .box:nth-of-type(3n+1) {
        .el-button{
            background: #83c695
        }
    }
    .box:nth-of-type(3n-1) {
        .el-button{
            background: #6fb9e2
        }
    }
    .box:nth-of-type(3n) {
        .el-button{
            background: #faac9c
        }
    }
    .tip-header{
        display: flex;
        align-items: center;
        img{
            width: 16px;
            height: 16px;
        }
        .tip-msg{
            display: inline-block;
            margin-left: 15px;
        }
    }

    .port-tip{
        width: 200px;
        padding: 20px;
        background: #000;
        color: #fff;
    }



</style>

<style lang="scss" scoped>

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

    .eel-breadcrumb__item:last-child .el-breadcrumb__inner{
        color: #fff;
        cursor: pointer;
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
        width: 100px;
    }

    .el-table__header thead{
          background: #f2f2f2
    }



    .handle-input {
        width: 100px;
    }

    .selectType {
        width: 12%;
    }

    .el-form-item--small,
    .el-form-item__label {
        line-height: 40px;
        height: 40px;
    }

    .alertInput {
        width: 80%;
    }


    .update{
        width: 19px;
        height: 20px;
        background: url(http://yx_monitor.yunsee.cn/img/update.png) no-repeat -41px -25px;
        cursor: pointer;
        margin: 0 auto;
    }

    thead th{
      text-align: center
    }

    .is-leaf:last-child{
        border-right: 1px solid #ddd!important;
    }

</style>
<style>

    .el-input--small .el-input__inner{
        height: 30px;
        background: #f8f8f8;
    }
    .serveTab .el-dialog__header{
        border-bottom: 1px solid #eee;
        background: #f8f8f8;
    }
    .serveTab .item-port .el-input__inner,.item-type .el-input__inner{
            width: 40px;
            height: 30px;
            border: 1px solid #d7d7d7;
            background: #f8f8f8;
    }
    .serveTab .list-item{
            float: left;
            margin-right: 10px;
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;
            height: 28px;
            margin-top: 10px;
            margin-bottom: 10px;
    }
    .serveTab .list-item img{
        cursor: pointer;
    }
    .serveTab .item-value{
            width: 250px;
            height: 28px;
    }
    .serveTab .el-table tr td:nth-of-type(2),.serveTab .el-table tr td:nth-of-type(6){
           color: #409dff;
     
    }
    .serveTab .el-table tr td:nth-of-type(2),.serveTab .el-table tr td:nth-of-type(6)  div{
            cursor: pointer;
    }
    .serveTab .el-table tr td:nth-of-type(5){
           color: #FF0000;
    }

.el-step{
    position: relative;
}
.assetsEvent .is-horizontal .el-step__main{
    width: 300px;
    height: 60px;
    background: #fff;
    border:2px solid #eee;
    position: absolute;
}


.item-content .el-table__header .has-gutter th:first-child{
    border-left: none
}

.item-content .el-table__body-wrapper tbody td:first-child{
    border-left: none;
}
.item-content .el-table__body-wrapper tbody td:last-child{
    border-right: none;
}

.childtab .el-tabs__nav-wrap{
    padding-left: 0!important;
}

.el-tabs__nav-wrap:first-child{
    padding-left: 30px;
}
 .el-table td:first-child .cell, .el-table th:first-child .cell{
        padding-left: 15px;
    }

    .cell{
        display: flex;
        justify-content: center;
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




</style>-->-->
