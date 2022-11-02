<template>
    <div>
        <h1>用戶註冊頁面</h1>
        <el-card class="box-card" style="width: 600px;height: 300px;
                    margin: 0 auto;background-color:rgba(255,255,255,0.3)">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用戶稱號" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item  label="用戶密碼" prop="password">
                    <el-input :type="isActive?'password':'text'" style="z-index: 1" v-model="ruleForm.password" >
                    </el-input>
                    <i style="position:absolute;right:10px;bottom:10px;z-index: 20;" class="el-icon-view"
                       @click="isActive=!isActive"></i>
                </el-form-item>
                <el-form-item label="身分證號" prop="identityNumber">
                    <el-input v-model="ruleForm.identityNumber"></el-input>
                </el-form-item>

                    <el-button type="primary" @click="submitForm('ruleForm')">註冊</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
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
                    username: '',
                    password:'',
                    identityNumber:'',
                },
                rules: {
                    username: [
                        { required: true, message: '請輸入用戶名稱', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '請輸入密碼', trigger: 'blur' },
                        { min: 4, max: 15, message: '長度在 6 到 15 个字符', trigger: 'blur' }
                    ],
                    identityNumber: [
                        { required: true, message: '請輸入身份證號', trigger: 'blur' },
                        { min: 10, max: 10, message: '輸入錯誤，請重新輸入', trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let url = "http://localhost:9080/users/addNew"
                        this.axios.post(url,this.ruleForm).then((response)=>{
                            console.log(response.data)
                            let json = response.data
                            if(json.statusCode===20000){
                                this.open()
                            }else{
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
            open() {
                this.$alert('註冊成功，請重新登入', '註冊成功', {
                    confirmButtonText: '確定',
                    callback: action => {
                        location.href="http://localhost:8080/"
                    }
                });
            }
        }
    }
</script>

<style scoped>
    /*更改眼睛大小*/
    .el-icon-view:before {
        font-size: 20px;
    }
</style>