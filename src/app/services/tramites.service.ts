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
}

const tramiteServices: TramiteService = new TramiteService();
export { tramiteServices };

export interface ITramite {
  id: string;
  date: string;
  name: string;
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
