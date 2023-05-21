```javascript

  const  imageFilePath = ref(null)

```

<!-- 使用方式 -->
```html
    <z-upload  many list-type="picture-card" v-model:filePath="imageFilePath" name="file">
    </z-upload>
```

## API


参数 |  说明 | 类型 | 默认值 | 可传入值
---- |------|-----|-------|------
many | 单个上传还是多个上传| Boolean |false |-
filePath | 上传成功的文件| String/Array | null |-
其他 | 参照a-upload组件 api 使用|  |  |-
