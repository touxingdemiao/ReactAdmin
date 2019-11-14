const {override, fixBabelImports,addLessLoader} = require('customize-cra');

module.exports = override(
    //针对antd进行按需打包，就是引入什么组件，就只打包当前的样式
    fixBabelImports('import',{
        libraryName:'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    //使用这个改变了antd里面的less文件，用来改变里面的主题颜色
    addLessLoader({
        javascriptEnabled:true,
        modifyVars:{'@primary-color': '#1890ff'},
    }),
);