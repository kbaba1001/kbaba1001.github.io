---
title: いつの間にか AtCoder で Babashka が動くようになっていた
date: 2024-01-29
description:
ogimage: /img/posts/2024012902_babashka-at-coder.png
tags:
  - Tech
---

![AtCoder](/img/posts/2024012902/atcoder.png)

<div class="post-large-font">

いつの間にか [AtCoder](https://atcoder.jp/) で
[Babashka](https://github.com/babashka/babashka) が使えるようになっている！！！

めちゃくちゃ嬉しい！！

AtCoder 始めます！！

</div>

どういうことかというと、今まで AtCoder で普通の Clojure
の実行はできていたのですが、どうも起動時間も含めて実行速度
として計算されていたらしく、とんでもなく不利でした。

一方 Babashka は GraalVM を使った起動がめちゃくちゃ速い Clojure
の実行環境で、これが AtCoder で使えたらいいのになぁと多くの Clojurians
は思ってました。

<div class="post-large-font">

で、それが叶いました。

最高ー！！

</div>
