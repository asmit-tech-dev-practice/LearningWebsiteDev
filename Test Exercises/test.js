let arr = [12,45,98,53,46];

// Get 45,98
// Get values from 3rd element
// Get ONLY the 2nd last element
// Get 2nd last element

let arr1 = arr.slice (1,3);
let arr2 = arr.slice (-3);
let arr3 = arr.slice (-2,-1); 
let arr4 = arr.slice (-2,-1);



let stringg = "    thierieei   ";
let result = stringg.trim();
// console.log (arr1);
// console.log(arr2);
// console.log(arr3[0]);
// console.log(arr4);

let his=arr.map(val => {
    let obj = {
        id: val
    };
    return obj;
    
});


function sort1 (arr5){
    arr5.sort((a, b) => a - b);
    return arr5
}

console.log(his);
let ans = sort1(arr);
console.log(ans);


