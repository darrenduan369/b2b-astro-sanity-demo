import {defineField, defineType} from 'sanity'

export const inquiryType = defineType({
  name: 'inquiry',
  title: 'Inquiry',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),

    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),

    defineField({
      name: 'productName',
      title: 'Product Name',
      type: 'string',
    }),

    defineField({
      name: 'productSlug',
      title: 'Product Slug',
      type: 'string',
      readOnly: true,
    }),

    defineField({
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
      validation: (rule) => rule.min(1),
    }),

    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'new',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Contacted', value: 'contacted'},
          {title: 'Closed', value: 'closed'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 4,
      description: 'Internal follow-up notes. This field is not shown to the customer.',
    }),

    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      email: 'email',
      productName: 'productName',
      status: 'status',
      createdAt: 'createdAt',
    },

    prepare(selection) {
      const {title, email, productName, status, createdAt} = selection

      const createdDate = createdAt ? new Date(createdAt).toLocaleDateString() : ''

      return {
        title,
        subtitle: [status?.toUpperCase(), productName || 'General Inquiry', createdDate, email]
          .filter(Boolean)
          .join(' · '),
      }
    },
  },
})
