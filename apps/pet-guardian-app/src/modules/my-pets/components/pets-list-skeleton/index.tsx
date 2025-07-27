import { Skeleton } from '@user-app/modules/@shared/components'

export const PetsListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-[178px] rounded-lg" />
      ))}
    </div>
  )
}
