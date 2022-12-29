```javascript

  const  dataSource = ref([])
  const  columns = ref([])
  const  pageInfo =reactive({
	     pageNumber:1,
	     pageSize:10,
  })

```

<!-- 使用方式 -->
```html
  <z-table  
	:scroll="{ x: 1000 }" 
	:row-selection="rowSelection" 
	:dataSource="dataSource"
	:columns="columns" 
	v-model:pageNumber="pageInfo.pageNumber" 
	v-model:pageSize="pageInfo.pageSize" 
	@onPagination="onPagination">
      <template #headerCell="{column}">
        <div v-if="column.dataIndex=='name'">zhang</div>
      </template>
      <template #bodyCell="{column}">
        <div v-if="column.dataIndex=='action'">
          <a-button>操作</a-button>
        </div>
      </template>
</z-table>
```

## API


参数 |  说明 | 类型 | 默认值 | 可传入值
---- |------|-----|------
pageNumber | 当前页数| Number | 1 |-
pageSize | 页数大小| Number | 10 |-
total | 总页数| Number | 0 |-
onPagination | 页数变化回调| Function |  |-
