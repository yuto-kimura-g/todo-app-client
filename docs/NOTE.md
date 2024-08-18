## NOTE
暇なときにQiitaとかZennみたいなところにまとめてもいいかも．以下は書き捨て．最後にまとめてここに移したから，順番もめちゃくちゃ．

- Reactのドキュメントをちゃんと読む
  - <https://ja.react.dev/learn>
  - 大抵のことはここに載っている
  - あとは MDN とか
  - <https://developer.mozilla.org/ja/docs/Web>
- ファイル分割，ファイルの命名とか
  - 調べてたらソフトウェアアーキテクチャに行きついた．レイヤードアーキテクチャとかマイクロサービスアーキテクチャとかクリーンアーキテクチャとか，名前聞いたことあるけどよく分かってないのが沢山．いつかここらへんをちゃんと勉強したいね．（<https://www.oreilly.co.jp//books/9784873119823/> とか？）今回は適当に雰囲気でやった．
- `.env`の型
  - `process.env.HOGE`は`string|undefined`型になるので，使う時に毎回型チェックするの面倒．`config/env.ts`で，`export const HOGE: string = process.env.HOGE || 'default value'` として一応解決．けどこれデプロイする時とかどうするんだろうね？
- App router と page router
  - よく分からんけどおすすめされてた App router を採用
- json-server，顔文字可愛いね `(˶ᵔ ᵕ ᵔ˶)`
  - ほかにもMSW (Mock Service Worker) とか あるらしいけど，Nextに対応してない？とかなんとかで却下．json-server はシンプルで良い．
- 読み込みがとても遅い
  - nextが悪い？何が悪いのか分かんない
  - → 開発者モード (`npm run dev`)だと遅いだけで，`npm run build -> npm run start`したら普通になった．色々監視してて重いのかな．まあ build, startしても `vite`よりは遅い
- list item の key prop
  - <https://ja.react.dev/learn/rendering-lists>
- 関数が2回呼ばれる．→ わざとらしい．なるほど
  - `npm run dev`すると Strict Modeが有効になるのが原因．ビルドして実行すれば良い．
  - <https://ja.react.dev/reference/react/StrictMode>
  - > Strict Mode では、以下のような開発時専用の挙動が有効になります。
    > - コンポーネントは、純粋でない (impure) レンダーによって引き起こされるバグを見つけるために、レンダーを追加で 1 回行います。
    > - コンポーネントは、エフェクトのクリーンアップし忘れによるバグを見つけるために、エフェクトの実行を追加で 1 回行います。
    > - コンポーネントが非推奨の API を使用していないかチェックします。
  - <https://ja.react.dev/reference/react/useReducer>
  - > Strict Mode では、React は純粋でない関数を見つけやすくするために、リデューサと初期化関数を 2 回呼び出します。これは開発時の動作であり、本番には影響しません。リデューサと初期化関数が純粋であれば（そうあるべきです）、これはロジックに影響しません。片方の呼び出しの結果は無視されます。
- propsのバケツリレー
  - <https://ja.react.dev/learn/scaling-up-with-reducer-and-context>
  - reducerとcontextを使う
- reducer(state, action): state の内部で async できない
  - 解決案：<https://stackoverflow.com/questions/65876577/usereducer-typescript-on-a-async-maner>
  - dispatch(async fetch) じゃなくて， async fetch(dispatch) する
- `Error: async/await is not yet supported in Client Components, only Server Components. This error is often caused by accidentally adding 'use client' to a module that was originally written for the server.`
  - 一番外側のコンポーネントはasyncじゃだめらしい．内側でasyncするのはok．
    つまり，
    ```tsx
    'use client'
    const F = async () => {
      const G = async () => {
        await fetch()
      }
    }
    ```
    はだめだけど
    ```tsx
    'use client'
    const F = () => {
      const G = async () => {
        await fetch()
      }
    }
    ```
    ならok．
  - コンポーネント以外は関係無さそう．`utils/`とか．
- `event.preventDefault();`
  - デフォルトの振る舞いをキャンセルする
- `console....`
  - `console.log`だけじゃなくてたくさんある．
  - `table`とか`time`とか便利．
  - <https://developer.mozilla.org/ja/docs/Web/API/console>
- `<Input></Input>`の`value={}`
  - これを指定しないと，入力フォームがバグる（値が残る）．
- スクロールバーのカスタム
  - 見た目が悪いから変えたかったけど無理だった
  - ChatGPTに聞いたら`::-webkit-scrollbar-thumb`でできそうなんだけどなぁ...
- CORS
  - これはサーバー側で対処する問題
  - <https://fetch.spec.whatwg.org/#cors-protocol>
  - preflight requestとか，ちゃんと理解できてない
- useEffect
  - ほえ～なんか調べたらいろいろ出てきた
  - 結局今回は使ってない（context, reducerだけ）
  - <https://zenn.dev/uhyo/articles/useeffect-taught-by-extremist>
  - <https://ja.react.dev/reference/react/useEffect#fetching-data-with-effects>
- Headingで取り消し線と３点ドット
  - 長いタイトルと長い説明は３点ドットで省略したい
  - is_done = trueの時，文字に取り消し線を入れたい
  - この二つを共存させようと頑張ったけど無理だった
    ３点ドットは
    ```tsx
    whiteSpace={'nowrap'}
    overflow={'hidden'}
    textOverflow={'ellipsis'}
    ```
    で上手くいくし，取り消し線は
    ```tsx
    as={'del'}
    ```
    でいいんだけど，`inline-box`?がなんたらで上手くいかない．CSSよく分からん．
- `use client`
  - なんか適当に付けてたけど，次はちゃんと理解したい
  - <https://nextjs.org/docs/app/building-your-application/rendering/client-components>
