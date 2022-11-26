<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 用户表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">

      <div class="handle-box">
        <!-- 批量删除按钮 -->
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除
        </el-button>
        <!-- 添加用户 -->
        <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="addSelection">新增用户
        </el-button>
        <!-- 搜索框 -->
        <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10" clearable></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <!-- 表格设计 -->
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
        @selection-change="handleSelectionChange" height="650" stripe highlight-current-row>
        <!-- 复选框 -->
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <!-- id -->
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <!-- 用户名 -->
        <el-table-column prop="name" label="用户名"></el-table-column>
        <!-- 账号 -->
        <el-table-column prop="user_name" label="账号"></el-table-column>
        <!-- 头像 -->
        <el-table-column label="头像(查看大图)" align="center" prop="img">
          <template slot-scope="scope">
            <el-image class="table-td-thumb" :src="'http://localhost:3000/img/'+scope.row.img"
              :preview-src-list="['http://localhost:3000/img/'+scope.row.img]">
            </el-image>
          </template>
        </el-table-column>
        <!-- 电子邮箱 -->
        <el-table-column prop="Email" label="电子邮箱"></el-table-column>
        <!-- 手机号 -->
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <!-- 性别  -->
        <el-table-column prop="gender" label="性别" width="55"></el-table-column>
        <!-- 生日 -->
        <el-table-column prop="birthday" label="生日"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 底部页数组件 -->
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
          :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 模态框 -->
    <el-dialog :title="mo_text" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="form.user_name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.Email"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.gender">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日">
          <el-input v-model="form.birthday"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
    name: 'basetable',
    data() {
        return {
            //组件数据
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            //table数据
            tableData: [],
            multipleSelection: [],
            delList: [],
            //模态控制按钮
            editVisible: false,
            //底部页数
            pageTotal: 0,
            //编辑时表单数据传递
            form: {},
            idx: -1,
            // id: -1,
            //添加数据
            mo_text: '',
            stas: 0
        };
    },
    created() {
        this.getData();
    },
    methods: {
        //获取数据
        getData() {
            let myurl = 'http://127.0.0.1:3000/user_read';
            this.axios.post(myurl).then(
                (res) => {
                    this.tableData = JSON.parse(res.data.data);
                    console.log(this.tableData);
                },
                (err) => {
                    console.log('数据读取失败');
                    console.log(err);
                }
            );
        },
        //触发搜索按钮
        handleSearch() {
            this.getData();
            var that = this;
            if (that.query.name != '') {
                setTimeout(function () {
                    that.$set(that.query, 'pageIndex', 1);
                    var a = [];
                    for (let i = 0; i < that.tableData.length; i++) {
                        if (that.tableData[i].name == that.query.name) {
                            a.push(that.tableData[i]);
                        }
                    }
                    that.tableData = a;
                }, 100);
            }
        },
        //删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    console.log(row.id);
                    let myurl = 'http://127.0.0.1:3000/user_delete';
                    this.axios.post(myurl, { id: row.id }).then(
                        (res) => {
                            this.$message.success('删除成功');
                            this.tableData.splice(index, 1);
                            console.log(res);
                        },
                        (err) => {
                            console.log('数据读取失败');
                            console.log(err);
                            this.$message.error('删除失败，该用户存在绑定信息');
                        }
                    );
                })
                .catch(() => {});
        },
        //多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //添加操作
        addSelection() {
            this.mo_text = '添加';
            this.stas = 1;
            this.editVisible = true;
            console.log(111);
        },
        //全删按钮
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            for (let i = 0; i < length; i++) {
                let myurl = 'http://127.0.0.1:3000/user_delete';
                this.axios.post(myurl, { id: this.delList[i].id }).then(
                    (res) => {
                        console.log(res);
                        this.$message({ message: `删除了${str}`, type: 'success' });
                    },
                    (err) => {
                        console.log('数据读取失败');
                        this.$message.error(`删除${str}失败`);
                        console.log(err);
                    }
                );
            }
            this.multipleSelection = [];
            this.getData();
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.mo_text = '编辑';
            this.stas = 0;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            if (this.stas == 0) {
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                this.$set(this.tableData, this.idx, this.form);
                let myurl = 'http://127.0.0.1:3000/user_change';
                this.axios.post(myurl, { data: this.form }).then(
                    (res) => {
                        console.log(res);
                    },
                    (err) => {
                        console.log('数据读取失败');
                        console.log(err);
                    }
                );
            } else {
                this.$message.success(`添加成功`);
                console.log(this.form);
                let data = {
                    name: this.form.name,
                    user_name: this.form.user_name,
                    password: this.form.password,
                    Email: this.form.Email,
                    phone: this.form.phone,
                    gender: this.form.gender,
                    birthday: this.form.birthday,
                    img: ''
                };
                let myurl = 'http://127.0.0.1:3000/user_register';
                this.axios.post(myurl, { data: data }).then(
                    (res) => {
                        console.log(res);
                        this.getData();
                    },
                    (err) => {
                        console.log('数据读取失败');
                        console.log(err);
                    }
                );
            }
        },

        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
