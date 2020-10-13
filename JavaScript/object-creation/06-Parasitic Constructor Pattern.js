/**
 * The parasitic constructor pattern is typically a fallback when the other patterns fail. The basic idea of this
 * pattern is to create a constructor that simply wraps the creation and return of another object while
 * looking like a typical constructor. Here ’ s an examp
 *
 */
function Person(name, age, job){
    let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        console.log(this.name);
    };
    return o;
}
let person = new Person('Nicholas', 29, 'Software Engineer');
person.sayName(); //”Nicholas”