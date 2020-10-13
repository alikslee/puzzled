/**
 * This code defines two types: SuperType and SubType. Each type has a single property and a single
 *  method. The main difference between the two is that SubType inherits from SuperType by creating a
 *  new instance of SuperType and assigning it to SubType.prototype. This overwrites the original
 *  prototype and replaces it with a new object, which means that all properties and methods that typically
 *  exist on an instance of SuperType now also exist on SubType.prototype. After the inheritance takes
 *  place, a method is assigned to SubType.prototype, adding a new method on top of what was inherited
 *  from SuperType.
 */

function SuperType() {
    this.property = true;
};

SuperType.prototype.getSuperValue = function () {
    return this.property;
};

function SubType() {
    this.subproperty = false;
};

//inherit from SuperType
const SUPERTYPE = new SuperType();
SubType.prototype = SUPERTYPE;

SubType.prototype.getSubValue = function () {
    return this.subproperty;
};

let instance = new SubType();
console.log(instance.getSuperValue());

console.log(SubType.prototype.__proto__ === SuperType.prototype); //true
console.log(SubType.prototype.__proto__.constructor);//[Function: SuperType]
console.log(SubType.prototype.__proto__.constructor === SubType.prototype.constructor); //true
console.log(SubType.prototype.__proto__.constructor === SuperType); //true
console.log(instance.__proto__);
console.log(instance.__proto__ === SUPERTYPE); //true

// 图片 images/figure-8-4