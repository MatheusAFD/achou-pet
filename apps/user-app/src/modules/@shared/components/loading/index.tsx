import { Loader2 } from 'lucide-react'

export const Loading = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <Loader2 className="animate-spin text-green-principal" size={48} />
    </div>
  )
}
