import fs from 'fs-extra';
import path from 'path';

console.log('working directory:', process.cwd());

const SRC_DIR = './src';
const X4_BASE_DIR = '/mnt/e/SteamLibrary/steamapps/common/X4 Foundations - 7.60';
const MOD_NAME = 'swi_heroes_rebalanced';

// Build safe target path
const TARGET_DIR = path.join(X4_BASE_DIR, 'extensions', MOD_NAME);

async function deploy() {
  // Safety check: ensure we're only targeting our specific mod directory
  if (!TARGET_DIR.endsWith(`extensions/${MOD_NAME}`)) {
    throw new Error('Safety check failed: Invalid target directory');
  }

  // Clean target directory first to remove any artifacts
  if (await fs.pathExists(TARGET_DIR)) {
    await fs.remove(TARGET_DIR);
    console.log('🧹 Cleaned', TARGET_DIR);
  }

  // Ensure target exists
  await fs.ensureDir(TARGET_DIR);

  // Copy (overwrite)
  await fs.copy(SRC_DIR, TARGET_DIR, { overwrite: true });
  console.log('🚀 Deployed to', TARGET_DIR);
}

deploy().catch(console.error);
