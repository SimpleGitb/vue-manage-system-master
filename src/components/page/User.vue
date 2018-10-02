<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" v-loading="loading2">
            <div class="handle-box">
               <div class="left">
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addUser">添加用户</el-button>
                    <el-cascader
                    size="small"
                    placeholder="请选择地址"
                    :options="options"
                    v-model="selectedOptions"
                    @change="handleChange">
                    </el-cascader>
                    <!-- 省市区三级联动 -->
                    <el-input v-model="select_word" @change="changeInput" placeholder="输入搜索内容" class="handle-input mr10"></el-input>
                    <el-select v-model="valueSelect1" filterable placeholder="请选择" class="selectType" @change="selectType">
                        <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- 搜索类型 -->
                    <el-button type="primary" icon="el-icon-search" @click="sendSearch">搜索</el-button>
               </div>
                <div class="right">
                    <el-button type="danger" icon="el-icon-delete" @click="deleteAllInput">批量删除</el-button>
                </div>
            </div>


        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="姓名" width="120">
                <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column prop="" label="邮箱">
                <template slot-scope="scope">{{ scope.row.email }}</template>
            </el-table-column>
            <el-table-column prop="" label="账户类型">
                <template slot-scope="scope">{{ scope.row.role }}</template>
            </el-table-column>
            <el-table-column prop="" label="手机">
              <template slot-scope="scope">{{ scope.row.phone }}</template>
          </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <div class="play" @click="handleDisable(scope.row,$event)"></div>
            <div class="edit"  @click="handleEdit(scope.row)"></div>
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
        <el-dialog title="编辑用户" :visible.sync="editVisible" width="35%">
            <el-form :label-position="labelPosition" label-width="100px" :model="form">
                <el-form-item label="姓名" >
                    <el-input v-model="alertData.name" class="alertInput"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="alertData.password" class="alertInput"></el-input>
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
                 <el-form-item label="电话号码">
                    <el-input v-model="alertData.phone" class="alertInput"></el-input>
                </el-form-item>
                <el-form-item label="账户类型">
                    <el-select v-model="alertData.role" filterable placeholder="请选择" class="selectType1" @change="alertAccount">
                        <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="电子邮箱">
                    <el-input v-model="alertData.email" class="alertInput"></el-input>
                </el-form-item>
                <el-form-item label="备注" >
                    <el-input v-model="alertData.remark" class="alertInput"></el-input>
                </el-form-item>
                <el-form-item label="是否通知">
                        <el-switch v-model="delivery"></el-switch>
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
import { regionDataPlus} from 'element-china-area-data';
// 省市区三级联动
    export default {
        name: 'basetable',
        data() {
            return {
                labelPosition: 'center',
                loading2:true,
                // 表单对齐
                options: regionDataPlus,
                selectedOptions: [],
                // 用户界面三级联动
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
                valueSelect1: 'name',
                totalpage:0,
                // 搜索类型
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                checkarr:[],
                select_cate: '',
                select_word: '',
                province:'',
                city:'',
                county:'',
                name:'',
                email:'',
                phone:'',
                del_list: [],
                is_search: false,
                delVisible:false,
                editVisible: false,
                delivery:false,
                isdsable:false,
                deleteArr:[],
                // 用户管理界面
                alertAdress: regionDataPlus,
                selectedAlertAdress: [],
                // 弹出框省市区三级联动
                options2: [{
                value: 1,
                label: '管理员'
                }, {
                value: 2,
                label: '销售'
                }, {
                value: 3,
                label: '应急响应'
                }],
                // 弹出框搜索类型
                active:'icon-bofang',
                str:''  ,
                alertData:{
                    name:'',
                    phone:'',
                    email:'',
                    password:'',
                    remark:'',
                    role:1,
                    province:'',
                    city:'',
                    county:'',
                },
                alertTotalData:{
                    status:1,
                    msg:'',
                },
                select: '',
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1,
                id:-1
            }
        },
        created() {
            this.loading2 = false;
            this.getData(this.cur_page);
        },
        computed: {
            data() {
                this.name="";
                this.phone="";
                this.email="";
                this.cur_page=1;
                // 请求完成将值清空
                return this.tableData;
                return this.alertData;
                return this.alertTotalData;
            }
        },
        methods: {
            // 省市区三级联动
             handleChange (value) {
                this.province=value[0];
                this.city=value[1];
                this.county=value[2];
            //   console.log(this.province)
            //   console.log(this.city)
            // console.log(this.county)

            },
            changeInput(val){
                this.select_word=val;
                // console.log(this.select_word)
            },
            // 获取搜索框中的内容
            selectType(val){
                this.valueSelect1=val
                // console.log(this.valueSelect1)
            },
            // 获取下拉选项中的选项值
            sendSearch(){

                if(!this.select_word){
                    alert('请输入搜索内容');
                    return;
                };

                 if(this.valueSelect1 == 'name'){
                     this.name=this.select_word
                 }
                 if(this.valueSelect1 == 'email'){
                     this.email=this.select_word
                 }
                 if(this.valueSelect1 == 'phone'){
                     this.phone=this.select_word
                 }
                //  进行判断将选项值和搜索框的内容相结合
                this.$axios.get('api/user?limit=10&province='+this.province+'&city='+(this.city ? this.city : '')+'&county='+(this.county ? this.county : '')+'&'+this.valueSelect1+'='+this.select_word).then((res)=>{
                    this.tableData=res.data.data.data;
                    
                    for(var i=0;i<this.tableData.length;i++){

                        this.tableData[i].active = true;

                        if(this.tableData[i].role == 1){
                            this.tableData[i].role="管理员"
                        }
                        if(this.tableData[i].role == 2){
                            this.tableData[i].role="销售人员"
                        }
                        if(this.tableData[i].role == 3){
                            this.tableData[i].role="应急响应"
                        }
                       if(this.tableData[i].phone == "null"){
                            this.tableData[i].phone=""
                        }
                    }
                })

            },
           handleChange1(val){
                this.alertData.province=val[0];
                this.alertData.city=val[1];
                this.alertData.county=val[2]
                this.selectedAlertAdress=val;
                    // 弹框的地址
           },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData(this.cur_page);
                // console.log(this.cur_page)
            },
            // 获取 easy-mock 的模拟数
            alertAccount(val){
                this.alertData.role=val
                // console.log(val);
            },
            getData() {
                this.$axios.get('api/user',{
                    params:{
                        limit:10,
                        page:this.cur_page
                    }
                }).then((res)=>{
                    this.totalpage = Math.ceil(res.data.data.count / res.data.data.data.length)*10;
                    this.tableData=res.data.data.data;
                    for(var i=0;i<this.tableData.length;i++){

                        this.tableData[i].active = true;

                        if(this.tableData[i].role == 1){
                            this.tableData[i].role="管理员"
                        }
                        if(this.tableData[i].role == 2){
                            this.tableData[i].role="销售人员"
                        }
                        if(this.tableData[i].role == 3){
                            this.tableData[i].role="应急响应"
                        }
                       if(this.tableData[i].phone == "null"){
                            this.tableData[i].phone=""
                        }
                    }
                    // this.total=this.totalData.count;
                    // console.log(this.total)
                    // 获取总页数
                    // console.log(this.tableData)

                })
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.id = index.id;
                this.editVisible = true;
                this.getAlertData(index.id);
                // 点击编辑按钮获取数据
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
                this.selectedAlertAdress=[this.alertData.province,this.alertData.city,this.alertData.county]
                    // console.log(this.alertTotalData);
                    // console.log(this.alertTotalData.status);
                // this.alertData.province=CodeToText[this.alertData.province];
                // this.alertData.city=CodeToText[this.alertData.city];
                // this.alertData.county=CodeToText[this.alertData.city];
                // console.log(this.selectedAlertAdress)
               })
            },
            // 发送请求获取弹窗的数据
            handleDisable(obj,ev) {

                this.id = obj.id;
                this.$axios.post("api/user"+obj.id+"/alive").then((res)=>{
                this.idx = obj.id;
                // this.delVisible = true;
                if(ev.target.className == 'stop'){
                    ev.target.className = 'play'
                    this.$message({
                        message:res.data.msg,
                        type:'success',
                        duration:1000
                    });
                }else{
                    ev.target.className = 'stop'
                    this.$message({
                        message:res.data.msg,
                        type:'warning',
                         duration:1000
                     });
                }
               })
            },
            addUser() {
                // const length = this.multipleSelection.length;
                // let str = '';
                // this.del_list = this.del_list.concat(this.multipleSelection);
                // for (let i = 0; i < length; i++) {
                //     str += this.multipleSelection[i].name + ' ';
                // }
                // this.$message.error('删除了' + str);
                // this.multipleSelection d= [];
                this.$router.push({
                    name:'form'
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                // console.log(this.multipleSelection)
            },
            // 保存编辑
            saveEdit() {
                // this.$set(this.alertData, this.idx);
                // this.id=this.tableData[this.idx].id;
                   if(this.alertData.role == "管理员"){
                       this.alertData.role=1
                   }
                   if(this.alertData.role == "销售"){
                       this.alertData.role=2
                   }
                   if(this.alertData.role == "应急响应"){
                       this.alertData.role=3
                   }
                this.$axios.post("api/user/"+this.id,{
                    province:this.alertData.province,
                    city:this.alertData.city,
                    county:this.alertData.county,
                    role:this.alertData.role,
                    phone:this.alertData.phone,
                    name:this.alertData.name,
                    email:this.alertData.email,
                    remark:this.alertData.remark,
                    receive:Number(this.delivery)
                }).then((res)=>{
                    // this.alertTotalData=res.data;
                    this.getData(this.cur_page);
                    // console.log(this.alertTotalData);
                })
                // 提交数据给后台
                this.editVisible = false;
                // if(this.alertTotalData.status==0){
                //     this.$message({
                //         message:'信息提交失败',
                //         type:'danger',
                //     });
                // }
                // if(this.alertTotalData.status==1){
                //     this.$message({
                //         message:'信息已经提交',
                //         type:'success',
                //     });
                // }
                // this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            // 确定删除
            deleteRow(){
                // this.tableData.splice(this.idx, 1);
                for(var i=0;i<this.multipleSelection.length;i++){
                    this.deleteArr.push(this.multipleSelection[i].id);
                };
               this.$axios.delete('api/user',{
                    data: {id: this.deleteArr}
               }).then((res)=>{
                    let data = res.data;
                    this.$message.success(data.msg);
                    this.delVisible = false;
                    this.deleteArr = [];
                    this.getData();
                })
            },
             deleteAllInput(){    
                if(!this.multipleSelection.length){
                    alert('请选择用户');
                }else{
                   this.delVisible = true;
                }
            },
            changepage(t,ev){
                 this.$axios.get('api/user?limit=10&page='+t+'').then((res)=>{
                      let data = res.data;
                      this.tableData = data.data.data;
                })
            }
        }
    }

</script>

<style scoped lang="less">


    .handle-box {
        display:flex;
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
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }

   .el-cascader .el-input__inner{
       height:32px;
       line-height:32px;

   }
   .el-table--small{
       font-size:14px;
   }
  .selectType{
      width:12%;
  }

  .el-form-item--small,.el-form-item__label{
      line-height:40px;
      height:40px;
  }
    .alertInput{
        width:80%;
    }
    .selectType1{
        width:40%;
    }
    .corn{
        display:inline-block;
        font-size:20px;
        cursor: pointer;
    }
    tbody td{
        text-align: center;
        border:1px solid #ebeef5;
    }
    .edit{
        width: 19px;
        height: 20px;
        background: url("../../../static/img/update.png") no-repeat -41px -25px;
        display: inline-block;
        margin-left: 10px;
        cursor: pointer;
    }
    .stop{
        width: 24px;
        height: 24px;
        background: url("../../../static/img/update.png") no-repeat -23px 0px;
        display: inline-block;
        margin-left: 10px;
        cursor: pointer;
    }

    .el-table>td{
        border:1px solid #ebeef5
    }

    .play{
        width: 24px;
        height: 24px;
        background: url("../../../static/img/update.png") no-repeat -60px -22px;
        display: inline-block;
        margin-left: 10px;
        cursor: pointer;
    }
</style>
<style>

    .el-table{
        border-right: 1px solid #ddd;
    }

    .cell{
        display: flex;
        justify-content: center
    }
    .edit{
        margin-top: 1px;
    }
    .el-table td:first-child .cell, .el-table th:first-child .cell{
            padding-left: 15px;
        }

    .el-table td:first-child{
        border-left: none;
    }
    .has-gutter th:first-child{
        border-left: none!important;
    }

    table{
        border-top: 1px solid #ddd;
    }
    .el-table__header{
        border-left: 1px solid #ddd;
    }

    .el-table--small{
        border-bottom: none!important;
    }
  
   .el-table--enable-row-transition .el-table__body td{
        text-align: center;
    }

    .el-table th{
        text-align: center;
    }

    td{
        border-right: 1px solid #ddd
    }
    .el-table td, .el-table th.is-leaf{
        border: none;
        border-left:1px solid #ebebeb;
    }

    .el-table td{
        border-bottom: 1px solid #ddd
    }
    
    .el-table--enable-row-transition .el-table__body td:first-child{
        border-left: 1px solid #ddd;
    }

    .el-table--enable-row-transition .el-table__body td:last-child{
        border-right: 1px solid #ddd;
    }




</style>
