-- Migration 003: Add delivery_vehicles table

CREATE TABLE IF NOT EXISTS delivery_vehicles (
    delivery_vehicle_id INTEGER PRIMARY KEY AUTOINCREMENT,
    supplier_id INTEGER NOT NULL,
    vehicle_type TEXT NOT NULL,
    license_plate TEXT NOT NULL UNIQUE,
    capacity REAL NOT NULL,
    status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'in-transit', 'maintenance')),
    last_inspection_date TEXT,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id) ON DELETE CASCADE
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_delivery_vehicles_supplier_id ON delivery_vehicles(supplier_id);
CREATE INDEX IF NOT EXISTS idx_delivery_vehicles_status ON delivery_vehicles(status);
