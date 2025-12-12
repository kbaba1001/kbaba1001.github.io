---
title: 自分なりのCodex, Github Copilotの使い方
date: 2025-11-18 11:21:48
ogimage: /img/posts/202511181121_codex-and-github-copilot.png
tags:
  - Tech
draft: true
---

## codex

* `codex --add-dir ../他のディレクトリ` が便利
* gpt-5.1-codex medium を使う
* `web_search_request = true`
* context7 を使う
* notification

```bash
#!/bin/bash

MSG=$(echo "$1" | jq -r '."last-assistant-message"')
dunstify "$MSG"
```

* ごちゃごちゃ書くよりコードをAIに読ませる
* /compact を時々使うか、 codex を再起動する

```md
## Primary Directive

* Think in English, interact with the user in Japanese
```

## github copilot

* PR を作って自動レビュー
* Github Copilot でレビュー対応 (gh コマンドでやってもらう)
