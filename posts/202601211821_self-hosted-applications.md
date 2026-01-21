---
title: 自宅サーバーに self-hosted アプリを入れまくっている
date: 2026-01-21 18:21:32
ogimage: /img/posts/202601211821_self-hosted-applications.png
tags:
  - Tech
  - 自宅サーバー
---

## 物理的な整理

自宅サーバーの話は度々しているが、年末年始に次の変更を行いました。

* OSのクリーンインストールしました
  * 色々とごちゃっとしていたので整理する目的で一度リセットしました
* OSは M2SSD にインストール、データ保存用の HDD を SATA SSD に換装しました
  * HDD が思ったよりうるさいので SATA SSD を買いました
  * 4TB の SATA SSD を 2 枚買って RAID1 (mirroring) しています

前からやりたかったことがようやくできました。
特に、 4TB の領域は今まで活用できずに眠らせていたので、今回使えるようになって嬉しいです。

## 自宅サーバーでのアプリの実行

次の方針で行っています。

* アプリ本体は Docker Compose で動かす。
  * restart always にして再起動時に自動的に立ち上がるようにしておく
* インターネットに公開するサービスは [frp](/posts/2024022301_frp/) で公開する
* ローカルIPだけで使うサービスは Caddy で reverse proxy を設定する

インターネットに公開して使いたいサービスと、LAN内だけで使えれば良いサービスがあることもわかってきました。
そのため、後者については `/etc/hosts` とかで適当に名前解決しつつ Caddy で reverse proxy を設定するだけにしました。

## セットアップしたアプリ

### Gitea

![gitea](/img/posts/202601211821/app1.png)

[Gitea](https://about.gitea.com/) は lightweight な GitHub 的なアプリで Self-hosted できます。
Docker だけでセットアップできて、 ssh での git アクセスもセットアップできます。

git lfs も対応しているようなので重めのファイルもアップロードできるのではないかと期待しています。

GitLab なども検討しましたが、 Gitea が新しめで使いやすそうだったのでこれにしました。

### Immich

![immich](/img/posts/202601211821/app2.png)

[Immich](https://immich.app/) は Google Photo 的なサービスで、スマホアプリもあります。
スマホで撮影した画像のバックアップを google に任せるのが嫌になってきたので導入しました。
google photo 同様に単語で画像を検索する機能も immich でちゃんと動いていて驚きました。
完成度が高いアプリだと感じています

### RustFS

![rustfs](/img/posts/202601211821/app3.png)

[RustFS](https://github.com/rustfs/rustfs) は S3 Alternative で、ファイルのアップロードに便利そうなので導入してみました。
これは他のアプリ（自作も含む）からアクセスできるようにして汎用的に使うつもりです。

## 今後セットアップする予定のアプリ

### Dokploy

[Dokploy](https://dokploy.com/) は DockerCompose でシステムをデプロイ出来る Self-hosted 可能なツールです。

基本的に DockerCompose でアプリを動かしているので管理をするのに便利そうです。

### Rocket Chat

[Rocket Chat](https://www.rocket.chat/) は Slack のようなチャットシステムです。
現状、家族とのやり取りは Nextcloud のチャットツールで行っているのですが、
Nextcloud はちょっと大掛かりすぎる気がしているので、移行しようと思っています。
チャット以外使っていないし。

### Zitadel

[Zitadel](https://zitadel.com/) は認証基盤システムで、いわゆる Auth0 や Firebase Authenticate のようなアプリです。
アプリを作るときに認証システムを自作で組み込むことが多かったので、外部に切り出そうとしています。
認証基盤自体自作しようと思いましたが、自分の時間が確保できなくて進められないので既存のサービスを使うことにしました。

認証基盤システムはOpenSource、 Self-Hosted 可能なものがたくさんありましたが、ドキュメントのわかりやすさや使用言語などを考慮して Zitadel が良いのではないかと思っています。
