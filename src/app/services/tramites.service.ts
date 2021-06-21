// Servicios
import { get } from './settings/http.service';
import { IUser } from 'app/services/auth.service';

// Utils
import { getStorage, keys } from 'app/shared/tools/storage.tool';
import { environments } from 'environments/environments';

class TramiteService {
  private idUserAuth = getStorage<IUser>(keys.token)?.id;

  get_all = () =>
    get<ITramite[]>({
      endpoint: environments.endpoint,
      url: 'tramites.db.json'
    }).then((resp) => resp.filter((i) => i.usersId.includes(this.idUserAuth as number)));

  get_history = (id: string) =>
    get<{ [id: string]: ITramiteHistory[] }>({ endpoint: environments.endpoint, url: 'history.db.json' }).then<ITramiteHistory[]>(
      (i) => i[id]
    );
}

const tramiteServices: TramiteService = new TramiteService();
export { tramiteServices };

export interface ITramite {
  id: string;
  date: string;
  title: string;
  comment: string;
  categories: TypePQRS[];
  usersId: number[];
}

export type TypePQRS = 'Petición' | 'Queja' | 'Reclamo' | 'Sugerencia';
export enum ETypePQRSColor {
  'Petición' = 'processing',
  'Queja' = 'warning',
  'Reclamo' = 'error',
  'Sugerencia' = 'success'
}

export interface ITramiteHistory {
  datetime: string;
  comment: string;
  documents: IDocument[];
  images: string[];
  agent: IAgent;
}

export interface IAgent {
  photo: string;
  name: string;
}

export interface IDocument {
  url: string;
  filename: string;
}
