#!/bin/sh
set -e

rm -f package-lock.json
wait $!
npm install
wait $!
npm run dev -- --port=5173


