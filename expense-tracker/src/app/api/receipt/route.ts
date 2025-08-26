import { NextRequest, NextResponse } from 'next/server'
import { processReceiptImage } from '@/lib/receipt-processing'

export async function POST(request: NextRequest) {
  try {
    const { imageBase64 } = await request.json()

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      )
    }

    const result = await processReceiptImage(imageBase64)

    if (result.success) {
      return NextResponse.json(result.data)
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Receipt processing error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
