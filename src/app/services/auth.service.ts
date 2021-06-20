import { v4 as UUIDv4 } from 'uuid';

// Servicios
import { get } from './settings/http.service';
import { confirmMessage, successMessage, warningMessage } from './settings/message.service';

// Utils
import { clearStorage, keys, setStorage } from 'app/shared/tools/storage.tool';
import { environments } from 'environments/environments';

class AuthService {
  login = (payload: IUserPin) =>
    get<IUser[]>({
      endpoint: environments.endpoint,
      url: 'users.db.json'
    }).then((resp) => {
      const user = resp.find(
        (i) => (i.numberPhone === payload.numberPhone || i.userName === payload.userName) && i.pin === payload.pin
      );

      if (!!user) {
        setStorage(keys.token, { ...user, accessToken: UUIDv4() });
        window.location.reload();
      } else {
        warningMessage({
          content: `La información no es valida o no esta registrada en algún trámite.`
        });
      }
    });

  logout = () => {
    clearStorage();
    window.location.reload();
  };

  get_new_pin = ({ userName, numberPhone }: IUserBasic) =>
    confirmMessage({
      title: 'Solicitud Nuevo PIN',
      content: `Vamos a enviarte un nuevo PIN al ${
        !!numberPhone ? `número de celular ${numberPhone}` : `correo electrónico ${userName}`
      } si está registrado en algún trámite.`,
      okText: 'Enviar Nuevo PIN',
      onOk() {
        return successMessage({
          content: `Nuevo PIN enviado a ${numberPhone || userName}.`
        });
      }
    });
}

const authServices: AuthService = new AuthService();
export { authServices };

export interface IUserBasic {
  userName?: string;
  numberPhone?: number;
}

export interface IUserPin extends IUserBasic {
  pin?: string;
}

export interface IUser extends IUserPin {
  id: number;
  name?: string;
  accessToken?: string;
}
