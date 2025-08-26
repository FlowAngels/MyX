export const EXPENSE_CATEGORIES = [
  {
    id: 'meals',
    name: 'Meals & Entertainment',
    tax_deductible: true,
    description: 'Business meals, client entertainment, and dining expenses'
  },
  {
    id: 'travel',
    name: 'Travel',
    tax_deductible: true,
    description: 'Airfare, accommodation, car rentals, and travel-related expenses'
  },
  {
    id: 'office-supplies',
    name: 'Office Supplies',
    tax_deductible: true,
    description: 'Stationery, paper, pens, and other office materials'
  },
  {
    id: 'equipment',
    name: 'Equipment',
    tax_deductible: true,
    description: 'Computers, phones, furniture, and business equipment'
  },
  {
    id: 'professional-services',
    name: 'Professional Services',
    tax_deductible: true,
    description: 'Legal, accounting, consulting, and professional fees'
  },
  {
    id: 'software',
    name: 'Software & Subscriptions',
    tax_deductible: true,
    description: 'Software licenses, SaaS subscriptions, and digital tools'
  },
  {
    id: 'marketing',
    name: 'Marketing & Advertising',
    tax_deductible: true,
    description: 'Advertising, marketing materials, and promotional expenses'
  },
  {
    id: 'utilities',
    name: 'Utilities',
    tax_deductible: true,
    description: 'Electricity, internet, phone, and utility bills'
  },
  {
    id: 'insurance',
    name: 'Insurance',
    tax_deductible: true,
    description: 'Business insurance, liability coverage, and professional indemnity'
  },
  {
    id: 'other',
    name: 'Other',
    tax_deductible: false,
    description: 'Miscellaneous business expenses'
  }
] as const

export type CategoryId = typeof EXPENSE_CATEGORIES[number]['id']

export const getCategoryById = (id: CategoryId) => {
  return EXPENSE_CATEGORIES.find(category => category.id === id)
}

export const getCategoryName = (id: CategoryId) => {
  return getCategoryById(id)?.name || 'Unknown'
}
