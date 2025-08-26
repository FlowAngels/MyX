'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { Upload, Camera, Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { EXPENSE_CATEGORIES, type CategoryId } from '@/lib/categories'
import { calculateTaxAmount, type Country } from '@/lib/tax-calculations'
import { processReceiptImage, fileToBase64 } from '@/lib/receipt-processing'

export default function NewExpensePage() {
  const [activeTab, setActiveTab] = useState('manual')
  const [loading, setLoading] = useState(false)
  const [processingReceipt, setProcessingReceipt] = useState(false)
  const [organization, setOrganization] = useState<{ country: Country } | null>(null)
  
  // Form state
  const [amount, setAmount] = useState('')
  const [merchantName, setMerchantName] = useState('')
  const [category, setCategory] = useState<CategoryId>('other')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClientComponentClient()

  // Load organization data
  useEffect(() => {
    loadOrganization()
  }, [])

  const loadOrganization = async () => {
    const { data } = await supabase
      .from('organizations')
      .select('country')
      .single()
    
    if (data) {
      setOrganization(data)
    }
  }

  const handleFileUpload = async (file: File) => {
    if (!file) return

    setReceiptFile(file)
    setProcessingReceipt(true)

    try {
      // Convert file to base64
      const base64 = await fileToBase64(file)
      
      // Process with OpenAI
      const result = await processReceiptImage(base64)
      
      if (result.success && result.data) {
        // Pre-fill form with extracted data
        setAmount(result.data.amount.toString())
        setMerchantName(result.data.merchant_name)
        setDate(result.data.date)
        
        toast.success('Receipt processed successfully!')
      } else {
        toast.error(result.error || 'Failed to process receipt')
      }
    } catch (error) {
      toast.error('Error processing receipt')
    } finally {
      setProcessingReceipt(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let finalReceiptUrl = receiptUrl

      // Upload receipt if provided
      if (receiptFile && !receiptUrl) {
        const fileName = `receipts/${Date.now()}-${receiptFile.name}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('receipts')
          .upload(fileName, receiptFile)

        if (uploadError) {
          toast.error('Error uploading receipt')
          return
        }

        const { data: urlData } = supabase.storage
          .from('receipts')
          .getPublicUrl(fileName)

        finalReceiptUrl = urlData.publicUrl
      }

      // Calculate tax amount
      const amountNum = parseFloat(amount)
      const taxAmount = organization 
        ? calculateTaxAmount(amountNum, organization.country)
        : 0

      // Get organization ID
      const { data: orgData } = await supabase
        .from('organizations')
        .select('id')
        .single()

      if (!orgData) {
        toast.error('Organization not found')
        return
      }

      // Create expense
      const { error } = await supabase
        .from('expenses')
        .insert({
          org_id: (orgData as any).id,
          amount: amountNum,
          tax_amount: taxAmount,
          merchant_name: merchantName,
          category,
          description: description || null,
          receipt_url: finalReceiptUrl,
          date,
        } as any)

      if (error) {
        toast.error('Error creating expense')
        return
      }

      toast.success('Expense created successfully!')
      router.push('/dashboard')
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <Link href="/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
          <CardDescription>
            Enter expense details manually or upload a receipt to auto-fill
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              <TabsTrigger value="receipt">Receipt Upload</TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="merchant">Merchant</Label>
                  <Input
                    id="merchant"
                    placeholder="Store or business name"
                    value={merchantName}
                    onChange={(e) => setMerchantName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={(value: CategoryId) => setCategory(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPENSE_CATEGORIES.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Additional details about this expense"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Expense'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="receipt" className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium mb-2">Upload Receipt</p>
                <p className="text-gray-600 mb-4">
                  Drag and drop your receipt image here, or click to browse
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file)
                  }}
                  className="hidden"
                  id="receipt-upload"
                />
                <label htmlFor="receipt-upload">
                  <Button variant="outline" disabled={processingReceipt}>
                    {processingReceipt ? 'Processing...' : 'Choose File'}
                  </Button>
                </label>
              </div>

              {processingReceipt && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Processing receipt...</p>
                </div>
              )}

              {receiptFile && !processingReceipt && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Camera className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Receipt uploaded: {receiptFile.name}</span>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          id="amount"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="merchant">Merchant</Label>
                      <Input
                        id="merchant"
                        placeholder="Store or business name"
                        value={merchantName}
                        onChange={(e) => setMerchantName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={(value: CategoryId) => setCategory(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {EXPENSE_CATEGORIES.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Additional details about this expense"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Creating...' : 'Create Expense'}
                    </Button>
                  </form>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
