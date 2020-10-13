function Person() {

}

Person.prototype.name = 'Nicholas';
Person.prototype.age = 29;
Person.prototype.job = 'Software Engineer';

Person.prototype.sayName = function () {
    console.log(this.name);
};

let person1 = new Person();
person1.sayName();

let person2 = new Person();
person2.sayName();

console.log(person1.sayName == person2.sayName); // true


// 使用函数表达式也是合适的
let Student = function () {
};
Student.prototype.name = 'Nicholas';
Student.prototype.age = 29;
Student.prototype.job = 'Software Engineer';
Student.prototype.sayName = function () {
    console.log(this.name);
};

let s1 = new Student();
s1.sayName();

let s2 = new Student();
s2.sayName();

console.log(' * '.repeat(30))

/**
 * 1.理解原型对象
 * 当用构造函数创建一个新实例后，该实例的内部将包含一个指针（内部属性__proto__），指向构造函数原型对象.
 * ECMAScript-262第五版中叫[[Prototype]].虽然在脚本中没有标准的方式访问[[Prototype]]，但 Firefox、
 * Safari 和 Chrome 在对每个对象上都支持一个属性__proto__;在其他实现中，这个属性对脚本是完全不可见的
 *
 * 不过，真正重要的一点是，这个链接存在于实例与构造函数的原型对象之间，不是存在于实例于构造函数之间
 *
 */


// This relationship can be difficult to visualize, so refer to the following snippet as a sort of lookup
// table for overall prototype behavior:
/**
 * Constructor function can exist as function expression
 * or function declaration, so both of these are suitable:
 * function Person {}
 * let Person = function() {}
 */
function Person() {
}

/**
 * Upon declaration, the constructor function already
 * has a prototype object associated with it:
 */
console.log(typeof Person.prototype);
console.log(Person.prototype);
// {
// constructor: f Person(),
// __proto__: Object
// }
/**
 * As mentioned previously, the constructor function has
 * a 'prototype' reference to the prototype object, and
 * the prototype object has a 'constructor' reference to
 * the constructor function. These references are cyclical:
 */
console.log(Person.prototype.constructor === Person); // true
/**
 * Any normal prototype chain will terminate at the Object prototype.
 * The prototype of the Object prototype is null.
 */
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Person.prototype.__proto__.constructor === Object); // true
console.log(Person.prototype.__proto__.__proto__ === null); // true
console.log(Person.prototype.__proto__);
// {
// constructor: f Object(),
// toString: ...
// hasOwnProperty: ...
// isPrototypeOf: ...
// ...
// }
person1 = new Person();
person2 = new Person();
/**
 * The constructor, the prototype object, and an instance
 * are three completely distinct objects:
 */
console.log(person1 !== Person); // true
console.log(person1 !== Person.prototype); // true
console.log(Person.prototype !== Person); // true
/**
 * An instance is linked to the prototype through __proto__, which
 * is the literal manifestation of the [[Prototype]] hidden property.
 *
 * A constructor is linked to the prototype through the constructor property.
 *
 * An instance has no direct link to the constructor, only through the prototype.
 */
console.log(person1.__proto__ === Person.prototype); // true
console.log(person1.__proto__.constructor === Person); // true
/**
 * Two instances created from the same constructor function will share
 * a prototype object:
 */
console.log(person1.__proto__ === person2.__proto__); // true
/**
 * instanceof will check the instance's prototype chain against the
 * prototype property of a constructor function:
 */
console.log(person1 instanceof Person); // true
console.log(person1 instanceof Object); // true
console.log(Person.prototype instanceof Object); // true

/**
 *  图片 images/figure-8-1.jpg 展示了各个对象之间的关系
 */

// Even though [[Prototype]] is not accessible in all implementations, the isPrototypeOf() method
// can be used to determine if this relationship exists between objects. Essentially（从本质上来讲）,
// isPrototypeOf() returns true if [[Prototype]] points to the prototype on which the method is
// being called, as shown here:
console.log(Person.prototype.isPrototypeOf(person1));
console.log(Person.prototype.isPrototypeOf(person2));

// The ECMAScript Object type has a method called Object.getPrototypeOf(), which returns the
// value of [[Prototype]]. For example:
console.log(Object.getPrototypeOf(person1));
console.log(Object.getPrototypeOf(person1) === Person.prototype);
console.log(Object.getPrototypeOf(person1).name);

// The Object type also features a setPrototypeOf()method, which writes a new value into the [[Prototype]]
// of the instance. This allows you to overwrite the prototype hierarchy of an already
// instantiated object:
let biped = {
    numLegs: 2
};
let person = {
    name: 'Matt'
};

Object.setPrototypeOf(person, biped)
console.log(person.name); // Matt
console.log(person.numLegs); // 2
console.log(Object.getPrototypeOf(person) === biped); //true


/*
WARNING: The Object.setPrototypeOf() operation will likely cause severe
performance slowdowns when used. The Mozilla documentation puts it best:
"In every browser and JavaScript engine, the effects on performance of altering
inheritance are subtle and far-flung, and are not limited to simply the time spent
in Object.setPrototypeOf() statement, but may extend to any code that has
access to any object whose [[Prototype]] has been altered."
 */

// To avoid these slowdowns, prefer to just create a new object and specify its prototype
// with Object.create()
biped = {
    numLegs: 2
};
person = Object.create(biped);
person.name = 'Matt';
console.log(person.name); // Matt
console.log(person.numLegs); // 2
console.log(Object.getPrototypeOf(person) === biped); // true


