import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
  title?: string;
  tag?: string;
  };
};

class PelisController {
  model: PelisCollection; //esto seria instanciar y guardarlo e una prop interna

  constructor() {
    this.model = new PelisCollection()
  }

async get(options?: Options): Promise <Peli[]>{
  const pelis = await this.model.getAll();

  if (options?.id){
    return pelis.filter(peli => peli.id === options.id);
  }
  if (options?.search){
    const {title,tag}= options.search;
    return pelis.filter(peli => {
      const chequeoTitle = title ? peli.title.toLowerCase().includes(title.toLowerCase()) : true; //hice correccion de tolowercase
       const chequeoTag = tag ? peli.tags.some(t => t.toLowerCase() === tag.toLowerCase()): true;//hice correccion de tolowercase
        return chequeoTitle && chequeoTag; // Filtrar por título y tag
    });
  }
  return pelis // Devolver todas las pelis si no hay opciones
}

async getOne(options: Options):Promise<Peli | undefined> {
  const pelis = await this.get(options);
  return pelis[0];
}

async add(peli:Peli){
  const resultado = await this.model.add(peli);
  return resultado;
}

}
export { PelisController };
