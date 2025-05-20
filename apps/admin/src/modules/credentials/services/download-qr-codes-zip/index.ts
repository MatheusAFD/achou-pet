export const downloadQrCodesZip = async (batchId: string) => {
  const res = await fetch(`/api/download-qr-codes/${batchId}`)

  if (!res.ok) {
    return
  }

  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')

  a.href = url
  a.download = 'qrcodes.zip'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
