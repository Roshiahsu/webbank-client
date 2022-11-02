<template>
    <div id="app">
        <el-button @click="clearFilter">清除所有搜尋條件</el-button>
        <el-table
                ref="filterTable"
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    align="center"
                    prop="id"
                    label="交易序號"
                    width="100">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="username"
                    label="用戶名"
            >
            </el-table-column>
            <el-table-column
                    prop="typeName"
                    label="交易類型"
                    width="180"
                    align="center"
                    :filters="[{ text: '存款', value: '存款'}, { text: '取款', value: '取款' }]"
                    :filter-method="filterHandler"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="trade"
                    sortable
                    label="交易金額">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="transDate"
                    label="交易日期">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                username:'',
                tableData: [],
                url:"http://localhost:9080"
            }
        },
        methods: {
            resetDateFilter() {
                this.$refs.filterTable.clearFilter('date');
            },
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            onSubmit() {
                let url = this.url+"/users/transactionInfo"
                this.axios
                    .create({headers:{'Authorization':localStorage.getItem("jwt")}})
                    .post(url).then((response)=>{
                    let json = response.data
                    if (json.statusCode===20000){
                        this.tableData=json.data
                    }else{
                        this.$message.error(json.message)
                    }
                }).catch(function (error) {
                    console.log("響應結果失敗")
                })
            },
        },
        mounted() {
            this.onSubmit()
        },
        created() {

        }
    }
</script>

