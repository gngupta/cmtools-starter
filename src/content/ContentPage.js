
export class ContentPage {
  constructor({
    id = null,
    title = '',
    mainText = '',
    logo = {}
  } = {}) {
    this.id = id;
    this.title = title;
    this.mainText = mainText;
    this.logo = logo;
  }
}

export function responseAdapter({ fields, sys }) {
  return new ContentPage({ ...fields, ...sys });
}

export default {
  async get(client, id, locale) {
    return responseAdapter(await client.getEntry(id, {locale:locale}));
  },
};