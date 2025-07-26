import { Skeleton } from '@user-app/modules/@shared/components'

export const AddressesListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
      {Array.from({ length: 3 }).map((_, index) => {
        return <Skeleton key={index} className="h-[450px] rounded-lg" />
      })}
    </div>
  )
}
