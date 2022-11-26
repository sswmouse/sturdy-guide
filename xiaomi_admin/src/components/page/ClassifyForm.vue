<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 商品管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>商品类别添加</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="分类名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="参数">
            <el-form-item v-for="(item,index) in form.list" :key="index" :label="'参数'+(index+1)">
              <el-select v-model="item.ico" placeholder="参数图标">
                <el-option v-for="item1 in options" :key="item1+'1'" :label="item1" :value="item1"></el-option>
              </el-select>
              <el-input v-model="item.text1" placeholder="参数名称" @focus="get" @blur="test(item.text1)"></el-input>
              <p class="one">{{err}}</p>
              <el-input v-model="item.text2" placeholder="参数值"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="add">增加参数</el-button>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'ClassifyForm',
    data() {
        return {
            options: ['wap-nav', 'enlarge', 'expand', 'photograph'],
            err: '',
            list: [],
            form: {
                name: '',
                list: [{ ico: '', text1: '', text2: '' }]
            }
        };
    },
    methods: {
        add() {
            if (this.form.list.length < 6) {
                let a = { ico: '', text1: '', text2: '' };
                this.form.list.push(a);
            } else {
                this.$message('最多添加6个参数');
            }
        },
        onSubmit() {
            if (this.err == '' && this.form.name != '') {
                var is_you = true;
                for (let i = 0; i < this.form.list.length; i++) {
                    if (this.form.list[i].text1 == '') {
                        is_you = false;
                        this.$message.error('提交失败，请完善信息！');
                        break;
                    }
                }
                if (is_you == true) {
                    console.log(this.form);
                    var ico = [];
                    var text1 = [];
                    var text2 = [];
                    for (let j = 0; j < this.form.list.length; j++) {
                        ico.push(this.form.list[j].ico);
                        text1.push(this.form.list[j].text1);
                        text2.push(this.form.list[j].text2);
                    }
                    let data_classify = {
                        name: this.form.name,
                        ico,
                        text1,
                        text2
                    };
                    let myurl = 'http://127.0.0.1:3000/classifys_add';
                    this.axios.post(myurl, { data_classify }).then(
                        (res) => {
                            this.$message.success('提交成功');
                            this.form = {
                                name: '',
                                list: [{ ico: '', text1: '', text2: '' }]
                            };
                            console.log(res);
                        },
                        (err) => {
                            console.log('数据读取失败');
                            console.log(err);
                        }
                    );
                }
            } else {
                this.$message.error('提交失败，请完善信息！');
            }
        },

        test(a) {
            if (a == '') {
                this.err = '参数名不能为空';
            }
        },
        get() {
            this.err = '';
        }
    }
};
</script>

<style scoped>
.one {
    color: red;
    font-size: 12px;
}
</style>


