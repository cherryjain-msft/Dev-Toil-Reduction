import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import headquartersRouter from './headquarters';
import { runMigrations } from '../db/migrate';
import { closeDatabase, getDatabase } from '../db/sqlite';
import { errorHandler } from '../utils/errors';

let app: express.Express;

describe('Headquarters API', () => {
  beforeEach(async () => {
    // Ensure a fresh in-memory database for each test
    await closeDatabase();
    await getDatabase(true);
    await runMigrations(true);

    // Set up express app
    app = express();
    app.use(express.json());
    app.use('/headquarters', headquartersRouter);
    // Attach error handler to translate repo errors
    app.use(errorHandler);
  });

  afterEach(async () => {
    await closeDatabase();
  });

  it('should create a new headquarters', async () => {
    const newHeadquarters = {
      name: 'Test HQ',
      description: 'Main headquarters',
      address: '123 Test Street',
      contactPerson: 'John Manager',
      email: 'hq@test.com',
      phone: '555-0000',
    };
    const response = await request(app).post('/headquarters').send(newHeadquarters);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newHeadquarters);
    expect(response.body.headquartersId).toBeDefined();
  });

  it('should get all headquarters', async () => {
    const response = await request(app).get('/headquarters');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a headquarters by ID', async () => {
    // First create a headquarters to test getting it
    const newHeadquarters = {
      name: 'Get Test HQ',
      description: 'Test description',
      address: '456 Get Street',
      contactPerson: 'Jane Manager',
      email: 'get@test.com',
      phone: '555-1111',
    };
    const createResponse = await request(app).post('/headquarters').send(newHeadquarters);
    const headquartersId = createResponse.body.headquartersId;

    const response = await request(app).get(`/headquarters/${headquartersId}`);
    expect(response.status).toBe(200);
    expect(response.body.headquartersId).toBe(headquartersId);
  });

  it('should update a headquarters by ID', async () => {
    // First create a headquarters to test updating it
    const newHeadquarters = {
      name: 'Original HQ',
      description: 'Original description',
      address: '789 Original Street',
      contactPerson: 'Bob Manager',
      email: 'original@test.com',
      phone: '555-2222',
    };
    const createResponse = await request(app).post('/headquarters').send(newHeadquarters);
    const headquartersId = createResponse.body.headquartersId;

    const updatedHeadquarters = {
      ...newHeadquarters,
      name: 'Updated HQ Name',
      description: 'Updated description',
    };
    const response = await request(app).put(`/headquarters/${headquartersId}`).send(updatedHeadquarters);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated HQ Name');
    expect(response.body.description).toBe('Updated description');
  });

  it('should delete a headquarters by ID', async () => {
    // First create a headquarters to test deleting it
    const newHeadquarters = {
      name: 'Delete Me HQ',
      description: 'Will be deleted',
      address: '999 Delete Street',
      contactPerson: 'Delete Manager',
      email: 'delete@test.com',
      phone: '555-9999',
    };
    const createResponse = await request(app).post('/headquarters').send(newHeadquarters);
    const headquartersId = createResponse.body.headquartersId;

    const response = await request(app).delete(`/headquarters/${headquartersId}`);
    expect(response.status).toBe(204);
  });

  it('should return 404 for non-existing headquarters', async () => {
    const response = await request(app).get('/headquarters/999');
    expect(response.status).toBe(404);
  });

  it('should get headquarters metrics by ID', async () => {
    // First create a headquarters
    const newHeadquarters = {
      name: 'Metrics Test HQ',
      description: 'For metrics testing',
      address: '111 Metrics Street',
      contactPerson: 'Metrics Manager',
      email: 'metrics@test.com',
      phone: '555-3333',
    };
    const createResponse = await request(app).post('/headquarters').send(newHeadquarters);
    const headquartersId = createResponse.body.headquartersId;

    const response = await request(app).get(`/headquarters/${headquartersId}/metrics`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('score');
    expect(response.body).toHaveProperty('average');
    expect(response.body).toHaveProperty('display');
  });

  it('should get headquarters label by ID', async () => {
    // First create a headquarters
    const newHeadquarters = {
      name: 'Label Test HQ',
      description: 'For label testing',
      address: '222 Label Street',
      contactPerson: 'Label Manager',
      email: 'label@test.com',
      phone: '555-4444',
    };
    const createResponse = await request(app).post('/headquarters').send(newHeadquarters);
    const headquartersId = createResponse.body.headquartersId;

    const response = await request(app).get(`/headquarters/${headquartersId}/label`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('label');
    expect(typeof response.body.label).toBe('string');
  });
});
