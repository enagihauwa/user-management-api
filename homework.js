const lengthOfString = (arry) => {
    if (arry.length <= 0) {
        return [];
    }

    return arry.filter(str => typeof str === "string" && str.length > 5)
}

const maxNumber = (arry) => {
    arry.sort((a, b) => a - b);
    return arry[arry.length - 1];
}

const maxNumber2 = (arry) => {
    if (arry.length <= 0) {
        return null;
    }
    let largest = arry[0];
    for (let i = 1; i < arry.length; i++) {
        if (arry[i] > largest) {
            largest = arry[i];
        }
    }
    return largest;
}

const priceCalculator = (arry) => {
    return arry.reduce((sum, arry) => sum + (arry.price * arry.quantity), 0)
}

const people = [
    { name: "Abubakar", age: 25 },
    { name: "John", age: 17 },
    { name: "Sara", age: 25 },
    { name: "Ali", age: 17 },
    { name: "Fatima", age: 30 }
]

const groupByAge = (arry) => {
    let peopleByAge = {};
    arry.forEach(p => {
        if (!peopleByAge[p.age]) {
            peopleByAge[p.age] = [];
        }
        peopleByAge[p.age].push(p.name);
    })
    return peopleByAge;
}

console.log(groupByAge(people));


const flattenedArray = (arry) => {
    const flattened = [];
    arry.forEach(element => {
        element.forEach(item => {
            flattened.push(item);
        })

    })
    return flattened;
}

console.log(flattenedArray([[1, 2], [3, 4], [5, 6]]))


const flattenedArrayreduce = (arry) => {
    return arry.reduce((currentarray, element)=>{
        return [...currentarray, ...element]
    }, []);
}

const maxNumber2 = (arry) => {
    if (arry.length <= 0) {
        return null;
    }
    let max = arry[0];
    arry.forEach(num =>{
        if (num > max) {
            max = num;
        }
    })

    return max;
}