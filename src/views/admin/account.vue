<template>
  <div class="account">
    <div class="add">
      <div>
        <el-button  type="primary"  @click="handleAdd" icon="el-icon-circle-plus-outline">添加</el-button>
        <el-button type="primary" icon="el-icon-setting">全选</el-button>
      </div>
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="search.input" class="search"  @change="handleSearch">
          <el-select v-model="search.field" slot="prepend" placeholder="请选择">
            <el-option label="编号" value="id"></el-option>
            <el-option label="用户名" value="username"></el-option>
            <el-option label="管理员" value="level"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
    </div>
    <el-dialog title="添加账户" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form ref="form" :inline="true" :model="form" :rules="rules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input placeholder="请输入密码" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限设置" :label-width="formLabelWidth" prop="level">
          <el-select v-model="form.level">
            <el-option label="普通用户" :value="1"></el-option>
            <el-option label="VIP用户" :value="2"></el-option>
            <el-option label="管理员" :value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="id"
      label="编号">
    </el-table-column>
    <el-table-column
      prop="gender"
      label="性别">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码">
    </el-table-column>
    <el-table-column
      prop="level"
      label="权限">
   </el-table-column>
    <el-table-column
    label="操作">
    <template slot-scope="scope">
      <el-button
        size="mini"
        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
      <el-button
        size="mini"
        type="danger"
        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
    </template>
  </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="10"
      @current-change="handlePage">
    </el-pagination>
  </div>
</div>
</template>

<script>
import { Users } from '@/api/Users.js'
import { addUser } from '@/api/addUser.js'
import { subUser } from '@/api/subUser.js'
import { reUser } from '@/api/reUser.js'
import { search } from '@/api/searchUser.js'
export default {
  name: 'Account',
  components: {},
  data () {
    return {
      search: {
        input: '',
        field: 'id'
      },
      model: 0,
      modelPage: 0,
      tableData: [],
      total: 50,
      dialogFormVisible: false,
      form: {
        id: 0,
        username: '',
        password: '',
        gender: '',
        level: 0
      },
      pageData: {
        page: 1,
        limit: 14
      },
      formLabelWidth: '120px',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        level: [
          { required: true, message: '请选择全选', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    async init () {
      if (this.modelPage === 0) {
        const { data: res } = await Users(this.pageData)
        this.tableData = res.list
        this.total = res.total
      } else {
        const { data: res } = await search(this.search, this.pageData)
        this.tableData = res.list
        this.total = res.total
      }
    },
    submit (model) {
      console.log(this.$refs.form)
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(valid)
          if (this.model === 0) {
            addUser(this.form.username, this.form.password, this.form.gender, this.form.level).then(({ data }) => {
              console.log(data)
              this.init() // 更新
              this.$refs.form.resetFields()
            })
          } else {
            reUser(this.form.id, this.form.username, this.form.password, this.form.gender, this.form.level).then(({ data }) => {
              console.log(data)
              this.init() // 更新
              this.$refs.form.resetFields()
            })
          }
        }
        // 关闭弹窗
        this.dialogFormVisible = false
      })
    },
    handleClose () {
      this.$refs.form.resetFields()
      this.dialogFormVisible = false
    },
    handleDelete (index, row) {
      subUser(row.id).then(data => {
        console.log(data)
        this.init() // 更新
      })
    },
    handleAdd () {
      this.model = 0
      this.dialogFormVisible = true
    },
    handleEdit (index, row) {
      this.model = 1
      this.dialogFormVisible = true
      this.form = JSON.parse(JSON.stringify(row))
    },
    handlePage (curPage) {
      this.pageData.page = curPage // 当前页
      this.init() // 请求当前页数据
      console.log(curPage)
    },
    handleSearch () {
      const content = this.search.input.trim() // 是否为空
      if (content.length > 0) {
        this.modelPage = 1 // 进行搜索
        this.init()
      } else {
        this.modelPage = 0
        this.init()
      }
    },
    cancel () {
      this.$refs.form.resetFields()
      this.dialogFormVisible = false
    }
  },
  mounted () {
    this.init()
  }
}

</script>

<style scoped lang="less">
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-select .el-input {
    width: 130px;
    }
  .search .el-input-group__prepend {
    background-color: #fff;
    }
</style>
