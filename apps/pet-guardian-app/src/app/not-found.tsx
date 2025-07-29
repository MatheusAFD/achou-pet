import Image from 'next/image'
import Link from 'next/link'

import { Logo } from '@user-app/modules/@shared/assets'
import {
  buttonVariants,
  CustomCard
} from '@user-app/modules/@shared/components'

export default function NotFound() {
  return (
    <div className="bg-primary/50 flex h-screen items-center justify-center">
      <CustomCard
        as="main"
        className="flex items-center justify-center gap-4 p-8"
      >
        <Image src={Logo} alt="Logo Achou Pet" width={128} height={128} />
        <div className="flex flex-col justify-center">
          <h1 className="text-foreground/80 animate-pulse text-center text-lg font-medium">
            <span className="text-primary text-4xl">404</span> <br />
            Página não encontrada
          </h1>

          <Link
            href="/auth/sign-in"
            className={buttonVariants({
              variant: 'default',
              size: 'lg',
              className: 'mt-4'
            })}
          >
            Voltar
          </Link>
        </div>
      </CustomCard>
    </div>
  )
}
