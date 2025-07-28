import { Skeleton } from '@user-app/modules/@shared/components'

export const PetsListSkeleton = () => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-[178px] rounded-lg" />
      ))}
    </div>
  )
}
