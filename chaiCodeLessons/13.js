// object de-structure and JSON API

const course = {
  coursename: "JavaScript",
  courseprice: "999",
  courselevel: "Beginner",
  courseinstructor: "John Doe",
  courseplatform: "FCC",
}

// course.coursename

// const { coursename: name, courseprice: price, courselevel: level } = course;

// console.log(name, price, level);

// const navbar = ({comapany}) => {} //////ReactConcept
// navbar(comapany = "FIFA29");      //////ReactConcept


// JSON
// {
//   "name": "John Doe",
//   "email": "johndoe@com",
//   "password": "123456",
// }


// random user me
// const jsonObj = {"results":[{"gender":"male","name":{"title":"Mr","first":"Gilberto","last":"Duarte"},"location":{"street":{"number":9736,"name":"Rua Alagoas "},"city":"São Vicente","state":"Goiás","country":"Brazil","postcode":91674,"coordinates":{"latitude":"-75.7641","longitude":"-28.9819"},"timezone":{"offset":"-1:00","description":"Azores, Cape Verde Islands"}},"email":"gilberto.duarte@example.com","login":{"uuid":"666f1e5e-a6e5-4210-8205-bd2ee7c87353","username":"beautifulfrog774","password":"buffalo","salt":"Ny5vjgct","md5":"e3953526efca610e550e731c2eba001e","sha1":"7e743137babd6e8638a08e495ce8bf8a3330bdb8","sha256":"3bad45389e42ab76c2fedd15d988b701e0c1e345d5bdd5a296e8f4cf1b9caf13"},"dob":{"date":"1991-11-17T01:59:23.159Z","age":33},"registered":{"date":"2005-08-24T16:10:03.935Z","age":19},"phone":"(94) 8542-3212","cell":"(24) 1713-6433","id":{"name":"CPF","value":"154.287.463-38"},"picture":{"large":"https://randomuser.me/api/portraits/men/93.jpg","medium":"https://randomuser.me/api/portraits/med/men/93.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/93.jpg"},"nat":"BR"}],"info":{"seed":"b57ce21427eb9f52","results":1,"page":1,"version":"1.4"}}

// jsonObj.results[0].name.first