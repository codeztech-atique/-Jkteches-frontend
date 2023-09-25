// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  produrl: 'https://4bjxyf7z29.execute-api.ap-south-1.amazonaws.com/production',
  localurl: 'http://localhost:8081',
  url : 'https://4bjxyf7z29.execute-api.ap-south-1.amazonaws.com/production',

  linkedinClientId: '77mmjfsz45aw22',
  linkedinLoginRedirectUri: 'http://localhost:4200/',
  linkedinState: '8805036597',
  linkedinRegisterRedirectUri: 'http://localhost:4200/register/',
};
