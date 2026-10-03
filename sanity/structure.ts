import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('product').title('Products'),

      S.divider(),

      S.listItem()
        .title('All Inquiries')
        .child(
          S.documentList()
            .title('All Inquiries')
            .filter('_type == "inquiry"')
            .defaultOrdering([
              {
                field: 'createdAt',
                direction: 'desc',
              },
            ]),
        ),

      S.listItem()
        .title('New Inquiries')
        .child(
          S.documentList()
            .title('New Inquiries')
            .filter('_type == "inquiry" && status == "new"')
            .defaultOrdering([
              {
                field: 'createdAt',
                direction: 'desc',
              },
            ]),
        ),

      S.listItem()
        .title('Contacted Inquiries')
        .child(
          S.documentList()
            .title('Contacted Inquiries')
            .filter('_type == "inquiry" && status == "contacted"')
            .defaultOrdering([
              {
                field: 'createdAt',
                direction: 'desc',
              },
            ]),
        ),

      S.listItem()
        .title('Closed Inquiries')
        .child(
          S.documentList()
            .title('Closed Inquiries')
            .filter('_type == "inquiry" && status == "closed"')
            .defaultOrdering([
              {
                field: 'createdAt',
                direction: 'desc',
              },
            ]),
        ),
    ])
