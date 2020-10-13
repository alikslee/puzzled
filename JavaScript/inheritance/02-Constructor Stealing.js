/**
 *  借用构造函数
 *
 *  In an attempt to solve the inheritance problem with reference values on prototypes, developers began
 *  using a technique called constructor stealing (also sometimes called object masquerading or classical
 *  inheritance 有时候也叫做伪造对象或经典继承). The basic idea is quite simple: call the supertype constructor
 *  from within the subtype constructor. Keeping in mind that functions are simply objects that execute
 *  code in a particular context, the apply() and call() methods can be used to execute a constructor on
 *  the newly created object, as in this example:
 */
function SuperType() {
    this.colors = ['red', 'blue', 'green'];
};

//inherit from SuperType
function SubType() {
    SuperType.call(this);
};

let instance1 = new SubType();
instance1.colors.push('black');
console.log(instance1.colors); //”red,blue,green,black”
let instance2 = new SubType();
console.log(instance2.colors); //”red,blue,green

/*
Problems with Constructor Stealing
The downside to using constructor stealing exclusively is that it introduces the same problems as the
constructor pattern for custom types: methods must be defined inside the constructor, so there’ s no
function reuse. Further, methods defined on the supertype ’ s prototype are not accessible on the subtype,
so all types can use only the constructor pattern（在超类型的原型中定义的方法，对子类型而言也是不可见的）.
Due to these issues, constructor stealing is rarely used on its own.
 */
SuperType.prototype.sayName = function () {
    console.log(this.colors);
};

instance2.sayName(); //TypeError: instance2.sayName is not a function
