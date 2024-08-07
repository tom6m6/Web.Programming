<template>
  <div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" v-model="searchTitle" placeholder="请输入标题" suffix-icon="el-icon-search" class="ml-5"></el-input>
      <el-input style="width: 200px" v-model="searchIntro" placeholder="请输入简介" suffix-icon="el-icon-search" class="ml-5"></el-input>
      <el-input style="width: 200px" v-model="searchSource" placeholder="请输入来源" suffix-icon="el-icon-search" class="ml-5"></el-input>
      <el-button class="ml-5" type="primary" @click="updatePage">搜索</el-button>
      <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
    </div>

    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
      <el-popconfirm
          class="ml-5"
          confirm-button-text='确定'
          cancel-button-text='我再想想'
          icon="el-icon-info"
          icon-color="red"
          title="您确定删除吗？"
          @confirm="batchDelete"
      >
        <el-button type="danger" slot="reference">批量删除 <i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm>
      <el-button type="primary" @click="updateNews" style="margin-left: 5px;">爬取最新新闻 <i class="el-icon-circle-plus-outline"></i></el-button>
    </div>


    <el-table :data="tableData" border stripe @selection-change="batchSel">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="标题" width="300">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank" class="buttonText">{{scope.row.title}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="简介" width="400"></el-table-column>
      <el-table-column prop="source" label="来源" width="150"></el-table-column>
      <el-table-column prop="create_time" label="发布时间" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click="edit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定删除吗？"
              @confirm="del(scope.row.id)"
          >
            <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange"
          :current-page="pageNum"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <el-dialog title="新闻信息" :visible.sync="dialogFormVisible" width="30%" >
      <el-form label-width="80px" size="small">
        <el-form-item label="标题">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="来源">
          <el-input v-model="form.source" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="form.create_time" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
export default {
name: "Eastmoney",
data(){
  return {
    tableData: [],
    total: 0,
    pageNum: 1,
    pageSize: 5,
    searchTitle: '',
    searchSource: '',
    searchIntro: '',
    dialogFormVisible: false,
    form: {},
    batchSelect: [],
  }
},
methods: {
  pageSizeChange(pageSize){
    this.pageSize = pageSize;
    this.updatePage();
  },
  pageCurrentChange(pageNum){
    this.pageNum = pageNum;
    this.updatePage();
  },
  updatePage(){
    this.request.get('/eastmoney/page',{
      params: {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        title: this.searchTitle,
        intro: this.searchIntro,
        source: this.searchSource
      }
    }).then(res => {
      if(res.data === null){
        this.$message.error("用户信息加载错误");
      }
      this.total = res.data['total'];
      this.tableData = res.data['records'];
    })
  },
  reset(){
    this.searchTitle = '';
    this.searchIntro = '';
    this.searchSource = '';
    this.updatePage();
  },
  add(){
    this.dialogFormVisible = true;
    this.form = {};
  },
  save(){
    this.request.post('/eastmoney',this.form).then(res => {
      if(res.code === 200)
        this.$message.success("保存成功");
      else
        this.$message.error(res.msg);
      this.dialogFormVisible = false;
      this.updatePage();
    })
  },
  edit(row){
    this.form = row;
    this.dialogFormVisible = true;
  },
  del(id){
    this.request.delete('/eastmoney',{data: {id}}).then(res => {
      if(res.code === 200)
        this.$message.success("删除成功");
      else
        this.$message.error(res.msg);
      this.updatePage();
    })
  },
  batchSel(val){
    this.batchSelect = val;
  },
  batchDelete(){
    let ids = this.batchSelect.map(news => news.id);
    this.request.delete('/eastmoney/batch',{data: ids}).then(
        res => {
          if(res.code === 200)
            this.$message.success("删除成功");
          else
            this.$message.error(res.msg);
          this.updatePage();
        }
    );
  },
  updateNews(){
    this.request.get('/eastmoney/update').then(
      res => {
        if(res.code === 200)
          this.$message.success("更新成功");
        else
          this.$message.error("爬取失败");
        this.updatePage();
      }
    )
  }
},
created() {
  this.updatePage();
},
}
</script>

<style>
body {
  background: url('../assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}
</style>