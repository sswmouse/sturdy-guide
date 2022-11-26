<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 商品类别表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">

      <div class="handle-box">
        <!-- 批量删除按钮 -->
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除
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
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="参数">
          <el-table-column prop="text1" label="参数名">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item v-for="index in 6" :key="index">
                  <span>{{ props.row.text1[index-1] }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="text2" label="默认参数值">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item v-for="index in 6" :key="index">
                  <span>{{ props.row.text2[index-1] }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>

      </el-table>
      <!-- 数据? -->

      <!-- 底部页数组件 -->
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
          :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 模态框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="分类名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- 下拉列表 -->
        <el-form-item label="默认参数">
          <el-form-item v-for="(item,index) in form.text1" :key="index" :label="item">
            <el-input v-model="form.text2[index]"></el-input>
          </el-form-item>
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
            idx: -1
            // id: -1,
            //添加数据
        };
    },
    created() {
        this.getData();
    },
    methods: {
        //获取数据
        getData() {
            let myurl = 'http://127.0.0.1:3000/classifys_read';
            this.axios.post(myurl).then(
                (res) => {
                    let a = res.data.data;
                    a = a.replace(/\\/g, '');
                    a = a.replace(/:"\[/g, ':[');
                    a = a.replace(/\]"/g, ']');
                    a = a.replace(/:"{/g, ':{');
                    a = a.replace(/}"/g, '}');
                    a = JSON.parse(a);
                    this.tableData = a;
                    console.log(a);
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
                        if (that.tableData[i].name.indexOf(that.query.name) != -1) {
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
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                    console.log(row.id);
                    let myurl = 'http://127.0.0.1:3000/user_delete';
                    this.axios.post(myurl, { id: row.id }).then(
                        (res) => {
                            console.log(res);
                        },
                        (err) => {
                            console.log('数据读取失败');
                            console.log(err);
                        }
                    );
                })
                .catch(() => {});
        },
        //多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //全删按钮
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            for (let i = 0; i < length; i++) {
                let myurl = 'http://127.0.0.1:3000/user_delete';
                this.axios.post(myurl, { id: this.delList[i].id }).then(
                    (res) => {
                        console.log(res);
                    },
                    (err) => {
                        console.log('数据读取失败');
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
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
            let myurl = 'http://127.0.0.1:3000/classifys_keep';
            this.axios.post(myurl, { data_classify: this.form }).then(
                (res) => {
                    console.log(res);
                },
                (err) => {
                    console.log('数据读取失败');
                    console.log(err);
                }
            );
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        //图片处理
        // rq_imgs(aaa) {
        //     return require('../../../../xiaomiServer/static/img/' + aaa);
        // }
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
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
img {
    width: 100px;
    height: 80px;
}
</style>
