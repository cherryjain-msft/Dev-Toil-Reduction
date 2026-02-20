-- Seed data for delivery_vehicles
-- References existing supplier IDs (1-3) from 001_suppliers.sql

INSERT INTO delivery_vehicles (delivery_vehicle_id, supplier_id, vehicle_type, license_plate, capacity, status, last_inspection_date) VALUES
(1, 1, 'Truck', 'CAT-TRK-001', 5000.0, 'available', '2024-11-15'),
(2, 2, 'Van', 'CAT-VAN-002', 1200.0, 'in-transit', '2024-12-01'),
(3, 3, 'Drone', 'CAT-DRN-003', 25.0, 'available', '2025-01-10'),
(4, 2, 'Van', 'CAT-VAN-004', 1500.0, 'maintenance', '2024-10-20'),
(5, 1, 'Truck', 'CAT-TRK-005', 8000.0, 'available', '2025-02-01');
