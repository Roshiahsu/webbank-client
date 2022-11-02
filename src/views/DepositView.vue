<template>
    <div>
        <h3>存款頁面</h3>
        <el-card class="box-card" style="width: 600px;height: 300px;
                    margin: 0 auto;background-color:rgba(255,255,255,0.3)">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="存款金額:">
                    <el-input v-model="form.money"></el-input>
                </el-form-item>
                <div style="position: relative;top:50px">
                    <span>快速選取</span><br>
                    <el-button size="medium" type="primary" v-model="form.money" @click="form.money=1000">1000</el-button>
                    <el-button size="medium" type="primary" v-model="form.money" @click="form.money=2000">2000</el-button>
                    <el-button size="medium" type="primary" v-model="form.money" @click="form.money=3000">3000</el-button>
                    <el-button size="medium" type="primary" v-model="form.money" @click="form.money=5000">5000</el-button>
                    <el-button size="medium" type="primary" v-model="form.money" @click="form.money=10000">10000</el-button>
                    <el-button size="medium" type="primary" v-model="form.money" @click="form.money=20000">20000</el-button>
                </div>
                <el-button style="position: relative;top:100px" size="medium" type="primary" @click="onSubmit()" >送出</el-button>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    money:''
                },
                url:"http://localhost:9080"
            }
        },
        methods: {
            onSubmit() {
                let url = this.url+"/users/"+this.form.money+"/deposit"
                console.log(this.form)
                console.log(localStorage.getItem("jwt"))
                this.axios
                    .create({headers:{'Authorization':localStorage.getItem("jwt")}})
                    .post(url).then((response)=>{
                    let json = response.data
                    if (json.statusCode===20000){
                       this.open()
                    }else{
                        this.$message.error(json.message)
                    }
                }).catch(function (error) {
                    console.log("響應結果失敗")
                })
            },
            open() {
                this.$alert('交易成功', '交易成功', {
                    confirmButtonText: '確定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: "查詢餘額 待完成"
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .el-button{
        /*margin: 14px;*/
        /*float: left;*/
    }
</style>