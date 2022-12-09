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
    const tasks = this.getAll();
    tasks.then((value) => {
      value.forEach((task) => {
        if (id == task.id) {
          if (task.completed == false) {
            task.completed = true;
          } else {
            task.completed = false;
          }
          const JSONData = JSON.stringify(task);
          const putMethod = {
            method: "PUT",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSONData,
          };
          return fetch(`${this.url}/${id}`, putMethod)
            .then((response) => response.json())
            .catch((err) => console.log(err));
        }
      });
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

  removeAll() {
    console.log(`Removing all tasks`);

    return fetch(`${this.url}`, {
      method: "DELETE",
    })
      .then((result) => result)
      .catch((err) => console.log(err));
  }
}
