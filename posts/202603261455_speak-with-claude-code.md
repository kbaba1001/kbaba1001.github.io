---
title: ClaudeCodeに喋らせたら楽しい
date: 2026-03-26 14:55:00
ogimage: /img/posts/202603261455_speak-with-claude-code.png
tags:
  - Tech
---

他の人もやっているようなので真似してみた。

VOICEVOXで適当にサウンドを作って、 Hooksで再生するようにした。

`~/.claude/settings.json` に次を追加

```
   "hooks": {
    "SessionStart": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "aplay start.wav"
          }
        ]
      }
    ],
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "aplay come_on.wav"
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "aplay complete.wav"
          }
        ]
      }
    ]
   }
```

音声はずんだもんボイスで次のような内容にした。

- start.wav ... 「今日は何をするのだ？」
- come_on.wav ... 「ご主人様、ちょっと来てほしいのだ」
- complete.wav ... 「ご主人様、完了したのだ」

## 感想

- ClaudeCode はデフォルトで通知がないので、放置しておいたときに音声で通知が来るようになったのはありがたい。
- 「ずんだもん」とか「あんこもん」とかに喋らせると可愛い
- 単に愛着が湧くだけでなく、実用的

