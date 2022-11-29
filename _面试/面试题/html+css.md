## html+css：定位有哪几种？分别简述其特点



static：

元素默认的位置，默认的定位方式就是static，这种定位方式只能用[margin](https://so.csdn.net/so/search?q=margin&spm=1001.2101.3001.7020)来改变位置，对left、top、z-index等设置值无效，这种定位不脱离文档流



relative：

基于元素自身变化之前的位置进行定位，可以通过设置left、top等值，使得指定元素相对其正常的位置进行偏移，这种定位不脱离文档流



absolute：

绝对定位是根据设置有position属性,并且值不为static的父级进行定位;如果都没有已定位的祖先元素,则是基于浏览器窗口进行定位. margin的自动(auto)会失效，该方式脱离文档流



fixed：

基于浏览器窗口进行定位,并不会伴随屏幕滚动进行滚动，脱离文档流,不保留原来的位置，会改变元素的特性，父元素设置了固定定位,不用清除浮动的影响



inherit：

这种方式规定该元素继承父元素的position属性值。





## html+css：css 清除浮动



overflow：hidden

基于 clear：both





## css 中 px em 各有什么优劣，在表现上有什么区别？



px像素单位

em相对单位：相对于自身的 font-size 大小，如果自身么有，就找夫元素，如果还没有就，则继续向外查找





## css flex 布局



## css grid 布局



## css 中的单位





## 选择器的优先级





## 盒模型

标准：盒子占位 `w = width + 2margin + 2padding + 2border`

怪异：盒子占位 `w = width(content+2padding+2border) + 2margin`



## css 常用布局

单列、双列、三列、水平垂直居中、圣杯布局、双飞翼布局



## css实现垂直居中的方式



## 伪类和伪元素



## BFC以及如何开启BFC



## css3新特性



## less scss 使用





## web worker



## web socket



## HTML5新特性

