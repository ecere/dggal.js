import { execSync } from 'child_process';

try {
  // Check for uninitialized submodules
  const statusLines = execSync('git submodule status --recursive', { stdio: 'pipe' })
    .toString()
    .split('\n')
    .filter(Boolean);

  const uninitialized = statusLines.filter(line => line.startsWith('-'));
  if (uninitialized.length) {
    console.log('🔄 Initializing uninitialized submodules...');
    execSync('git submodule update --init --recursive', { stdio: 'inherit' });
  }
} catch (err) {
  console.error('❌ Failed to check or initialize submodules:', err.message || err);
  process.exit(1);
}

try {
  // Fail if any submodule is dirty
  execSync('git submodule foreach --recursive git diff --quiet', { stdio: 'inherit' });
} catch {
  console.error('❌ Uncommitted changes detected in one or more submodules');
  process.exit(1);
}

try {
  // Fail if any submodule has SHA drift
  const status = execSync('git submodule status --recursive', { stdio: 'pipe' })
    .toString()
    .split('\n')
    .filter(Boolean);

  const drift = status.filter(line => line[0] !== ' ');
  if (drift.length) {
    console.error('❌ Submodule SHAs out of sync:');
    drift.forEach(l => console.error('   ', l));
    process.exit(1);
  }
} catch (err) {
  console.error(err.message || err);
  process.exit(1);
}

console.log('✅ All submodules initialized, clean, and in sync');
