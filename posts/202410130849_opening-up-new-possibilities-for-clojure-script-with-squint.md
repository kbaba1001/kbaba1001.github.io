---
title: Squint で切り開く ClojureScript の新しい可能性
date: 2024-10-13 08:49:58
ogimage: /img/posts/202410130849_opening-up-new-possibilities-for-clojure-script-with-squint.png
tags:
  - Tech
---

少し前から [Squint](https://github.com/squint-cljs/squint) という軽量な ClojureScript (CLJS) のコンパイラがあります。
最近これで遊び始めたのでざっくり紹介したいです。

《kbaba1001|/img/horse.jpg|TypeScriptと同程度の気楽さでClojureScriptを使いたい》

簡単に言えばこれを叶えるための選択肢としての Squint です。

### そもそも今までの CLJS と何が違うのか

今までの CLJS はこんな感じでした。

* Java の Clojure との高い互換性を重視
* CLJS の実行に Java が必要 ([shadow-cljs](https://github.com/thheller/shadow-cljs)はだいぶ頑張ってこれをなくそうとしていたけど…)
* ビルドのアウトプットファイルが大きい
  * JS のデータ構造をそのまま使うわけではないので標準で色々入っている分重い
* JS のデータ構造を使う場合には `#js` や `clj->js` などを使って変換する必要があった
  * これで困ることはあんまりなかったけど、初心者には分かりづらいポイントかも
* Promise の扱いが微妙
  * [core.async](https://github.com/clojure/core.async) で十分なことは多いけど、 JS の Promise を使いたいケースも結構ある
  * core.async の関数の戻り値が Promise ではないのがたまに辛い
* package.json とかに書いたらいい感じにやってほしいけど、なんかごちゃごちゃする
  * shadow-cljs はだいぶ良かった
* cljs 対応済みの clojure ライブラリが使える

何度も言いますが Shadow-cljs は最高です。 npm で動くし、今までの ClojureScript のライブラリも使えます。
難点を上げるとすれば、ビルドが遅くて重く、なんとなく気楽さに欠けることでしょうか。

Vite などの JS 文化のビルドライブラリを使いたいというのが正直なところです。

そこで、 Squint 。

Squint は今までの Clojure(Script) との互換性を捨てる代わりに、

* JS のデータをそのまま使うことによるアウトプットの軽量化
* Promise, Async/Await のサポート
* JSX 対応

などが入り、 vite などと組み合わせて使うことも出来るようになりました。

なので

《kbaba1001|/img/horse.jpg|今までの cljs は不要だけど、 js の資産を活用して cljs で開発したい》

のような考えの人には向いていると思います。
詳細は [このへん](https://github.com/squint-cljs/squint?tab=readme-ov-file#differences-with-clojurescript) を読んでください。
今までの CLJS との互換性を重視した [cherry](https://github.com/squint-cljs/cherry) というプロジェクトもあります。

### まずはサンプルコード

[vite-preact-squint](https://github.com/neumann-tokyo/vite-preact-squint)

vite, preact, squint で土台を作ってみた。まだ途中だけどとりあえず squint でビルドした jsx を vite で動かすところまではできた。

vite squit plugin みたいなやつがあればよいのだが、そこまではまだできていないようで、
`squint watch` で js/jsx ファイルを作ってそれを `vite` に食べさせるという動き。

そうすると２つのプロセスを同時に起動する必要があり、やや面倒なので [Shoreman](https://github.com/chrismytton/shoreman) という [Foreman](https://github.com/ddollar/foreman) を shell に移植したやつをリポジトリ内に入れて使うことにした。
(この辺はもう少しシンプルにできそうな気がするけど)

[vite-plugin-squint](https://github.com/brandonstubbs/vite-plugin-squint) を作っている人もいたので、後で試す。

### cljs で malli だけ使いたい

[malli](https://github.com/metosin/malli) は cljs で動的に typecheck が出来るライブラリで、
[clojure/spec.alpha](https://github.com/clojure/spec.alpha) の代わりによく使われている。

malli の良いところはデータ構造で spec を定義できて、かつ、 Validation などでも使えることだ。

TypeScriptのような型システムは別にいらないのだが、単に関数の引数として何を期待しているのかを
明白にしておきたいときは結構あって、 Malli はそういうときにちょうどいい。

#### Squint で Malli は動かない。ではどうするか？

先ほど互換性の話をした通り Squint では普通の CLJS ライブラリは動かないので Malli も動かない。

ではどうするか？ JS のライブラリで似たようなものを探すしかない。

「引数に何を期待しているかを明記する」という目的であれば [PropTypes](https://www.npmjs.com/package/prop-types) をまず思いついた。

しかし、案の定 PropTypes は放置されていて、世の中的にはそういうのは「 TypeScript を使え」の一点張りになってしまっていた。
PropTypes的なライブラリで代替品も見つからない。

《kbaba1001|/img/horse.jpg|発想を変えよう》

#### Validation ライブラリを Spec 代わりに使う

Clojure には `pre`、 `post` という機能がある。
関数の事前条件(`pre`)または事後条件(`post`)を設定して、条件を満たしていなければ例外を出すというものだ。

Malli にせよ clojure/spec.alpha にせよ、静的な型チェックとは異なり、
動的な型チェックというのは何かしらの方法で実行して確認する必要がある。

方針としてはこうだ。

* `pre` で validation チェックライブラリ ( [zod](https://zod.dev/) や [valibot](https://valibot.dev/) など ) を実行して引数のチェックをする
* この機構は本番モード(`NODE_ENV=production`)では無視する（必ずパスする）ようにする
* テストを活用する

このやり方なら JS の新しいライブラリを使って Malli が行っているような動的な型チェックが出来る。


