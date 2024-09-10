---
title: React の Tips やおすすめライブラリなど
date: 2024-09-09 11:31:14
ogimage: /img/posts/202409091131_react-tips-and-favorite-libraries.png
tags:
  - Tech
  - frontend
---

React も使い始めて数年が経ち、自分なりの書き方も確立できてきたので Tips などをまとめてみようと思う。

### React If

[React If](https://www.npmjs.com/package/react-if) を使ってくれ。大事なことなのでもう一度。
[React If](https://www.npmjs.com/package/react-if) を使ってくれ。

簡単に言えば、 if 文や Switch 文を React コンポーネントで書ける。

```javascript
const Bar = ({ name, age, drinkingAge }) => (
  <div>
    <Header />
    <If condition={age >= drinkingAge}>
      <Then>
        <span className="ok">Have a beer, {name}!</span>
      </Then>
      <Else>
        <span className="not-ok">Sorry, {name}, you are not old enough.</span>
      </Else>
    </If>
    <Footer />
  </div>
);
```

React の読みづらさの一つが三項演算子だと思っていて、コンポーネントで書いたほうが読みやすい。
Solidjs にこんな感じの機能があって似たようなことが React でもできないかと思って探したら React If を見つけたという経緯。

### react-timer-hook

アニメーションなど時間を扱いたいケースが時々あって、
そういう場合に [react-timer-hook](https://www.npmjs.com/package/react-timer-hook?activeTab=readme) が
非常に使いやすかった。

`useTimer` という hook を作って時間を扱うことができる。便利。

### そもそも SPA でよくね？

Next.js や Remix などの SSR 系のライブラリが流行っているが、ほとんどのケースでは SPA で十分だと思う。
SSR はサーバーサイドも一緒に管理することになり、まだまだ気楽に書けるという印象ではない。

特に別途 BFF っぽい API サーバーがあるのであれば、 SPA で十分ではないかというのは検討したほうがいい。
SSR は開発コストが高く、それを考慮しても SSR でしかパフォーマンスが出せないという場合にのみ使う方が良い。

### Wouter

React または Preact において軽量なルーティングライブラリとして使えるのが [Wouter](https://github.com/molefrog/wouter) 。

SPAならこれで十分。余分な機能がない。以上。

### jotai

[jotai](https://jotai.org/) は結構有名なライブラリになってしまったが、グローバルステートなどを扱うための状態管理ライブラリ。
いわゆる `useContext` の代替。

いろいろなプラグインがあって、目的に合わせて変えられるのが良い。
私が特に気に入っているのは

* [jotai-effect](https://jotai.org/docs/extensions/effect)
  * useEffect 的なやつ
* [jotai-scope](https://jotai.org/docs/extensions/scope)
  * jotai の atom はグローバル変数にならざるを得ないので、スコープを付けられるライブラリ

### spacetime

React とは無関係だがよく使うので [spacetime](https://github.com/spencermountain/spacetime) も紹介する。

いわゆる date-fns のような時間操作系のライブラリ。

軽量、直感的な関数、機能が豊富なので気に入っている。知名度が低いのが残念だ。

### ky

[ky](https://www.npmjs.com/package/ky) は [axios](https://www.npmjs.com/package/axios) の代替ライブラリ。

Denoでも使えるのが良い。

正直この手のやつはあまり使う必要がない（fetchで十分）と思うのだが、たまにあると便利なので一応使っている。

### Tanstack Query

[Tanstack Query](https://tanstack.com/query/latest) も有名なやつだが、 SPA 開発ではほぼ必須のライブラリ。

API 通信をキャッシュしたり、データ取得中の loading status を管理したりできる超便利なやつ。

リロード機能がいい感じなのが最高。

[jotai-tanstack-query](https://jotai.org/docs/extensions/query) も結構頑張って使っていたのだが、
ちょっともう一歩なところがあって結局 Tansatack Query をそのまま使うほうがよいという結論になった。

### qs

[qs](https://www.npmjs.com/package/qs) もあまり React は関係ないが URL の Search Parameters をいい感じに encode/decode できるやつ。

ルーティングライブラリにこの手の機能がくっついている場合もあるけど、 qs のほうが小回りがきいて便利なことが多いので、
ルーティングは前述の Wouter くらいシンプルにしておいて qs で補うほうが好みだ。

### vitest, happy-dom

* [vitest](https://vitest.dev/)
* [happy-dom](https://github.com/capricorn86/happy-dom)

テストライブラリ。

速い。書き心地に変なクセがない。以上

### Biome

[Biome](https://biomejs.dev/) は Linter と Formatter の機能を併せ持つ爆速なやつ。

Biome に比べれば ESLint や Prettier は遅くて使いたくない。

Biome のデフォルトのフォーマットにやや癖があるが、自分としては Linter や Formatter というのは
「あればそれでいい」という程度のこだわりしかなく特に不満なし。

色々カスタマイズしたい人は ESLint のほうがいいと思う。

残念なのは対応している言語が基本的に JS/TS/JSX/TSX/JSON/JSONC のみということ。
Markdown や CSS も対応してくれると嬉しいのだが。。。

少なくとも React + Chakra UI の世界にいる限り生 CSS は書かなくてもいいので Biome で十分である。

### lefthook

git hook をかきやすくするやつ。

チーム開発のときに Linter / Formatter / Test あたりは必ずパスしてからコミットしてほしいという気持ちがあり、
そういう設定を強要するために lefthook など入れてみるのだが、まぁ、だいたい抜け道を使われて徒労に終わる。。。

## UI の話

### Chakra UI

最近は UI 作りは [Chakra UI](https://v2.chakra-ui.com/) 1択と思っている。
[Kuma UI](https://www.kuma-ui.com/) も思想は悪くないのだが、コンポーネントが少なすぎる。

Chakra UI にはだいたい使いたいコンポーネントが揃っているし、思想的にも使いやすい。

Tailwind css の良いところを取り込みつつ、悪いところは排除した感じが実に良い。

#### ローディング UI を考える

Chakra UI にあるローディングで使えそうなコンポーネントが次。

* [Progress bar](https://v2.chakra-ui.com/docs/components/progress#animated-progress)
    * ![progress-bar](/img/posts/202409091131/progress-bar.gif)
* [skeleton](https://v2.chakra-ui.com/docs/components/skeleton)
    * ![skeleton](/img/posts/202409091131/skeleton.gif)
* [spinner](https://v2.chakra-ui.com/docs/components/spinner)
    * ![spinner](/img/posts/202409091131/spinner.gif)

最近良く見かける UI としてロード中に Progress bar がヘッダーとかページのトップにあるやつ。
なんとなくロード中というのがわかりやすいので導入したい。

Skeleton も私としてはあまり使ってこなかったのだが、Amazonとか見てるとかなり使われている。
ロード中なんだけど早く画面が表示されたように錯覚させる良いUIだと思う。

逆に Spinner はいかにも「ロード中ですよ」という感じで、案外多用しないほうがいい気がする。
本当にロードに時間がかかるような場合とかのみにしたほうがいいんじゃないかなぁ。

こういうのは本職のデザイナーの意見も聞きたいところ。

**(追記)**

[holy-loader](https://www.npmjs.com/package/holy-loader) という便利なライブラリを見つけた。
導入するだけで画面遷移の時ヘッダーにローディングUIを表示することができる。良さそう。

#### Chakra UI にないコンポーネントを補う

少々意外なことに Chakra UI には date-picker や select2 的なコンポーネントがない。
正直これらは `<input type="datetime-local" >` や `<datalist>` で十分なケースも多いのだが、
もう少し機能のある UI が求められるケースもある。

そういう場合には [Blueprint](https://blueprintjs.com/) を使うようにしている。

### Blueprint

[Blueprint](https://blueprintjs.com/) は業務アプリをつくるのに向いたUIを提供している。
デザイン的に Chakra UI のポップな感じと合わないのだが、ちょうど Chakra にないコンポーネントがあるので使っている。

![blueprint](/img/posts/202409091131/blueprint.png)

#### テーブルUIを考える

Blueprint の良い点はテーブルUIが非常によくできている。
ドキュメントが読みづらくGitHubのサンプルコードを読むのが一番良いのだが、Excelライクなテーブルが作れる。

未だに「ExcelみたいなUIが欲しいです」という要望は時々あるので Blueprint はよい。

[Tanstack Table](https://tanstack.com/table/latest) と組み合わせると更に良い。
これはテーブルのUIとデータを分けて考えることができるようになるライブラリ。
地味に困る部分なのでしっかり作ってあって良いライブラリだと思う。
ソートやページネーションもあるので助かる。

### AutoAnimate

[AutoAnimate](https://auto-animate.formkit.com/) は一覧とかで自動的にそれっぽいアニメーションを付けてくれるライブラリ。
一覧画面での追加、削除、移動のとき要素にちょっとアニメーションを付けてくれる。
あんまこだわりなくそれっぽいアニメーションがほしいときにCSSとかで頑張るより楽。

何度か使っているけど、 Chakra UI にも [Transitions](https://v2.chakra-ui.com/docs/components/transitions) という
アニメーション関係のコンポーネントがあることに気がついたのでこっちでも十分かもしれない。

### その他、過去に紹介した UI ライブラリ

* [タスクリストみたいなやつを楽にDnDするやつ](/posts/202408290945_dnd-on-list)
* [カレンダーUIが必要な時使うやつ](/posts/202408290953_full-calendar/)
