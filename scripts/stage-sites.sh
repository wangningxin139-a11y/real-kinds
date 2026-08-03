#!/bin/sh
set -eu

rm -rf dist
mkdir -p dist/server dist/client dist/.openai
cp -R out/. dist/client/
cp .openai/hosting.json dist/.openai/hosting.json
cp scripts/sites-worker.js dist/server/index.js
