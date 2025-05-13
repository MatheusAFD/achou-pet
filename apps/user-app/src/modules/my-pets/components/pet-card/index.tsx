import { Edit2 } from 'lucide-react'

import {
  Avatar,
  AvatarImage,
  Button,
  ChildTooltip,
  CustomCard
} from '@user-app/modules/@shared/components'

// import { Pet } from '../../services/get-my-pets/types'

interface PetCardProps {
  pet: {
    petName: string
    createdAt: string
  }
}

export const PetCard = ({ pet }: PetCardProps) => {
  const { petName } = pet

  return (
    <CustomCard className="relative flex flex-col items-center gap-1 p-4 w-64 ">
      <Avatar className="size-16 border-2 border-tertiary">
        <AvatarImage src="/logo.png" className="p-0.5" />
      </Avatar>

      <h2 className="text-tertiary text-2xl font-medium text-center">
        {petName}
      </h2>

      <ChildTooltip content="Editar">
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2"
        >
          <Edit2 size={14} />
        </Button>
      </ChildTooltip>
    </CustomCard>
  )
}
