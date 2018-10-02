<!--<template>
    <div>
           <el-form :label-position="labelPosition" :rules="rules" label-width="100px" :model="form">
                <el-form-item label="单位名称" > 
                    <el-input v-model="alertData.owner" class="alertInput" prop="name"></el-input>
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
                 <el-form-item label="联系邮箱">
                    <el-input v-model="alertData.email" class="alertInput" prop="email"></el-input>
                </el-form-item>    
                   <el-form-item label="联系人">
                    <el-input v-model="alertData.name" class="alertInput" prop="name"></el-input>
                </el-form-item>  
                 <el-form-item label="联系电话">
                    <el-input v-model="alertData.phone" class="alertInput" prop="name"></el-input>
                </el-form-item>                
                <el-form-item label="所属销售">
                    <el-select v-model="alertData.role" filterable placeholder="请选择" class="selectType1" @change="alertAccount">
                        <el-option                
                            v-for="item in options2"
                            :key="item.id"
                            :label="item.label"
                            :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>             
                <el-form-item label="备注" >
                    <el-input v-model="alertData.remark" prop="name" class="alertInput"></el-input>
                </el-form-item>
                <el-form-item label="是否为客户">
                        <el-switch v-model="alertData.delivery" prop="name"></el-switch>
                    </el-form-item>     
                  <el-form-item label="地域管理">
                <el-switch v-model="alertData.area" prop="name"></el-switch>
            </el-form-item>    
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </div> 
    </div>
</template>

<script>
    import {
        regionDataPlus
    } from 'element-china-area-data'

    export default {
        data() {
            return {
                labelPosition: 'center',
                 form: {
                    name: '',
                    date: '',
                    address: ''
                },
                multipleSelection: [],
                options: regionDataPlus,
                selectedOptions: [],
                select_word: '',
                alertAdress: regionDataPlus,
                alertData:{
                    owner:'',
                    email:'',
                    name:'',
                    remark:'',
                    area :false,
                    role:'',
                    delivery:false,
                    salesman_id:''
                },
                selectedAlertAdress:[],
                options2: [],
                rules: {
                    name: [
                        { required: true, message: '请填写该表单', trigger: 'blur' },               
                    ],
                    password: [
                        { required: true, message: '请填写该表单', trigger: 'blur' },               
                    ],
                    phone: [
                        { required: true, message: '请填写该表单', trigger: 'blur' },               
                    ],
                    address: [
                        { required: true, message: '请填写该表单'}
                    ],
                    email: [
                        { required: true, message: '请填写该表单', trigger: 'blur' }
                    ]
                }
            }
        },

        methods: {
            handleChange(value) {},
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
                for(var i=0;i<this.options2.length;i++){
                        if(!this.options2[i].name.indexOf(val)){
                                this.alertData.salesman_id=this.options2[i].id;
                        }
                };
                this.alertData.role = val;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleChange1(val){
                this.alertData.province=val[0];
                this.alertData.city=val[1];
                this.alertData.county=val[2]
                this.selectedAlertAdress=val;
                    // 弹框的地址   
           },
            saveEdit(){
                this.$axios.post("api/owner",{
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
                        let data = res.data
                         alert(data.msg);
                        if(data.status == 1){
                            this.$router.push('/unitlist');
                        };
                    });
                }
        },
        created(){
                this.$axios.get("api/user/select/all").then((res)=>{   
                        let data = res.data;
                        this.options2 = data.data;
                    });
            }
    }

</script>
<style lang="less" scoped>


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
        text-align: center
    }

 
    .el-cascader .el-input__inner {
        height: 32px;
        line-height: 32px;
    }

    .el-table--small {
        font-size: 14px;
        width: 100px;
    }

    .el-table thead{
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
        display: block;
        margin: 0 auto;
    }

    thead th{
      text-align: center
    }


</style>-->
