/**
 * Encriptar la inforamción.
 * @param payload Información a guardar.
 * @return Información encrypt.
 */
const encryptTool = (payload: any): string => {
  const payloadString = JSON.stringify(payload);
  const payloadEncrypt = btoa(payloadString);
  return payloadEncrypt;
};

/**
 * Obtener el payload de la información encrypt.
 * @param encrypt String a desencriptar.
 * @return Información desencrypt.
 */
const desencryptTool = <T>(encrypt: string): T | undefined => {
  if (encrypt === '' || encrypt.trim() === '') {
    return;
  }
  try {
    const payloadJSON = JSON.parse(atob(encrypt));
    return payloadJSON;
  } catch (err) {
    return;
  }
};

export { encryptTool, desencryptTool };
