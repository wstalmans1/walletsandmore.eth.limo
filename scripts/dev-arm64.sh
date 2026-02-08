#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"

if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck disable=SC1090
  source "$NVM_DIR/nvm.sh"
fi

if command -v nvm >/dev/null 2>&1; then
  nvm use --lts >/dev/null
fi

exec /usr/bin/arch -arm64 bash -lc "cd \"$PROJECT_ROOT\"; if [ -s \"$NVM_DIR/nvm.sh\" ]; then source \"$NVM_DIR/nvm.sh\"; fi; nvm use --lts >/dev/null 2>&1 || true; pnpm dev"
