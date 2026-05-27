const evenNumber = (arry)=>{

    return arry.filter(num => typeof num === "number" && num %2 ===0)
    
}

console.log(evenNumber([1, "hello", 2, null, 4, 6]))

const adultAge = (arry) => {
    return arry.filter(person =>person.age >= 18)
}

console.log(adultAge([
  { name: "Abubakar", age: 25 },
  { name: "John", age: 17 },
  { name: "Sara", age: 30 },
  { name: "Ali", age: 15 }
]))

const averageAge =(arry )=>{
    if (arry.length <=0){
        return 0;
    }
    const age = arry.reduce((sum, arry)=> {
        return sum + arry.age
    }, 0)

    return age/ arry.length; 
}

console.log(averageAge([]))
console.log(averageAge([
  { name: "Abubakar", age: 25 },
  { name: "John", age: 17 },
  { name: "Sara", age: 30 },
  { name: "Ali", age: 15 }
]))


