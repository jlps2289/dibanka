// Herramientas
import { encryptTool, desencryptTool } from './encrypt.tool';

/** Tipo de storage del navegador */
const storage: Storage = localStorage;

/** Llaves del storage. */
const keys: IKeyStorage = {
  token: encryptTool('token')
};

/**
 * Guardar información en el storage.
 * @param key Nombre del storage en la constante keys.
 * @param payload Información a guardar.
 */
const setStorage = (key: string, payload: any) => storage.setItem(key, encryptTool(payload));

/**
 * Obtener información del storage.
 * @param key Nombre del storage en la constante keys.
 * @return Información almacenada.
 */
const getStorage = <T>(key: string): T | undefined => {
  const PAYLOAD_ENCRYPT = storage.getItem(key);
  if (!PAYLOAD_ENCRYPT) {
    return;
  }
  return desencryptTool<T>(PAYLOAD_ENCRYPT);
};

/**
 * Eliminar un item del storage.
 * @param key Nombre del storage en la constante keys.
 */
const removeStorage = (key: string) => storage.removeItem(key);

/** Limpiar el storage. */
const clearStorage = () => storage.clear();

/** @ignore */
interface IKeyStorage {
  token: string;
}

export { keys, setStorage, getStorage, removeStorage, clearStorage };
