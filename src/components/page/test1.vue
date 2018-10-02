<template>
	<div class="strate">
		<div class="crumbs">
			<el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-document"></i> 策略管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">

              <el-form label-width="100px">
                <el-form-item label="策略名称">
                    <el-input v-model="addserverStrategy.name">
                    </el-input> 
                </el-form-item>
                    <el-form-item label="监控时间段">
                        <el-date-picker v-model="addserverStrategy.startTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                        -
                        <el-date-picker v-model="addserverStrategy.endTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="每天时间段">
                            <el-select v-model="addserverStrategy.startdaily" class="item-time">
                                    <el-option v-for="item in dayTime" :key="item" :lable="item" :value="item"></el-option>
                                </el-select>
                                    -
                                <el-select v-model="addserverStrategy.enddaily" class="item-time">
                                    <el-option v-for="item in dayTime" :key="item" :lable="item" :value="item"></el-option>
                                </el-select> 
                    </el-form-item> 
                    <el-form-item label="可用性监测">
                         <div class="icon">
                            <i class="el-icon-question"></i>
                                <div class="tips">
                                    <div class="border"></div>
                                    监测服务器连通状态
                                </div>
                        </div>                       
                        <el-switch v-model="addserverStrategy.usability">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="端口变动">
                          <div class="icon">
                            <i class="el-icon-question"></i>
                                <div class="tips">
                                    <div class="border"></div>
                                    监测服务器端口开启、关闭与服务变化
                                </div>
                        </div>                         
                        <el-switch v-model="addserverStrategy.port">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="备注">
                         <el-input type="textarea" placeholder="请输入自定义内容" resize="none" v-model="addserverStrategy.remark">
                        </el-input>
                    </el-form-item>                    
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addServerStrategyDialog = false">取 消</el-button>
                <el-button type="primary" @click="saveaddServerStrategy">确 定</el-button>
            </div>
	</div>
	</div>
</template>

