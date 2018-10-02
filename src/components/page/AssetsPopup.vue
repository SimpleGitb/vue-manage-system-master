<template>
	<div class="comb">
		<div class="crumbs">
			<el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-edit-outline"></i> 资产梳理</el-breadcrumb-item>
           </el-breadcrumb>
			<el-button type="text" @click="dialogVisible = true">点击打开弹窗</el-button>
			<el-dialog
			  title="资产梳理"
			  :visible.sync="dialogVisible"
			  width="35%"
			  :close-on-click-modal="false"
			  :before-close="handleClose">
			  <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
			    <el-tab-pane label="ip" name="first">
			    	<div class="group_head">
			    		<el-checkbox-group v-model="asset_ip">
						    <el-checkbox label="port">扫描端口</el-checkbox>
						    <el-checkbox label="domain">服务器上域名</el-checkbox>
						    <el-checkbox label="webinfo">web信息</el-checkbox>
						  </el-checkbox-group>
			    	</div>
			    	<el-input
					  type="textarea"
					  :rows="7"
					  placeholder="请输入文本"
					  v-model="ip">
					</el-input>
			    </el-tab-pane>
			    <el-tab-pane label="url" name="second">
			    	<div class="group_head">
			    		<el-checkbox-group v-model="asset_url">
						    <el-checkbox label="subdomain">子域名</el-checkbox>
						    <el-checkbox label="port">扫描服务器端口</el-checkbox>
						    <el-checkbox label="webinfo">web信息</el-checkbox>
						  </el-checkbox-group>
			    	</div>
			    	<el-input
					  type="textarea"
					  :rows="7"
					  placeholder="请输入文本"
					  v-model="url">
					</el-input>
			    </el-tab-pane>
			    <el-tab-pane label="单位名称" name="third">
			    	<!--<div class="group_head">
			    		<el-checkbox-group v-model="checkList3">
						    <el-checkbox label="web信息"></el-checkbox>
						  </el-checkbox-group>
			    	</div>-->
			    	<el-input
					  type="textarea"
					  :rows="7"
					  placeholder="请输入文本"
					  v-model="textarea3">
					</el-input>
			    </el-tab-pane>
			    <el-tab-pane label="邮箱" name="fourth">
			    	<!--<div class="group_head">
			    		<el-checkbox-group v-model="checkList4">
						    <el-checkbox label="ip信息"></el-checkbox>
						  </el-checkbox-group>
			    	</div>-->
			    	<el-input
					  type="textarea"
					  :rows="7"
					  placeholder="请输入文本"
					  v-model="email">
					</el-input>
			    </el-tab-pane>
			  </el-tabs>
			  <span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="assetscombSubm()">开始梳理</el-button>
			  </span>
			</el-dialog>
       </div>
	</div>
</template>

<script>
    export default {
    	name: 'assetscomb',
        data: function(){
            return {
            	dialogVisible: true,
            	activeName2: 'first',
            	asset_ip:[],
            	ip: '',
            	asset_url:[],
            	url: '',
            	checkList3:[],
            	textarea3: '',
            	checkList4:[],
            	email: ''
            	
            }
        },
        methods:{
      		handleClose(done) {
		        done();
		      },
		      handleClick(tab, event) {
//		        console.log(tab);
		      },
		      assetscombSubm(){
		      	this.$axios.post("api/asset/get", {
			      		asset_ip: this.asset_ip,
			      		asset_url: this.asset_url,
			      		ip: this.ip,
			      		url: this.url,
			      		email: this.email
                    }).then((res) => {
                        switch (res.data.status) {
					        case 1:
					        	this.$router.push({
					                name:'assetsRecord'
					               });
					               this.dialogVisible = false;
					            break;
					        default: this.$message.error(res.data.msg); break;
					    } 
                    });
                
		      }
        },
        mounted(){
//		   this.fetchCustomers();
        }
    }
  
</script>

<style scoped lang="less">
.group_head{
	width: 100%;border-bottom: 1px solid RGB(216,220,229);padding: 5px 0 5px 20px;
}

</style>
<style type="text/css">
	.comb .el-tabs__nav{
		width: 100%;
	}
	.comb .el-tabs--border-card>.el-tabs__header .el-tabs__item{margin: 0;}
	.comb .el-tabs__item{
		width: 25%;
		text-align: center;
	}
	.comb .el-tabs--border-card>.el-tabs__content{
		padding: 0;
	}
	.comb .el-checkbox+.el-checkbox{
		
	}
	.comb .el-textarea__inner{
		border: 0;
	}
	.el-textarea__inner{
		font-family: "微软雅黑";
	}
	.el-dialog__header{
	background: RGB(248,248,248);
	border-bottom: 1px solid #e2e2e2;
}
.comb .el-tabs__nav-wrap:first-child{
	padding-left: 0;
}
</style>
