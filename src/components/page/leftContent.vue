<template>
         <div id="left_img">
               <ve-line :data="chartData" :settings="chartSettings"></ve-line>
         </div>
</template>
<script>
    import Vue from 'vue'
    import VCharts from 'v-charts'
    Vue.use(VCharts);


    export default {
        data() {
    this.chartSettings = {
        axisSite: { right: ['下单率'] },
        yAxisType: ['KMB', 'percent'],
        yAxisName: ['数值', '比率']
      }
            return {
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        }
      }
        },

        methods: {
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
           }
        },
        created(){
        },
         selectType(val){
                // this.valueSelect1=val
                // console.log(this.valueSelect1)
            },
            // 获取下拉选项中的选项值
    }

</script>
<style lang="scss" scoped>
    .layer{
        width: 1920px;
        height: 848px;
        background: #fff;
        position: absolute;
        left: 1925px;
        box-shadow: 1px 1px 1px 5px #ddd;
        top: 0;
        .layer-header{
            height: 65px;
            padding-left: 30px;
            border-bottom: 1px solid #ddd;
            line-height: 65px;
            .head-content{
                float: left;
                display: flex;
                align-items: center;
                .title{
                    margin-left: 20px;
                }
            }
                .head-close{
                    float: right;
                    margin-right: 20px;
                    cursor: pointer;
                    font-family: 微软雅黑;
                    font-size: 20px;
                }
        }
        .layer-content{
            margin-top: 12px;
        }
    }
    .childtab{
        width: 1440px;
        height: 600px;
        border: 1px solid #ddd;
        margin-left: 30px;
        .tab-header{
            height: 40px;
            background: #f2f2f2;
        }

    }

    .web-assets{
        width: 1435px;
        height: 674px;
        border: 1px solid #ddd;
        margin-left: 40px;
        .assets-header{
            height: 40px;
            background: #f2f2f2;
            position: relative;
            padding-left: 10px;
            display: flex;
            justify-content: left;
            align-content: center;
            align-items: center;
            .icon{
                width: 20px;
                height: 16px;
                position: relative;
                img{
                    position: absolute;
                    bottom: 0px;
                }
                img:nth-of-type(1){
                    left: 0;
                }
                img:nth-of-type(2){
                     left: 5px;
                 }
                img:nth-of-type(3){
                     left: 10px;
                 }
                    img:nth-of-type(4){
                     left: 15px
                 }
            }
                .header-title{
                    margin-left: 17px;
                }
        }
        .assets-content{
            .list-item{
                .item-header{
                    height: 40px;
                    line-height: 40px;
                    border-bottom: 1px solid #ddd;
                    font-size: 16px;
                    .header-title{
                        border-bottom: 3px solid #409eff;
                        display: inline-block;
                        span{
                            padding-left: 30px;
                            padding-right: 30px;
                        }
                    }
                }
                .item-content{
                    margin-top: 15px;
                    .ipaddress{
                        width: 140px;
                        height: 30px;
                        background: #f2f2f2;
                        display: inline-block;
                        text-align: center;
                        line-height: 30px;
                        border-radius: 15px;
                        margin-left: 20px;
                    }
                }
            }
        }
    }
    .information{
        width: 495px;
        height: 676px;
        border:1px solid #ddd;
        margin-left: 40px;
        float: left;
        .infomation-list{
            margin-top: 55px;
            li{
                padding-left: 50px;
                margin-bottom: 35px;
                span{
                    color: #409EFF;
                }
            }
        }

    }
    .monitoringcount{
        width: 895px;
        height: 676px;
        border: 1px solid #ddd;
        margin-left: 30px;
        display: inline-block;
        position: relative;
        .border{
            position: absolute;
            left: 50%;
            top: 60px;
            margin-left: -231px;
            z-index: 1;
        }
        .count-list{
            width: 600px;
            height: 560px;
            margin: 0 auto;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            li{
                width: 150px;
                height: 150px;
                border:1px solid #ddd;
                border-radius: 50%;
                position: absolute; 
                background: #fff;
                z-index: 2;
            .item-arrow{
                position: absolute;
            }

            .item-box{
                    text-align: center;
                    span{
                        font-size: 48px;
                        line-height: 95px
                    }
                }
            }
            .list-bg{
                img{
                    width: 150px;
                    height: 150px;
                }
            }
            li:nth-of-type(1){
                .item-arrow{
                    top: 64px;
                    left: 159px;
                    transform: rotate(11deg);
                }
                top: 0px;
                left: 220px;
                    span{
                        color: #3a92c0;
                    }

            }
            li:nth-of-type(2){
                left: 0px;
                top: 180px;
                span{
                        color: #53a169;
                    }
             .item-arrow{
                top: -21px;
                left: 95px;
                transform: rotate(-50deg);
                }
            }
            li:nth-of-type(3){
                right: 0px;
                top: 180px;
                span{
                        color: #5FB878;
                    }
                 .item-arrow{
                    top: 150px;
                    left: 68px;
                    transform: rotate(100deg);
                }
            }
            li:nth-of-type(4){
                left: 100px;
                top: 405px;
                span{
                        color: #F7A358
                    }
                 .item-arrow{
                    top: 2px;
                    left: 3px;
                    transform: rotate(-135deg);
                }
            }
            li:nth-of-type(5){
                right: 100px;
                top: 405px;
                span{
                        color: #42A7DB
                    }
                  .item-arrow{
                top: 97px;
                transform: rotate(170deg);
                left: -9px;
                }
            }
        }
    }
    .availability{
        width: 1435px;
        height: 675px;
        border: 1px solid #ddd;
        margin-left: 40px;
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

    .selectType1 {
        width: 40%;
    }

    .corn {
        display: inline-block;
        font-size: 20px;
        cursor: pointer;
    }

    .snapshot{
        width: 20px;
        height: 20px;
        background: url('../../../static/img/assets/snapshot.png') -6px 0;
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

#left_img{
    width: 500px;
    height: 500px;;
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
