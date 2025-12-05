import fs from 'fs-extra';

console.log('working directory:', process.cwd());

const SRC_DIR = './src';
const TARGET_DIR = '/mnt/e/SteamLibrary/steamapps/common/X4 Foundations - 7.60/extensions/swi_heroes_rebalanced';

async function deploy() {
  // Ensure target exists
  await fs.ensureDir(TARGET_DIR);

  // Copy (overwrite)
  await fs.copy(SRC_DIR, TARGET_DIR, { overwrite: true });
  console.log('🚀 Deployed to', TARGET_DIR);
}

deploy().catch(console.error);
