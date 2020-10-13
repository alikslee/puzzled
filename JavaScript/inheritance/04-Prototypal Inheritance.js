/**
 * Prototypal Inheritance(原型式继承)
 * In 2006, Douglas Crockford wrote an article entitled “ Prototypal Inheritance in JavaScript ” in which he
 * introduced a method of inheritance that didn ’ t involve the use of strictly defined constructors. His
 * premise was that prototypes allow you to create new objects based on existing objects without the need
 * for defining custom types. The function he introduced to this end is as follows
 *
 */
function object(o) {
    function F() {
    }

    F.prototype = o;
    return new F();
};

/*
The object() function creates a temporary constructor, assigns a given object as the constructor ’ s
prototype, and returns a new instance of the temporary type. Essentially, object() performs a shadow
copy of any object that is passed into it. Consider the following
*/
let person = {
    name: 'Nicholas',
    friends: ['Shelby', 'Court', 'Van']
};

let anotherPerson = object(person);
anotherPerson.name = 'Greg';
anotherPerson.friends.push('Rob');

let yetAnotherPerson = object(person);
yetAnotherPerson.name = 'Linda';
yetAnotherPerson.friends.push('Barbie');
console.log(person.friends); //”Shelby,Court,Van,Rob,Barbie”