<script>
    export default {
    	name: 'strategicmanage',
        data: function(){
            return {
                 labelPosition: 'center',
                activeName2: 'first',
                fullscreenLoading:false,
                loading:false,
                ipdata:[],
                validateForm:[],
                addserverStrategy:{
                        name:'',
                        startTime:'',
                        endTime:'',
                        startdaily: 0,
                        enddaily: 24,
                        remark:'',
                        usability:false,
                        port:false,
                        remark:''
                },               
                port:[
                   
                ],
                editPort:[],
                dynamicValidateForm: { 
                    domains: [
                        {
                            port:'',
                            server:'',
                            version:''
                        }
                    ],
                    init:[
                            {
                                port:'',
                                server:'',
                                version:''
                            }
                    ]
                },
                tableData3: [
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
                portNum:'',
                cpage:1,
                isdsable:false,
                delVisible:false,
                multipleSelection: [],
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
                selectedAlertAdress: [],
                options2: [],
                // 弹出框搜索类型
                id:'',
                valueSelect1:'',
                selectType:'',
                dayTime:[]
            }
        },
        methods:{  
           saveaddServerStrategy(){
                this.$axios.post('api/ipConfigure',{
                    name:this.addserverStrategy.name,
                    start:this.addserverStrategy.startTime,
                    end:this.addserverStrategy.endTime,
                    daily_start:this.addserverStrategy.startdaily,
                    daily_end:this.addserverStrategy.enddaily,
                    remark:this.addserverStrategy.remark,
                    usability:Number(this.addserverStrategy.usability),
                    port:Number(this.addserverStrategy.port)
                }).then((res)=>{
                    if(res.data.status == 1){
                        this.$message.success(res.data.msg);
                        this.addServerStrategyDialog = false;
                        this.getipConfigure();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            createTime(){
                    for(var i=0;i<25;i++){
                        this.dayTime.push(i);
                    };
            }            
        },
        mounted(){
             this.createTime();
               
         }

    }
</script>

<style>

    .strate .el-select{
            width: 12%;
    }

    .strate .el-icon-question{
        position: absolute;
        top:9px;
        left: -10px;
        cursor: pointer;
    }


    .strate .icon:hover .tips{
        display: block;
    }

    .strate .tips{
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

    .strate .tips .border{
        border-left:8px solid transparent;
        border-right:8px solid transparent;
        border-top:8px solid rgb(50, 65, 87);
        border-bottom:8px solid transparent;
        position: absolute;
        bottom:-15px;
        left:22%;
    }


.strate .el-switch{
    margin-left: 10px;
}
.delete,.add{
    display: inline;
}
    .strate .el-table__empty-text{
        display: flex;
        align-items:center;
    }
    .strate .el-input__suffix{
        right: 0;
    }
    .strate .el-table__empty-text span{
        margin-left: 15px;
    }
    .strate .noText{
        width: 24px;
        height: 24px;
    }
    .strate .el-table__header-wrapper .has-gutter tr {
        background: #f2f2f2;
    }
    .strate .msg{
        display: inline;
        margin-left: 15px;
    }
    .strate  .hidebox .el-form-item{
        border:1px solid #e4e4e4;
        border-radius:6px;
    }

    .strate .el-dialog .el-form-item .el-switch{
        margin-left:10px;
    }

        .el-table thead{
            color: #666;
        }

    .strate  .hidebox .border{
        border-bottom: 1px dashed  #d7d7d7;
        margin-bottom: 20px;
        margin-top: -11px;
    }

    .strate .msg span{
        color:brown;
    }

    .strate .el-textarea__inner{
        font-family:'Microsoft Yahei';
    }

    .strate .hidebox .el-form-item__label{
        text-align:center;
        padding-right:0
    }
    .strate .hidebox .el-form-item:nth-of-type(1) .el-form-item__content,
    .strate .hidebox .el-form-item:nth-of-type(2) .el-form-item__content,
    .strate .hidebox .el-form-item:nth-of-type(3) .el-form-item__content,
    .strate .hidebox .el-form-item:nth-of-type(5) .el-form-item__content{
        padding-left:8px;
    }
    
    .strate .hidebox .el-form-item:nth-of-type(5) .el-form-item__content .el-switch{
        vertical-align: middle;
        display: flex;
    }
    .strate .hidebox .el-form-item:nth-of-type(5) .el-form-item__content{
        display: flex;
        align-items: center;
    }

    .strate .hidebox .el-textarea__inner{
        outline:none;
        border:none;
    }
    .strate .serverDialog .el-form .el-form-item:nth-of-type(4) .tips .border{
        left:41%;
    }
    .strate .serverDialog .el-form .el-form-item:nth-of-type(5) .tips .border{
            left:24%;
    }
    .strate .hidebox .el-form-item:nth-of-type(1) .el-form-item__label{
        line-height:66px;
        border-right:1px solid #fbfbfb;
        background:#f5f5f5;
        padding-right:0
    }

    .strate .el-dialog .el-icon-question{
        position: absolute;
        top:9px;
        left: -10px;
        cursor: pointer;
    }


    .strate .el-dialog .icon:hover .tips{
        display: block;
    }

    .strate .el-dialog .tips{
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

    .strate .el-dialog .tips .border{
        border-left:8px solid transparent;
        border-right:8px solid transparent;
        border-top:8px solid rgb(50, 65, 87);
        border-bottom:8px solid transparent;
        position: absolute;
        bottom:-15px;
        left:22%;
    }

    .strate .el-dialog .el-form-item:nth-of-type(5) .border{
        left: 38%;
    }
    .strate .el-dialog .el-form-item:nth-of-type(7) .border,.strate .el-dialog .el-form-item:nth-of-type(8) .border{
        left: 18%;
    }
    .strate .el-dialog .el-form-item:nth-of-type(9) .border{
        left: 30%;
    }
    .strate .el-dialog .el-form-item:nth-of-type(10) .border{
        left: 25%;
    }
    .strate .hidebox .el-form-item:nth-of-type(2) .el-form-item__label{
        border-right:1px solid #fbfbfb;
        background:#f5f5f5;
        line-height:96px;
    }
    .strate .hidebox .el-form-item:nth-of-type(3) .el-form-item__label{
        border-right:1px solid #fbfbfb;
        line-height:35px;
        background:#f5f5f5;
    }
    .strate .hidebox .el-form-item:nth-of-type(4) .el-form-item__label{
        border-right:1px solid #fbfbfb;
        background:#f5f5f5;
        line-height:55px;
    }
    .strate .hidebox .el-form-item:nth-of-type(5) .el-form-item__label{
        border-right:1px solid #fbfbfb;
        background:#f5f5f5;
        line-height:35px;
    }
    .strate .hidebox .el-form-item:nth-of-type(6) .el-form-item__label{
        border-right:1px solid #fbfbfb;
        background:#f5f5f5;
        line-height:54px;
    }
    .strate .el-table th>.cell{
        text-align: center;
        font-size: 14px;
    }
    .strate .el-table td>.cell{
        text-align: center;
        font-size: 14px;
    }
    .strate .el-form .item-mini-input{
        display: inline-block;
    }
    .strate .el-form .item-mini-input:nth-of-type(1){
        width: 10%;
    }
    .strate .el-form .item-mini-input:nth-of-type(2),.strate .el-form .item-mini-input:nth-of-type(3){
        width: 8%;
    }
    .strate .el-form .times{
    background: #E4E4E4;
    border-radius: 0px 4px 4px 0px;
    margin-left: -3px;
    padding-top: 0px;
    padding-left: 9px;
    padding-right: 9px;
    padding-bottom:2px;
}
    .strate .block .el-slider__runway{
    margin-left:20px;
    width: 95%;
    margin-top:14px;
}
    .strate .edit{
        width: 19px;
        height: 20px;
        background: url("../../../static/img/update.png") no-repeat -41px -25px;
        display: inline-block;
        cursor: pointer;
    }
    .strate .el-icon-edit-outline::before{
        cursor: pointer;
        width: 25px !important;
        height: 30px !important;
    }

    .strate .stop{
            width: 24px;
            height: 24px;
            background: url("../../../static/img/update.png") no-repeat -23px 0px;
            display: inline-block;
            margin-left: 10px;
            cursor: pointer;
        }

    .strate .play{
        width: 24px;
        height: 24px;
        background: url("../../../static/img/update.png") no-repeat -60px -22px;
        display: inline-block;
        margin-left: 10px;
        cursor: pointer;
    }
    .popper__arrow{
        display: none;
    }

            .strate .hidebox .el-form-item:nth-of-type(1) .el-form-item__label,
        .strate .hidebox .el-form-item:nth-of-type(2) .el-form-item__label,
        .strate .hidebox .el-form-item:nth-of-type(3) .el-form-item__label,
        .strate .hidebox .el-form-item:nth-of-type(4) .el-form-item__label,
        .strate .hidebox .el-form-item:nth-of-type(5) .el-form-item__label,
        .strate .hidebox .el-form-item:nth-of-type(6) .el-form-item__label{
            position: absolute;
            height: 100%;
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;
        }

         .strate .hidebox .el-form-item:nth-of-type(2) .el-form-item__label{
            border-right:1px solid #fbfbfb;
            background:#f5f5f5;
        }
        .strate .hidebox .el-form-item:nth-of-type(3) .el-form-item__label{
            border-right:1px solid #fbfbfb;
            line-height:35px;
            background:#f5f5f5;
        }
        .strate .hidebox .el-form-item:nth-of-type(4) .el-form-item__label{
            border-right:1px solid #fbfbfb;
            background:#f5f5f5;
            line-height:55px;
        }
        .strate .hidebox .el-form-item:nth-of-type(5) .el-form-item__label{
            border-right:1px solid #fbfbfb;
            background:#f5f5f5;
            line-height:35px;
        }
        .strate .hidebox .el-form-item:nth-of-type(6) .el-form-item__label{
            border-right:1px solid #fbfbfb;
            background:#f5f5f5;
            line-height:54px;
        }
        .strate .hidebox .el-form-item{
            border:1px solid #e4e4e4;
            border-radius:6px;
            position: relative;
        }
    .strate .el-form .item-mini-input{
            display: inline-block;
        }
    .strate .el-form  .item-mini-select{
        width: 14%;
        display: inline-block;
    }
    .strate .el-form  .item-mini-select .el-input__inner{
        height: 25px;
        text-align: center;
        padding-right: 20px;
        padding-left: 0;
    }
    .strate .el-form .item-mini-input:nth-of-type(1){
        width: 10%;
    }
    .strate .el-form .item-mini-input:nth-of-type(2),.strate .el-form .item-mini-input:nth-of-type(3){
        width: 8%;
    }
    .strate .el-form .item-mini-input .el-input__inner{
        height: 22px;
        padding:0;
        text-align: center;
    } 
    .strate .el-table .cell .el-switch{
        height: 23px;
    }

    .strate .item-time{
        width: 70px;;
    }

    .strate .crumbs .el-breadcrumb .el-icon-tickets{
        font-size:18px;
    }
    
    .strate .crumbs .el-breadcrumb{
        font-size:18px;
    }

    .el-table {
        margin-top: 20px;
        text-align: center;
    }

    .el-icon-edit-outline{
        width: 20px;
        height: 20px;
    }

</style>

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
        margin-bottom: 10px;
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

    .serveTab .crumbs .el-breadcrumb .el-icon-tickets{
        font-size:18px;
    }
    
    .serveTab .crumbs .el-breadcrumb{
        font-size:18px;
    }
    ul,li{
        list-style: none;
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
          background: #f2f2f2;
    }



    .handle-input {
        width: 100px;
    }

    .selectType {
        width: 12%;
    }


    .alertInput {
        width: 80%;
    }


    .update{
        width: 19px;
        height: 20px;
        background: url('../../../static/img/update.png') no-repeat -41px -25px;
        cursor: pointer;
        margin: 0 auto;
    }

    thead th{
      text-align: center
    }


</style>
<style>
