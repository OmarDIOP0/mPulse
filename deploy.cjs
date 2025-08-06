const FtpDeploy = require('ftp-deploy');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const ftpDeploy = new FtpDeploy();

const config = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  port: 21,
  localRoot: __dirname + '/dist/',
  remoteRoot: process.env.FTP_REMOTE_ROOT || '/',
  include: ['*', '**/*'],
  exclude: [
  '.git/**',
  'node_modules/**',
  '.github/**',
  '**/*.map'
],
  deleteRemote: false,
  forcePasv: true,
  deleteRemote: true,

};


console.log('📦 Démarrage du déploiement FTP...');
console.log(`🔗 Serveur: ${config.host}`);
console.log(`👤 Utilisateur: ${config.user}`);
console.log(`📂 Dossier local: ${config.localRoot}`);
console.log(`📁 Dossier distant: ${config.remoteRoot}`);

ftpDeploy.deploy(config)
  .then(res => console.log('✅ Déploiement terminé avec succès!'))
  .catch(err => {
    console.error('❌ Erreur lors du déploiement:', err);
    process.exit(1);
  });
