<template>
    <div class="table">
        <div class="crumbss">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 单位列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container"  v-loading="loading2">
            <div class="handle-box">
            <div class="left">
        <div class="crumbs" @click="addunit">
            <el-breadcrumb>
                <el-breadcrumb-item style="float:none"><i class="el-icon-circle-plus" style="color:#fff"></i> <span style="color:#fff">添加单位</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>                <!-- 省市区三级联动 -->
                <el-form-item label="地址" class="selectAddress">
                </el-form-item>
                    <el-cascader
                    size="small"
                    placeholder="请选择地址"
                    :options="options"
                    v-model="selectedOptions"
                    @change="handleChange">
                    </el-cascader>
                <!-- 搜索类型 -->
                <el-input v-model="select_word" placeholder="输入单位名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="sendSearch">搜索</el-button>
            </div>
            <div class="right">
                <el-button type="danger" icon="el-icon-delete" @click="deleteAllInput">批量删除</el-button>
            </div>
            </div>


        <el-table ref="multipleTable" :data="tableData3"  style="width: 100%;" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="单位" width="120">
                <template slot-scope="scope">{{ scope.row.owner }}</template>
            </el-table-column>
            <el-table-column prop="" label="站点数量">
                <template slot-scope="scope">{{ scope.row.site_count }}</template>
            </el-table-column>
            <el-table-column prop="" label="异常站点数">
                <template slot-scope="scope">{{ scope.row.threat }}</template>
            </el-table-column>
            <el-table-column prop="" label="所属销售">
              <template slot-scope="scope">{{ scope.row.salesman }}</template>
          </el-table-column>
              <el-table-column prop="" label="应急响应">
              <template slot-scope="scope">{{ scope.row.salesman }}</template>
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

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑单位" :visible.sync="editVisible" width="35%">
            <el-form label-width="100px">
                <el-form-item label="单位名称" >
                    <el-input v-model="alertData.name" class="alertInput"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                     <el-cascader
                    size="small"
                    placeholder="请选择地址"
                    :options="alertAdress"
                    v-model="selectedAlertAdress"
                    @change="handleChange1">
                    </el-cascader>
                </el-form-item>
                  <el-form-item label="修改密码">
                    <el-input v-model="alertData.password" class="alertInput"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱">
                    <el-input v-model="alertData.email" class="alertInput"></el-input>
                </el-form-item>
                 <el-form-item label="联系人">
                    <el-input v-model="alertData.contact" class="alertInput"></el-input>
                </el-form-item>
                  <el-form-item label="联系电话">
                    <el-input v-model="alertData.phone" class="alertInput"></el-input>
                </el-form-item>               
                <el-form-item label="所属销售">
                    <el-select v-model="alertData.role" filterable placeholder="请选择" class="selectType1" @change="alertAccount">
                        <el-option
                        v-for="item in options2"
                        :key="item.id"
                        :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" >
                    <el-input v-model="alertData.remark" class="alertInput"></el-input>
                </el-form-item>
                 <el-form-item label="是否为客户">
                        <el-switch v-model="alertData.delivery"></el-switch>
                    </el-form-item>               
                <el-form-item label="地域管理">
                        <el-switch v-model="alertData.area"></el-switch>
                    </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import {
        regionDataPlus
    } from 'element-china-area-data';

    export default {
        data() {
            return {
                labelPosition: 'center',
                loading2:true,
                tableData3: '',
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
               options1: [{
                    value: 'name',
                    label: '姓名'
                    }, {
                    value: 'phone',
                    label: '电话'
                    }, {
                    value: 'email',
                    label: '邮箱'
                }],
                cpage:1,
                isdsable:false,
                delVisible:false,
                multipleSelection: [],
                fullscreenLoading:false,
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
               this.$axios.get("api/owner?page="+t+"&limit=10").then((res)=>{
                        let data = res.data;
                        this.tableData3 = data.data;
               }).catch(v=>{
                    console.log(v)
               })
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
                this.$axios.get("api/user/"+n,).then((res)=>{
                   this.alertData=res.data.data
                //    console.log(this.alertData)
                   if(this.alertData.role == 1){
                       this.alertData.role="管理员"
                   }
                   if(this.alertData.role == 2){
                       this.alertData.role="销售"
                   }
                   if(this.alertData.role == 3){
                       this.alertData.role="应急响应"
                   }                   
                    // console.log(this.alertTotalData);
                    // console.log(this.alertTotalData.status);
                // this.alertData.province=CodeToText[this.alertData.province];
                // this.alertData.city=CodeToText[this.alertData.city];
                // this.alertData.county=CodeToText[this.alertData.city];
                // console.log(this.selectedAlertAdress)
               })
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
                    console.log(this.alertData.province)
                        this.$axios.get("api/owner?page=1&limit=10&province="+(this.alertData.province ? this.alertData.province :'')+'&'+'city='+(this.alertData.city ? this.alertData.city : '')+'&'+
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
               this.$axios.delete('api/owner',{
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
                this.$axios.get("api/owner?page="+this.cpage+"&limit=10",).then((res)=>{
                    this.totalpage = Math.ceil(res.data.data.count / res.data.data.data.length)*10;
                    let data = res.data.data;
                    this.tableData3 = data.data;
              });
            },
            edit(scope){
                this.editVisible = true;
                this.id = scope.row.id;
                this.$axios.get("api/owner/"+scope.row.id+"").then((res)=>{
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
                this.$axios.post("api/owner/"+this.id,{
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
            }
        },
        created(){
            this.loading2 = false;
            this.getUnitList();
            this.$axios.get("api/user/select/all").then((res)=>{ 
                let data = res.data;
                this.options2 = data.data;
            });
        },
         selectType(val){
                // this.valueSelect1=val
                // console.log(this.valueSelect1)
            },
            // 获取下拉选项中的选项值
    }

</script>
<style lang="less" scoped>

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

    .selectType1 {
        width: 40%;
    }

    .corn {
        display: inline-block;
        font-size: 20px;
        cursor: pointer;
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

  .el-dialog{
    width: 630px;
    }

    .msg{
    display: inline;
    }
    .msg span{
      color: red;
}

.el-table td.is-leaf:first-child{
    border-left:none;
}

 .el-table th.is-leaf{
    border-bottom: none;
    border-left: 1px solid #ddd;
}




.handle-input{
    width: 200px!important;
}

</style>
