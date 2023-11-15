// ---A---
const dataA = [
  { name: "Alex", tel: "0991112222", code: "xsf0001"},
  { name: "Jane", tel: "0812221234", code: "xsf0002"},
  { name: "Alex", tel: "0832214433", code: "xsf0001"},
  { name: "Alex", tel: "0991113122", code: "xsf0003"}
]

function converFormat(dataArray = []){
const result = []
dataArray.map((item) => {
  const findCodeDuplicate = result.find((val) => val.code == item.code)
    if(!!findCodeDuplicate){
  findCodeDuplicate.tel = [findCodeDuplicate.tel, item.tel];
  }else {
    result.push({
      name:item.name,
      tel:item.tel,
      code:item.code
    })
  }
})
return result
}

console.log(converFormat(dataA))
// -------

// -----B----
const input = {
  customer: "Xsurface",
  contact: [
    { name: "Max" },
    { name: "Mike" },
    { name: "Adam" }
  ],
  address: "Sukhumvit 62",
};

function converFormatB(data = Object) {
const output = data.contact.map((item) => {
  return {
    name:item.name,
    customer:data.customer,
    address:data.address
  }
})
return output
}

console.log(converFormatB(input));

// --------------


// ------C & D -----
const dataCandD = [
  { name: "A", age: "30" },
  { name: "B", age: "9" },
  { name: "C", age: "20" },
  { name: "D", age: "18" },
  { name: "E", age: "11" },
  { name: "F", age: "60" },
  { name: "G", age: "27" },
  { name: "H", age: "90" },
  { name: "I", age: "21" },
  { name: "J", age: "12" }
];

function sortArrayByAge(inputArray = []) {
  const sortedArray = inputArray.sort((a, b) => parseInt(a.age) - parseInt(b.age));
  const output = sortedArray.map(item => item.name);
  return output;
}

function formatBulletOutput(inputArray = []) {
  const outputList = inputArray.map((val, index) => `• This is ${val.name}, It correctly outputs from question C.`);
  return outputList;
}


const outputArray = sortArrayByAge(dataCandD);
console.log(outputArray);

const format = formatBulletOutput(dataCandD)
format.map((item) => console.log(item))

