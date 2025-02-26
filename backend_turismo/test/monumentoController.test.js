const request = require("supertest");
const { app } = require("../index"); // Importar la app de Express
const sequelize = require("../config/sequelize"); // Importar la conexión con Sequelize

describe("🏛️ Pruebas sobre la API de Monumentos", () => {
  let monumentoId = "";

  test("✅ POST /api/monumentos → Crear un nuevo monumento", async () => {
    const res = await request(app)
      .post("/api/monumentos")
      .send({
        nombre: "Monumento Test",
        ciudad_id: 1, // Asegúrate de que esta ciudad existe en la BD
        añoConstruccion: 2000,
      });

    console.log("📌 Respuesta POST /api/monumentos:", res.body); // 🔹 Depuración

    expect(res.statusCode).toBe(201);
    expect(res.body.ok).toBe(true);
    expect(res.body.datos).toHaveProperty("id");
    monumentoId = res.body.datos.id;
  });

  test("✅ GET /api/monumentos → Obtener lista de monumentos", async () => {
    const res = await request(app).get("/api/monumentos");

    console.log("📌 Respuesta GET /api/monumentos:", res.body); // 🔹 Depuración

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.datos)).toBe(true);
  });

  test("✅ GET /api/monumentos/:id → Obtener un monumento por ID", async () => {
    const res = await request(app).get(`/api/monumentos/${monumentoId}`);

    console.log(`📌 Respuesta GET /api/monumentos/${monumentoId}:`, res.body); // 🔹 Depuración

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.datos.id).toBe(monumentoId);
  });

  test("✅ PUT /api/monumentos/:id → Actualizar un monumento existente", async () => {
    const res = await request(app)
      .put(`/api/monumentos/${monumentoId}`)
      .send({
        id: monumentoId,
        nombre: "Monumento Actualizado",
        ciudad_id: 2,
        añoConstruccion: 1995,
      });

    console.log(`📌 Respuesta PUT /api/monumentos/${monumentoId}:`, res.body); // 🔹 Depuración

    expect(res.statusCode).toBe(204);
  });

  test("✅ DELETE /api/monumentos/:id → Eliminar un monumento", async () => {
    const res = await request(app).delete(`/api/monumentos/${monumentoId}`);

    console.log(`📌 Respuesta DELETE /api/monumentos/${monumentoId}:`, res.body); // 🔹 Depuración

    expect(res.statusCode).toBe(204);
  });

  test("✅ GET /api/monumentos/:id → Intentar obtener un monumento eliminado", async () => {
    const res = await request(app).get(`/api/monumentos/${monumentoId}`);

    console.log(`📌 Respuesta GET /api/monumentos/${monumentoId} después de DELETE:`, res.body); // 🔹 Depuración

    expect(res.statusCode).toBe(404);
    expect(res.body.ok).toBe(false);
  });

  afterAll(async () => {
    await sequelize.close(); // 🔹 Cerrar la conexión al finalizar los tests
  });
});
