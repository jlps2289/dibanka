import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { ModalFuncProps } from 'antd/es/modal';

// Servicios
import { confirmMessage, errorMessage, warningMessage, successMessage } from './message.service';
import { IUser } from '../auth.service';

// Herramientas
import { getStorage, clearStorage, keys } from 'app/shared/tools/storage.tool';

// Redux
import { store } from 'app/redux/app.reducers';
import { Loading } from 'app/redux/ui/ui.actions';

// Desestructuración
const { CancelToken } = axios;
const { source } = CancelToken;

// Constantes
const http: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json'
  },
  cancelToken: source().token
});

/**
 * Cargar el loading de la app.
 * @param status Mostrar u ocultar.
 */
const showLoading = (status: boolean) => store.dispatch(Loading(status));

//#region Funciones de validaciones

const extract_data = <T>(response: AxiosResponse): T => {
  const { data, headers } = response;

  if (!!headers.message) {
    successMessage({
      content: headers.message
    });
  }

  if (!data && response.status === 204) {
    successMessage({
      content: 'El registro fue eliminado exitosamente.'
    });

    return true as any;
  }

  showLoading(false);
  return data;
};

const handle_error = (reject: any): Promise<Error> => {
  const errorStatus = reject.status;
  const errorMessageService = reject.message ? reject.message : null;
  const errorMessageServer = !errorMessageService && reject.error ? reject.error.message || reject.error.exception : null;
  const errorMessageDefault = 'Por favor intente de nuevo más tarde o póngase en contacto con soporte técnico.';
  const message = errorMessageService || errorMessageServer || errorMessageDefault;

  switch (errorStatus) {
    case 0:
      clearStorage();
      warningMessage({ content: message });
      window.location.reload();
      break;
    case 401:
      clearStorage();
      warningMessage({ content: message });
      break;
    case 400:
    case 404:
    case 405:
    case 415:
    case 422:
      warningMessage({ content: message });
      break;

    default:
      errorMessage({ content: message });
  }

  showLoading(false);

  return Promise.reject(reject);
};

//#endregion
//#region Interceptores de peticiones http

http.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = getStorage<IUser>(keys.token);
    const { headers } = config;
    headers.Authorization = `Bearer ${token?.accessToken}`;
    return config;
  },
  (error: Error): Promise<Error> => Promise.reject(error)
);

http.interceptors.response.use(extract_data, handle_error);

//#endregion
//#region Metodos CRUD

/**
 * Método de Http para postear información.
 * @param params Configuración del servicio.
 * @returns Promesa con la respuesta del servicio.
 */
const post = async <T>({
  endpoint,
  url,
  payload,
  loading = true,
  options,
  configMessage,
  cancel
}: ISettingsService): Promise<T> => {
  const confirm = await confirmMessage({
    content: '¿Está seguro de guardar la información?',
    ...configMessage
  });

  if (confirm) {
    if (loading) {
      showLoading(true);
    }

    if (cancel) {
      source().cancel();
    }

    return http.post(endpoint + url, payload, options);
  } else {
    return Promise.reject();
  }
};

/**
 * Método de Http para actualizar información.
 * @param params Configuración del servicio.
 * @returns Promesa con la respuesta del servicio.
 */
const put = async <T>({
  endpoint,
  url,
  payload,
  loading = true,
  options,
  configMessage,
  cancel
}: ISettingsService): Promise<T> => {
  const confirm = await confirmMessage({
    content: '¿Está seguro de actualizar la información?',
    ...configMessage
  });

  if (confirm) {
    if (loading) {
      showLoading(true);
    }

    if (cancel) {
      source().cancel();
    }

    return http.put(endpoint + url, payload, options);
  } else {
    return Promise.reject();
  }
};

/**
 * Método de Http para obtener información.
 * @param params Configuración del servicio.
 * @returns Promesa con la respuesta del servicio.
 */
const get = <T>({ endpoint, url, loading = true, options, cancel }: ISettingsService): Promise<T> => {
  if (loading) {
    showLoading(true);
  }

  if (cancel) {
    source().cancel();
  }

  return http.get(endpoint + url, options);
};

/**
 * Método de Http para eliminar información.
 * @param params Configuración del servicio.
 * @param message Mensaje personalizado para confirmar la eliminación de un registro.
 * @returns Promesa con la respuesta del servicio.
 */
const deleted = async <T>({ endpoint, url, loading = true, options, configMessage, cancel }: ISettingsService): Promise<T> => {
  const confirm = await confirmMessage({
    content: '¿Está seguro de borrar la información?',
    okType: 'danger',
    ...configMessage
  });

  if (confirm) {
    if (loading) {
      showLoading(true);
    }

    if (cancel) {
      source().cancel();
    }

    return http.delete(endpoint + url, options);
  } else {
    return Promise.reject();
  }
};

//#endregion
//#region Interfaces

/** Interface para la configuración de los métodos axios. */
interface ISettingsService {
  /** Endpoint principal del servicio. */
  endpoint: string;
  /** Ruta del Endpoint. */
  url: string;
  /** Mostrar el loading, por defecto es true. */
  loading?: boolean;
  /** Cuerpo del servicio. */
  payload?: any;
  /** Configuraciones del mensaje */
  configMessage?: ModalFuncProps;
  /** Configuraciones generales del axios. */
  options?: AxiosRequestConfig;
  /** Cancelar la petición anterior. */
  cancel?: boolean;
}

//#endregion

export { http, showLoading, post, put, get, deleted };
