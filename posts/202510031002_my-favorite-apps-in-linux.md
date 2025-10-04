---
title: Linuxでよく使うソフト2025年10月版
date: 2025-10-03 10:02:39
ogimage: /img/posts/202510031002_my-favorite-apps-in-linux.png
tags:
  - Tech
---

《はるか|/img/characters/haruka/normal.jpg|なんで先輩の使っているパソコンはMacじゃないんですか？》

《香月|/img/kitsune-kamen.jpg|Webプログラマが皆Macを使っていると思ったら大間違いだ！》

もう十年以上前からWebエンジニアの間ではMacを使うことが常識のようになっていて、誠に遺憾である。
Dockerは遅いしCUDAは使えないし、Windowsと比べてもデフォルトで Clipboard History や画面分割機能がないのは
使い勝手が悪いし、ターミナルコマンドは微妙に Linux とは違うし、私としては Mac が好きではない。

ここ数年は Windows + WSL での開発環境に満足していたが、Microsoft Office が Web ブラウザでも使えるようになって、
Windows を使う理由が一つ減ったので、また Linux デスクトップの世界に帰ってきた。

《香月|/img/kitsune-kamen.jpg|若手エンジニアにはぜひともLinuxデスクトップで開発を経験してほしい》

Linuxはプログラミングをするのに最適なOSだ。どんなプログラミング言語でも簡単にインストールできるし、
どうせサーバーはLinuxなのだからLinuxデスクトップを使うことでLinuxの知識を増やすことは役に立つ。

《はるか|/img/characters/haruka/normal.jpg|えー！でもなんか難しそう！画面古臭いし》

![desktop.jpg](/img/posts/202510031002/desktop.jpg)
**香月のデスクトップ**

《香月|/img/kitsune-kamen.jpg|うっ！これは私の好みで古くしているだけで、もっと今風のもあるぞ！！》

## 自分のLinuxデスクトップ環境のこだわり

《香月|/img/kitsune-kamen.jpg|Linuxデスクトップはどこまでも自分好みにカスタマイズできることが最大の魅力で楽しさだ》

わかりやすいところでいうと、 Window Manager を気軽に変更できる。
Window Manager は GUI の使い勝手そのものだ。多くの Linux ディストリビューションは
デフォルトの Window Manager を持っているが、カスタマイズの第一歩は Window Manager を変えてみることだ。

《香月|/img/kitsune-kamen.jpg|なるべく必要最小限の構成にしたい》

最近のマシンスペックを考えれば KDE や Gnome を動かすことになんの支障もないのだが、
昔からジャンクPCでLinuxを使っていた経験上、すっかり Xorg だけでなんとかする力がついてしまった。
むしろ Xorg から外れて KDE や Gnome 専用の操作を覚えることは億劫で、今でも軽量な Window Manager ばかり使っている。

そんなわけで、おおむねのこだわりをまとめると

* Wayland はまだイマイチ不安なので Xorg を使う
* Xorg の起動は `startx` コマンドで行う（ログインマネージャは入れない）
* Window Manager はタイル型が良いので i3
* できるだけ Xorg, GTK, QT に依存して Gnome や KDE への依存は減らす
* Systemd をうまく使う

という感じでやっている。

この辺のこだわりをいい感じに反映するには、やはり Gentoo Linux が一番よい。

## Gentoo Linux のよさ

《香月|/img/kitsune-kamen.jpg|久しぶりにGentoo Linuxを使ってみたら案外良かった》

長年 Debian を最小限でインストールして Xorg のインストールなどを手動でやっていたのだが、
最近の Debian は結構おせっかいで、 Xorg をインストールしたらログインマネージャも一緒に
インストールされてしまったので、使う気が失せてしまった。

試しに入れてみた Gentoo Linux が案外良かったので、手持ちのマシンをほとんど Gentoo Linux に
してしまった。

《はるか|/img/characters/haruka/normal.jpg|Gentoo Linux ってなんですか？》

Gentoo Linux は `emerge` というパッケージマネージャでインストールするソフトを管理できる。
`emerge` はバイナリインストールもできるが基本的にはソースコードからビルドをするということが特徴で、
さらに依存関係も `USE` フラグというものを管理することで簡単に制御できる。
この機能がこだわりの強い人にとってはありがたく、例えば Wayland をインストールしたくない場合、
`Use="-wayland"` のように設定するだけでよい。

`emerge` はソースコードをベースとして持ってくるので最新バージョンに近いものをインストールすることが
できるため、マシンを常に最新に保つことができる。
さらに使えるパッケージの量が多く、 Debian の場合は APT と Homebrew (と Snapcraft) を併用するような運用に
しないといまいち便利にならないのだが、 Gentoo なら `emerge` だけでよい。これが楽。

また Gentoo Linux はデフォルトのGUI環境を持っていないので、自前でインストールできる。
私が使う i3 の場合は、デフォルトのWindow Manager は使わないのでこのような仕様はありがたい。

## その他使っているソフト

おおむね使っているソフトをまとめてみる。

* Linux: Gentoo Linux
* Terminal: [Alacritty](https://alacritty.org/config-alacritty.html)
* Editor: VS Code, vim
* ブートローダー: systemd-boot (not grub)
* GUI: X (not wayland)
* Window Manager: i3
* Screen: tmux
* Browser: Brave
* Clipboard History: clipmenud
* IM: fcitx5 + Mozc
* display management: arandr
* Audio Mixer: alsamixer
* TUI Apps
  * enhancd
  * bat
  * ripgrep
  * safe-rm
  * fzf
  * keychain
