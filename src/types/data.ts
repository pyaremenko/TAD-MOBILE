// Define types for the app data

// User type
export interface User {
  id: string
  name: string
  email: string
  phone: string
  joinDate: string
  profileImage: string
}

// Car type
export interface Car {
  id: string
  userId: string
  make: string
  model: string
  year: number
  vin: string
  licensePlate: string
  color: string
  fuelType: string
  transmission: string
  mileage: number
  lastServiceDate: string
  healthScore: number
  image: string
  status: string
}

// OBD data type
export interface ObdData {
  id: string
  carId: string
  timestamp: string
  engineTemp: number
  rpm: number
  speed: number
  fuelLevel: number
  batteryVoltage: number
  coolantTemp: number
  oilPressure: number
  oilTemp: number
  tirePressure: {
    frontLeft: number
    frontRight: number
    rearLeft: number
    rearRight: number
  }
  dtcCodes: string[]
}

// Part type
export interface Part {
  name: string
  partNumber: string
  cost: number
}

// Maintenance certificate type
export interface MaintenanceCertificate {
  id: string
  carId: string
  carName: string
  type: string
  date: string
  odometer: number
  serviceProvider: string
  cost: number
  description: string
  blockchainVerified: boolean
  blockchainTxId?: string
  parts?: Part[]
}

// Trip type
export interface Trip {
  id: string
  carId: string
  startTime: string
  endTime: string
  startLocation: string
  endLocation: string
  distance: number
  duration: number
  fuelUsed: number
  avgSpeed: number
  maxSpeed: number
  drivingScore: number
}

// Reward type
export interface Reward {
  id: string
  title: string
  description: string
  pointsCost: number
  imageUrl: string
  expiryDate: string
}

// Points history type
export interface PointsHistory {
  id: string
  userId: string
  amount: number
  type: "earned" | "spent"
  reason: string
  date: string
  relatedEntityId: string | null
}
