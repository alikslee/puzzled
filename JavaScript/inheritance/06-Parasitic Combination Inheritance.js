/**
 *
 * Parasitic Combination Inheritance(寄生组合式继承)
 *
 * Combination inheritance is the most often - used pattern for inheritance in JavaScript, though it is not
 * without its inefficiencies. The most inefficient part of the pattern is that the supertype constructor is
 * always called twice: once to create the subtype ’ s prototype, and once inside the subtype constructor.
 * Essentially, the subtype property ends up with all of the instance properties of a supertype object, only
 * to have it overwritten when the subtype constructor executes. Consider the combination inheritance
 * example again:
 */

function SuperType(name) {
    this.name = name;
    this.colors = ['Shelby', 'Court', 'Van']
}

SuperType.prototype.sayName = function () {
    alert(this.name);
};

function SubType(name, age) {
    SuperType.call(this, name); // second call to SuperType()
    this.age = age;
};

SubType.prototype = new SuperType(); // first call to SuperType()
SubType.prototype.constructor = SubType;

SubType.prototype.sayAge = function () {
    alert(this.age);
};


/*
The highlighted lines of code indicate when the SuperType constructor is executed. When this code
is executed, SubType.prototype ends up with two properties: name and colors. These are instance
properties for SuperType, but they are now on the SubType’s prototype. When the SubType constructor is called, the SuperType constructor is also called, which creates instance properties name and
colors on the new object that mask the properties on the prototype. Figure 8-6 illustrates this process
 */

// 图片 images/ figure-8-6

/*
As you can see, there are two sets of name and colors properties: one on the instance and one on the
SubType prototype. This is the result of calling the SuperType constructor twice. Fortunately, there is
a way around this.
Parasitic combination inheritance uses constructor stealing to inherit properties but uses a hybrid
form of prototype chaining to inherit methods. The basic idea is this: Instead of calling the supertype
constructor to assign the subtype’s prototype, all you need is a copy of the supertype’s prototype.
Essentially, use parasitic inheritance to inherit from the supertype’s prototype and then assign the
result to the subtype’s prototype. The basic pattern for parasitic combination inheritance is as follows:
 */
function inheritPrototype(subType, superType) {
    let prototype = Object.create(superType.prototype); // create object
    prototype.constructor = subType; // augment object
    subType.prototype = prototype; // assign object
}

/*
The inheritPrototype() function implements very basic parasitic combination inheritance. This
function accepts two arguments: the subtype constructor and the supertype constructor. Inside the
function, the first step is to create a clone of the supertype’s prototype. Next, the constructor
property is assigned onto prototype to account for losing the default constructor property when
the prototype is overwritten. Finally, the subtype’s prototype is assigned to the newly created object. A
call to inheritPrototype() can replace the subtype prototype assignment in the previous example,
as shown here:
 */

function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
    console.log(this.name);
};
function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function() {
    console.log(this.age);
};