/** Ficha técnica del proyecto. */
const projectInfo = {
  name: 'PQRS DiBanka',
  fullname: 'Peticiones - Quejas - Reclamos - Sugerencias',
  description:
    'Nuestra marca tiene como propósito que las empresas u organizaciones no financieras, del sector público y privado, puedan ofrecer y regular servicios de crédito y similares a sus colaboradores y pensionados por medio de nuestra plataforma tecnológica basada en la autogestión, simple, intuitiva y de fácil usabilidad.',
  version: 'v.1.0.0.',
  versionYear: 2021,
  developToWeb: 'https://dibanka.co/',
  recommendedBrowsers:
    'Navegadores Web recomendados: Google Chrome 86 o superior, Mozilla Firefox 84 o superior, Safari 9 o superior, Opera 71 o superior, Microsoft Edge 41 o superior.',
  information:
    'Todos los derechos reservados. Ninguna reproducción externa copia o transmisión digital de esta publicación puede ser hecha sin permiso escrito. Ningún párrafo de esta publicación puede ser reproducido, copiado o transmitido digitalmente sin un consentimiento escrito o de acuerdo con las leyes que regulan los derechos de autor y con base en la regulación vigente.',
  menu: [
    {
      name: 'PQRS',
      children: [{ name: 'Trámites', path: '/tramites' }]
    }
  ]
};

/** Expresiones regulares. */
const regExp = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  url: /^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/,
  notSpecialCharacters: /^[A-Za-z0-9.,;:-áéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ\s]+$/,
  notSpecialCharactersStrict: /^[A-Za-z0-9\s]+$/,
  notSpecialCharactersStrictAndSpaces: /^[A-Za-z0-9]+$/,
  password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).*$/
};

export { projectInfo, regExp };
