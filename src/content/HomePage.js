export class HomePageCMS {
  constructor({
    id = null,
    title = '',
    text = '',
    image1 = {},
    image2 = {}
  } = {}) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.image1 = image1;
    this.image2 = image2;
  }
}

export function constructCMSData({ fields }) {
  
  let hp = new HomePageCMS();
  
  for (var key in fields){
    let value = fields[key];

    switch(key){
    case "title":
      hp.title = value;
      break;
    case "text":
      hp.text = value;
      break;
    case "image1":
      hp.image1 = value.fields.file.url;
      break;
    case "image2":
      hp.image2 = value.fields.file.url;
      break;
    }
  }
  return hp;
}

function constructDefaultCMSData(){
  let hp = new HomePageCMS;
  hp.title = "TITLE";
  hp.text = "default text";
  hp.image1 = "";
  hp.image2 = "";

  return hp;
}

export default {
  async get(client, locale) {
    const FIRST_ELEMENT = 0;
    const MINIMAL_NR_OF_ELEMENTS = 1;
    let response = await client.getEntries({content_type:'homepage', locale:locale});
    console.log(response.items.length)
    if(response.items.length >= MINIMAL_NR_OF_ELEMENTS){
      return constructCMSData(response.items[FIRST_ELEMENT])
    }else{
      return constructDefaultCMSData();
    }
  }
};
