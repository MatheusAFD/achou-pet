import { getBatchCredentials } from '../../services/get-batch-credentials'
import { BatchesTable } from '../batches-table'

export const BatchesContainer = async () => {
  const [error, batches] = await getBatchCredentials()

  console.log(error)

  return (
    <section>
      <BatchesTable data={batches} />
    </section>
  )
}
