#!/usr/bin/env bash
for f in src/Account/**/*.js; do
      git mv "$f" "${f%.js}.ts"
  done

