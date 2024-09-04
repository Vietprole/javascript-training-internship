// using const and let
function example() {
  //TDZ start at the beginning of the block
  const func = () => console.log(foo); // No TDZ error

  console.log(foo); // => throws a ReferenceError
  console.log(typeof foo); // => throws a ReferenceError
  
  const foo = 3; //TDZ ends for foo
  func(); // 3
}
example();