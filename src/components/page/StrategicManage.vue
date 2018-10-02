<template>
	<div class="strate">
		<div class="crumbs">
			<el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-document"></i> 策略管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
        	<el-tabs  v-model="activeName">
			    <el-tab-pane label="应用策略" name="first">
			    	<el-button @click="addManage" type="primary" icon="el-icon-edit">添加策略</el-button>
			    	<el-table
					    ref="multipleTable"
					    :data="tableData3"
					    tooltip-effect="dark"
					    border
					    style="width: 100%"
					    @selection-change="handleSelectionChange">
					    <el-table-column
					      type="selection"
					      width="55">
					    </el-table-column>
					    <el-table-column
					      label="策略名称"
					      width="120">
					      <template slot-scope="scope">
					      	{{ scope.row.name }}
					      </template>
					    </el-table-column>
					    
					  </el-table>
					  
					<div class="block">
						<el-pagination
					      @size-change="handleSizeChange"
					      @current-change="handleCurrentChange"
					      :current-page="currentPage4"
					      :page-sizes="[100, 200, 300, 400]"
					      :page-size="100"
					      layout="total, sizes, prev, pager, next, jumper"
					      :total="400">
					    </el-pagination>
					</div>
			    </el-tab-pane>
			    <el-tab-pane label="服务器策略" name="second">2</el-tab-pane>
			</el-tabs>
        </div>
	</div>
</template>

<script>
    export default {
    	name: 'strategicmanage',
        data: function(){
            return {
            	activeName: 'first',
            	tableData3: [{
				          date: '2018-04-10—2018-12-30/0点—23点',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				        }, {
				          date: '2018-04-10—2018-12-30/0点—23点',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				        }, {
				          date: '2018-04-10—2018-12-30/0点—23点',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				        }, {
				          date: '2018-04-10—2018-12-30/0点—23点',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				        }, {
				          date: '2018-04-10—2018-12-30/0点—23点',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				        }, {
				          date: '2018-04-10—2018-12-30/0点—23点',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				        }, {
				          date: '2018-04-10—2018-12-30/0点—23点',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				        }],
				        multipleSelection: [],
				        currentPage4: 1
            }
        },
        methods:{
          handleSelectionChange(val) {
	        this.multipleSelection = val;
	        console.log(this.multipleSelection);
	      },
          handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	      },
	      handleCurrentChange(val) {
	        console.log(`当前页: ${val}`);
	      },
	      addManage(){
               this.$router.push({
                    name:'addManage'
                })
            }
        },
        mounted(){
//		   this.fetchCustomers();
        }
    }
  
</script>

<style scoped lang="less">
.crumbs{
	margin-top: 10px;
	margin-bottom: 10px;
}
.el-table {
	margin-top: 20px;
	text-align: center;
}

.el-icon-edit-outline{
	width: 20px;
	height: 20px;
}
.block{
	margin-top: 20px;
}
</style>
<style type="text/css">
.strate .el-table thead>tr{
	background-color: RGB(242,242,242);
}
.strate .el-table thead>tr:hover{
	background-color: RGB(242,242,242);
}
.strate .el-table th>.cell{
	text-align: center;
	font-size: 14px;
}
.strate .el-icon-edit-outline::before{
	cursor: pointer;
	width: 25px !important;
	height: 30px !important;
}
</style>
