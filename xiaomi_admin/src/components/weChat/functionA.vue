<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">新增二级商协议</a></el-breadcrumb-item>
      </el-breadcrumb>
      <h2>新增二级商协议</h2>
    </div>
    <el-divider><i class="el-icon-info" style="color:blue;"></i>协议主体</el-divider>
    <div class="center">
      <el-form ref="form" :model="form1" label-width="80px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="协议：" required>
              <el-button size="small">选择客户</el-button>
              <span style="margin-left: 10px">上海某某医药有限公司</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="协议状态">
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="购进指标">
              <el-select v-model="value" placeholder="请选择" style="width: 80px;margin-right: 10px;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
              <el-input v-model="form1.money" style="width: 300px;" placeholder="输入金额/数量"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="购进指标">
              <el-select v-model="value" placeholder="请选择" style="width: 80px;margin-right: 10px;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
              <el-input v-model="form1.name" style="width: 300px;" placeholder="输入金额/数量"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="销售区域">
              <el-button size="small">选择区域</el-button>
              <el-tag v-for="item in options" :key="item.label" :type="item.value" effect="dark"
                style="margin-left: 10px" closable @close="handleClose(item.lable)"> {{ item.value }}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签订时间">
              <el-input v-model="form1.time" style="width: 300px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="购进渠道">
              <el-select v-model="value" placeholder="请选择" style="width: 80px;margin-right: 10px;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
              <el-input v-model="form1.name" style="width: 120px;" placeholder="请选择渠道"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="22" :offset="1">
            <el-table :data="tableData1" style="width: 100%">
              <el-table-column prop="date" label="指定渠道编码" width="300">
              </el-table-column>
              <el-table-column prop="name" label="指定渠道名称" width="300">
              </el-table-column>
              <el-table-column prop="address" label="所在省份">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-divider><i class="el-icon-info" style="color:blue;"></i>产品政策</el-divider>
    <div class="center">
      <div class="handle-box">
        <!-- 批量删除按钮 -->
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">添加产品
        </el-button>
        <span>购进总指标（万元）：</span>{{'￥' + (form1.money ? form1.money: 152.65)}}
        <span style="margin-left: 20px">直播按季度分解（万元）：</span>{{'￥' + (form1.money ? form1.money: 152.65)}}
        <span style="margin-left: 20px">纯销售总指标（万元）：</span>{{'￥' + (form1.money ? form1.money: 152.65)}}
      </div>
      <div style="margin: 10px 20px 0px 20px;background-color: white;padding: 10px 20px 0px 20px;">
        产品：<el-button size="small">选择产品</el-button>
        <span style="color: blue;cursor: pointer;margin:0 30px 0 20px">美复胶丸 24粒/盒</span>
        <span>协议期效：</span>
        <el-input v-model="form1.time" style="width: 150px;"></el-input>
        <el-divider></el-divider>
        <el-table :data="tableData2" style="width: 100%">
          <el-table-column prop="agreement" label="协议价（元）">
            <template slot-scope="scope">
              <el-input v-model="scope.row.agreement"  size="mini" v-focus />
            </template>
          </el-table-column>
          <el-table-column prop="ticketDiscount" label="票折（元）">
            <template slot-scope="scope">
              <el-input v-model="scope.row.ticketDiscount"  size="mini" v-focus />
            </template>
          </el-table-column>
          <el-table-column prop="purchaseIndexQuantityLarge" label="购进指标量（小单位）">
            <template slot-scope="scope">
              <el-input v-model="scope.row.purchaseIndexQuantityLarge"  size="mini" v-focus />
            </template>
          </el-table-column>
          <el-table-column prop="purchaseIndexQuantitySmall" label="购进指标量（大单位）">
            <template slot-scope="scope">
              <el-input v-model="scope.row.purchaseIndexQuantitySmall"  size="mini" v-focus />
            </template>
          </el-table-column>
          <el-table-column prop="amountOfPurchaseLarge" label="购进金额（万元）">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amountOfPurchaseLarge"  size="mini" v-focus />
            </template>
          </el-table-column>
          <el-table-column prop="salesQuantity" label="纯销指标量（小单位）">
            <template slot-scope="scope">
              <el-input v-model="scope.row.salesQuantity"  size="mini" v-focus />
            </template>
          </el-table-column>
          <el-table-column prop="salesMoney" label="纯销指标金额（万元）">
            <template slot-scope="scope">
              <el-input v-model="scope.row.salesMoney"  size="mini" v-focus />
            </template>
          </el-table-column>
        </el-table>
        <div style="margin: 5px 0 5px 0"></div>
        <el-table :data="tableData3" style="width: 100%">
          <el-table-column prop="agreement" label="分销奖励">
            <template slot-scope="scope">
              <el-input v-model="scope.row.agreement"  size="mini" v-focus />
            </template>
          </el-table-column>
          <el-table-column prop="ticketDiscount" label="费用科目">
            <template slot-scope="scope">
              <el-select v-model="scope.row.ticketDiscoun" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="purchaseIndexQuantityLarge" label="零售配送">
            <template slot-scope="scope">
              <el-input v-model="scope.row.purchaseIndexQuantityLarge"  size="mini" v-focus />
            </template>
          </el-table-column>
          <el-table-column prop="purchaseIndexQuantitySmall" label="费用科目">
            <template slot-scope="scope">
              <el-select v-model="scope.row.purchaseIndexQuantitySmall" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="amountOfPurchaseLarge" label="医疗配送商">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amountOfPurchaseLarge"  size="mini" v-focus />
            </template>
          </el-table-column>
          <el-table-column prop="salesQuantity" label="费用科目">
            <template slot-scope="scope">
              <el-select v-model="scope.row.salesQuantity" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="salesMoney" label="自定义7">
            <template slot-scope="scope">
              <el-input v-model="scope.row.time" size="mini" v-focus />
            </template>
          </el-table-column>
          <el-table-column prop="salesMoney" label="自定义8">
            <template slot-scope="scope">
              <el-input v-model="scope.row.time" size="mini" v-focus />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-divider><i class="el-icon-info" style="color:blue;"></i>补充协议</el-divider>
    <div class="container xieyi">
			<el-button type="primary" icon="el-icon-add" @click="delAllSelection" class="add3">新增</el-button>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item v-for="(item, index) in options2" :key="index + 'ssss'" :index="index">{{item.value}}
        </el-menu-item>
      </el-menu>
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="options2[activeIndex].center">
      </el-input>
    </div>
		<div class="container keep">
			<el-button type="primary" icon="el-icon-add" @click="delAllSelection">保存</el-button>
		</div>
  </div>
