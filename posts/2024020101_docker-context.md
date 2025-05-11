---
title: サーバー内での docker compose up をローカルから行う方法
date: 2024-02-01
description:
ogimage: /img/posts/2024020101_docker-context.png
tags:
  - Tech
---

まずサーバーで docker や docker compose が動くようにしておく。 その後、

```bash
$ DOCKER_HOST="ssh://user@remotehost" docker compose up -d
```

するだけで遠隔サーバーで docker container を起動できる。

知らなかった...。

さらに docker context を使うと DOCKER_HOST を変えなくても指定した環境で docker
compose up できる。

```bash
$ docker context create remote --docker "host=ssh://user@remotemachine"
$ docker --context remote compose up -d
```

<div class="post-large-font">
便利すぎでは～！！
</div>

もちろん `~/.ssh/config` に設定した Host 名も使える。 僕の場合、 `~/.ssh/config`
に次のような設定がある。

```bash
host monday
    HostName xxx.xxx.xxx.xxx
    User xxxxxxxx
    ForwardAgent yes
    IdentityFile ~/.ssh/id_ed25519
```

ので

```bash
$ DOCKER_HOST="ssh://monday" docker compose up -d
```

でよい。

参考:
[How to deploy on remote Docker hosts with docker-compose](https://www.docker.com/blog/how-to-deploy-on-remote-docker-hosts-with-docker-compose/)

本格的に運用するなら k3s とかで k8s 環境を作ったほうが良さそう。
