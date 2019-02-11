# vue-bounce

> 禁用 iOS 橡皮筋效果的 Vue 插件

## 安装

```bash
$ npm install vue-bounce
```

## 使用

1. 在 `main.js` 中导入插件

```javascript
import Bounce from 'vue-bounce'

Vue.use(Bounce)
// or
Vue.use(Bounce, {
    name: 'directiveName' // 可选参数用于覆盖指令名
})
```

2. 使用指令

container 必须有明确的高度、同时要有 `overflow: auto` 下面是个简单的例子。

```html
<div class="container" v-bounce>
    ...scroll element
</div>
```

```css
.container {
    height: 100vh;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
```

Tips: `v-bounce` 可以接受参数 `true` 开启 Bounce 效果、缺省或 `false` 禁用 Bounce。

## License

MIT License

Copyright (c) 2019 梓姵君

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
