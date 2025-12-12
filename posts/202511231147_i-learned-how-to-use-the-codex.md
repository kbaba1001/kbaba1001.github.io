---
title: Codexとの付き合い方がわかってきた
date: 2025-11-23 11:47:15
ogimage: /img/posts/202511231147_i-learned-how-to-use-the-codex.png
tags:
  - Tech
draft: true
---

最近は Codex の plus プランと Github Copilot で開発をしている。
だいぶ自分なりの Codex との付き合い方がわかってきたので、メモを残しておく。

## なぜ Claude Code を使わないのか

SNSを見ていると Claude Code や Gemini など併用する方も多いようだが、
あまり予算がないこともあり今の所 Codex に絞っている。

Claude Code を使わない理由は AGENTS.md に対応していないからという
些細な理由だが、私としては変に目移りするよりは一つのツールを
使いこなすことに集中したほうがいいような気がする。

## 参考になった記事

* [我々はCodexとどう向き合うべきなのか](https://zenn.dev/aki_think/articles/5fb93a15a6257a)

基本は上記の記事に従って、噛み砕いた結果次の方針で使っている。

* モデルは基本的に gpt-5.1-codex か gpt-5.1-codex-max の medium
* 日本語でプロンプトを頑張るよりコードで表現できるところはコードで表現する
  * 例えば、Pythonのコードを生成したいときに参考になる TypeScript のコードを書いておくなど
* 適宜 `/compact` や codex コマンドの再起動を行う
* Codexには英語で考えさせて日本語で結果を出させる（英語で考えさせたほうがトークンの節約になり、結果もよくなる）

## codex/config.toml

* [openai/codex/blob/main/docs/config.md](https://github.com/openai/codex/blob/main/docs/config.md) を読む
* `web_search_request = true` 設定は必須（これがないとWebの情報を見られない）
* `sandbox_mode = "workspace-write"` にしておかないとコマンド実行が不便
* `approval_policy = "on-request"` コマンドの自動実行は若干怖いので `on-request` を設定

### MCP サーバー

今のところ使っているのは次の２つのみ

* context7
* github mcp

Figma とか Chrome Developer Tools なども気になっているけどまだ使っていない

## 使い方

* AGENTS.md は `/init` をベースにして記述しておく
* 「次にやってほしいこと」は `AGENTS-nextstep.md` というファイルに記述して、プロンプトは `@AGENTS-nextstep.md にしたがって実装してください` みたいな感じにする
  * これってもっと一般的な方法ある？
* AGENTS.md は git commit するが、 AGENTS-nextstep.md は頻繁に書き換えるので gitignore してある
* 仕様が複雑になってきたら `spec/` とか `docs/` とかに記述しておく
  * AIにしか読ませないドキュメントは `AGENTS/` ディレクトリのほうがいいかも？
  * ただ gpt-5.1-codex 系の場合はソースコードでわかることはドキュメントを参照させるよりコード読ませたほうが良さそう
*
