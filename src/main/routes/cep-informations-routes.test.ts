import app from "../config/app";
import request from "supertest";

jest.setTimeout(5000);

describe("CepInformations routes", () => {
  test("should return an cep information on sucess", async () => {
    const req = await request(app).get("/api/cep-informations/01001000");

    expect(req.statusCode).toBe(200);
  });
});
