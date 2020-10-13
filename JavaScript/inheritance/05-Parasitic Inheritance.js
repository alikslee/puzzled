/**
 * Parasitic Inheritance(寄生式继承)
 *
 * Closely related to prototypal inheritance is the concept of parasitic inheritance, another pattern popularized
 * by Crockford. The idea behind parasitic inheritance is similar to that of the parasitic constructor and factory
 * patterns: create a function that does the inheritance, augments the object in some way, and then returns the
 * object as if it did all the work. The basic parasitic inheritance pattern looks like this:
 */
function object(o) {
    function F() {
    }

    F.prototype = o;
    return new F();
};

function createAnother(original) {
    let clone = object(original); //create a new object by calling a function
    clone.sayHi = function () { //augment the object in some way
        console.log('hi');
    };
    return clone; //return the object
};

/*
In this code, the createAnother() function accepts a single argument, which is the object to base a new
object on. This object, original, is passed into the object() function, and the result is assigned to
clone. Next, the clone object is changed to have a property called newProperty. The last step is to
return the object. The createAnother() function can be used in the following way
 */
let person = {
    name: 'Nicholas',
    friends: ['Shelby', 'Court', 'Van']
};
let anotherPerson = createAnother(person);
anotherPerson.sayHi(); //”hi”