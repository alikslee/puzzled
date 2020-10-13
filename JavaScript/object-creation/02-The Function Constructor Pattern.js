function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
        console.log(this.name);
    };
};

let person1 = new Person("Nicholas", 29, "Software Engineer");
let person2 = new Person("Greg", 27, "Doctor");

person1.sayName();
person2.sayName();

/**
 * 1.将构造函数当做函数
 *
 * 构造函数与其他函数的唯一区别，就在于调用它们的方式不同。不过，构造函数也是函数，不存在定义构造函数的特殊语法。
 * 任何函数，只要通过 new 操作符来调用，那他就可以作为构造函数；而任何函数，如果不通过 new 操作符来调用，那它
 * 跟普通函数也不会有什么两样。
 */

//当构造函数使用
let person = new Person("Nicholas", 29, "Software Engineer");
person.sayName();

//作为普通函数调用，属性和方法都添加给力全局对象 Global
Person("Greg", 27, "Doctor"); // 添加到 global
global.sayName(); // Greg
console.dir(global);

// 在另一个对象的作用域中调用
let o = new Object();
Person.call(o, "Kristen", 25, "Nurse");
o.sayName();


/**
 * 2.构造函数的问题
 *
 * 使用构造函数的主要问题，就是每个方法都要在每个实力上重新创建一遍，person1 和 person2 都有
 * 一个名为 sayName() 的方法，但那两个方法不是同一个 Function 的实例。不要忘了----ECMAScript
 * 中的函数是对象，因此每定义一个函数，也就是实例化了一个对象。从逻辑上讲，构造函数也可以这样定义
 */
function Person(uname, age, job) {
    this.uname = uname;
    this.age = age;
    this.job = job;
    this.sayName = new Function("console.log(this.uname);");
};

console.log(person1.sayName === person2.sayName);//false

//然而，创建2个完成同样任务的 Function 实例没有必要；况且有 this 对象在，根本不用
//在执行代码前就把函数绑定到特定对象上面。可以像下面这样，把函数的定义转移到构造函数
// 的外面
function Student(uname, age, job) {
    this.uname = uname;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
};

function sayName() {
    console.log(this.uname);
}


s1 = new Student("Nicholas", 29, "Software Engineer");
s2 = new Student("Greg", 27, "Doctor");

s1.sayName();
s2.sayName();













