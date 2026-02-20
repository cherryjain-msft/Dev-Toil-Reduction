import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DeliveryVehiclesRepository } from './deliveryVehiclesRepo';
import { NotFoundError } from '../utils/errors';

// Mock the getDatabase function first
vi.mock('../db/sqlite', () => ({
    getDatabase: vi.fn()
}));

// Import the mocked module
import { getDatabase } from '../db/sqlite';

describe('DeliveryVehiclesRepository', () => {
    let repository: DeliveryVehiclesRepository;
    let mockDb: any;

    beforeEach(() => {
        // Create mock database connection
        mockDb = {
            db: {} as any,
            run: vi.fn(),
            get: vi.fn(),
            all: vi.fn(),
            close: vi.fn()
        };

        // Mock getDatabase to return our mock
        (getDatabase as any).mockResolvedValue(mockDb);

        repository = new DeliveryVehiclesRepository(mockDb);
        vi.clearAllMocks();
    });

    describe('findAll', () => {
        it('should return all delivery vehicles', async () => {
            const mockResults = [
                { delivery_vehicle_id: 1, supplier_id: 1, vehicle_type: 'Truck', license_plate: 'CAT-TRK-001', capacity: 5000.0, status: 'available', last_inspection_date: '2024-11-15' },
                { delivery_vehicle_id: 2, supplier_id: 2, vehicle_type: 'Van', license_plate: 'CAT-VAN-002', capacity: 1200.0, status: 'in-transit', last_inspection_date: '2024-12-01' }
            ];
            mockDb.all.mockResolvedValue(mockResults);

            const result = await repository.findAll();

            expect(mockDb.all).toHaveBeenCalledWith('SELECT * FROM delivery_vehicles ORDER BY delivery_vehicle_id');
            expect(result).toHaveLength(2);
            expect(result[0].deliveryVehicleId).toBe(1);
            expect(result[0].vehicleType).toBe('Truck');
            expect(result[1].status).toBe('in-transit');
        });

        it('should return empty array when no vehicles exist', async () => {
            mockDb.all.mockResolvedValue([]);

            const result = await repository.findAll();

            expect(result).toEqual([]);
        });

        it('should handle database errors', async () => {
            mockDb.all.mockRejectedValue(new Error('Database connection failed'));

            await expect(repository.findAll()).rejects.toThrow();
        });
    });

    describe('findById', () => {
        it('should return delivery vehicle when found', async () => {
            const mockResult = {
                delivery_vehicle_id: 1,
                supplier_id: 1,
                vehicle_type: 'Truck',
                license_plate: 'CAT-TRK-001',
                capacity: 5000.0,
                status: 'available',
                last_inspection_date: '2024-11-15'
            };
            mockDb.get.mockResolvedValue(mockResult);

            const result = await repository.findById(1);

            expect(mockDb.get).toHaveBeenCalledWith(
                'SELECT * FROM delivery_vehicles WHERE delivery_vehicle_id = ?',
                [1]
            );
            expect(result?.deliveryVehicleId).toBe(1);
            expect(result?.licensePlate).toBe('CAT-TRK-001');
        });

        it('should return null when delivery vehicle not found', async () => {
            mockDb.get.mockResolvedValue(undefined);

            const result = await repository.findById(999);

            expect(result).toBeNull();
        });
    });

    describe('findBySupplierId', () => {
        it('should return vehicles for a given supplier', async () => {
            const mockResults = [
                { delivery_vehicle_id: 1, supplier_id: 1, vehicle_type: 'Truck', license_plate: 'CAT-TRK-001', capacity: 5000.0, status: 'available', last_inspection_date: '2024-11-15' },
                { delivery_vehicle_id: 5, supplier_id: 1, vehicle_type: 'Truck', license_plate: 'CAT-TRK-005', capacity: 8000.0, status: 'available', last_inspection_date: '2025-02-01' }
            ];
            mockDb.all.mockResolvedValue(mockResults);

            const result = await repository.findBySupplierId(1);

            expect(mockDb.all).toHaveBeenCalledWith(
                'SELECT * FROM delivery_vehicles WHERE supplier_id = ? ORDER BY delivery_vehicle_id',
                [1]
            );
            expect(result).toHaveLength(2);
            expect(result[0].supplierId).toBe(1);
        });

        it('should return empty array when supplier has no vehicles', async () => {
            mockDb.all.mockResolvedValue([]);

            const result = await repository.findBySupplierId(999);

            expect(result).toEqual([]);
        });
    });

    describe('create', () => {
        it('should create a new delivery vehicle and return it', async () => {
            const newVehicle = {
                supplierId: 1,
                vehicleType: 'Van',
                licensePlate: 'CAT-VAN-NEW',
                capacity: 1000.0,
                status: 'available',
                lastInspectionDate: '2025-01-01'
            };

            mockDb.run.mockResolvedValue({ lastID: 6, changes: 1 });
            mockDb.get.mockResolvedValue({
                delivery_vehicle_id: 6,
                supplier_id: 1,
                vehicle_type: 'Van',
                license_plate: 'CAT-VAN-NEW',
                capacity: 1000.0,
                status: 'available',
                last_inspection_date: '2025-01-01'
            });

            const result = await repository.create(newVehicle);

            expect(mockDb.run).toHaveBeenCalled();
            expect(result.deliveryVehicleId).toBe(6);
            expect(result.licensePlate).toBe('CAT-VAN-NEW');
        });

        it('should throw error if created vehicle cannot be retrieved', async () => {
            mockDb.run.mockResolvedValue({ lastID: 6, changes: 1 });
            mockDb.get.mockResolvedValue(null);

            await expect(repository.create({
                supplierId: 1,
                vehicleType: 'Van',
                licensePlate: 'CAT-VAN-NEW',
                capacity: 1000.0,
                status: 'available'
            })).rejects.toThrow('Failed to retrieve created delivery vehicle');
        });
    });

    describe('update', () => {
        it('should update existing delivery vehicle and return updated data', async () => {
            const updateData = { status: 'maintenance' };

            mockDb.run.mockResolvedValue({ changes: 1 });
            mockDb.get.mockResolvedValue({
                delivery_vehicle_id: 1,
                supplier_id: 1,
                vehicle_type: 'Truck',
                license_plate: 'CAT-TRK-001',
                capacity: 5000.0,
                status: 'maintenance',
                last_inspection_date: '2024-11-15'
            });

            const result = await repository.update(1, updateData);

            expect(mockDb.run).toHaveBeenCalledWith(
                'UPDATE delivery_vehicles SET status = ? WHERE delivery_vehicle_id = ?',
                ['maintenance', 1]
            );
            expect(result.status).toBe('maintenance');
        });

        it('should throw NotFoundError when delivery vehicle does not exist', async () => {
            mockDb.run.mockResolvedValue({ changes: 0 });

            await expect(repository.update(999, { status: 'available' }))
                .rejects.toThrow(NotFoundError);
        });
    });

    describe('delete', () => {
        it('should delete existing delivery vehicle', async () => {
            mockDb.run.mockResolvedValue({ changes: 1 });

            await repository.delete(1);

            expect(mockDb.run).toHaveBeenCalledWith(
                'DELETE FROM delivery_vehicles WHERE delivery_vehicle_id = ?',
                [1]
            );
        });

        it('should throw NotFoundError when delivery vehicle does not exist', async () => {
            mockDb.run.mockResolvedValue({ changes: 0 });

            await expect(repository.delete(999))
                .rejects.toThrow(NotFoundError);
        });
    });

    describe('exists', () => {
        it('should return true when delivery vehicle exists', async () => {
            mockDb.get.mockResolvedValue({ count: 1 });

            const result = await repository.exists(1);

            expect(result).toBe(true);
            expect(mockDb.get).toHaveBeenCalledWith(
                'SELECT COUNT(*) as count FROM delivery_vehicles WHERE delivery_vehicle_id = ?',
                [1]
            );
        });

        it('should return false when delivery vehicle does not exist', async () => {
            mockDb.get.mockResolvedValue({ count: 0 });

            const result = await repository.exists(999);

            expect(result).toBe(false);
        });

        it('should handle null result', async () => {
            mockDb.get.mockResolvedValue(null);

            const result = await repository.exists(999);

            expect(result).toBe(false);
        });
    });
});
