// Format date to readable string
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

// Format mileage
export const formatMileage = (miles: number): string => {
  return `${miles.toLocaleString()} mi`
}

// Calculate time ago
export const calculateTimeAgo = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`
  return `${Math.floor(diffInSeconds / 31536000)} years ago`
}

// Truncate blockchain transaction ID
export const truncateBlockchainTx = (txId: string | null): string => {
  if (!txId) return "Not verified"
  return txId.slice(0, 6) + "..." + txId.slice(-4)
}

// Get status color
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "connected":
      return "#10b981" // Green
    case "offline":
      return "#9ca3af" // Gray
    case "maintenance":
      return "#f59e0b" // Amber
    default:
      return "#6b7280" // Default gray
  }
}

// Get health score color
export const getHealthScoreColor = (score: number): string => {
  if (score >= 80) return "#10b981" // Green
  if (score >= 60) return "#f59e0b" // Amber
  return "#ef4444" // Red
}
