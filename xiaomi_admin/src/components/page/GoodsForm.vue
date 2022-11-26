<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 商品管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>商品添加</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.price">
              <template slot="prepend">￥</template>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input-number v-model="form.select_num"></el-input-number>
          </el-form-item>
          <el-form-item label="商品类别">
            <el-select v-model="form.classify" placeholder="请选择">
              <el-option v-for="(item,index) in list" :key="index" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品参数" v-for="(item,index) in list" :key="index+'o'" v-show="form.classify==item.name">
            <el-form-item v-for="(item1,index1) in list[index].par" :key="index1+'pr'" :label="item1.text1">
              <el-input v-model="item1.text2"></el-input>
            </el-form-item>
          </el-form-item>

          <el-form-item label="商品图片">
            <el-upload class="upload-demo" action="http://127.0.0.1:3000/goods_add" :auto-upload="false" ref="upload"
              list-type="picture" :data="{data:JSON.stringify(form)}" :limit='1' :on-change="img_change"
              :on-remove="img_change" :file-list='fileList'>
              <el-button size="small" type="primary">选择图片</el-button>
              <div slot="tip" class="el-upload__tip">创建商品时必须上传一张图片(且只能上传一张，如有补充，请前往商品管理)</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input type="textarea" rows="5" v-model="form.text"></el-input>
          </el-form-item>
          <el-form-item>
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
    name: 'baseform',
    data() {
        return {
            fileList: [],
            sta: 0,
            list: [
                // {
                //     name: '手机',
                //     par: [
                //         { ico: 'wap-89', text1: 'CPU核数', text2: '六核' },
                //         { ico: 'enlarge', text1: '机身厚度', text2: '7.4mm' },
                //         { ico: 'expand', text1: '超大屏', text2: '6.1英寸' },
                //         { ico: 'photograph', text1: '前置摄像', text2: '1200万' }
                //     ]
                // }
            ],
            form: {
                name: '',
                price: '',
                classify: '',
                text: '',
                list: [
                    // { ico: 'wap-nav', text1: 'CPU核数', text2: '六核' },
                    // { ico: 'enlarge', text1: '机身厚度', text2: '7.4mm' },
                    // { ico: 'expand', text1: '超大屏', text2: '6.1英寸' },
                    // { ico: 'photograph', text1: '前置摄像', text2: '1200万' }
                ],
                imgs: [],
                select_num: 0
            }
        };
    },
    methods: {
        img_change(file) {
            this.sta = file.length;
        },
        onSubmit() {
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].name == this.form.classify) {
                    this.form.list = this.list[i].par;
                }
            }
            if (this.form.name != '' && this.form.price != '' && this.form.classify != '' && this.form.list != '') {
                this.$nextTick(function () {
                    if (this.sta == 0) {
                        this.$message.warning('请选择商品图片');
                    } else {
                        this.$refs.upload.submit();
                        this.fileList = [];
                        this.form = {
                            name: '',
                            price: '',
                            classify: '',
                            text: '',
                            list: [],
                            imgs: [],
                            select_num: 0
                        };
                        this.$message.success('商品录入成功');
                    }
                });
            } else {
                this.$message.warning('请完善商品信息');
            }
        }
    },
    created() {
        let myurl = 'http://127.0.0.1:3000/classifys_read';
        this.axios.post(myurl).then((res) => {
            let a = res.data.data;
            a = a.replace(/\\/g, '');
            a = a.replace(/:"\[/g, ':[');
            a = a.replace(/\]"/g, ']');
            a = a.replace(/:"{/g, ':{');
            a = a.replace(/}"/g, '}');
            a = JSON.parse(a);
            for (let i = 0; i < a.length; i++) {
                let c = {};
                c.par = [];
                c.name = a[i].name;
                for (let j = 0; j < a[i].ico.length; j++) {
                    let b = {};
                    b.ico = a[i].ico[j];
                    b.text1 = a[i].text1[j];
                    b.text2 = a[i].text2[j];
                    c.par.push(b);
                }
                this.list.push(c);
            }
        });
    }
};
</script>


