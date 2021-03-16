import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginLeft: '5rem',
        marginRight: '5rem',
        marginTop: '1rem',
        marginBottom: '3rem',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
const Terms = () => {
    const classes = useStyles()
    const defineWords = {
        me: '当方',
        myService: '本サービス',
        domain: 'question-chain.herokuapp.com',
        user: '登録ユーザー'
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <Typography style={{ textAlign: 'left' }}>
                            本利用規約（以下「本規約」と言います。）には、本サービスの提供条件及び本サービス運営者（以下「{defineWords.me}」と言います。）と{defineWords.user}の皆様との間の権利義務関係が定められています。<br />
                            本サービスの利用に際しては、本規約の全文をお読みいただいたうえで、本規約に同意いただく必要があります。
                            <h1>第一条 （適用）</h1>
                            <div>
                                1.	本規約は、本サービスの提供条件及び本サービスの利用に関する{defineWords.me}と{defineWords.user}との間の権利義務関係を定めることを目的とし、<br />
                                {defineWords.user}と{defineWords.me}との間の本サービスの利用に関わる一切の関係に適用されます。<br />
                                {/* 2.	{defineWords.me}が{defineWords.me}ウェブサイト上で掲載する本サービス利用に関するルール（http://.......）は、本規約の一部を構成するものとします。<br />
                                3.	本規約の内容と、前項のルールその他の本規約外における本サービスの説明等とが異なる場合は、本規約の規定が優先して適用されるものとします。<br /> */}
                            </div>
                            <h1>第2条（定義）</h1>
                            <div>
                                本規約において使用する以下の用語は、各々以下に定める意味を有するものとします。
                            </div>
                            <div>
                                (1)	「サービス利用契約」とは、本規約を契約条件として当局と{defineWords.user}の間で締結される、本サービスの利用契約を意味します。<br />
                                (2)	「知的財産権」とは、著作権、特許権、実用新案権、意匠権、商標権その他の知的財産権（それらの権利を取得し、またはそれらの権利につき登録等を出願する権利を含みます。）を意味します。<br />
                                (3)	「投稿データ」とは、{defineWords.user}が本サービスを利用して投稿その他送信するコンテンツ（文章、画像、動画その他のデータを含みますがこれらに限りません。）を意味します。<br />
                                (4)	「{defineWords.me}」とは、本サービス運営者を意味します。<br />
                                (5)	「{defineWords.me}ウェブサイト」とは、そのドメインが「【question-chain.herokuapp.com】」である、<br />
                                {defineWords.me}が運営するウェブサイト（理由の如何を問わず、{defineWords.me}のウェブサイトのドメインまたは内容が変更された場合は、当該変更後のウェブサイトを含みます。）を意味します。<br />
                                (6)	「{defineWords.user}」とは、第3条（登録）に基づいて本サービスの利用者としての登録がなされた個人または法人を意味します。<br />
                                (7)	「本サービス」とは、{defineWords.me}が提供する【Question-chain】という名称のサービス（理由の如何を問わずサービスの名称または内容が変更された場合は、当該変更後のサービスを含みます。）を意味します。<br />
                            </div>
                            <h1>第3条（登録）</h1>
                            <div>
                                1.	本サービスの利用を希望する者（以下「登録希望者」といいます。）は、本規約を遵守することに同意し、<br />
                                かつ{defineWords.me}の定める一定の情報（以下「登録事項」といいます。）を{defineWords.me}の定める方法で{defineWords.me}に提供することにより、{defineWords.me}に対し、本サービスの利用の登録を申請することができます。<br />
                                2.	{defineWords.me}は、{defineWords.me}の基準に従って、第１項に基づいて登録申請を行った登録希望者（以下「登録申請者」といいます。）の登録の可否を判断し、{defineWords.me}が登録を認める場合にはその旨を登録申請者に通知します。<br />
                                登録申請者の{defineWords.user}としての登録は、{defineWords.me}が本項の通知を行ったことをもって完了したものとします。<br />
                                3.	前項に定める登録の完了時に、サービス利用契約が{defineWords.user}と{defineWords.me}の間に成立し、{defineWords.user}は本サービスを本規約に従い利用することができるようになります。<br />
                                4.	{defineWords.me}は、登録申請者が、以下の各号のいずれかの事由に該当する場合は、登録及び再登録を拒否することがあり、またその理由について一切開示義務を負いません。<br />
                                (1)	{defineWords.me}に提供した登録事項の全部または一部につき虚偽、誤記または記載漏れがあった場合<br />
                                (2)	未成年者、成年被後見人、被保佐人または被補助人のいずれかであり、法定代理人、後見人、保佐人または補助人の同意等を得ていなかった場合<br />
                                (3)	反社会的勢力等（暴力団、暴力団員、右翼団体、反社会的勢力、その他これに準ずる者を意味します。以下同じ。）である、<br />
                                または資金提供その他を通じて反社会的勢力等の維持、運営もしくは経営に協力もしくは関与する等反社会的勢力等との何らかの交流もしくは関与を行っていると<br />
                                {defineWords.me}が判断した場合<br />
                                (4)	過去{defineWords.me}との契約に違反した者またはその関係者であると{defineWords.me}が判断した場合<br />
                                (5)	第10条に定める措置を受けたことがある場合<br />
                                (6)	その他、登録を適当でないと{defineWords.me}が判断した場合<br />
                            </div>

                            <h1>第4条（登録事項の変更）</h1>
                            <div>
                                {defineWords.user}は、登録事項に変更があった場合、{defineWords.me}の定める方法により当該変更事項を遅滞なく{defineWords.me}に通知するものとします。
                            </div>
                            <h1>第5条（パスワード及びユーザーIDの管理）</h1>
                            <div>
                                1.	{defineWords.user}は、自己の責任において、本サービスに関するパスワード及びユーザーIDを適切に管理及び保管するものとし、<br />
                                これを第三者に利用させ、または貸与、譲渡、名義変更、売買等をしてはならないものとします。<br />
                                2.	パスワードまたはユーザーIDの管理不十分、使用上の過誤、第三者の使用等によって生じた損害に関する責任は{defineWords.user}が負うものとします。<br />
                            </div>
                            <h1>第6条（料金及び支払方法）</h1>
                            <div>
                                1.	{defineWords.user}は、本サービス利用の対価として、別途{defineWords.me}が定め、{defineWords.me}ウェブサイトに表示する利用料金を、{defineWords.me}が指定する支払方法により{defineWords.me}に支払うものとします。<br />
                                2.	{defineWords.user}が利用料金の支払を遅滞した場合、{defineWords.user}は年14.6％の割合による遅延損害金を{defineWords.me}に支払うものとします。<br />
                            </div>

                            <h1>第7条（禁止事項）</h1>
                            <div>
                                {defineWords.user}は、本サービスの利用にあたり、以下の各号のいずれかに該当する行為または該当すると{defineWords.me}が判断する行為をしてはなりません。<br />
                                (1)	法令に違反する行為または犯罪行為に関連する行為<br />
                                (2)	{defineWords.me}、本サービスの他の利用者またはその他の第三者に対する詐欺または脅迫行為<br />
                                (3)	公序良俗に反する行為<br />
                                (4)	{defineWords.me}、本サービスの他の利用者またはその他の第三者の知的財産権、肖像権、プライバシーの権利、名誉、その他の権利または利益を侵害する行為<br />
                                (5)	本サービスを通じ、以下に該当し、または該当すると{defineWords.me}が判断する情報を{defineWords.me}または本サービスの他の利用者に送信すること<br />
                                ・過度に暴力的または残虐な表現を含む情報<br />
                                ・コンピューター・ウィルスその他の有害なコンピューター・プログラムを含む情報<br />
                                ・{defineWords.me}、本サービスの他の利用者またはその他の第三者の名誉または信用を毀損する表現を含む情報<br />
                                ・過度にわいせつな表現を含む情報<br />
                                ・差別を助長する表現を含む情報<br />
                                ・自殺、自傷行為を助長する表現を含む情報<br />
                                ・薬物の不適切な利用を助長する表現を含む情報<br />
                                ・反社会的な表現を含む情報<br />
                                ・チェーンメール等の第三者への情報の拡散を求める情報<br />
                                ・他人に不快感を与える表現を含む情報<br />
                                (6)	本サービスのネットワークまたはシステム等に過度な負荷をかける行為<br />
                                (7)	{defineWords.me}が提供するソフトウェアその他のシステムに対するリバースエンジニアリングその他の解析行為<br />
                                (8)	本サービスの運営を妨害するおそれのある行為<br />
                                (9)	{defineWords.me}のネットワークまたはシステム等への不正アクセス<br />
                                (10)第三者に成りすます行為<br />
                                (11)本サービスの他の利用者のIDまたはパスワードを利用する行為<br />
                                (12){defineWords.me}が事前に許諾しない本サービス上での宣伝、広告、勧誘、または営業行為<br />
                                (13)本サービスの他の利用者の情報の収集<br />
                                (14){defineWords.me}、本サービスの他の利用者またはその他の第三者に不利益、損害、不快感を与える行為<br />
                                {/* (15){defineWords.me}ウェブサイト上で掲載する本サービス利用に関するルール（http://.......）に抵触する行為<br /> */}
                                (15)反社会的勢力等への利益供与<br />
                                (16)面識のない異性との出会いを目的とした行為<br />
                                (17)前各号の行為を直接または間接に惹起し、または容易にする行為<br />
                                (18)前各号の行為を試みること<br />
                                (19)その他、{defineWords.me}が不適切と判断する行為<br />
                            </div>
                            <h1>第8条（本サービスの停止等）</h1>
                            <div>
                                {defineWords.me}は、以下のいずれかに該当する場合には、{defineWords.user}に事前に通知することなく、本サービスの全部または一部の提供を停止または中断することができるものとします。<br />
                                (1)	本サービスに係るコンピューター・システムの点検または保守作業を緊急に行う場合<br />
                                (2)	コンピューター、通信回線等の障害、誤操作、過度なアクセスの集中、不正アクセス、ハッキング等により本サービスの運営ができなくなった場合<br />
                                (3)	地震、落雷、火災、風水害、停電、天災地変などの不可抗力により本サービスの運営ができなくなった場合<br />
                                (4)	その他、{defineWords.me}が停止または中断を必要と判断した場合<br />
                            </div>
                            <h1>第9条（権利帰属）</h1>
                            <div>
                                1.	{defineWords.me}ウェブサイト及び本サービスに関する知的財産権は全て{defineWords.me}または{defineWords.me}にライセンスを許諾している者に帰属しており、<br />
                                本規約に基づく本サービスの利用許諾は、{defineWords.me}ウェブサイトまたは本サービスに関する{defineWords.me}または{defineWords.me}にライセンスを許諾している者の知的財産権の使用許諾を意味するものではありません。<br />
                                2.	{defineWords.user}は、投稿データについて、自らが投稿その他送信することについての適法な権利を有していること、及び投稿データが第三者の権利を侵害していないことについて、{defineWords.me}に対し表明し、保証するものとします。<br />
                                3.	{defineWords.user}は、投稿データについて、{defineWords.me}に対し、世界的、非独占的、無償、サブライセンス可能かつ譲渡可能な使用、複製、配布、派生著作物の作成、表示及び実行に関するライセンスを付与します。<br />
                                また、他の{defineWords.user}に対しても、本サービスを利用して{defineWords.user}が投稿その他送信した投稿データの使用、複製、配布、派生著作物を作成、表示及び実行することについての非独占的なライセンスを付与します。<br />
                                4.	{defineWords.user}は、{defineWords.me}及び{defineWords.me}から権利を承継しまたは許諾された者に対して著作者人格権を行使しないことに同意するものとします。<br />
                            </div>
                            <h1>第10条（登録抹消等）</h1>
                            <div>
                                1.	{defineWords.me}は、{defineWords.user}が、以下の各号のいずれかの事由に該当する場合は、事前に通知または催告することなく、投稿データを削除もしくは非表示にし、<br />
                                当該{defineWords.user}について本サービスの利用を一時的に停止し、または{defineWords.user}としての登録を抹消することができます。<br />
                                (1)	本規約のいずれかの条項に違反した場合<br />
                                (2)	登録事項に虚偽の事実があることが判明した場合<br />
                                (3)	支払停止もしくは支払不能となり、または破産手続開始、民事再生手続開始、会社更生手続開始、特別清算開始若しくはこれらに類する手続の開始の申立てがあった場合<br />
                                (4)	【6】ヶ月以上本サービスの利用がない場合<br />
                                (5)	{defineWords.me}からの問い合わせその他の回答を求める連絡に対して【30日】間以上応答がない場合<br />
                                (6)	第3条第4項各号に該当する場合<br />
                                (7)	その他、{defineWords.me}が本サービスの利用または{defineWords.user}としての登録の継続を適当でないと判断した場合<br />
                                2.	前項各号のいずれかの事由に該当した場合、{defineWords.user}は、{defineWords.me}に対して負っている債務の一切について当然に期限の利益を失い、直ちに{defineWords.me}に対して全ての債務の支払を行わなければなりません。<br />
                            </div>
                            <h1>第11条（退会）</h1>
                            <div>
                                1.	{defineWords.user}は、{defineWords.me}所定の手続の完了により、本サービスから退会し、自己の{defineWords.user}としての登録を抹消することができます。<br />
                                2.	退会にあたり、{defineWords.me}に対して負っている債務が有る場合は、{defineWords.user}は、{defineWords.me}に対して負っている債務の一切について当然に期限の利益を失い、直ちに{defineWords.me}に対して全ての債務の支払を行わなければなりません。<br />
                                3.	退会後の利用者情報の取扱いについては、第15条の規定に従うものとします。<br />
                            </div>
                            <h1>第12条（本サービスの内容の変更、終了）</h1>
                            <div>
                                1.	{defineWords.me}は、{defineWords.me}の都合により、本サービスの内容を変更し、または提供を終了することができます。<br />
                                2.	{defineWords.me}が本サービスの提供を終了する場合、{defineWords.me}は{defineWords.user}に事前に通知するものとします。<br />
                            </div>
                            <h1>第13条（保証の否認及び免責）</h1>
                            <div>
                                1.	{defineWords.me}は、本サービスが{defineWords.user}の特定の目的に適合すること、期待する機能・商品的価値・正確性・有用性を有すること、<br />
                                {defineWords.user}による本サービスの利用が{defineWords.user}に適用のある法令または業界団体の内部規則等に適合すること、<br />
                                継続的に利用できること、及び不具合が生じないことについて、明示又は黙示を問わず何ら保証するものではありません。<br />
                                2.	{defineWords.me}は、本サービスに関して{defineWords.user}が被った損害につき、過去【12ヶ月】間に{defineWords.user}が{defineWords.me}に支払った対価の金額を超えて賠償する責任を負わないものとし、<br />
                                また、付随的損害、間接損害、特別損害、将来の損害及び逸失利益にかかる損害については、賠償する責任を負わないものとします。<br />
                                3.	本サービスまたは{defineWords.me}ウェブサイトに関連して{defineWords.user}と他の{defineWords.user}または第三者との間において生じた取引、連絡、紛争等については、{defineWords.user}が自己の責任によって解決するものとします。<br />
                            </div>
                            <h1>第14条（秘密保持）</h1>
                            <div>
                                {defineWords.user}は、本サービスに関連して{defineWords.me}が{defineWords.user}に対して秘密に取扱うことを求めて開示した非公知の情報について、<br />
                                {defineWords.me}の事前の書面による承諾がある場合を除き、秘密に取扱うものとします。<br />
                            </div>
                            <h1>第15条（利用者情報の取扱い）</h1>
                            <div>
                                1.	{defineWords.me}による{defineWords.user}の利用者情報の取扱いについては、別途{defineWords.me}プライバシーポリシー（https://{defineWords.domain}/privacypolicy）の定めによるものとし、<br />
                                {defineWords.user}はこのプライバシーポリシーに従って{defineWords.me}が{defineWords.user}の利用者情報を取扱うことについて同意するものとします。<br />
                                2.	{defineWords.me}は、{defineWords.user}が{defineWords.me}に提供した情報、データ等を、個人を特定できない形での統計的な情報として、{defineWords.me}の裁量で、利用及び公開することができるものとし、<br />
                                {defineWords.user}はこれに異議を唱えないものとします。<br />
                            </div>
                            <h1>第16条（本規約等の変更）</h1>
                            <div>
                                {defineWords.me}は、{defineWords.me}が必要と認めた場合は、本規約を変更できるものとします。<br />
                                本規約を変更する場合、変更後の本規約の施行時期及び内容を{defineWords.me}ウェブサイト上での掲示その他の適切な方法により周知し、または{defineWords.user}に通知します。、<br />
                                但し、法令上{defineWords.user}の同意が必要となるような内容の変更の場合は、{defineWords.me}所定の方法で{defineWords.user}の同意を得るものとします。、<br />
                            </div>
                            <h1>第17条（連絡／通知）</h1>
                            <div>
                                1.	本サービスに関する問い合わせその他{defineWords.user}から{defineWords.me}に対する連絡または通知、及び本規約の変更に関する通知その他{defineWords.me}から{defineWords.user}に対する連絡または通知は、{defineWords.me}の定める方法で行うものとします。<br />
                                2.	{defineWords.me}が登録事項に含まれるメールアドレスその他の連絡先に連絡または通知を行った場合、{defineWords.user}は当該連絡または通知を受領したものとみなします。<br />
                            </div>
                            <h1>第18条（サービス利用契約上の地位の譲渡等）</h1>
                            <div>
                                1.	{defineWords.user}は、{defineWords.me}の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務につき、第三者に対し、譲渡、移転、担保設定、その他の処分をすることはできません。<br />
                                2.	{defineWords.me}は本サービスにかかる事業を他社に譲渡した場合には、当該事業譲渡に伴い利用契約上の地位、本規約に基づく権利及び義務並びに{defineWords.user}の登録事項その他の顧客情報を当該事業譲渡の譲受人に譲渡することができるものとし、{defineWords.user}は、かかる譲渡につき本項において予め同意したものとします。<br />
                                なお、本項に定める事業譲渡には、通常の事業譲渡のみならず、会社分割その他事業が移転するあらゆる場合を含むものとします。<br />
                            </div>
                            <h1>第19条（分離可能性）</h1>
                            <div>
                                本規約のいずれかの条項またはその一部が、消費者契約法その他の法令等により無効または執行不能と判断された場合であっても、<br />
                                本規約の残りの規定及び一部が無効または執行不能と判断された規定の残りの部分は、継続して完全に効力を有するものとします。<br />
                            </div>
                            <h1>第20条（準拠法及び管轄裁判所）</h1>
                            <div>
                                1.	本規約及びサービス利用契約の準拠法は日本法とします。<br />
                                2.	本規約またはサービス利用契約に起因し、または関連する一切の紛争については、神戸地方裁判所を第一審の専属的合意管轄裁判所とします。<br />
                            </div>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>

    )
}

export default Terms