import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import supplierRouter from './supplier';
import { runMigrations } from '../db/migrate';
import { closeDatabase, getDatabase } from '../db/sqlite';
import { errorHandler } from '../utils/errors';

let app: express.Express;

describe('Supplier API', () => {
  beforeEach(async () => {
    // Ensure a fresh in-memory database for each test
    await closeDatabase();
    await getDatabase(true);
    await runMigrations(true);

    // Set up express app
    app = express();
    app.use(express.json());
    app.use('/suppliers', supplierRouter);
    // Attach error handler to translate repo errors
    app.use(errorHandler);
  });

  afterEach(async () => {
    await closeDatabase();
  });

  it('should create a new supplier', async () => {
    const newSupplier = {
      name: 'Test Supplier',
      description: 'Test supplier description',
      contactPerson: 'Jane Doe',
      email: 'jane@supplier.com',
      phone: '555-5678',
      active: 1,
      verified: 0,
    };
    const response = await request(app).post('/suppliers').send(newSupplier);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test Supplier');
    expect(response.body.active).toBe(true);  // SQLite returns as boolean
    expect(response.body.verified).toBe(false); // SQLite returns as boolean
    expect(response.body.supplierId).toBeDefined();
  });

  it('should get all suppliers', async () => {
    const response = await request(app).get('/suppliers');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a supplier by ID', async () => {
    // First create a supplier to test getting it
    const newSupplier = {
      name: 'Get Test Supplier',
      description: 'Supplier to retrieve',
      contactPerson: 'John Smith',
      email: 'john@supplier.com',
      phone: '555-1111',
      active: 1,
      verified: 1,
    };
    const createResponse = await request(app).post('/suppliers').send(newSupplier);
    const supplierId = createResponse.body.supplierId;

    const response = await request(app).get(`/suppliers/${supplierId}`);
    expect(response.status).toBe(200);
    expect(response.body.supplierId).toBe(supplierId);
  });

  it('should update a supplier by ID', async () => {
    // First create a supplier to test updating it
    const newSupplier = {
      name: 'Original Supplier',
      description: 'Original description',
      contactPerson: 'Alice Brown',
      email: 'alice@supplier.com',
      phone: '555-2222',
      active: 0,
      verified: 0,
    };
    const createResponse = await request(app).post('/suppliers').send(newSupplier);
    const supplierId = createResponse.body.supplierId;

    const updatedSupplier = {
      ...newSupplier,
      name: 'Updated Supplier Name',
      active: 1,
    };
    const response = await request(app).put(`/suppliers/${supplierId}`).send(updatedSupplier);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Supplier Name');
    expect(response.body.active).toBe(true); // SQLite returns as boolean
  });

  it('should delete a supplier by ID', async () => {
    // First create a supplier to test deleting it
    const newSupplier = {
      name: 'Delete Me Supplier',
      description: 'This supplier will be deleted',
      contactPerson: 'Bob Jones',
      email: 'bob@supplier.com',
      phone: '555-9999',
      active: 1,
      verified: 0,
    };
    const createResponse = await request(app).post('/suppliers').send(newSupplier);
    const supplierId = createResponse.body.supplierId;

    const response = await request(app).delete(`/suppliers/${supplierId}`);
    expect(response.status).toBe(204);
  });

  it('should return 404 for non-existing supplier', async () => {
    const response = await request(app).get('/suppliers/999');
    expect(response.status).toBe(404);
  });

  it('should return 404 when updating non-existing supplier', async () => {
    const updateData = {
      name: 'Non-existent Supplier',
    };
    const response = await request(app).put('/suppliers/999').send(updateData);
    expect(response.status).toBe(404);
  });

  it('should return 404 when deleting non-existing supplier', async () => {
    const response = await request(app).delete('/suppliers/999');
    expect(response.status).toBe(404);
  });

  it('should get supplier status by ID', async () => {
    // First create a supplier
    const newSupplier = {
      name: 'Status Test Supplier',
      description: 'Test supplier for status check',
      contactPerson: 'Charlie Wilson',
      email: 'charlie@supplier.com',
      phone: '555-3333',
      active: 1,
      verified: 1,
    };
    const createResponse = await request(app).post('/suppliers').send(newSupplier);
    const supplierId = createResponse.body.supplierId;

    const response = await request(app).get(`/suppliers/${supplierId}/status`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status');
    expect(response.body.status).toBe('APPROVED');
  });
});
