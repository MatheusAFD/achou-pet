#!/bin/sh
set -e

npm run migrate:prod & PID=$!
wait $PID

echo "Starting production server..."
npm run start:prod & PID=$!

wait $PID
