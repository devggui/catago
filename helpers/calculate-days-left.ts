export const calculateDaysLeft = (startDate: Date) => {
  const now = new Date()
  const trialEndDate = new Date(startDate)
  trialEndDate.setDate(trialEndDate.getDate() + 14)

  const diffTime = trialEndDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return Math.max(0, diffDays)
}
