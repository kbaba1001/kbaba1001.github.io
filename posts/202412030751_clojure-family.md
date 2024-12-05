---
title: Clojure Family が色々ある話
date: 2024-12-03 07:51:05
ogimage: /img/posts/202412030751_clojure-family.png
tags:
  - Tech
---

Clojure といえば JVM 上で動く Lisp のように紹介されることが多く、
私もそういう言い方をすることも多いのだがこの言い方は正しくない。
なぜなら JVM 以外で動く Clojure (あるいは Clojure っぽい言語も含む) が多々存在しているからだ。

今日は Clojure Family とも言うべきこれらの方言について紹介する。

## Clojure (JVMで動くやつ)

まずは一番良く使われている JVM 上で動く Clojure 。
特筆されない場合 "Clojure" といえばこれのこと。

* Java の機能やエコシステムを活用したい場合はとてもよい
* とりあえず Clojure を使いたい場合はこれがおすすめ

## ClojureScript (Alt JS の一種)

ビルドすると JavaScript になる Clojure 。
おそらく JVM 版の次によく使われている。
JVM 版と同じところが開発しているという安心感がある。

ただ、ビルドツールが色々とあって、

* [deps.ednを使う方法](https://clojurescript.org/guides/quick-start)
* [Figwheel](https://figwheel.org/)
* [Shadow-cljs](https://github.com/thheller/shadow-cljs)

などのやり方がある。

「deps.edn を使う方法」は公式サイトに乗っているやり方だが、これは npm ライブラリを素直に使えないというデメリットが有り、
そのへんを解決するために後者の 2 つがある。

Shadow-cljs が一番後発なので、今から新しく何かを作りたいなら、これがおすすめ。
（あるいは後述の squint や cherry を使う）

## ClojureCLR

こちらも Clojure 本家が作成しているもので、 ビルドすると Microsoft’s .Net Framework 環境で動く Clojure 。
つまり C# で書かれた Clojure 実装。

私は使ったことがなく、詳しくないので紹介する程度に留める。
ゲームとかWindowsサーバーでClojureを使いたい人にはいいのかもしれない。

## Babashka

[Babashka](https://babashka.org/) は GraalVM を用いて Clojure を native binary にビルドできるもの。

JVM 版の Clojure を使うとどうしても実行時の起動に時間が掛かるが、 Babashka であればすぐに動くので
スクリプトを Clojure で書きたい場合などに便利。

[Michiel Borkent](https://github.com/borkdude) 氏の作品。彼は Babashka を始め後述の様々なツールを作っているすごい人。

## Squint

[squint](https://github.com/squint-cljs/squint) は ClojureScript のコンパイラなのだが、 JavaScript の Built-in Data structures のみ使用しているため、いくつかの点で本来の ClojureScript とは異なる。

* ClojureScript では `[]` や `{}` は JavaScript のオブジェクトではなく immutable な ClojureScript ようにカスタムされたオブジェクトを返すが、 Squint では JavaScript の build-in の `Array` や `Object` を返す。
* Async/Await のサポート (ClojureScript では core.async などを使う必要があったが Squint では Promise が素直に使える)
* ClojureScript 用に開発されたライブラリなどがうまく動かない場合があるので、JS/TS用のライブラリを使うほうが無難
* [vite-plugin-squint](https://github.com/brandonstubbs/vite-plugin-squint) などを使うと Squint -> JSX -> JS の変換が楽

Squint はないよりも気軽に CLJS （っぽい言語）が使えるのが魅力。
私としてはかなり期待している。

## Cherry

[Cherry](https://github.com/squint-cljs/cherry) は Squint よりもともとの ClojureScript への互換性を高めたもの。
ClojureScript のライブラリを活用したい場合はこちらのほうが良さそう。

## Jank

[Jank](https://jank-lang.org/) は Clojure を LLVM + JIT コンパイラで動くようにしたもの。
C++との親和性が高いらしく、C/C++ っぽい領域のところを Clojure で書きたい場合には良さそう。
どのくらいの事ができるのかをまだ私は把握しきれていないけど、将来性はあるように思うので期待。

## その他

私は使ったことないけど他のClojure方言を紹介

* [ClojureDart](https://github.com/Tensegritics/ClojureDart)
* [ClojureL](https://github.com/clojerl/clojerl)
  * Erlang 実装
* [mal](https://github.com/kanaka/mal)
  * Clojure っぽい言語を実装することで言語実装について学ぶプロジェクト

## 感想

Lisp は方言がたくさんある言語だけど、最近はもうClojure方言と呼ぶべき分野ができていて、
やっぱりClojureの人気はすごいなぁと思ったりしました。
Scheme方言なんかも結構たくさんあるみたいで調べてみると面白かったです。
