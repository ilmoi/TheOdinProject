class Person {
    // first always comes the constructor
    constructor(first, last, age, eyecolor) {
        this.first = first;
        this.last = last;
        this.age = age;
        this.eyecolor = eyecolor;
    };
    // static methods can't be called on instances, only on class object itself
    static staticProperty = 'someValue';
    static staticMethod() {
        return 'static method has been called.';
    };
    // getter
    get first() {
        return this._first; //yes you add _ even though above you don't have it in constructor
    };
    // setter
    set first(name) {
        this._first = name; //yes you add _ even though above you don't have it in constructor
    };
}
let tom = new Person('tom', 'moi', 22, 'blue');
console.log(tom);
console.log(tom.first);
console.log(Person.staticProperty);
console.log(Person.staticMethod());

class Student extends Person {
  //we can also write a consturctor
  constructor(first, last, age, eyecolor, degree) {
    super(first, last, age, eyecolor)
    this.degree = degree;
  }
  //we can add normal methods
  shout() {return 'Im drunk like alwayz'};
  // getter
  get degree() {
    return this._degree;
  }
  // setter
  set degree(newdegree) {
    this._degree = newdegree;
  }
}
let ilja = new Student('ilja', 'moi', 22, 'blue', 'cs');
console.log(ilja.degree);
ilja.degree = 'bio';
console.log(ilja.degree);
console.log(ilja.shout());

const Singer = base => class extends base {
  sing() {return 'lalala'}
}
const SingerStudent = Singer(Student);
let newIlja = new SingerStudent('newIlja', 'moi', 22, 'blue', 'cs');
console.log(newIlja.degree);
newIlja.degree = 'bio';
console.log(newIlja.degree);
console.log(newIlja.shout());
console.log(newIlja.sing());

let clonedIlja = Object.assign(Object.create(Object.getPrototypeOf(ilja)), ilja)
console.log(clonedIlja);