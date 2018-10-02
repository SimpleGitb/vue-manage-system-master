<!--<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-circle-plus"></i> 用户添加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="姓名" prop="name"> 
                        <el-input v-model="ruleForm.name" class="alertInput"></el-input>
                    </el-form-item> 
                    <el-form-item label="电话号码" prop="phone">
                        <el-input v-model="ruleForm.phone" class="alertInput"></el-input>
                    </el-form-item> 
                    <el-form-item label="地址" prop="address" class="selectAddress">
                        <el-cascader
                        size="small"
                        placeholder="请选择地址"
                        :options="ruleForm.options"
                        v-model="ruleForm.address"
                        @change="handleChange">
                        </el-cascader>
                    </el-form-item>                       
                    <el-form-item label="账户类型" prop="classList">
                        <el-select v-model="ruleForm.classList" filterable placeholder="请选择" class="alertInput">
                            <el-option                
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                    </el-select>
                    </el-form-item>   
                    <el-form-item label="电子邮箱" prop="email">
                        <el-input v-model="ruleForm.email" class="alertInput"></el-input>
                    </el-form-item>                                                  
                    <el-form-item label="备注" prop="remarks">
                        <el-input type="textarea" v-model="ruleForm.remark" class="alertInput"></el-input>
                    </el-form-item> 
                    <el-form-item label="是否通知" prop="delivery">
                        <el-switch v-model="ruleForm.delivery"></el-switch>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
import { regionDataPlus} from 'element-china-area-data'
    export default {
        name: 'baseform',
        data: function(){
            return {
                labelPosition:'center',               
                options2: [{
                value: '选项1',
                label: '管理员'
                }, {
                value: '选项2',
                label: '销售'
                }, {
                value: '选项3',
                label: '应急响应'
                }],
                ruleForm: {
                name: '',
                region: '',
                delivery: false,
                classList:'',
                email:'',
                address:[],
                options: regionDataPlus,
                remark:''
                },
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
                   classList:[
                        { required: true, message: '请填写该表单', trigger: 'change' }
                    ],
                    email: [
                        { required: true, message: '请填写该表单', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            onSubmit() {
                this.$message.success('提交成功！');
            },
            handleChange(value){
            },
             submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    var $this = this;
                    var arr = $this.ruleForm.classList.split('');
                    var receive = Number($this.ruleForm.delivery)
                    console.log(receive)
                this.$axios.post("api/user",{
                    name:$this.ruleForm.name,
                    phone:$this.ruleForm.phone,
                    province:$this.ruleForm.address[0],
                    city:$this.ruleForm.address[1],
                    county:$this.ruleForm.address[2],
                    role:arr[arr.length-1],
                    email:$this.ruleForm.email,
                    remark:$this.ruleForm.remark,
                    receive:String(receive)
                }).then((res)=>{                   
                        var data = res.data;
                        alert(data.msg);
                        if(data.status == 1){
                            this.$router.push('/table');
                        };
            })   
                } else {
                    console.log('error submit!!');
                    return false;
                }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
        }
    }
</script>
<style scope>
    .alertInput{
        width:40%;
    }

    .el-form-item__label{
        margin-right:0;
    }
    .selectAddress{
        width:50%;
    }
</style>-->
