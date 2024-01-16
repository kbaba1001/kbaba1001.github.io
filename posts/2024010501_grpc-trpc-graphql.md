---
title: gRPC, tRPC, GraphQL, REST について
date: 2024-01-05
description: APIのプロトコルについて思うことなど
ogimage: /img/posts/2024010501_grpc-trpc-graphql.png
tags:
  - Tech
---

API のプロトコルを色々触ったので雑感まとめ。

## REST

- [REST - MDN](https://developer.mozilla.org/en-US/docs/Glossary/REST)

おそらく現在一番広く使われてる方式が REST だと思う。今更特に言うことはないので省略

## GraphQL

- [GraphQL](https://graphql.org)

schema 作って各言語で実装を自動生成する。
最大の特徴はほしい情報をクライアント側からある程度指定できること。
汎用性が必要で一般公開するような API なら REST より良い気がする。

## gRPC

- [gRPC](https://grpc.io)

GraphQL のようにクライアント側からの指定はできないものの、 schema (proto ファイル) でサーバーとクライアントの
やり取りするデータ、API のインタフェースなど一通りのことを定義しておくことができるので、
ある程度やり取りの内容が決まっている場合には REST よりはかっちり作れるし GraphQL ほど手間でもない。
わりといいとこ取りをしている気がする。

こういう必要な schema 定義してよしなにやろうみたいなの昔から色々あるけど、なんかいまいち流行り切らない印象。

問題は gRPC の proto ファイルから各言語の実装を自動生成するライブラリのクオリティにばらつきがあること。
これは GraphQL でも言えることだけど、どうしても自動生成系はここがネックになりがち。
私みたいにマイナー言語使わなければ大して問題にはならないけども……。

## tRPC

- [tRPC](https://trpc.io)

サーバー、クライアント共に TypeScript なのであれば tRPC が一番楽だと思う。
TypeScript でインタフェースを定義してそれをサーバー、クライアントで共有する。
TypeScript に絞っている分、 GraphQL や gRPC のように schema を定義せずにインタフェースをやり取りできるが、
他の言語への汎用性はない。

不安要素としては、開発元が Vercel なので最近の Next.js の動きを見ていると tRPC のような仕組みよりは Server Action 推しだと思うので、
今後メンテがされていくのかどうか疑問だ。
実際 tRPC が盛り上がった 2 年くらい前からあまり進歩がなさそう。

良いものだと思うけど採用するかどうかちょっと悩むなぁ……。
サーバー、クライアント共に TypeScript で、通信周りを楽したいなら割りとありな気がするけど。
