---
title: LumeCMSでブログを作ってみた
date: 2024-08-23 07:22:57
ogimage: /img/posts/202408230722_made-a-blog-by-lume-cms.png
tags:
  - Tech
---

以前からこのサイトの構築で使っている [Lume](https://lume.land/) だが、最近 [LumeCMS](https://lume.land/cms/) という CMS 機能を組み込むプラグインが出た。
静的サイトジェネレーターで CMS というのも変な話なのだが、 LumeCMS と使うとブログなどのデータ更新のためのUI付き管理画面が作れるようだ。

![LumeCMSの管理画面](/img/posts/202408230722/lume-cms-posts.png)

管理画面を色々設定するとこんな感じになる。
タイトルと本文だけじゃなくてタグとか著者とか設定できるようにしてみた。便利。

これらはデータとしては Deno KV や Githu API を使うこともできるし、 File System にそのまま markdown ファイルを生成することもできる。

### サーバー環境

今回は LumeCMS を自宅サーバーで動かすことにした。
次のような感じ。

![LumeCMSのインフラ環境](/img/posts/202408230722/lume-cms-infra.png)

黄色は docker container で、3つの Conatiner が docker compose で動いている。

LumeCMS はアプリケーションサーバーとして動かしておいて、 Caddy でリバースプロキシして外部から見れるようにしておく。
これは Caddy の Port で http://localhost:8080/admin みたいなパスに対してリバースプロキシすることで、

* http://localhost:8080/admin は管理画面
* それ以外の http://localhost:8080/ は静的サイトで生成されたホームページ

という動きを作りたかったため。

Lume の builder を `deno task lume build -w` みたいな感じで動かしておけばファイルの変更があったときに
自動でビルドをやり直して結果である `_site` を作れるので、 LumeCMS でファイルを作った際もこの自動ビルドが走る。

`_site` を Caddy で静的コンテンツとして配信すれば速いし、 Caddy のロードバランサとしての恩恵にあやかれる。

Docker の中では 80 Port で Caddy を動かす必要がある。これは http で動かすためで、 Caddy は 80 以外は自動的に https になる。
Docker の外から Port Foward するときに 80 をホストの 8080 からアクセスできるようにしておく（この Port は何番でも良い）。

8080 Port に対して [Frp](https://github.com/fatedier/frp) を使って Tunneling することで https 化と外部への公開を行う。
frp についての詳細は [frp で自宅サーバーを公開する](/posts/2024022301_frp/) を参照。
frp を用意するのが面倒くさかったら ngrok とか cloudflare tunnel とか使えば良い。

### 雑感

色々 CMS で良いのがないか調べたけど、機能少なくていいからサクッと使えるやつっていうのがなかなか無かった。
どれも「カスタマイズバリバリできます！（ただしドキュメントをよく読んでね）」みたいなのが多くてイマイチだったので、
使い慣れている Lume に CMS 機能が組み込めるのは割りと助かった気がする。

もっと本格的な CMS が欲しい人には不十分だと思うけど、ちょっとしたブログを作るくらいならこれで良さそう。

### Lume の他のプラグイン

今回はなるべく Lume のプラグインを使って og image とか整えるようにした。

* [metas](https://lume.land/plugins/metas/)
    * メタタグを管理しやすくするやつ
* [og image](https://lume.land/plugins/og_images/)
    * og:image をタイトルなどから自動生成するやつ
    * [satori](https://github.com/vercel/satori) を使っていて案外使い勝手が良かった
* [pagefind](https://lume.land/plugins/pagefind/)
    * 記事を検索できるやつ

Lume はどれも使い方のドキュメントが不十分で苦労するけど、頑張ればうまく使える。
