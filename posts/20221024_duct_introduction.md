---
title: Duct で Web サーバーを構築しよう
description: Clojure 製の Web サーバーライブラリである Duct について説明します
date: 2022-10-24
tags:
  - 初心者向け
# draft: true
---

Clojure 製の Web サーバー構築ライブラリとして [Duct](https://github.com/duct-framework/duct) というものがあります。
この分野については他にも [pedestal](http://pedestal.io) とか [Biff](https://biffweb.com) とかいくつかありますが、今回は Duct について話します。

Duct の特徴

- 関数同士の依存関係を config.edn という設定ファイルに記述することで疎結合にする
- defmethod をいい感じに使うことで上記を実現している

言ってしまえばこれだけですが、初心者には意味不明でしょうし、ある程度 Web サーバーの設計に詳しい人でないとこのメリットもわかりません。
どんな言語でも課題になるのは関数同士の依存関係、つまり関数の中から他の関数を呼び出すという普通の行為が結構密結合に感じることもあって、そういうのをなんとかできるのが Duct というわけです。
なので、 Rails みたいなフルスタックな Web フレームワークにあるようなデータベースへのアクセスであるとか HTTP リクエストのルーティングの解決であるとかそういう機能は Duct にはありませんし、それが主眼でもありません。

「何を言っているんだお前は」という感じだと思いますので、とりあえず使ってみましょう。

## Duct のプロジェクトを用意する

まず前提としてマシンに Clojure と Leiningen がインストールされているとします。まだの人は [3 行で始める Clojure](https://clojure-camp.com/posts/clojure-install/) をもとにしてセットアップしてください。

意外にも duct を始めるには次のコマンドを実行するだけです。

```
lein new duct myapp +api +postgres
```

`myapp` はなんかいい感じの名前に変えてください。
`+api` `+postgres` はオプションなので他にも使えるオプションがありますが、まぁ多分これだけでいいでしょう。
気になる人は [Duct の Readme](https://github.com/duct-framework/duct) を読んで下さい。

作成されたディレクトリを見てみましょう。

```
myapp$ tree .
.
├── README.md
├── dev
│   ├── resources
│   │   └── dev.edn
│   └── src
│       ├── dev.clj
│       └── user.clj
├── project.clj
├── resources
│   └── myapp
│       ├── config.edn
│       └── public
├── src
│   ├── duct_hierarchy.edn
│   └── myapp
│       ├── handler
│       └── main.clj
└── test
    └── myapp
        └── handler

12 directories, 8 files
```

いくつかのファイルとディレクトリが生成されました。

重要なのは `resources/myapp/config.edn` なのでこれを開いてみましょう。

```clojure
{:duct.profile/base
 {:duct.core/project-ns myapp

  :duct.router/cascading []}

 :duct.profile/dev   #duct/include "dev"
 :duct.profile/local #duct/include "local"
 :duct.profile/prod  {}

 :duct.module/logging {}
 :duct.module.web/api
 {}
 :duct.module/sql
 {}}
```

よくわからない edn による設定の羅列があります。おっと edn ファイルの説明がまだでしたね。
edn は json や yaml みたいなものですが Clojure で扱いやすいのでよく使われています。
Duct における開発は config.edn に色々関数同士の依存関係を書いていくことでシステムを構築します。
そのため routes とか migration とかもここにかけるんですが、そういうものまで入れるかどうかは好みが分かれるところです。

とりあえず動かしてみましょう。`lein repl` で REPL を起動できます。Clojure における開発は基本的に REPL 上で行います。

```
$ lein repl
java.lang.NullPointerException: Cannot invoke "jdk.javadoc.internal.doclets.formats.html.HtmlConfiguration.getOptions()" because "this.configuration" is null
        at jdk.javadoc/jdk.javadoc.internal.doclets.formats.html.HtmlDoclet.getSupportedOptions(HtmlDoclet.java:416)
        at jdk.javadoc/jdk.javadoc.doclet.StandardDoclet.getSupportedOptions(StandardDoclet.java:93)
        at cider.nrepl.inlined_deps.orchard.v0v6v0.orchard.java.parser$parse_java$reify__5546.getSupportedOptions(parser.clj:77)
        at jdk.javadoc/jdk.javadoc.internal.tool.Start.getSupportedOptionsOf(Start.java:665)
        at jdk.javadoc/jdk.javadoc.internal.tool.Start.consumeDocletOption(Start.java:613)
        at jdk.javadoc/jdk.javadoc.internal.tool.Start.parseArgs(Start.java:819)
        at jdk.javadoc/jdk.javadoc.internal.tool.Start.parseAndExecute(Start.java:502)
        at jdk.javadoc/jdk.javadoc.internal.tool.Start.begin(Start.java:397)
        at jdk.javadoc/jdk.javadoc.internal.tool.Start.begin(Start.java:359)
        at jdk.javadoc/jdk.javadoc.internal.api.JavadocTaskImpl.call(JavadocTaskImpl.java:99)
        at cider.nrepl.inlined_deps.orchard.v0v6v0.orchard.java.parser$parse_java.invokeStatic(parser.clj:87)
        at cider.nrepl.inlined_deps.orchard.v0v6v0.orchard.java.parser$parse_java.invoke(parser.clj:64)
        at cider.nrepl.inlined_deps.orchard.v0v6v0.orchard.java.parser$source_info.invokeStatic(parser.clj:299)
        at cider.nrepl.inlined_deps.orchard.v0v6v0.orchard.java.parser$source_info.invoke(parser.clj:290)
        at clojure.lang.Var.invoke(Var.java:384)
        at cider.nrepl.inlined_deps.orchard.v0v6v0.orchard.java$class_info_STAR_.invokeStatic(java.clj:196)
        at cider.nrepl.inlined_deps.orchard.v0v6v0.orchard.java$class_info_STAR_.invoke(java.clj:187)
        at cider.nrepl.inlined_deps.orchard.v0v6v0.orchard.java$class_info.invokeStatic(java.clj:234)
        at cider.nrepl.inlined_deps.orchard.v0v6v0.orchard.java$class_info.invoke(java.clj:226)
        at cider.nrepl.inlined_deps.orchard.v0v6v0.orchard.java$eval5771$fn__5772.invoke(java.clj:401)
        at clojure.core$binding_conveyor_fn$fn__5772.invoke(core.clj:2034)
        at clojure.lang.AFn.call(AFn.java:18)
        at java.base/java.util.concurrent.FutureTask.run(FutureTask.java:317)
        at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1144)
        at java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:642)
        at java.base/java.lang.Thread.run(Thread.java:1589)
REPL-y 0.5.1, nREPL 0.9.0
Clojure 1.10.3
OpenJDK 64-Bit Server VM 19
    Docs: (doc function-name-here)
          (find-doc "part-of-name-here")
  Source: (source function-name-here)
 Javadoc: (javadoc java-object-or-class-here)
    Exit: Control+D or (exit) or (quit)
 Results: Stored in vars *1, *2, *3, an exception in *e

user=>

user=> exit
Bye for now!
```

なんか大量のエラーが出ました。
