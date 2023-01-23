<template>
  <el-form :model="ruleSign" :rules="rules" ref="ruleSign" label-width="100px" class="demo-ruleFrom">
    <div class="sign" >
      <div class="user_sign">
          <img src="@/assets/icon/Unuser.png" alt="">
      </div>
      <div class="form">
        <div class="input_field">
          <el-form-item class="username" label="用户名" prop="username">
            <el-input v-model="ruleSign.username"></el-input>
          </el-form-item>
          <el-form-item class="pass" label="密码" prop="pass">
            <el-input v-model="ruleSign.pass"></el-input>
          </el-form-item>
          <el-form-item class="checkpass" label="确认密码" prop="checkpass">
            <el-input v-model="ruleSign.checkpass"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="ruleSign.gender">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="button_field">
          <el-button  @click="submitForm()">注册</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>
import { Sign } from '@/api/SignUp.js'
export default {
  name: 'sign',
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
      } else {
        if (this.ruleSign.checkpass !== '') {
          this.$refs.ruleSign.validateField('checkpass')
        }
        callback()
      }
    }
    const validatecheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleSign.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleSign: {
        username: '',
        pass: '',
        checkpass: '',
        gender: '男'
      },
      rules: {
        username: [
          { validator: validateUser, trigger: 'blur' },
          { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度保持在6~12字符', trigger: 'blur' }
        ],
        checkpass: [
          { validator: validatecheckPass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    openMessage (code) {
      switch (code) {
        case '200': {
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          break
        }
        case '201': {
          this.$message.error('注册失败, 请检查密码是否一致')
          break
        }
        case '202': {
          this.$message.error('注册失败, 该用户名已被注册')
          break
        }
        default: this.openError('未知错误')
      }
    },
    submitForm () {
      console.log(this.$refs.ruleSign)
      this.$refs.ruleSign.validate((valid) => {
        if (valid) { // 进行提交
          this.Signing().then(res => {
            // this.$store.commit('updateUser', this.$store.getters.init(res.user))
            this.openMessage(res.code)
          })
        } else {
          alert('输入有误')
          return false
        }
      })
    },
    resetForm () {
      this.$refs.ruleSign.resetFields()
    },
    async Signing () {
      const { data: res } = await Sign(this.ruleSign.username, this.ruleSign.pass, this.ruleSign.checkpass, this.ruleSign.gender)
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
.sign{
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
.user_sign {
    display: block;
    max-width: 60px;
    max-height: 60px;
    overflow: hidden;
    border-radius: 30px;
    width: 100%;
}
.user_sign img{
    display: block;
    height: 60px;
}
.form{
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}
.input_field{
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items:flex-start
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
/deep/.input_field .el-select input{
  width: 70px
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

</style>
