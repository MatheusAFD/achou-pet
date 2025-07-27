import Image from 'next/image'
import Link from 'next/link'

import { Logo } from '@user-app/modules/@shared/assets'
import {
  buttonVariants,
  CustomCard
} from '@user-app/modules/@shared/components'

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-primary/50">
      <CustomCard
        as="main"
        className="flex gap-4 justify-center items-center p-8"
      >
        <Image src={Logo} alt="Logo Achou Pet" width={128} height={128} />
        <div className="flex flex-col justify-center">
          <h1 className="text-lg text-foreground/80 font-medium text-center animate-pulse">
            <span className="text-4xl text-primary">404</span> <br />
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
