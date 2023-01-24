<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <div class="login" >
      <div class="user_login">
          <img src="@/assets/icon/Unuser.png" alt="">
      </div>
      <div class="form">
        <div class="input_field">
          <el-form-item class="username" label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item class="pass" label="密码" prop="pass">
            <el-input v-model="ruleForm.pass"></el-input>
          </el-form-item>
        </div>
        <div class="button_field">
          <el-button  @click="submitForm()">登录</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </div>
        <div class="checked_field">
          <i><input type="checkbox" id="remember" value="记住密码"><span> 记住密码</span></i>
          <i><input type="checkbox" id="autologin" value="自动登录"><span> 自动登录</span></i>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>
import { isLogin } from '@/api/isLogin.js'
export default {
  name: 'login',
  components: {},
  props: {},
  data () {
    const validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      }
      callback()
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    return {
      ruleForm: {
        pass: '',
        username: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        username: [
          { validator: validateUser, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    openSuccess () {
      this.$message({
        message: `欢迎${this.$store.state.user.username}光临本站!`,
        type: 'success'
      })
    },
    openError () {
      this.$message.error('登录失败, 请检查用户名和密码')
    },
    submitForm () {
      console.log(this.$refs.ruleForm)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) { // 进行提交
          this.Logging().then(res => {
            // this.$store.commit('updateUser', this.$store.getters.init(res.user))
            switch (res.code) {
              case '200': { // 成功登录
                this.$store.commit('updateUser', res.user)
                this.$store.commit('updateLogin', res.isLogin)
                console.log(this.$store.state.user)
                console.log(this.$store.state.isLogin)
                this.openSuccess() // 提示
                break
              }
              default: this.openError() // 登录失败
            }
          })
        } else {
          alert('输入有误')
          return false
        }
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    },
    async Logging () {
      const { data: res } = await isLogin(this.ruleForm.username, this.ruleForm.pass)
      // console.log(res)
      return res
    }
  }
}
</script>

<style scoped lang="less">
  @keyframes opacityIn {
  0% {
    opacity: 0;
    transform: translateY(50%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.login{
  animation: opacityIn 0.6s ease-out;
  position: absolute;
  top: calc(50% - 215px);
  right: calc(50% - 215px);
  height: 430px;
  width: 430px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 30px 0;
  flex-direction: column;
  background: linear-gradient( to right bottom, rgba(255,255,255,.7), rgba(255,255,255,.5), rgba(255,255,255,.4) );
    /* 使背景模糊化 */
  backdrop-filter: blur(5px);
  box-shadow: 0 0 4px;
  z-index: 10;
}
.box{
    margin-top: 30%;
    margin-bottom: 20%;
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items:baseline
}
.user_login {
    display: block;
    max-width: 60px;
    max-height: 60px;
    overflow: hidden;
    border-radius: 30px;
    width: 100%;
}
.user_login img{
    display: block;
    height: 60px;
}
.form{
    width: 430px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.input_field{
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items:center
}
/deep/.input_field label {
  padding-right: 30px;
}
/deep/.input_field .el-input input{
  border: none;
  border-bottom: 2px #565656 solid;
  display: block;
  outline: none;
  border-radius: 0;
  background: none;
  width: 200px;
  height: 40px;
  font-size: 15px;
}
.button_field{
  width: 300px;
  display: flex;
  justify-content: space-around;
}
/deep/.button_field .el-form-item_content{
    margin-left: 0;
}
/deep/.button_field button{
    margin-top: 40px;
    display: inline-block;
    font-weight: 1000;
    border: none;
    border-radius: 30px;
    width: 90px;
    height: 40px;
    font-size: 15px;
}
.button_field input:hover{
  background: #A0A0A0;
  transition: all .7s;
}
.checked_field{
  width: 300px;
  margin-top: 40px;
  font-size: 4px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

</style>