</template>
  
<script>
export default {
    name: 'basetable',
    data() {
        return {
            tableData1: [
                {
                    date: 'BJ000090',
                    name: '宁波九州通药业有限公司',
                    address: '浙江省'
                },
                {
                    date: 'BJ000192',
                    name: '国药控股精华有限公司',
                    address: '浙江省'
                },
                {
                    date: 'BJ000283',
                    name: '老百姓药业有限公司',
                    address: '浙江省'
                }
            ],
            tableData2: [
                {
                    agreement: 'BJ000090',
                    ticketDiscount: '宁波九州通药业有限公司',
                    purchaseIndexQuantityLarge: '浙江省',
                    purchaseIndexQuantitySmall: '浙江省',
                    amountOfPurchaseLarge: '999',
                    salesQuantity: '888',
                    salesMoney: '999'
                }
            ],
            tableData3: [
                {
                    agreement: 'BJ000090',
                    ticketDiscount: '宁波九州通药业有限公司',
                    purchaseIndexQuantityLarge: '浙江省',
                    purchaseIndexQuantitySmall: '浙江省',
                    amountOfPurchaseLarge: '999',
                    salesQuantity: '888',
                    salesMoney: '999',
                    time: new Date().toLocaleString()
                }
            ],
            form1: {
                name: null,
                money: null,
                time: new Date().toLocaleString()
            },
            //组件数据
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            value: '正常',
            options: [
                {
                    value: '正常',
                    lable: '正常'
                },
                {
                    value: '金额',
                    lable: '金额'
                }
            ],
            activeIndex: 0,
            options2: [
                {
                    value: '补充协议1',
                    lable: '补充协议1',
                    center: null
                },
                {
                    value: '补充协议2',
                    lable: '补充协议2',
                    center: null
                },
                {
                    value: '补充协议2',
                    lable: '补充协议2',
                    center: null
                }
            ],
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
        handleClose(tag) {
					this.options = this.options.filter(item => item.lable != tag);
        },
        onSubmit() {},
        toHome() {
            console.log(21111);
            this.$router.push({ path: '/' });
        },
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
.xieyi {
	position: relative;
}
.keep {
	position: fixed;
	width: 100%;
	padding: 10px;
	bottom: 0;
	z-index: 10;
}
.add3{
	position: absolute;
	right: 30px;
	z-index: 5;
}
.el-divider__text {
    background: rgba(0, 0, 0, 0);
}


.crumbs .title:hover {
    cursor: pointer;
    color: blue;
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
  