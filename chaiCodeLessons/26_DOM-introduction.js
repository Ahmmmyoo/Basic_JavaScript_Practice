// DOM introduction in JS

// console.log(window);
// console.log(document);
// console.dir(document);

const DOM = `

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>DOM learning</title>
  </head>
  <body>
    <div>
      <h1>Dom Heading</h1>
      <p>Lorem IpSem</p>
    </div>
  </body>
</html>

`;

const DOM__ = {
  Window__ = {
    Document__ = {
      HTML__ = {
        HEAD__ = {
          title = {
            text_node
          },
          meta = {
            attribute
          }
        },
        Body__ = {
          div = {
            attribute,
            h1 = {
              attribute,
              text_node
            },
            p = {
              text_node
            }
          }
        }
      }
    }
  }
}

const obj = {
  name: "K",
  age: 20,
  city: "New York",
  printName: function() {
    console.log(this.name);
  },
  printAge: function() {
    console.log(this.age);
  },
  printCity: function() {
    console.log(this.city);
  },
  getName: function() {
    return this.name
  },
  getAge: function() {
    return this.age
  },
  getCity: function() {
    return this.city
  }
}
// console.log(obj);
// console.dir(obj);

