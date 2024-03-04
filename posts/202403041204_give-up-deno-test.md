---
title: Deno.testを諦めてmochaを入れた
date: 2024-03-04 12:04:55
ogimage: /img/posts/202403041204_give-up-deno-test.png
tags:
  - Tech
---

BDD という概念にうんざりしている（たぶんそういう人多いと思うけど）。 RSpec
で散々やってきた BDD という概念は今となっては何だったのかと思うほどだ。

それはともかく。

最近 Deno で本格的な Web システムを作ろうとしているのだが、
ドキュメントが少ないこともあり結構小さなことで躓くことが多い

テストもその一つ。

そもそも
[Denoにはデフォルトでテストランナーがついている](https://docs.deno.com/runtime/manual/basics/testing/)。
最近は Node
にもテストランナーが搭載されているし、デフォルトで事足りるならそれがいい。

しかし、結果的にはちょっとバグがあってだめだった。

```javascript
Deno.test("database", async (t) => {
  const client = new Client({
    user: "user",
    database: "test",
    hostname: "localhost",
    port: 5432,
  });
  await client.connect();

  await t.step("insert user", async () => {
    const users = await client.queryObject < User >
      ("INSERT INTO users (name) VALUES ('Deno') RETURNING *");
    assertEquals(users.rows.length, 1);
    assertEquals(users.rows[0].name, "Deno");
  });
});
```

こういう `t.step` で `async/await` をするようなコードを書くとうまく動かない。

https://github.com/denoland/deno/issues/15425 によると Windows
の問題かもしれない。 Docker 使っているんだけどなぁ。

まぁこれだけなら `t.step` を使わなければいいだけなのだが、 `afterAll`
的なことをしたくてこの辺の機能もちょっといまいちうまく動いてくれなかった。

この辺は新しい機能のようなのでいったん使うのを諦めて、
[Mocha](https://mochajs.org) を使うことにした。

なぜ Mocha にしたかというと、

- サーバーのテストなのでなるべくシンプルにしたい
- 近頃万能感がある vitest は軽く試した感じ Deno でうまく動かなかったので不採用
- 記法的には [ava](https://github.com/avajs/ava)
  も良さそうだったけど、軽く試した感じ Deno で（省略
- Jest でもいい気がするけど先に Mocha でうまく動いたので試してない

Mocha を使ったことがなかったので知らなかったけどこれは BDD 的な構成と Runner
を提供するだけで Assert はないようなので、 Assert は普通に Deno
の標準のものを使うことにした。

### 補足: DB アクセス

[Kysely](https://kysely.dev) を使っている。
多少ちゃんと動くようになるまで時間がかかったけどなんとかなった。
テストの場合、全てのテストケースが終わった後で明示的に `await db.destroy();`
を呼んでやる必要があった。 こっちの話もそのうち書くかも。
