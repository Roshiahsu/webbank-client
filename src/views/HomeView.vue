<template>
    <div class="home">
        <el-container>
            <el-header class="layout-header">
                <div>
                    <el-button style="float:right;position: relative;top:10px;right:20px" type="primary" @click="logout">登出</el-button>
                    <span style="position: relative;left:350px;top:16px;font-size:20px">歡迎{{"【"+username+"】"}}</span>
                </div>
            </el-header>
            <div></div>
            <el-container class="layout-body">
                <el-aside class="layout-side" width="200px">
                    <!--添加router 屬性開啟跳轉功能 默認為false-->
                    <el-menu
                            router
                            :default-active=this.$router.currentRoute.path
                            class="el-menu-vertical-demo"
                    >
                        <!--交易服務開始-->
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-user"></i>
                                <span>交易服務</span>
                            </template>
                            <!--直接修改index的值，為業務路徑-->
                            <el-menu-item index="/users/cashOut" class="el-icon-user">領錢</el-menu-item>
                            <el-menu-item index="/users/deposit" class="el-icon-user">存款</el-menu-item>
                            <el-menu-item index="/users/transactionInfo" class="el-icon-user">交易列表</el-menu-item>
                            <el-menu-item index="/users/" class="el-icon-user">轉帳(待完成)</el-menu-item>
                        </el-submenu>
                        <!--交易服務結束-->

                    </el-menu>

                </el-aside>
                <el-main>
                    <el-row :gutter="20">

                    </el-row>
                    <el-row :gutter="20">
                        <router-view/>
                    </el-row>
                    <!--主體-->
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username:'',
            }
        },
        methods: {
            logout(){
                localStorage.setItem("jwt","")
                location.href="http://localhost:8080"
            }
        },mounted() {
            this.username = localStorage.getItem("username")
        }
    }
</script>

<style>
    /*body自帶外邊距*/
    * {
        margin: 0;
    }

    .layout-header {
        background-color: #83e3e3;
        color: #2c3e50;
    }


    .layout-body {
        position: absolute;
        top: 60px;
        right: 0;
        left: 0;
        bottom: 0;
    }

    .el-aside {
        background-color: #ecaf94;
    }

    /*輪播圖開始*/
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    /*輪播圖結束*/
</style>