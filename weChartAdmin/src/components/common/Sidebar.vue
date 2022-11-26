<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
      text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
      <!-- 数据循环形成列表 -->
      <template v-for="item in items">
        <!-- 三级列表 -->
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                  {{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index + 'se'">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 普通列表 -->
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                // {
                //     icon: 'el-icon-user',
                //     index: 'user_table',
                //     title: '用户管理'
                // },
                // {
                //     icon: 'el-icon-s-order',
                //     index: 'order_table',
                //     title: '订单管理'
                // },
                // {
                //     icon: 'el-icon-goods',
                //     index: 'goods_table',
                //     title: '商品管理'
                // },
                // {
                //     icon: 'el-icon-lx-cascades',
                //     index: 'classify_table',
                //     title: '分类管理'
                // },
                // {
                //     icon: 'el-icon-document-add',
                //     index: 'goodsform',
                //     title: '商品添加'
                // },
                // {
                //     icon: 'el-icon-document-add',
                //     index: 'classifyform',
                //     title: '商品类别添加'
                // },
                // {
                //     icon: 'el-icon-pie-chart',
                //     index: 'charts',
                //     title: 'schart图表'
                // },
                {
                    icon: 'el-icon-document',
                    index: 'functionA',
                    title: '功能功能功能A'
                },
                {
                    icon: 'el-icon-first-aid-kit',
                    index: 'functionB',
                    title: '功能功能B'
                },
                {
                    icon: 'el-icon-data-line',
                    index: 'functionC',
                    title: '功能功能C'
                },
                {
                    icon: 'el-icon-data-analysis',
                    index: 'functionD',
                    title: '功能功能功能D'
                },
                {
                    icon: 'el-icon-discount',
                    index: 'functionE',
                    title: '功能功能E'
                },
                {
                    icon: 'el-icon-setting',
                    index: 'functionF',
                    title: '功能功能F'
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', (msg) => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
