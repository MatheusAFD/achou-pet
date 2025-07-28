import Link from 'next/link'

import {
  Button,
  Container,
  CustomCard
} from '@user-app/modules/@shared/components'

export default function UsageGuidePage() {
  return (
    <main className="bg-primary/50 min-h-screen w-full p-4 md:p-8">
      <Container className="max-w-2xl">
        <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2">
          <CustomCard className="flex w-72 flex-col items-center justify-center bg-white text-center">
            <div className="bg-primary/90 mb-3 flex size-10 items-center justify-center rounded-full text-2xl font-bold text-white shadow-md">
              1
            </div>
            <h2 className="text-foreground/80 text-base font-medium">
              Faça seu cadastro
            </h2>
            <p className="text-foreground/70 mt-2 text-xs">
              Você precisa se cadastrar. Clique no botão{' '}
              <strong>Começar</strong> e preencha as informações solicitadas.
            </p>
          </CustomCard>

          <CustomCard className="flex w-72 flex-col items-center justify-center bg-white text-center">
            <div className="bg-primary/90 mb-3 flex size-10 items-center justify-center rounded-full text-2xl font-bold text-white shadow-md">
              2
            </div>

            <h2 className="text-foreground/80 text-base font-medium">
              Entre na plataforma
            </h2>
            <p className="text-foreground/70 mt-2 text-xs">
              Após o cadastro, você pode entrar na plataforma. Insira suas
              credenciais de acesso e clique no botão <strong>Entrar</strong>.
            </p>
          </CustomCard>

          <CustomCard className="flex w-72 flex-col items-center justify-center bg-white text-center">
            <div className="bg-primary/90 mb-3 flex size-10 items-center justify-center rounded-full text-2xl font-bold text-white shadow-md">
              3
            </div>
            <h2 className="text-foreground/80 text-base font-medium">
              Cadastrar um pet
            </h2>
            <p className="text-foreground/70 mt-2 text-xs">
              Após entrar na plataforma, você pode cadastrar um pet. Clique no
              botão <strong>Cadastrar novo</strong> e preencha as informações
              solicitadas
            </p>
          </CustomCard>

          <CustomCard className="flex w-72 flex-col items-center justify-center bg-white text-center">
            <div className="bg-primary/90 mb-3 flex size-10 items-center justify-center rounded-full text-2xl font-bold text-white shadow-md">
              4
            </div>
            <h2 className="text-foreground/80 text-base font-medium">
              Acessar página do pet
            </h2>
            <p className="text-foreground/70 mt-2 text-xs">
              Após cadastrar um pet, você pode acessar a página do pet. Clique
              no nome do pet na lista de pets cadastrados para ver mais
              detalhes.
            </p>
          </CustomCard>
        </div>
        <Link
          href="/auth/sign-up"
          className="mt-8 flex animate-bounce justify-center pb-10 md:mt-14"
        >
          <Button variant="secondary" className="w-72">
            Começar
          </Button>
        </Link>
      </Container>
    </main>
  )
}
