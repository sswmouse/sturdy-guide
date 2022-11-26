<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>订单表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="handle-box">
        <!-- 批量删除按钮 -->
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除
        </el-button>
        <el-button type="primary" icon="el-icon-finished" class="handle-del mr10" @click="toAllSelection(0)">批量发货
        </el-button>
        <el-button type="primary" icon="el-icon-finished" class="handle-del mr10" @click="toAllSelection(1)">批量同意退款
        </el-button>
        <!-- 搜索框 -->
        <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10" clearable></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>

      <!-- 表格设计 -->
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
        @selection-change="handleSelectionChange" stripe height="650" highlight-current-row fixed>
        <!-- 复选框 -->
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <!-- 订单详情 -->

        <el-table-column type="expand" label="详情" width="55">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="买家信息:">
                <el-form-item label="姓名:">
                  <span>{{ props.row.user_name }}</span>
                </el-form-item><br>
                <el-form-item label="电话:">
                  <span>{{ props.row.user_phone }}</span>
                </el-form-item>
              </el-form-item><br>
              <el-form-item label="商品信息:">
                <el-form-item label="商品名称:">
                  <span>{{ props.row.goods_name }}</span>
                </el-form-item><br>
                <el-form-item label="商品单价:">
                  <span>{{ props.row.price }}</span>
                </el-form-item><br>
                <el-form-item label="够买数量:">
                  <span>{{ props.row.select_num }}</span>
                </el-form-item>
              </el-form-item><br>
              <el-form-item label="配送信息:">
                <el-form-item label="收货人:">
                  <span>{{ props.row.get_name }}</span>
                </el-form-item><br>
                <el-form-item label="收货电话:">
                  <span>{{ props.row.get_phone }}</span>
                </el-form-item><br>
                <el-form-item label="收货地址:">
                  <span>{{ props.row.province }}/{{ props.row.city }}/{{ props.row.county }}/{{ props.row.addressDetail }}</span>
                </el-form-item><br>
                <el-form-item label="邮编编码:">
                  <span>{{ props.row.postalCode}}</span>
                </el-form-item>
              </el-form-item><br>
              <el-form-item label="订单信息:">
                <el-form-item label="是否付款:">
                  <span>{{ props.row.is_payment }}</span>
                </el-form-item>
                <el-form-item label="是否发货:">
                  <span>{{ props.row.is_deliver }}</span>
                </el-form-item>
                <el-form-item label="是否收货:">
                  <span>{{ props.row.is_get }}</span>
                </el-form-item>
                <el-form-item label="是否申请退款:">
                  <span>{{ props.row.is_refund }}</span>
                </el-form-item>
                <el-form-item label="是否同意退款:">
                  <span>{{ props.row.is_to_refund }}</span>
                </el-form-item><br>
                <el-form-item label="评价:">
                  <span>{{ props.row.estimate}}</span>
                </el-form-item>
              </el-form-item><br>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column label="买家信息">
          <el-table-column prop="user_name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="user_phone" label="电话" width="120">
          </el-table-column>
        </el-table-column>
        <el-table-column label="商品信息">
          <el-table-column prop="goods_name" label="商品名称" width="120">
          </el-table-column>
          <el-table-column prop="price" label="商品单价">
          </el-table-column>
          <el-table-column prop="select_num" label="购买数量" width="55">
          </el-table-column>
        </el-table-column>
        <el-table-column label="订单操作">
          <el-table-column label="是否支付" align="center">
            <template slot-scope="scope">
              <el-tooltip content="支付状态" placement="bottom">
                <el-tag :type="scope.row.is_payment=='true'?'primary':(scope.row.is_payment=='false'?'info':'')">
                  {{scope.row.is_payment}}
                </el-tag>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="是否发货" align="center">
            <template slot-scope="scope">
              <el-tooltip content="点击发货" placement="bottom">
                <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon-color="green" title="是否发货"
                  @confirm="deliverGoods(scope.row)">
                  <el-tag slot="reference"
                    :type="scope.row.is_deliver=='true'?'primary':(scope.row.is_deliver=='false'?'info':'')">
                    {{scope.row.is_deliver}}
                  </el-tag>
                </el-popconfirm>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="是否收货" align="center">
            <template slot-scope="scope">
              <el-tooltip content="收货状态" placement="bottom">
                <el-tag :type="scope.row.is_get=='true'?'primary':(scope.row.is_get=='false'?'info':'')">
                  {{scope.row.is_get}}
                </el-tag>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="是否申请退货" align="center">
            <template slot-scope="scope">
              <el-tooltip content="是否申请退货" placement="bottom">
                <!-- <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon-color="red" title="通过退货申请"
                @confirm="applyRefund(scope.row)"> -->
                <el-tag :type="scope.row.is_refund=='true'?'primary':(scope.row.is_refund=='false'?'info':'')">
                  {{scope.row.is_refund}}
                </el-tag>
                <!-- </el-popconfirm> -->
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="是否同意退货" align="center">
            <template slot-scope="scope">
              <el-tooltip content="点击操作" placement="bottom">
                <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon-color="red" title="通过退货申请"
                  @confirm="applyRefund(scope.row)">
                  <el-tag slot="reference"
                    :type="scope.row.is_to_refund=='true'?'primary':(scope.row.is_to_refund=='false'?'info':'')">
                    {{scope.row.is_to_refund}}
                  </el-tag>
                </el-popconfirm>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="money" label="总价">
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
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
    <el-dialog :title="mo_text" :visible.sync="editVisible" width="40%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="买家信息">
          <el-form-item label="姓名">
            <el-input v-model="form.user_name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.user_phone" :disabled="true"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="商品信息">
          <el-form-item label="名称">
            <el-input v-model="form.goods_name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="form.price" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="form.select_num" :disabled="true"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="收货信息">
          <el-form-item label="姓名">
            <el-input v-model="form.get_name" :disabled="true"> </el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.get_phone" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="省份">
            <el-input v-model="form.province" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="市区">
            <el-input v-model="form.city" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="县/区">
            <el-input v-model="form.county" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="form.addressDetail" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="邮政编码">
            <el-input v-model="form.postalCode" :disabled="true"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-form-item label="是否支付">
            <el-select v-model="form.is_payment">
              <el-option label="true" value="true"></el-option>
              <el-option label="false" value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否发货">
            <el-select v-model="form.is_deliver">
              <el-option label="true" value="true"></el-option>
              <el-option label="false" value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否收货">
            <el-select v-model="form.is_get">
              <el-option label="true" value="true"></el-option>
              <el-option label="false" value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否申请退款">
            <el-select v-model="form.is_refund">
              <el-option label="true" value="true"></el-option>
              <el-option label="false" value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否同意退款">
            <el-select v-model="form.is_to_refund">
              <el-option label="true" value="true"></el-option>
              <el-option label="false" value="false"></el-option>
            </el-select>
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
            idx: -1,
            // id: -1,
            //添加数据
            mo_text: ''
        };
    },
    created() {
        this.getData();
    },
    methods: {
        //获取数据
        getData() {
            let myurl = 'http://127.0.0.1:3000/order_read';
            this.axios.post(myurl).then((res) => {
                let a = JSON.parse(res.data.data);
                for (let i = 0; i < a.length; i++) {
                    a[i].money = (a[i].price - 0) * a[i].select_num;
                }
                this.tableData = a;
            });
        },
        //触发搜索按钮
        handleSearch() {
            this.getData();
            var that = this;
            if (this.query.name != '') {
                setTimeout(function () {
                    that.$set(that.query, 'pageIndex', 1);
                    var a = [];
                    for (let i = 0; i < that.tableData.length; i++) {
                        if (
                            that.tableData[i].user_name.indexOf(that.query.name) != -1 ||
                            that.tableData[i].get_name.indexOf(that.query.name) != -1
                        ) {
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
            this.$confirm('确定要删除吗？', '提示', { type: 'warning' })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                    let myurl = 'http://127.0.0.1:3000/order_delete';
                    this.axios.post(myurl, { id: row.id }).then((res) => {
                        console.log(res);
                    });
                })
                .catch(() => {});
        },
        //多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //批量操作
        toAllSelection(a) {
            const length = this.multipleSelection.length;
            //批量发货
            if (a == 0) {
                for (let i = 0; i < length; i++) {
                    if (this.multipleSelection[i].is_payment == 'true' && this.multipleSelection[i].is_deliver == 'false') {
                        this.multipleSelection[i].is_deliver = true;
                    }
                }
            }
            //批量同意退款
            if (a == 1) {
                for (let i = 0; i < length; i++) {
                    if (this.multipleSelection[i].is_refund == 'true' && this.multipleSelection[i].is_to_refund == 'false') {
                        this.multipleSelection[i].is_to_refund = true;
                    }
                }
            }
            for (let i = 0; i < length; i++) {
                let myurl = 'http://127.0.0.1:3000/order_change';
                this.axios.post(myurl, { data_order: this.multipleSelection[i] }).then((res) => {
                    console.log(res);
                });
            }
            if (length != 0) {
                this.$message({
                    message: '操作成功',
                    type: 'success'
                });
            }
            this.getData();
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
                let myurl = 'http://127.0.0.1:3000/order_delete';
                this.axios.post(myurl, { id: this.delList[i].id }).then((res) => {
                    console.log(res);
                });
            }
            this.getData();
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.mo_text = '编辑';
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
            let myurl = 'http://127.0.0.1:3000/order_change';
            this.axios.post(myurl, { data_order: this.form }).then((res) => {
                console.log(res);
            });
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        //发货
        deliverGoods(a) {
            if (a.is_deliver == 'true') {
                a.is_deliver = 'false';
            } else if (a.is_payment == 'true') {
                a.is_deliver = 'true';
            } else {
                alert('该订单尚未支付');
            }
            let myurl = 'http://127.0.0.1:3000/order_change';
            this.axios.post(myurl, { data_order: a }).then((res) => {
                console.log(res);
            });
        },
        //退款
        applyRefund(a) {
            if (a.is_refund == 'true' && a.is_to_refund == 'false') {
                a.is_to_refund = 'true';
            } else if (a.is_refund == 'true' && a.is_to_refund == 'true') {
                a.is_to_refund = 'false';
            } else {
                alert('该订单没有申请退款');
            }
            let myurl = 'http://127.0.0.1:3000/order_change';
            this.axios.post(myurl, { data_order: a }).then((res) => {
                console.log(res);
            });
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
