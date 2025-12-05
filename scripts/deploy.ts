import fs from 'fs-extra';

console.log('working directory:', process.cwd());

const SRC_DIR = './src';
const TARGET_DIR = '/mnt/e/SteamLibrary/steamapps/common/X4 Foundations - 7.60/extensions/swi_heroes_rebalanced';
const BACKUP_DIR = `${TARGET_DIR}.backup`;

async function deploy() {
  // Backup existing
  if (fs.pathExistsSync(TARGET_DIR)) {
    await fs.removeSync(BACKUP_DIR);
    await fs.copy(TARGET_DIR, BACKUP_DIR);
    console.log('✅ Backed up to', BACKUP_DIR);
  }

  // Ensure target exists
  await fs.ensureDir(TARGET_DIR);

  // Copy (overwrite)
  await fs.copy(SRC_DIR, TARGET_DIR, { overwrite: true });
  console.log('🚀 Deployed to', TARGET_DIR);
}

deploy().catch(console.error);
