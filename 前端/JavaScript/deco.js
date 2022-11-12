/*
假设我们有一个 CPU 重负载的函数 slow(x)，但它的结果是稳定的。换句话说，对于相同的 x，它总是返回相同的结果。
如果经常调用该函数，我们可能希望将结果缓存（记住）下来，以避免在重新计算上花费额外的时间。
但是我们不是将这个功能添加到 slow() 中，而是创建一个包装器（wrapper）函数，该函数增加了缓存功能。正如我们将要看到的，这样做有很多好处。
*/
function slow(x) {
  // 这里可能会有重负载的 CPU 密集型工作
  console.log(`Called with ${x}`)
  return x
}

function cachingDecorator(func) {
  let cache = new Map()

  return function(x) {
    if(cache.has(x)) { // 如果缓存中有对应的结果
      return cache.get(x) // 从缓存中读取结果
    }

    let result = func(x) // 否则就调用 func

    cache.set(x, result) // 然后将结果缓存（记住）下来
    return result
  }
}

slow = cachingDecorator(slow)

console.log( slow(1) )
console.log( 'Again:' + slow(1) )

console.log( slow(2) )
console.log( 'Again:' + slow(2) )
