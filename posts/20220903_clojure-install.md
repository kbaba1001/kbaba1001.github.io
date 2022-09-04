---
title: 3行で始める Clojure
description: Clojureのインストール方法などを解説します
date: 2022-09-03
tags:
  - 初心者向け
---

- [homebrew](https://brew.sh) 入れて `brew install clojure/tools/clojure leiningen` で Clojure をインストールできます
- VS Code に [calva](https://calva.io) いれて [paredit](https://calva.io/paredit/#editing) の **Slurp Forward** と **Barf Forward** を覚えたら開発できます
- ひとまず [Practicalli](https://practical.li) で初心者情報を見てみましょう

流石に 3 行だけだと初心者に優しくないので解説します。

### Homebrew でインストール

MacOS だけでなく Linux でも Homebrew を使うことはできますので、これが一番楽な方法です。
Windows の場合は WSL などの Linux 仮想環境を使ってください。

```bash
brew install clojure/tools/clojure leiningen
```

で clojure と [leiningen](https://leiningen.org) をインストールすることができます。
leiningen は Clojure におけるビルドツールで Node.js でいうところの npm のようなものです。
最近では leiningen を使わずにビルド環境を構築することもできるようになりましたが、依然として leiningen はデファクトスタンダードです。

### VS Code + Calva そして paredit

VS Code に Calva というプラグインを入れることで Clojure の開発を快適に行うことができるようになります。
もちろん Emacs や Vim などの他のエディタでも開発できます。

重要なことは paredit というコードの書き方です。 Clojure はカッコが多い言語なのでカッコがずれるとうまく動きません。
では Clojure を書く人はつねにカッコの位置に気をつけているかというと、実はそうでもありません。
paredit をうまく使うことでカッコの存在をほとんど意識しなくなります。

paredit には多くの機能がありますがはじめは **Slurp Forward** と **Barf Forward** だけ覚えれば十分です。
Slurp Forward は今カーソルがある位置のカッコから隣のカッコをとりこむような動きをし、
Barf Forward は逆に追い出すような動きをします。
詳しくは [paredit](https://calva.io/paredit/#editing) の gif 動画を見てください。イメージが湧くと思います。

Clojure エンジニアはこのようにしてカッコの位置を自在に操ることで閉じカッコだけ失われるような状況を避けることができます。

### Practicalli

[Practicalli](https://practical.li) は Clojure に関する初心者向け情報がまとまっています。
英語のみですが入門としては良いのではないでしょうか。
当 Clojure Camp もこのようなサイトを目指していますのでもう少し時間をください。

### おすすめ書籍

英語ですが [The Clojure Workshop](https://www.packtpub.com/product/the-clojure-workshop/9781838825485) は非常に網羅的で Clojure の初心者に最適な本です。
ページ数もめちゃくちゃ多いですがその分内容もしっかりしています。

日本語の書籍は残念ながら 2015 年頃からほとんど出版されていません。それでも [プログラミング Clojure 第 2 版](https://www.amazon.co.jp/dp/4274069133) は一読の価値があります。ただ、初心者には少々とっつきづらい話が多いのと、 Core Async や Clojure Spec のような最近の話が書かれていないのがやはりいまいちでしょうか。英語ではこの本の第３版も出版されていますが、日本語では第 2 版までです。

残念ながら現状 Clojure を学ぶ上で英語は避けて通れません。 Clojure Camp では日本語情報を充実させていきますのでもうしばらくお待ち下さい。
