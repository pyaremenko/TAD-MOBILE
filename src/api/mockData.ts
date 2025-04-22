// Mock data for the Trusted Auto Data app

// User data
export const mockUser = {
  id: "user1",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  joinDate: "2023-01-15",
  profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
}

export const mockUserPoints = 750

// Cars data
export const mockCars = [
  {
    id: "car1",
    userId: "user1",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    vin: "4T1BF1FK5CU123456",
    licensePlate: "ABC-1234",
    color: "Silver",
    fuelType: "Gasoline",
    transmission: "Automatic",
    mileage: 25000,
    lastServiceDate: "2023-03-15",
    healthScore: 92,
    image: "https://example.com/car1.jpg",
    status: "active",
  },
  {
    id: "car2",
    userId: "user1",
    make: "Honda",
    model: "Civic",
    year: 2018,
    vin: "2HGFC2F52JH123456",
    licensePlate: "XYZ-7890",
    color: "Blue",
    fuelType: "Gasoline",
    transmission: "Automatic",
    mileage: 45000,
    lastServiceDate: "2023-02-10",
    healthScore: 85,
    image: "https://example.com/car2.jpg",
    status: "active",
  },
]

// OBD data
export const mockObdData = [
  {
    id: "obd1",
    carId: "car1",
    timestamp: "2023-04-01T10:30:00Z",
    engineTemp: 90,
    rpm: 1200,
    speed: 0,
    fuelLevel: 75,
    batteryVoltage: 12.6,
    coolantTemp: 85,
    oilPressure: 40,
    oilTemp: 95,
    tirePressure: {
      frontLeft: 32,
      frontRight: 32,
      rearLeft: 32,
      rearRight: 32,
    },
    dtcCodes: [],
  },
  {
    id: "obd2",
    carId: "car1",
    timestamp: "2023-04-01T14:45:00Z",
    engineTemp: 95,
    rpm: 2500,
    speed: 65,
    fuelLevel: 70,
    batteryVoltage: 14.2,
    coolantTemp: 90,
    oilPressure: 42,
    oilTemp: 100,
    tirePressure: {
      frontLeft: 31,
      frontRight: 32,
      rearLeft: 31,
      rearRight: 32,
    },
    dtcCodes: [],
  },
]

// Maintenance certificates
export const mockMaintenanceCertificates = [
  {
    id: "cert1",
    carId: "car1",
    carName: "Toyota Camry",
    type: "Oil Change",
    date: "2023-03-15",
    odometer: 25000,
    serviceProvider: "QuickLube Service Center",
    cost: 49.99,
    description: "Regular oil change with synthetic oil. Replaced oil filter and performed multi-point inspection.",
    blockchainVerified: true,
    blockchainTxId: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    parts: [
      {
        name: "Oil Filter",
        partNumber: "OF-12345",
        cost: 12.99,
      },
      {
        name: "Synthetic Oil (5 qts)",
        partNumber: "SO-5W30",
        cost: 29.99,
      },
    ],
  },
  {
    id: "cert2",
    carId: "car1",
    carName: "Toyota Camry",
    type: "Tire Rotation",
    date: "2023-02-20",
    odometer: 23500,
    serviceProvider: "City Auto Care",
    cost: 29.99,
    description: "Rotated all four tires and checked tire pressure. Performed wheel alignment check.",
    blockchainVerified: true,
    blockchainTxId: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  },
  {
    id: "cert3",
    carId: "car1",
    carName: "Toyota Camry",
    type: "Brake Service",
    date: "2023-01-10",
    odometer: 21000,
    serviceProvider: "Premium Auto Shop",
    cost: 249.99,
    description: "Replaced front brake pads and resurfaced front rotors. Inspected rear brakes and brake fluid.",
    blockchainVerified: true,
    blockchainTxId: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
    parts: [
      {
        name: "Front Brake Pads",
        partNumber: "BP-45678",
        cost: 89.99,
      },
      {
        name: "Labor",
        partNumber: "LAB-BRAKE",
        cost: 160.0,
      },
    ],
  },
  {
    id: "cert4",
    carId: "car2",
    carName: "Honda Civic",
    type: "Air Filter Replacement",
    date: "2023-02-10",
    odometer: 45000,
    serviceProvider: "Honda Dealership",
    cost: 39.99,
    description: "Replaced engine air filter and cabin air filter. Performed multi-point inspection.",
    blockchainVerified: false,
    parts: [
      {
        name: "Engine Air Filter",
        partNumber: "EAF-H123",
        cost: 19.99,
      },
      {
        name: "Cabin Air Filter",
        partNumber: "CAF-H456",
        cost: 19.99,
      },
    ],
  },
  {
    id: "cert5",
    carId: "car2",
    carName: "Honda Civic",
    type: "Transmission Service",
    date: "2022-11-15",
    odometer: 42000,
    serviceProvider: "AutoCare Plus",
    cost: 159.99,
    description: "Transmission fluid flush and replacement. Inspected transmission components.",
    blockchainVerified: true,
    blockchainTxId: "0xdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abc",
  },
]

