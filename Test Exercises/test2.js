console.log("abcdef".slice(1, 4)); 

console.log("123456789".slice(3, 6)); 

console.log([1, 2, 3, 4, 5].slice(1, 4));

console.log("987654321".slice(-3)); 


console.log(["a", "b", "c"].map(x => 
    x.toUpperCase()
)); 
console.log([1, 2, 3].map(x => x * 2)); 
console.log(["apple", "banana"].map((item, index) =>
     `${index + 1}: ${item}`
)); 
console.log([1, 2, 3, 4].map(num => num + 10)); 
console.log(["1", "2", "3"].map(Number)); 


console.log("  hello  ".trim()); 
console.log("  \t\nabc   ".trim()); 
console.log(" \t  world  \n ".trim()); 



console.log("apple,banana,grape".split(",")); 
console.log("123-456-789".split("-")); 
console.log("a b c d e".split(" ")); 
console.log("hello world".split("")); 



[1, 2, 3].forEach(
    num => console.log(num)
); 
["a", "b", "c"].forEach(
    letter => console.log(letter.toUpperCase()
)); 
[10, 20, 30].forEach(
    (num, index) => console.log(index, num)
); 
[1, 2, 3].forEach(
    num => { if (num > 1){ 
        console.log(num);
     }
    }); 


console.log("Hello\nWorld"); 
console.log("Name:\nJohn\nAge: 30"); 
console.log("Line1\nLine2\nLine3"); 



console.log([1, 2, 3, 4, 5].filter(
    num => num > 2
)); 
console.log(["apple", "banana", "pear"].filter(
    fruit => fruit.startsWith("b")
)); 
console.log([10, 20, 30, 40].filter(
    num => num % 2 === 0
)); 
console.log([1, 2, 3, 4].filter(
    num => num % 2 !== 0
)); 




console.log([1, 2, 3, 4].splice(1, 2)); 
console.log(["apple", "banana", "cherry"].splice(1, 1, "orange")); 
console.log([1, 2, 3, 4].splice(2, 1)); 
console.log([10, 20, 30, 40].splice(2, 0, 25)); 
console.log([5, 10, 15, 20].splice(1, 2, 30, 35)); 
console.log(["a", "b", "c", "d"].splice(0, 2)); 




let fruits = ["banana", "apple", "cherry", "date"];
fruits.sort();
console.log(fruits);

let numbers = [10, 5, 100, 50];
numbers.sort((a, b) => b - a);
console.log(numbers);


let people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 20 }
  ];
  people.sort((a, b) => a.age - b.age);
  console.log(people);