---
title: 最強ターミナル
date: 2026-03-27 03:53:31
ogimage: /img/posts/202603270353_the-gratest-terminal.png
tags:
  - Tech
---

![ターミナル](/img/posts/202603270353/ghostty.png)

《香月|/img/kitsune-kamen.jpg|最強のターミナルが出来たよ》

《はるか|/img/characters/haruka/normal.jpg|なんか格好いいです！》

《香月|/img/kitsune-kamen.jpg|使っているソフトはこんな感じだよ》

- ターミナル: [ghostty](https://ghostty.org/)
  - yazi で画像を表示できるターミナル
- 分割: [tmux](https://github.com/tmux/tmux) + [tmuxp](https://github.com/tmux-python/tmuxp)
  - tmuxは画面分割の定番
  - tmuxp は session を yaml ファイルで管理できるツール
- TUI ファイルマネージャー: [yazi](https://github.com/sxyazi/yazi)
  - nnn とか ranger で苦労していたのは何だったのかと思うほど楽
- GIT クライアント: [lazygit](https://github.com/jesseduffield/lazygit)
  - 正直あまり使いこなせてないけど便利
- TUI エディタ: [fresh](https://getfresh.dev/)
  - VS Code っぽい TUI エディタ
  - 最近は VSCodium と fresh を併用している
  - まだプラグインがないのが残念だが、そこそこ使える
- ディレクトリ間移動: [enhancd](https://github.com/babarot/enhancd) + [fzf](https://github.com/junegunn/fzf)
  - ディレクトリ間をめちゃくちゃ便利に移動できるツール
  - enhancd は便利なのでもっと知名度上がってほしい
- ファイル閲覧: [bat](https://github.com/sharkdp/bat/)
  - cat の改善版。Syntax Highlight がつく
- 削除: [safe-rm](https://launchpad.net/safe-rm)
  - ゴミ箱に入れてくれる
