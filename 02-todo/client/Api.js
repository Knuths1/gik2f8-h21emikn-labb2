class Api {
  url = "";

  constructor(url) {
    this.url = url;
  }

  /*Create = POST */
  create(data) {
    const JSONData = JSON.stringify(data);
    console.log(`Skickar ${JSONData} to this ${this.url}`);

    const request = new Request(this.url, {
      method: "POST",
      body: JSONData,
      headers: {
        "content-type": "application/json",
      },
    });

    return fetch(request)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  /*Update = PUT */
  update(id) {
    //const JSONData = JSON.stringify(data);
    //console.log(`uppdaterar ${id} to this ${this.url}`);
    const tasks = this.getAll();
    tasks.then((value) => {
      value.forEach((task) => {
        if (id == task.id) {
          //console.log("Hej");
          if (task.completed == false) {
            task.completed = true;
          } else {
            task.completed = false;
          }
          const JSONData = JSON.stringify(task);
          //console.log(`Uppdaterar ${JSONData} to this ${this.url}/${id}`);
          const putMethod = {
            method: "PUT", // Method itself
            headers: {
              "Content-type": "application/json; charset=UTF-8", // Indicates the content
            },
            body: JSONData, // We send data in JSON format
          };
          return (
            fetch(`${this.url}/${id}`, putMethod)
              .then((response) => response.json())
              //.then((data) => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
              .catch((err) => console.log(err))
          ); // Do something with the error

          //console.log(`Uppdaterar ${JSONData} to this ${this.url}/${id}`);
          //console.log(`Updating task with id ${id}`);
          //return fetch(`${this.url}/${id}`, {
          //  method: "PUT",
          //  body: JSONData,
          //})
          //   .then((response) => response.json())
          //   .catch((err) => console.log(err));
          //this.updateId(id, JSONData);
        }
        //console.log(task);
      });
      // const JSONData = JSON.stringify(value);
      // console.log(`Uppdaterar ${JSONData} to this url ${this.url}`);
      // this.removeAll();
      // this.create(JSONData);
      // renderList();
      //console.log(value);
    });
  }

  /*READ = GET */
  getAll() {
    return fetch(this.url)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  /*remove = DELETE */
  remove(id) {
    console.log(`Removing task with id ${id}`);

    return fetch(`${this.url}/${id}`, {
      method: "DELETE",
    })
      .then((result) => result)
      .catch((err) => console.log(err));
  }

  // updateId(id, data) {
  //   //console.log(`Updating task with id ${id}`);

  //   return fetch(`${this.url}/${id}`, {
  //     method: "PUT",
  //   })
  //     .then((data) => result)
  //     .catch((err) => console.log(err));
  // }

  removeAll() {
    console.log(`Removing all tasks`);

    return fetch(`${this.url}`, {
      method: "DELETE",
    })
      .then((result) => result)
      .catch((err) => console.log(err));
  }
}
