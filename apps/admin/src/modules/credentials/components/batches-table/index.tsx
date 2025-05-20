'use client'

import { useTransition } from 'react'

import { Download } from 'lucide-react'

import {
  Button,
  Loading,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@admin/modules/@shared/components'
import { PaginatedResponse } from '@admin/modules/@shared/types'

import { downloadQrCodesZip } from '../../services/download-qr-codes-zip'
import { Batch } from '../../services/get-batch-credentials/types'

interface BatchesTableProps {
  data: PaginatedResponse<Batch[]> | null
}

export const BatchesTable = (props: BatchesTableProps) => {
  const { data: batches } = props

  const [isPending, startTransition] = useTransition()

  return (
    <Table>
      <TableCaption className="font-medium">
        Credenciais geradas em lote
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold text-foreground/60">ID</TableHead>
          <TableHead className="text-foreground/60">Descrição</TableHead>
          <TableHead className="text-foreground/60">Criado em</TableHead>
          <TableHead className="text-foreground/60 font-semibold">
            Total
          </TableHead>

          <TableHead>Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {batches?.data.map((batch) => {
          return (
            <TableRow key={batch.id} className="text-foreground/90">
              <TableCell className="font-semibold">{batch.shortId}</TableCell>
              <TableCell>{batch.description}</TableCell>
              <TableCell>{batch.createdAt?.toLocaleString()}</TableCell>
              <TableCell className=" font-semibold">
                {batch.totalCredentialsGenerated}
              </TableCell>

              <TableCell>
                <Button
                  size="icon"
                  variant="outline"
                  className="justify-self-end"
                  onClick={() => {
                    startTransition(async () => {
                      await downloadQrCodesZip(batch.id)
                    })
                  }}
                >
                  <Download />
                </Button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>

      <Loading isLoading={isPending} isGlobal />
    </Table>
  )
}
