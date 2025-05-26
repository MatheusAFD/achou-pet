import Link from 'next/link'

import {
  Button,
  Container,
  CustomCard
} from '@user-app/modules/@shared/components'

export default function UsageGuidePage() {
  return (
    <main className="w-full bg-primary/50 min-h-screen p-4 md:p-8">
      <Container className="max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
          <CustomCard className="flex flex-col justify-center items-center bg-white w-72 text-center">
            <div className="rounded-full bg-primary/90 text-white size-10 flex items-center justify-center text-2xl font-bold mb-3 shadow-md">
              1
            </div>
            <h2 className="text-lg text-foreground/80 font-medium">
              Faça seu cadastro
            </h2>
            <p className="text-foreground/70 text-sm mt-2">
              Você precisa se cadastrar. Clique no botão{' '}
              <strong>Cadastrar</strong> e preencha as informações solicitadas.
            </p>
          </CustomCard>

          <CustomCard className="flex flex-col justify-center items-center bg-white w-72 text-center">
            <div className="rounded-full bg-primary/90 text-white size-10 flex items-center justify-center text-2xl font-bold mb-3 shadow-md">
              2
            </div>

            <h2 className="text-lg text-foreground/80 font-medium">
              Entre na plataforma
            </h2>
            <p className="text-foreground/70 text-sm mt-2">
              Após o cadastro, você pode entrar na plataforma. Clique no botão{' '}
              <strong>Entrar</strong> e insira suas credenciais.
            </p>
          </CustomCard>

          <CustomCard className="flex flex-col justify-center items-center bg-white w-72 text-center">
            <div className="rounded-full bg-primary/90 text-white size-10 flex items-center justify-center text-2xl font-bold mb-3 shadow-md">
              3
            </div>
            <h2 className="text-lg text-foreground/80 font-medium">
              Cadastrar um pet
            </h2>
            <p className="text-foreground/70 text-sm mt-2">
              Após entrar na plataforma, você pode cadastrar um pet. Clique no
              botão <strong>Cadastrar novo</strong> e preencha as informações
              solicitadas
            </p>
          </CustomCard>

          <CustomCard className="flex flex-col justify-center items-center bg-white w-72 text-center">
            <div className="rounded-full bg-primary/90 text-white size-10 flex items-center justify-center text-2xl font-bold mb-3 shadow-md">
              4
            </div>
            <h2 className="text-lg text-foreground/80 font-medium">
              Acessar página do pet
            </h2>
            <p className="text-foreground/70 text-sm mt-2">
              Após cadastrar um pet, você pode acessar a página do pet. Clique
              no nome do pet na lista de pets cadastrados para ver mais
              detalhes.
            </p>
          </CustomCard>
        </div>
        <Link
          href="/auth/sign-up"
          className="flex justify-center mt-8 md:mt-14 animate-bounce "
        >
          <Button variant="secondary" className="w-72">
            Começar
          </Button>
        </Link>
      </Container>
    </main>
  )
}
