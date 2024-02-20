---
title: github template repository を作りたい
date: 2024-02-21 04:32:00
description:
ogimage: /img/posts/2024022102_github-template-repository.png
tags:
  - Tech
---

今更ながら
[github template repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository)
なるものを知った。
リポジトリを作るときにテンプレートを選ぶと初期セットアップできるようだ。

便利じゃん。。。

今まで [ノイマントーキョーのリポジトリ](https://github.com/neumann-tokyo) に
`*-init` の名前で 初期セットアップリポジトリを作ってきていたのでこれらを
template repository 化しようと思う。 正直、あんま使ってないのもあるけど。

npm
コマンドとかでテンプレート化しようと思っていたけど、ちょっと面倒くさいしなぁと思っていたので
github template repository は良さそう。 npm パッケージとして公開しなくていいし、
Clojure などの言語でも使えるし。 というか Clojure こそテンプレート必要では...。

## 共通化しておきたいもの

Webシステムを使うときに次のものはだいたい必要になるのでひと通り揃えておきたい。

- [サーバー側] データベースへのアクセスと SQL Builder 的なライブラリ
- [サーバー側] REST API (または RPC) 構築用のルーティングライブラリ
- [サーバー側] [migrate](https://github.com/golang-migrate/migrate)
  によるデータベースのマイグレーション
- [サーバー側] データベースの seeds データの読み込みの仕組み
- [フロント側] React, jotai,
  [jotai-tanstack-query](https://github.com/jotaijs/jotai-tanstack-query),
  ルーティング ([Wouter](https://github.com/molefrog/wouter) か
  [ReactRouter](https://reactrouter.com/en/main) かなぁ), Chakra UI
- [フロント側] REST Client (または RPC Client) のセットアップ
- formatter, linter, および git pre-commit で左記を自動実行するための仕組み
  ([lefthook](https://github.com/evilmartians/lefthook) みたいなやつ)
  - 最近だと [Biome](https://biomejs.dev) が気に入っているのだが Deno
    プロジェクトだったら標準の deno fmt とかでも良さそうなので悩みどころ
- [devcontainer](https://code.visualstudio.com/docs/devcontainers/containers)
  による実行環境
- docker-compose によるデータベースなどのセットアップ
- テスト関係
- vite などのビルド系ツールのセットアップ
- 基本的な機能
  - JWT を用いた email/password による認証機能
  - 認可機能
  - 上記の管理機能