console.log(' * '.repeat(30))

/**
 * Understanding the Prototype Hierarchy
 *
 * 如果我们在实例中添加一个属性，而该属性与实例原型中的一个属性同名，那我们就在
 * 实例中创建该属性，该属性将会屏蔽原型中的那个属性
 */
function Person() {
};

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function () {
    console.log(this.name);
}
person1 = new Person();
person2 = new Person();

person1.name = 'Greg';
console.log(person1.name);
console.log(person2.name);

// Once a property is added to the object instance, it shadows(屏蔽) any properties of the same name on the
// prototype, which means that it blocks access to the property on the prototype without altering it.
//  Even setting the property to null only sets the property on the instance and doesn’t restore the link
// to the prototype（而不是恢复其指向原型的链接）. The delete operator, however, completely removes the instance
// property and allows the prototype property to be accessed again as follows:
delete person1.name;
console.log(person1.name);


//The hasOwnProperty() method determines if a property exists on the instance or on the prototype.
person1.name = 'Greg';
console.log(person1.hasOwnProperty('name')); //true
console.log(person2.hasOwnProperty('name')); //false

delete person1.name;
console.log(person1.name);
console.log(person1.hasOwnProperty('name'));

// 图片 images/figure-8-2

console.log(' * '.repeat(30));


/**
 * Prototypes and the “in” Operator
 * in 操作符会在通过对象能够访问给定属性时返回 true,无论该对象属性存在于实例中还是原型中
 */

console.log(person1.hasOwnProperty('name'));
console.log('name' in person1);

person1.name = "Greg";
console.log(person1.name);//"Greg" - from instance
console.log(person1.hasOwnProperty('name')); // true
console.log('name' in person1); //true

console.log(person2.name); // "Nicholas" - from prototype
console.log(person2.hasOwnProperty('name'));//false
console.log('name' in person2);//true


// 同时使用 hasOwnProperty() 方法和 in 操作符，就可以确定该属性到底是存在于对象中，
// 还是存在于原型中
function hasPrototypeProperty(object, name) {
    return !object.hasOwnProperty(name) && (name in object);
};

// To retrieve a list of all enumerable instance properties on an object, you can use the Object.keys()
// method, which accepts an object as its argument and returns an array of strings containing the names
// of all enumerable properties. For example
//获取对象上所有可枚举的实例属性
let keys = Object.keys(Person.prototype);
console.log(keys);
let p1 = new Person();
p1.name = 'Rob';
p1.age = 32;
let p1keys = Object.keys(p1);
console.log(p1keys);

//如果想要获取对象上的所有实例属性，可以使用 Object.getOwnPropertyNames
keys = Object.getOwnPropertyNames(Person.prototype);
console.log(keys); //[ 'constructor', 'name', 'age', 'job', 'sayName' ]包含不可枚举的 constructor 属性


/**
 * Alternate Prototype Syntax(更简单的原型语法)
 * 前面的例子中每添加一个属性和方法就要敲一遍 Person.prototype.为了减少不必要的输入，
 * 可以如下简写
 */
function Person() {
};
Person.prototype = {
    name: 'Nicholas',
    age: 29,
    job: "Software Engineer",
    sayName: function () {
        console.log(this.name);
    }
}; //constructor 属性不在指向 Person，指向 Object
console.log(Person.prototype.hasOwnProperty('constructor'));//false
console.log('constructor' in Person.prototype);//true
console.log(Person.prototype.__proto__ === Object.prototype); //true
console.log(Person.prototype.__proto__.constructor === Object); //true
console.log(Person.prototype.constructor === Object); //true


//如果 constructor 真的很重要，可以像下面这样特意将它设置回适当的值
function Person() {

};

Person.prototype = {
    //设置 constructor 属性导致它的 [[Enumerable]] 特性被设置为true，
    //原生的 constructor 属性是不可枚举的
    constructor: Person,
    name: 'Nicholas',
    age: 29,
    job: "Software Engineer",
    sayName: function () {
        console.log(this.name);
    }
};

// 如果使用兼容 ECMAScript5 的 JavaScript 引擎，可以尝试 Object.defineProperty
Object.defineProperty(Person.prototype, 'constructor', {
    enumerable: false,
    value: Person
})


// 调用构造函数时会为实例对象添加一个指向最初原型的[[Prototype]](__proto__)指针，而把
// 原型修改为另外一个对象就等于切断了构造函数与最初原型之间的联系
// 注意：实例中的指针仅指向原型，而不指向构造函数
function User() {

};

let friend = new User();
User.prototype = {
    constructor: User,
    name: 'Nicholas',
    age: 29,
    job: "Software Engineer",
    sayName: function () {
        console.log(this.name);
    }
};
friend.sayName(); //TypeError: friend.sayName is not a function

// 见图 images/figure-8-3.jpg

/**
 * 原型对象的问题
 * 原型模式他忽略了为构造函数传递初始化参数这一环节，导致所有实例在默认情况下都将获取相同的属性
 *
 * 原型中所有属性是被很多实例共享的，这种共享对于函数非常合适，然而对于引用类值的属性来说，就有
 * 问题
 */
function Person() {
}

Person.prototype = {
    constructor: Person,
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    friends: ["Shelby", "Court"],
    sayName() {
        console.log(this.name);
    }
};
person1 = new Person();
person2 = new Person();
person1.friends.push("Van");
console.log(person1.friends); // "Shelby,Court,Van"
console.log(person2.friends); // "Shelby,Court,Van"
console.log(person1.friends === person2.friends); // true





















