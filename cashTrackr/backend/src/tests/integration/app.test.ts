import request from "supertest";
import server, { connectDB } from "../../server";
import { db } from "../../config/db";
import { AuthController } from "../../controllers/AuthController";

describe("Authentication - Create Account", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await db.close();
  });

  it("should display validation errors when form is empty", async () => {
    const response = await request(server)
      .post("/api/v1/auth/create-account")
      .send({});
    const createAccountMock = jest.spyOn(AuthController, "createAccount");

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(3);
    expect(createAccountMock).not.toHaveBeenCalled();
  });
});
