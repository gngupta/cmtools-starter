export class Footer {
  constructor({
    id = null,
    title = '',
    text = '',
    logo = {}
  } = {}) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.logo = logo;
  }
}

export function responseAdapter({ fields, sys }) {
  return new Footer({ ...fields, ...sys });
}

export default {
  async get(client, id, locale) {
  
    return responseAdapter(await client.getEntry(id, {locale:locale}));
  },
};