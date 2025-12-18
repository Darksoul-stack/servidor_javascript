class Api {
  constructor(
    url = true,
    tieneGet = true,
    tieneGetById = true,
    tienePost = true,
    tienePut = true,
    tienePath = true,
    tieneDelete = true
  ) {
    this.url = url;
    this.tieneGet = tieneGet;
    this.tieneGetById = tieneGetById;
    this.tienePost = tienePost;
    this.tienePath = tienePath;
    this.tienePut = tienePut;
    this.tieneDelete = tieneDelete;
  }

  // CRUD
  // función para obtener todos los datos de la API
  async getAll() {
    if (!this.tieneGet || !this.url) {
      return 'GET no permitido o URL no definida';
    }

    let respuesta = await fetch(this.url);
    let datos = await respuesta.json();
    return datos;
  }
  // funcion para obtener los id de una api
  async getById(id) {
    if (!this.tieneGetById || !this.url) {
      return 'GET by ID no permitido 0 url no definida ';
    }
    const urlConId = `${this.url}/${id}`;
    const respuesta = await fetch(urlConId);
    const datos = await respuesta.json();
    return datos;
  }

  // funcion para obtener el post
  async post(data) {
    if (!this.tienePost || !this.url)
      return 'POST no permitido o URL no definida';

    const respuesta = await fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const datos = await respuesta.json();
    return datos;
  }

  // funcion para obtener el put
  async put(data, id) {
    if (!this.tienePut || !this.url)
      return 'PUT no permitido o URL no definida';
    const urlConId = `${this.url}/${id}`;
    const respuesta = await fetch(urlConId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const datos = await respuesta.json();
    return datos;
  }
  // funcion para el patch
  async path(id, data) {
    if (!this.tienePath || !this.url)
      return 'PATCH no permitido o URL no definida';
    const urlConId = `${this.url}/${id}`;
    const respuesta = await fetch(urlConId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const datos = await respuesta.json();
    return datos;
  }
  // Funcion para el delete
  async delete(id) {
    if (!this.tieneDelete || !this.url)
      return 'DELETE no permitido o URL no definida';

    const urlConId = `${this.url}/${id}`;
    const respuesta = await fetch(urlConId, {
      method: 'DELETE'
    });
    const datos = await respuesta.json();
    return datos;
  }
}

async function probarAPI() {
  let url = 'https://jsonplaceholder.typicode.com/posts';
  let api = new Api(url);

  // GET all
  const todos = await api.getAll();
  console.log('GET all:', todos);

  // GET by ID
  const post1 = await api.getById(1);
  console.log('GET by ID:', post1);

  // POST
  const nuevoPost = await api.post({
    title: 'Test',
    body: 'Esto es una prueba',
    userId: 1
  });
  console.log('POST:', nuevoPost);

  // PUT
  const putPost = await api.put({ title: 'Actualizado' }, 1);
  console.log('PUT:', putPost);

  // PATCH
  const patchPost = await api.path(1, { title: 'Patch test' });
  console.log('PATCH:', patchPost);

  // DELETE
  const deletePost = await api.delete(1);
  console.log('DELETE:', deletePost);
}

// Llamamos a la función
probarAPI();
