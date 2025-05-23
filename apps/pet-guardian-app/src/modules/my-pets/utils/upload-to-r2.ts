import { httpClientFetch } from '@user-app/modules/@shared/lib'

export const uploadToR2 = async (file: File): Promise<string> => {
  const [error, data] = await httpClientFetch<
    { url: string; key: string },
    unknown
  >({
    url: `/storage/presigned-url?filename=${encodeURIComponent(
      file.name
    )}&contentType=${encodeURIComponent(file.type)}`,
    method: 'GET'
  })
  if (error || !data?.url || !data?.key) {
    throw new Error('Erro ao obter presigned URL')
  }

  const uploadRes = await fetch(data.url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type
    }
  })
  if (!uploadRes.ok) {
    throw new Error('Erro ao fazer upload para o storage')
  }

  const publicEndpoint =
    process.env.NEXT_PUBLIC_R2_PUBLIC_ENDPOINT || 'https://static.achou.pet'

  const bucket = process.env.NEXT_PUBLIC_R2_BUCKET_NAME || 'achou-pet'

  return `${publicEndpoint}/${bucket}/${data.key}`
}
