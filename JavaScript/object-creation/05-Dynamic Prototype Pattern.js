/**
 *
 * 动态原型模式
 *
 * Developers coming from other OO languages may find the visual separation between the constructor
 * and prototype confusing. The dynamic prototype pattern seeks to solve this problem by encapsulating all
 * of the information within the constructor while maintaining the benefits of using both a constructor
 * and a prototype by initializing the prototype inside the constructor, but only if it is needed. You can
 * determine if the prototype needs to be initialized by checking for the existence of a method that should
 * be available. Consider this example:
 *
 */

function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;

    if(typeof this.sayName != 'function'){
        Person.prototype.sayName = function () {
            console.log(this.name);
        }
    }
};

let person = new Person('Nicholas', 29, 'Software Engineer');
person.sayName();