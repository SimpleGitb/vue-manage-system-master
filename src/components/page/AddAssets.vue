<!--<template>
    <div class="addAssets">
           <el-form :label-position="labelPosition" label-width="100px" :model="form">
                <el-form-item label="所属单位" > 
                    <el-input v-model="alertData.owner" class="alertInput" prop="name"></el-input>
                    <p class="item-msg"><span>*</span>请选择该网站直属单位，鼠标点击后支持搜索</p>
                </el-form-item>
                  <el-form-item label="名称" > 
                    <el-input v-model="alertData.owner" class="alertInput" prop="name"></el-input>
                    <p class="item-msg"><span>*</span>填写该网站名称(全称)</p>
                </el-form-item>
                  <el-form-item label="网址" > 
                    <el-input v-model="alertData.owner" class="alertInput" prop="name"></el-input>
                    <p class="item-msg"><span>*</span>填写该网站网址，格式：http://www.ah.gov.cn</p>
                </el-form-item>                
                <el-form-item label="选择策略">
                     <el-cascader
                    size="small"
                    placeholder="请选择策略"
                    :options="alertAdress"
                    v-model="selectedAlertAdress"
                    @change="handleChange1">
                    </el-cascader>
                </el-form-item>               
                 <el-form-item label="站点备注">
                    <el-input v-model="alertData.email" class="alertInput" prop="email"></el-input>
                </el-form-item>    
                   <el-form-item label="关联单位">
                    <el-select v-model="valueSelect1" filterable placeholder="请选择" class="selectType" @change="selectType">
                            <el-option
                                v-for="item in options1"
                                :key="item.id"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                    </el-select>
                    <el-button type="primary" @click="addTag">添加</el-button>
                    <p class="item-msg">表示该单位也需要接受或查看该网站的威胁，支持多个单位共同关注</p>
                </el-form-item>
            <el-form-item>
                <el-tag closable  @close="closeTag(item)" v-for="item in tagData" :key="item">
                    {{item}}
                </el-tag>    
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
                tagVal:'',
                valueSelect1:'',
                multipleSelection: [],
                options: regionDataPlus,
                selectedOptions: [],
                select_word: '',
                alertAdress: regionDataPlus,
                options1: [{
                    id:'1',
                    value: '域名',
                    label: '域名'
                    }, {
                    id:2,
                    value: '单位',
                    label: '单位'
                    }],
                tagData:[
                        
                ],
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
            addTag(){
                if(this.tagData.indexOf(this.tagVal) == -1){
                    this.tagData.push(this.tagVal);
                }else{
                    this.$message.error('请勿重复添加');
                }
            },
            selectType(value) {
                this.tagVal = value;
            },
            closeTag(tag){
                this.tagData.splice(this.tagData.indexOf(tag),1);
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

    .addAssets .el-tag{
        margin-right: 5px;
    }
    .addAssets .el-form-item .item-msg{
        display: inline;
        color: #999;
        span{
            color: red;
            margin-right: 5px;
        }
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
        width: 217px;
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
