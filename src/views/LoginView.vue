<template>
    <div>
        <h1 style="text-align: center">用戶登入</h1>
        <el-card class="box-card" style="width: 600px;height: 300px;
                    margin: 0 auto;background-color:rgba(255,255,255,0.3)">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="身分證號:" prop="identityNumber">
                    <el-input v-model="ruleForm.identityNumber"></el-input>
                </el-form-item>
                <el-form-item label="用戶密碼:" prop="password">
                    <el-input :type="isActive?'password':'text'" style="z-index: 1" v-model="ruleForm.password" >
                    </el-input>
                    <i style="position:absolute;right:10px;bottom:10px;z-index: 20;" class="el-icon-view"
                       @click="isActive=!isActive"></i>
                </el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登入</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button @click="reg()">註冊</el-button>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isActive:true,
                ruleForm: {
                    identityNumber: '',
                    password:'',
                },
                rules: {
                    identityNumber: [
                        { required: true, message: '請輸入身份證號', trigger: 'blur' },
                        { min: 10, max: 10, message: '請輸入正確身分證號', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '請輸入密碼', trigger: 'blur' },
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let url = 'http://localhost:9080/users/login'
                        this.axios.post(url,this.ruleForm).then((response)=>{
                            console.log(response.data)
                            let json = response.data
                            if(json.statusCode === 20000){
                                //成功登入，跳轉頁面
                                let jwt = json.data
                                localStorage.setItem('jwt',jwt)
                                this.parseJwt()
                                location.href="http://localhost:8080/users"
                            }else {
                                this.$message.error(json.message)
                            }
                        }).catch(function (error) {
                            console.log("響應結果失敗")
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            reg(){
                location.href="http://localhost:8080/users/addNew"
            },
            parseJwt() {
                var token = localStorage.getItem("jwt")
                let strings = token.split(".")
                var userinfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))));
                localStorage.setItem("username",userinfo.username)
                console.log("JWT解析結果>>>>", userinfo)
            }
        }
    }
</script>
<style>
    /*更改眼睛大小*/
    .el-icon-view:before {
        font-size: 20px;
    }
</style>