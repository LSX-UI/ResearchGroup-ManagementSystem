<template>
  <div class="user-management">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '编辑用户'"
      :visible.sync="isShow"
      width="48%"
    >
      <CommonForm
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></CommonForm>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button class="add-user" type="primary" @click="addUser"
        >添加用户</el-button
      >
      <CommonForm
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
        class="search-input"
      >
      </CommonForm>
      <el-button
        class="search-button"
        type="primary"
        style="display: inline"
        @click="getLists(searchForm.keyword)"
        size="midel"
      >
        搜索
      </el-button>
    </div>
    <div class="user-table">
      <!-- ! 通过props的方式将表格的单列数据与标签传递给公共的表格子组件 -->
      <CommonTable
        :tableData="tableData"
        :tableLabel="tableLabel"
        :paginationConfig="paginationConfig"
        @pageChange="getLists"
        @edit="editUser"
        @dele="deleUser"
      ></CommonTable>
    </div>
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import CommonTable from "../../components/CommonTable.vue";
import { getUser } from "../../api/data";
export default {
  name: "User",
  data() {
    return {
      isShow: false,
      operateType: "add" || "edit",
      //依据不同的表单输入框类型设计相应的数据返回项目
      operateFormLabel: [
        {
          model: "userName",
          type: "input",
          label: "姓名",
        },
        {
          model: "userAge",
          type: "input",
          label: "年龄",
        },
        {
          model: "sex",
          type: "select",
          label: "性别",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birthday",
          type: "date",
          label: "出生日期",
        },
        {
          model: "address",
          type: "input",
          label: "住址",
        },
      ],
      operateForm: {
        userName: "",
        address: "",
        userAge: "",
        birthday: "",
        sex: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
      //用户表格数据区域
      tableData: [],
      tableLabel: [
        {
          prop: "userName",
          label: "姓名",
        },
        {
          prop: "userAge",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birthday",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "address",
          label: "家庭住址",
          width: 280,
        },
      ],
      paginationConfig:{
        page:2,
        total:200,
        loading:false
      }
    };
  },
  components: {
    CommonForm,
    CommonTable,
  },
  methods: {
    confirm() {
      if (this.operateType == "edit") {
        this.http.post("/user/edit", this.operateForm).then((res) => {
          console.log(res, "更新用户信息完成");
          this.isShow = false;
          // 添加完用户后，重新刷新列表
          this.getLists();
        });
      } else {
        this.http.post("/user/add", this.operateForm).then((res) => {
          console.log("user添加的数据为", res);
          this.isShow = false;
          // 添加完用户后，重新刷新列表
          this.getLists();
        });
      }
    },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = {
        userName: "",
        address: "",
        userAge: "",
        birthday: "",
        sex: "",
      };
    },
    //! 用户信息表格内容处理
    getLists(name = "") {
      name ? (this.paginationConfig.page = 1) : "";
      getUser({
        page: this.paginationConfig.page,
        name,
      }).then((res) => {
        this.tableData = res.data.list.map((item) => {
          // 用户的性别信息是通过数字0和1存储的，页面显示出来则需要进行遍历解析。
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.paginationConfig.total = res.data.count;
        this.paginationConfig.loading = false;
      });
    },
    //  编辑用户基本信息
    editUser(row) {
      this.isShow = true;
      this.operateType = "edit";
      this.operateForm = row;
    },
    deleUser(row) {
      // 调用自身的api
      this.$confirm("是否确定删除？此操作不可撤回", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const id = row.id;
          this.http.post("/user/delUser", {
            params: { id },
          })
          .then((res)=>{
            this.$message({
               message:"删除成功",
               type:'success'
            });
            this.getLists();
          })
          .catch(() => {
          this.$message({
            message: "取消删除",
            type: "info",
          });
        })
        });
    },
  },
  mounted() {
    this.getLists();
  },
};
</script>

<style scoped lang="less">
.manage-header {
  position: relative;
  margin-top: 4px;
  height: 46px;
  width: 100%;
  .add-user {
    position: absolute;
    left: 0px;
    top: 8px;
  }
  .add-user:hover {
    background-color: rgb(158, 196, 211);
  }
  .search-input {
    position: absolute;
    right: 80px;
    top: 8px;
  }
  .search-button {
    position: absolute;
    right: 0px;
    top: 8px;
  }
}
.user-table {
  margin-top: 12px;
}
</style>