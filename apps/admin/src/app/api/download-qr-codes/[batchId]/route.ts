import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ batchId: string }> }
) {
  const { batchId } = await props.params
  const cookieStore = await cookies()
  const token = cookieStore.get('achou-pet-admin-token')?.value

  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const apiUrl = `${process.env.API_BASE_URL}/batches/export-qrcodes/${batchId}`

  const apiRes = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!apiRes.ok) {
    return new NextResponse('error exporting qr-codes', { status: 500 })
  }

  const blob = await apiRes.arrayBuffer()

  return new NextResponse(blob, {
    status: 200,
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="qrcodes.zip"'
    }
  })
}
