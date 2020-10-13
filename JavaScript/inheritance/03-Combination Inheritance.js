/**
 * Combination inheritance (sometimes also called pseudoclassical inheritance 组合继承有时候也叫做伪经典继承)
 * combines prototype chaining and constructor stealing（借用构造函数） to get the best of each approach.
 * The basic idea is to use prototype chaining to inherit properties and methods on the prototype, and
 * to use constructor stealing to inherit instance properties. This allows function reuse by defining methods
 * on the prototype and allows each instance to have its own properties. Consider the following
 */
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
};

SuperType.prototype.sayName = function () {
    console.log(this.name);
};

function SubType(name, age) {
    //inherit properties
    SuperType.call(this, name);//

    this.age = age;
};

//inherit methods
SubType.prototype = new SuperType();


SubType.prototype.sayAge = function () {
    console.log(this.age);
};

let instance1 = new SubType('Nicholas', 29);
instance1.colors.push('black');
console.log(instance1.colors); //”red,blue,green,black”
instance1.sayName(); //”Nicholas”;
instance1.sayAge(); //29


let instance2 = new SubType('Greg', 27);
console.log(instance2.colors); //”red,blue,green”
instance2.sayName(); //”Greg”;
instance2.sayAge(); //27