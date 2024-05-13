---
title: Denoでシステムを作り始めた
date: 2024-05-10 22:19:26
ogimage: /img/posts/202405102219_start-to-make-a-system-by-deno.png
tags:
  - Tech
  - FAM
---

とりあえずサインイン機能だけ出来た。

![進捗](/img/posts/202405102219/sign-in-user.gif)

今回は

* Backend: Deno + Hono
* Frontend: Deno + Vite + React
* 言語: TypeScript

という構成。

ドキュメントが少なくてハマることが多い。
試しに使ってみたライブラリが Deno でうまく動かなかったりとかも若干ある。

まだまだ Deno は縛りプレイっぽさがあるけど、 Web 標準はありがたいし速いしなんとか使いこなしたい。

ソースコードは後日公開する予定。
動画でちらっと見えてるけど、まだ初期の部分なのでテンプレートとして作っていて、
他でも使い回せるようにしている。
サインイン機能 + 簡単な TODO リストの CRUD くらいまで作っておくつもり。
そのくらいあればサンプルとしては十分だろう。

サーバー側では PostgreSQL + Kysely 構成もあり、結構実践的な作りになっている。

Hono の RTC で色々楽をしたかったけど、なんかかえって面倒くさい気がしたのでいったんただの REST にしている。
そうなると Swagger とか若干欲しくなるなぁ。。。
[hono-api-reference](https://github.com/scalar/scalar/tree/main/packages/hono-api-reference) この辺が便利かもなぁ
あるいは [tRPC](https://github.com/honojs/middleware/tree/main/packages/trpc-server)。

まぁこういうのはある程度出来てからでもいい気もする。
公開用の API と内部用の API は別だろうし。
