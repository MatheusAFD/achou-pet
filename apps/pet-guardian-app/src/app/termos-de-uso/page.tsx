import { Metadata } from 'next'
import Link from 'next/link'

import {
  Button,
  Conditional,
  CustomCard,
  LineBadge
} from '@user-app/modules/@shared/components'
import { TermsActions } from '@user-app/modules/terms/components/terms-actions'
import { getPendingTerm } from '@user-app/modules/terms/services'

export const metadata: Metadata = {
  title: 'Termos de uso',
  description: 'Leia com atenção os termos de uso abaixo'
}

export default async function TermsPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, data] = await getPendingTerm()

  return (
    <main className="bg-primary/50 flex h-lvh w-full p-4 md:items-center md:justify-center">
      <CustomCard className="h-fit w-full p-4 md:w-[32rem]">
        <header>
          <LineBadge />
          <h1 className="text-xl font-semibold">Termos de uso</h1>

          <p className="text-sm">Leia com atenção os termos de uso abaixo</p>
        </header>

        <Conditional condition={!!data?.content}>
          <section
            className="text-foreground/50 mt-4 max-h-96 overflow-y-scroll text-sm"
            dangerouslySetInnerHTML={{
              __html: data?.content ?? ''
            }}
          />
        </Conditional>

        <Conditional condition={!data?.content}>
          <section className="my-4 animate-pulse">
            <h2 className="text-lg">Sem termos de uso para aceitar</h2>
          </section>
        </Conditional>

        <Conditional condition={!!data?.content}>
          <TermsActions />
        </Conditional>

        <Conditional condition={!data?.content}>
          <Link href="/meus-pets">
            <Button>Voltar</Button>
          </Link>
        </Conditional>
      </CustomCard>
    </main>
  )
}
