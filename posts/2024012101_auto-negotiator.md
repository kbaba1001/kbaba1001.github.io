---
title: 自動交渉のライブラリを作った
date: 2024-01-21
description:
ogimage: /img/posts/2024012101_auto-negotiator.png
tags:
  - Tech
---

[Auto Negotiator](https://github.com/neumann-tokyo/auto_negotiator)
というライブラリを TypeScript で作った。

npm package はこちら:
[auto_negotiator](https://www.npmjs.com/package/auto_negotiator)

## 自動交渉の概要

自動交渉については ↓
の記事などがわかりやすい（というかこれ以外あんまなかった）。

[自動交渉 AI から見る"AI 同士がつながる世界"](https://engineering.mercari.com/blog/entry/2017-12-07-103000/)

自動交渉は交渉を行うエージェントを数体作成して、それらのエージェントの希望を考慮しつつ満場一致になる選択肢を導き出すというもの。

例えば、夕食のメニューを考えるときに、

- 主食
  - ご飯
  - パン
  - 麺
- メインディッシュ
  - ステーキ
  - 魚
  - チキン

みたいな選択肢があって、エージェント A は
`{主食: ご飯, メインディッシュ: ステーキ}` がよく、エージェント B は
`{主食: ご飯, メインディッシュ: 魚}`
がよいという意見を持っている場合に、エージェント A, B
がある程度納得して同意（満場一致）できる献立を考えるというもの。

## プログラムでの表現

自動交渉を行うには、エージェントとトピックが必要だ。
ライブラリの本体とは別にサンプルコードも用意したので、以下はサンプルコードを元にして説明する。

### トピック

まずトピックについて説明する。

[https://github.com/neumann-tokyo/auto_negotiator/blob/main/sample/topic/dinner/agent1.ts](https://github.com/neumann-tokyo/auto_negotiator/blob/main/sample/topic/dinner/agent1.ts)

```typescript
import { Topic } from "../../../src/types";

export const topic: Topic = {
  name: "Dinner",
  description: "What should we have dinner?",
  discount_factor: 0.1,
  reservation: 0.3,
  issues: [
    {
      name: "Staple food",
      weight: 0.3,
      items: [
        {
          name: "Rice",
          evaluation: 7,
        },
        {
          name: "Noodles",
          evaluation: 2,
        },
        {
          name: "Bread",
          evaluation: 1,
        },
      ],
    },
    {
      name: "Main dish",
      weight: 0.7,
      items: [
        {
          name: "Steak",
          evaluation: 1,
        },
        {
          name: "Fish",
          evaluation: 1,
        },
        {
          name: "Chicken",
          evaluation: 8,
        },
      ],
    },
  ],
};
```

上記のように夕食の献立というトピックにたいして、どのような意見を持っているかを決める。
まず、この agent1 は主食 (Staple food) とメインディッシュ (Main dish)
に対して、それぞれ 0.3 と 0.7 の重み (weight) をつけている。 weight
は全体で合計が 1.0 になるように設定する必要があり、どの issue
に大して優先したいかを示す。 ようするに、 agent1 はメインディッシュに関して 70%
優先したいと考えている。逆に言えば主食に関しては譲歩しやすい。

```
  name: "Staple food",
  weight: 0.3,

  name: "Main dish",
  weight: 0.7,
```

次に、issue の中について見てみると `items` に選択肢として Rice, Noodles, Bread
があり、その evaluation が 7, 2, 1 となっている。 evaluation については Integer
でどのような数値を置いても良いが、合計が 10 や 100
になるようにするとわかりやすい。
（内部で処理する際はこの数値に重みを付けて正規化する）

```typescript
{
  name: "Staple food",
  weight: 0.3,
  items: [
    {
      name: "Rice",
      evaluation: 7,
    },
    {
      name: "Noodles",
      evaluation: 2,
    },
    {
      name: "Bread",
      evaluation: 1,
    },
  ],
},
```

evaluation
の値が大きいほどその選択肢にしたいという意思が強くなるため、上記の場合では
agent1 は Rice を食べたいという意思が強いことがわかる。

### エージェント

エージェントは他のエージェントからの提案やトピックを元にしてどのように自分の意見を主張していくかを決定づけるものだ。

ソースコードを元に説明する。

[https://github.com/neumann-tokyo/auto_negotiator/blob/main/sample/agents/sample-agent.ts](https://github.com/neumann-tokyo/auto_negotiator/blob/main/sample/agents/sample-agent.ts)

```typescript
import * as helper from "../../src/helper";
import * as types from "../../src/types";

// この関数は試行のたびに呼び出される。
// 引数には全体の状況や自分のトピックがはいってきて、自分の意見を返すとそれが他のエージェントにも伝わる。
export function sampleAgent({
  data: { id, attempts, attemptsCount },
  normalizedTopic,
}: types.ActionFnParams): types.ActionFnResponse {
  // 現在の試行における他のエージェントからの提案などがはいっている
  const currentAttempt = helper.currentAttempt({ id, attempts });

  // 試行回数を元にして譲歩値を設定する。 1.0 - progress なので徐々に譲歩値は下がっていく。
  // つまり、他からの意見に同意しやすくなる
  const progress = helper.progress({ id, attemptsCount });
  const concessionValue = 1.0 - progress;

  for (const status of currentAttempt) {
    if (status.type === types.AtemptType.Offer) {
      const anotherConcessionValue = helper.choicesToConcessionValue({
        choices: status.choices,
      });

      // 相手からの提案のほうが自分の譲歩値より高いのであれば同意する
      if (concessionValue < anotherConcessionValue) {
        return {
          id,
          choices: status.choices,
          concessionValue: anotherConcessionValue,
          type: types.AtemptType.Accept,
        };
      }
    }
  }

  // 同意できない場合に自分の意見を作成する
  const { choices, threshold } = helper.concessionValueToChoices({
    normalizedTopic,
    concessionValue,
  });
  return {
    id,
    choices,
    concessionValue,
    type: types.AtemptType.Offer,
  };
}
```

上記はエージェントのサンプルでしかなく、もっと自由に作って良い。

### 自動交渉の実行

最後はエージェントとトピックを元にして自動交渉を行う。

[https://github.com/neumann-tokyo/auto_negotiator/blob/main/sample/run.ts](https://github.com/neumann-tokyo/auto_negotiator/blob/main/sample/run.ts)

```typescript
import { prettyPrint } from "../src/helper";
import * as negotiator from "../src/index";
import { sampleAgent } from "./agents/sample-agent";
import { topic as agent1Topic } from "./topic/dinner/agent1";
import { topic as agent2Topic } from "./topic/dinner/agent2";
import { topic as agent3Topic } from "./topic/dinner/agent3";

// これは任意の値を設定して良い
const channelName = "dinner";

// エージェントとそのトピックを登録する
negotiator.defineAgent({
  channelName: channelName,
  agentName: "agent1",
  topic: agent1Topic,
  actionFn: sampleAgent,
});
negotiator.defineAgent({
  channelName: channelName,
  agentName: "agent2",
  topic: agent2Topic,
  actionFn: sampleAgent,
});
negotiator.defineAgent({
  channelName: channelName,
  agentName: "agent3",
  topic: agent3Topic,
  actionFn: sampleAgent,
});

// 自動交渉を行う。試行回数（attemptsCount）は 30 回、エージェント数 (agentsCount) は 3 体
const result = negotiator.negotiate({
  channelName,
  attemptsCount: 30,
  agentsCount: 3,
});

// 結果の表示
prettyPrint(result);
```

自動交渉の結果は次のようになる。

[https://github.com/neumann-tokyo/auto_negotiator/blob/main/sample/result.json](https://github.com/neumann-tokyo/auto_negotiator/blob/main/sample/result.json)

```json
{
  "isAgreed": true,
  "id": 7,
  "attemptsCount": 8,
  "conclusion": [
    {
      "choices": [
        {
          "issueName": "Staple food",
          "item": {
            "name": "Rice",
            "evaluation": 7,
            "normalizedEvaluation": 0.21000000000000002
          }
        },
        {
          "issueName": "Main dish",
          "item": {
            "name": "Chicken",
            "evaluation": 8,
            "normalizedEvaluation": 0.5599999999999999
          }
        }
      ],
      "concessionValue": 0.7666666666666666,
      "type": "offer",
      "agentName": "agent1"
    },
    {
      "choices": [
        {
          "issueName": "Staple food",
          "item": {
            "name": "Rice",
            "evaluation": 7,
            "normalizedEvaluation": 0.21000000000000002
          }
        },
        {
          "issueName": "Main dish",
          "item": {
            "name": "Chicken",
            "evaluation": 8,
            "normalizedEvaluation": 0.5599999999999999
          }
        }
      ],
      "concessionValue": 0.77,
      "type": "accept",
      "agentName": "agent2"
    },
    {
      "choices": [
        {
          "issueName": "Staple food",
          "item": {
            "name": "Rice",
            "evaluation": 7,
            "normalizedEvaluation": 0.21000000000000002
          }
        },
        {
          "issueName": "Main dish",
          "item": {
            "name": "Chicken",
            "evaluation": 8,
            "normalizedEvaluation": 0.5599999999999999
          }
        }
      ],
      "concessionValue": 0.77,
      "type": "accept",
      "agentName": "agent3"
    }
  ],
  "allAttempts": [
    // 長いので省略
  ]
}
```

`"isAgreed": true` かつ `"attemptsCount": 8` なので 8
回目の試行で同意できたことがわかる。 このとき、主食は Rice メインディッシュは
Chicken で同意したようだ。

## まとめ

まだ細かい不具合や機能追加などを行っている途中なのだが、一応動くものができてきた。
こういう bot がやり取りするようなシステムは初めて作ったので面白かった。

「Agent がメッセージを送り合う」という特性上、それって channel
があれば楽そうだなぁと思った結果、調べたところ Node.js には Channel
機能が組み込まれていた。

[Node.js v21.6.0 - Diagnostics Channel](https://nodejs.org/api/diagnostics_channel.html)

便利になったものだ。go 言語の goroutines とか clojure の core.async
みたいなことが簡易的とはいえ Node.js でできるのはありがたい。
