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