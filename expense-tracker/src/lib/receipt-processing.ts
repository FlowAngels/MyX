import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface ReceiptData {
  amount: number
  merchant_name: string
  date: string
  confidence: number
}

export interface ReceiptProcessingResult {
  success: boolean
  data?: ReceiptData
  error?: string
}

/**
 * Process receipt image using OpenAI Vision API
 */
export async function processReceiptImage(imageBase64: string): Promise<ReceiptProcessingResult> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Extract the following information from this receipt image:
1. Total amount (as a number)
2. Merchant/store name
3. Date (in YYYY-MM-DD format)

Return the data as a JSON object with these exact keys: amount, merchant_name, date, confidence (0-1).

If you cannot determine any field, use null for that field and set confidence to 0.5 or lower.`
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`
              }
            }
          ]
        }
      ],
      max_tokens: 300,
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      return {
        success: false,
        error: 'No response from OpenAI'
      }
    }

    // Try to parse JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return {
        success: false,
        error: 'Could not parse JSON response'
      }
    }

    const parsedData = JSON.parse(jsonMatch[0])
    
    // Validate required fields
    if (typeof parsedData.amount !== 'number' || parsedData.amount <= 0) {
      return {
        success: false,
        error: 'Invalid or missing amount'
      }
    }

    if (!parsedData.merchant_name || typeof parsedData.merchant_name !== 'string') {
      return {
        success: false,
        error: 'Invalid or missing merchant name'
      }
    }

    if (!parsedData.date || typeof parsedData.date !== 'string') {
      return {
        success: false,
        error: 'Invalid or missing date'
      }
    }

    return {
      success: true,
      data: {
        amount: parsedData.amount,
        merchant_name: parsedData.merchant_name,
        date: parsedData.date,
        confidence: parsedData.confidence || 0.5
      }
    }

  } catch (error) {
    console.error('Error processing receipt:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

/**
 * Convert file to base64 for OpenAI API
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      // Remove data URL prefix to get just the base64 string
      const base64 = result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = error => reject(error)
  })
}
