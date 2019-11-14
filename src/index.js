// 入口js
import React from "react";
import ReactDOM from 'react-dom';
//引入自定义模块需要加. 具体怎么写，要看具体的路径
import App from './App'
// 这里就可以把App组件里面的内容渲染到index.html文件里面了
ReactDOM.render(<App />,document.getElementById('root'));