---
title: DenoでHonoやReactを使ったテンプレートを作ってみた
date: 2024-05-17 13:28:54
ogimage: /img/posts/202405171328_deno-hono-react-template.png
tags:
  - Tech
  - FAM
---

![gif](/img/posts/202405171328/template.gif)

Deno で本格的な Web システムを作るためテンプレートを作ってみた。

* [deno-vite-react-template](https://github.com/neumann-tokyo/deno-vite-react-template)
* [deno-hono-api-template](https://github.com/neumann-tokyo/deno-hono-api-template)

backend と frontend で完全に分かれていて RESTful API で通信するようにした。

## 仕様

* [deno-vite-react-template](https://github.com/neumann-tokyo/deno-vite-react-template)
  * Deno, Vite, React による構成 ([vite-deno-plugin](https://github.com/anatoo/vite-deno-plugin) を使った)
  * Routing Library として [wouter](https://github.com/molefrog/wouter)
  * UI Library として [Chakra UI](https://chakra-ui.com)
  * 全体的に [jotai](https://jotai.org), [jotai-tanstack-query](https://github.com/jotaijs/jotai-tanstack-query) を活用してAPI通信のキャッシュなど行っている
  * [react-if](https://www.npmjs.com/package/react-if) は便利なので皆使ってほしい
* [deno-hono-api-template](https://github.com/neumann-tokyo/deno-hono-api-template)
  * [Hono](https://hono.dev) による RESTful API サーバー
    * RPC も使いたかったけど今回は汎用性を考えて不採用
  * PostgreSQL
  * [migrate](https://github.com/golang-migrate/migrate) によるマイグレーション管理
  * [kysely](https://kysely.dev) による SQL ビルディング
    * Deno でも [kysely-codegen](https://github.com/RobinBlomberg/kysely-codegen) がなんとか動いた
  * [djwt](https://deno.land/x/djwt@v3.0.2) による JWT 認証
  * [deno_mocha](https://github.com/aaronhuggins/deno_mocha) によるテスト
    * deno test では afterAll などにバグがあったため
  * [zod](https://zod.dev) によるバリデーション
* 共通
  * VS Code Devcontainer で開発できるようにしてある
  * Linter, Formatter に [Biome](https://biomejs.dev) を使用。 Biome は速くてよい
  * [spacetime](https://github.com/spencermountain/spacetime) 便利

## 機能

* email/password によるサインイン
* 多言語対応 ( i18n )
* タイムゾーンや日付の表示形式の変更
* ダークモード
* 認可 (Roles, Permissions)
* Todo リスト (CRUD のサンプルとして)
* 招待 URL によるサインアップ
* 各種テスト (frontend 側が途中)

## 設計的な部分

### email/password によるサインイン

JWT による email / password サインイン。
特筆することはないけど、 [Hono の middleware の jwt](https://hono.dev/middleware/builtin/jwt) がなんとなく使いづらかったので
[djwt](https://deno.land/x/djwt@v3.0.2) というライブラリで自作した。
djwt はシークレットキー以外にも公開鍵秘密鍵での JWT の sign/verify が出来たのでそれを採用してみた。

[generate-jwt-key.ts](https://github.com/neumann-tokyo/deno-hono-api-template/blob/main/tools/generate-jwt-key.ts) を用意したのでこれで鍵が作れる。

### 多言語対応 ( i18n )

色々ライブラリを調べたけど、結果的には jotai を活用して単語帳を作ることにした。

* [英語日本語の対応表](https://github.com/neumann-tokyo/deno-vite-react-template/blob/main/src/atoms/i18n/japanese-messages.ts)

この単語帳を次のコンポーネントで扱えるようにする

* [Trans](https://github.com/neumann-tokyo/deno-vite-react-template/blob/main/src/components/trans.tsx)

```js
<Trans>Hello</Trans>
```

みたいにすると単語帳に `Hello` に対する単語があれば日本語に変換してくれるし、なければ英語のまま表示する。

一応、 [printf](https://www.npmjs.com/package/fast-printf) のフォーマットで変数も埋め込めるようにした。

### タイムゾーンや日付の表示形式の変更

これもライブラリを使わず自作。

[spacetime](https://github.com/spencermountain/spacetime) にタイムゾーン変換やフォーマット機能があるので
その入力方式をフロント側で設定してバック側でDBに保存するというシンプルな方式。

これも便利コンポーネントを用意しておいた。

* [datetime-format.tsx](https://github.com/neumann-tokyo/deno-vite-react-template/blob/main/src/components/datetime-format.tsx)
* [datetime-format-select.tsx](https://github.com/neumann-tokyo/deno-vite-react-template/blob/main/src/components/datetime-format-select.tsx)
* [timezone-select.tsx](https://github.com/neumann-tokyo/deno-vite-react-template/blob/main/src/components/timezone-select.tsx)

### ダークモード

[Chakra UI](https://chakra-ui.com) のダークモード機能に乗っかっているが、これは Cookie とかに記録する方式なので DB 保存でも良い気がする。

### 認可 (Roles, Permissions)

認可も最近はライブラリを使わず DB のテーブル構成でなんとかしている。

[マイグレーションファイル](https://github.com/neumann-tokyo/deno-hono-api-template/blob/main/db/migrations/2024022701_initialize.up.sql) をみると DB
の作りがわかると思うのだが、

users -> users_roles -> roles -> roles_permissions -> permissions

というリレーションがある。
機能名を permissions テーブルに設定しておいて、それを roles に割り当てる。
users には roles を割り当て、 permissions は直接見ないようにする。
これにより、「ユーザーにはロールを割り当てる」「ロールには権限を割り当てる」という構造ができ、
認可を管理しやすくなる。

これは UI を見たほうがわかりやすいかもしれない。

![users_roles](/img/posts/202405171328/users_roles.png)
![roles_permissions](/img/posts/202405171328/roles_permissions.png)

サーバー側では次のように [permissionChecker](https://github.com/neumann-tokyo/deno-hono-api-template/blob/main/src/middleware/permission-checker.ts) という middleware で permission 名を指定しておいて、 サインイン中のユーザーがその permission を持っていなければ機能が使えないようにしている。

```js
app.post("/", permissionChecker("todos"), async (c) => {
  //...
})
```

フロント側も [Can](https://github.com/neumann-tokyo/deno-vite-react-template/blob/main/src/components/can.tsx) というコンポーネントで同じようなことができるようにした。

### Todo リスト (CRUD のサンプルとして)

CRUD のサンプルのつもりで簡単な TODO リスト機能を作っておいたけど、結構認可とかユーザー設定のほうも
CRUD が多くなったのでそっち見たほうがいいかもしれない。

### 招待 URL によるサインアップ

![invitations](/img/posts/202405171328/invitations.png)

discord みたいにトークン付きの URL からサインアップできるようにしてある。

「コピー」ボタンをクリックすると招待URLをコピーできて、これを招待したい人に渡す。

トークンが有効であれば、サインアップ画面が出てくる。

![sign up](/img/posts/202405171328/sign_up.png)

### 各種テスト (frontend 側が途中)

サーバー側は models と routes のテストを書いてある。

* [test](https://github.com/neumann-tokyo/deno-hono-api-template/tree/main/test)

Deno の標準の Test 機能で十分かと思ったが AfterAll 系の callback 処理で不具合があって、
async がからむとうまく動かなかったので、 [deno_mocha](https://github.com/aaronhuggins/deno_mocha) を使うことにした。
今のところ大丈夫そう。

frontend 側のテストも [vitest](https://vitest.dev) + [happy-dom](https://github.com/capricorn86/happy-dom) で作るつもりだが、まだ出来ていない。

## まとめ

今後の開発でよく使うであろう機能をとりあえずテンプレートに出来たのは役に立ちそうだ。
色々とオレオレな仕様なので他の人は使いづらいかもしれないが、適当に改造して使ってほしい。

具体的な動かし方とかはもう少し README あたりに記載が必要だと思うので追々対応する予定。

Deno, Hono, Vite, あたりの組み合わせた動かし方は本当に資料が少なくて、今回の
テンプレート公開が誰かの役に立ったら嬉しい。

私は個人的に作っている FAM というシステム (Discord クローンみたいなもの) で
このテンプレートを活用していくつもりだ。
