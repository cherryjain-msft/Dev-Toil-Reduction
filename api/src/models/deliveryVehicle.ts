/**
 * @swagger
 * components:
 *   schemas:
 *     DeliveryVehicle:
 *       type: object
 *       required:
 *         - deliveryVehicleId
 *         - supplierId
 *         - vehicleType
 *         - licensePlate
 *         - capacity
 *         - status
 *       properties:
 *         deliveryVehicleId:
 *           type: integer
 *           description: The unique identifier for the delivery vehicle
 *         supplierId:
 *           type: integer
 *           description: The ID of the supplier that owns this vehicle
 *         vehicleType:
 *           type: string
 *           description: Type of vehicle (e.g., "Truck", "Van", "Drone")
 *         licensePlate:
 *           type: string
 *           description: Unique license plate identifier
 *         capacity:
 *           type: number
 *           format: float
 *           description: Maximum cargo weight capacity in kg
 *         status:
 *           type: string
 *           enum: [available, in-transit, maintenance]
 *           description: Current operational status of the vehicle
 *         lastInspectionDate:
 *           type: string
 *           format: date
 *           description: ISO 8601 date of last vehicle inspection
 */
export interface DeliveryVehicle {
  deliveryVehicleId: number;
  supplierId: number;
  vehicleType: string;
  licensePlate: string;
  capacity: number;
  status: string;
  lastInspectionDate?: string;
}
