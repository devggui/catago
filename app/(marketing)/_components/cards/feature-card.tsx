import type { ReactNode } from "react"

type FeatureCardProps = {
  icon: ReactNode
  title: string
  description: string
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="flex flex-col items-start space-y-4 rounded-lg border p-6">
      <div className="rounded-full bg-primary/10 p-3">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
