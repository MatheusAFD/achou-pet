import { getBatchCredentials } from '../../services/get-batch-credentials'
import { BatchesTable } from '../batches-table'

export const BatchesContainer = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, batches] = await getBatchCredentials()

  return <BatchesTable data={batches} />
}