// Trips data
export const mockTrips = [
  {
    id: "trip1",
    carId: "car1",
    startTime: "2023-04-01T08:30:00Z",
    endTime: "2023-04-01T09:15:00Z",
    startLocation: "Home",
    endLocation: "Office",
    distance: 15.2,
    duration: 45,
    fuelUsed: 0.8,
    avgSpeed: 35,
    maxSpeed: 65,
    drivingScore: 88,
  },
  {
    id: "trip2",
    carId: "car1",
    startTime: "2023-04-01T17:30:00Z",
    endTime: "2023-04-01T18:20:00Z",
    startLocation: "Office",
    endLocation: "Home",
    distance: 16.5,
    duration: 50,
    fuelUsed: 0.9,
    avgSpeed: 32,
    maxSpeed: 60,
    drivingScore: 92,
  },
]

// Rewards data
export const mockRewards = [
  {
    id: "reward1",
    title: "Free Oil Change",
    description: "Redeem your points for a free oil change at participating service centers.",
    pointsCost: 500,
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/car-maintenance-co3TkxO0aMxZaUb3G6c2Wl6iFofoQ8.png",
    expiryDate: "2023-12-31",
  },
  {
    id: "reward2",
    title: "$50 Service Discount",
    description: "Get $50 off your next service appointment at any certified auto shop.",
    pointsCost: 800,
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/worn-tire-close-up-BBHBO9pcv9IWK1Pu6rGIn4hUzq2qAm.png",
    expiryDate: "2023-12-31",
  },
  {
    id: "reward3",
    title: "Free Car Wash",
    description: "Enjoy a free premium car wash at ShineBright locations nationwide.",
    pointsCost: 300,
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/suds-and-shine-zw9DjavKwkYw20LMjisEg0rnhqp2Dg.png",
    expiryDate: "2023-12-31",
  },
  {
    id: "reward4",
    title: "Free Diagnostic Scan",
    description: "Get a comprehensive diagnostic scan for your vehicle at no cost.",
    pointsCost: 400,
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/modern-car-diagnostic-sZv2ZWzSf2BYseyM7h89L2RxqWkygB.png",
    expiryDate: "2023-12-31",
  },
]

// Points history
export const mockPointsHistory = [
  {
    id: "points1",
    userId: "user1",
    amount: 100,
    type: "earned",
    reason: "Regular maintenance completed",
    date: "2023-03-15",
    relatedEntityId: "cert1",
  },
  {
    id: "points2",
    userId: "user1",
    amount: 50,
    type: "earned",
    reason: "Connected OBD device",
    date: "2023-03-01",
    relatedEntityId: null,
  },
  {
    id: "points3",
    userId: "user1",
    amount: 300,
    type: "spent",
    reason: "Redeemed for Free Car Wash",
    date: "2023-02-15",
    relatedEntityId: "reward3",
  },
]
