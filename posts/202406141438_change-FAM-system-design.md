---
title: FAM設計方針変更
date: 2024-06-14 14:38:37
ogimage: /img/posts/202406141438_change-FAM-system-design.png
tags:
  - Tech
  - FAM
---

少しずつ個人開発しているシステム FAM についての大まかな設計は
[Deno で Google Meet みたいなやつを作ってみようと思っている](/posts/2024020601_deno/)
に書いたとおりなのだが、若干方向性を修正することにした。

## なるべく PostgreSQL を使う

### 全文検索

TypeSense などの全文検索エンジンを使うことを考えていたが、なるべくインフラコストを下げる意味では依存するシステムは少ないほうがいい。
基本的にオンプレでの運用を考えているけど、一応クラウドで動かす場合のコストを考えてのこと。

そのため PGroonga で全文検索を行う方針に考え直した。
[Supabase](https://supabase.com/) であればクラウドでも動くので、基本的にクラウドで動かす場合は Supabase 使ってくれという方針にした。

どうしても AWS や GCP で動かしたい場合は PGroonga の代わりに bg_bigm などを使う選択肢があるが、これはオプションと言うか
余力があれば対応くらいで優先度は下げる。

### Stream にデータを読み書きする

PostgreSQL の LISTEN/NOTIFY を利用しようと思っている。

参考: [PostgreSQL LISTEN/NOTIFY, Goを利用したリアルタイム配信](https://zenn.dev/micin/articles/postgresql-listen-notify)

### Timescale DB はやめる

PostgreSQL で十分そうな気がするので。
Supabase 前提なら PostgreSQL のほうが良かろう。

## Strage として MinIO を使う

Strage は [minio](https://min.io/) を docker で動かすことにした。
これならクラウド化するときに Supabase Strage のような S3 互換のサービスが使えるし、もちろん S3 でも動く。

結果的にサーバーサイドの docker compose ではアプリケーションサーバー本体、PostgreSQL、MinIO の３つが動く構成にした。

## フロントエンドの変更

### Deno から Node に戻した

Deno + Vite + React 環境はなかなか難しい事がわかり、フロントは Node に戻した。

* NODE_ENV や process がないので React が production モードでしか動かず、デバッグがし辛い
* 上記の理由で jsdom, happy-dom などを使ったテストが動かない
* `import React from "react"` という書き方をしているコードが動かない
  * これは React 本体で export default が定義されてないので `import * as React from "react"` が正しい書き方なのだが、TS なのか Node なのかのコンパイラが気を利かせて動いているコードのようだ
  * 当然、 Deno ではエラーになる
  * 具体的には Tanstack query が動いてくれなかった
* [jotai-tanstack-query](https://github.com/jotaijs/jotai-tanstack-query) つらい
  * query の引数が atom で渡すしかないので同一ページに複数のコンポーネントがあり、その引数だけ変えたい場合に結構無理やりな方法でしか対処できない
  * 残念ながら Tanstack Query 直接使うほうが何かと楽ということがわかった
* [Kuma UI](https://www.kuma-ui.com) から [ChakraUI](https://v2.chakra-ui.com/) へ
  * Kuma UI は理想的なのだが、もう少し機能が増えないとしんどい気がする
* 結局 jotai はグローバルステートの管理だけするようにしてあとは React Hook 系を使うようにした
