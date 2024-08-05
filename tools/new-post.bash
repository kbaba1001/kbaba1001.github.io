#!/bin/bash
#
# USAGE: ./tools/new-post.bash "タイトル" "title"

set -Ceux

TITLE=${1}
TITLE_EN=${2}
TIME=$(date "+%Y%m%d%H%M")
TIME_LONG=$(date "+%Y-%m-%d %H:%M:%S")

deno run --allow-read --allow-write tools/og-image-generator.ts "${TITLE}" "tools/kbaba1001-bg.png" 18 "img/posts/${TIME}_${TITLE_EN}.png"

echo "---
title: ${TITLE}
date: ${TIME_LONG}
ogimage: /img/posts/${TIME}_${TITLE_EN}.png
tags:
  - Tech
---
" > posts/${TIME}_${TITLE_EN}.md
