import app from "../config/app";
import request from "supertest";

describe("CepInformations routes", () => {
  test("should return an cep information on sucess", async () => {
    const req = await request(app).get("/api/cep-informations").send({
      cep: "010000",
    });

    expect(req.statusCode).toBe(200);
  });
});
