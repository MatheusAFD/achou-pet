import { Metadata } from 'next'
import Link from 'next/link'

import {
  Button,
  Conditional,
  CustomCard,
  LineBadge
} from '@user-app/modules/@shared/components'
import { getPendingTerm } from '@user-app/modules/terms/services'

export const metadata: Metadata = {
  title: 'Termos de uso',
  description: 'Leia com atenção os termos de uso abaixo'
}

export default async function TermsPage() {
  const [error, data] = await getPendingTerm()

  console.log('error', error)

  return (
    <main className="bg-primary/50 w-full p-4 h-lvh flex md:items-center md:justify-center">
      <CustomCard className="w-full md:w-[32rem] h-fit p-4">
        <header>
          <LineBadge />
          <h1 className="font-semibold text-xl">Termos de uso</h1>

          <p className="text-sm">Leia com atenção os termos de uso abaixo</p>
        </header>

        <Conditional condition={!!data?.content}>
          <section
            className="max-h-96 mt-4 text-sm text-foreground/50 overflow-y-scroll"
            dangerouslySetInnerHTML={{
              __html: data?.content ?? 's'
            }}
          />
        </Conditional>

        <Conditional condition={!data?.content}>
          <section className="mt-4">
            <h2 className="text-lg">Sem termos de uso para aceitar</h2>
          </section>
        </Conditional>

        <Conditional condition={!!data?.content}>
          <footer className="flex flex-1 flex-row gap-4 pt-6 pb-2">
            <Button variant="destructive">Recusar</Button>
            <Button>Aceitar</Button>
          </footer>
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
