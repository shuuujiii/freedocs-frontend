import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// 参考 privacy policy
// https://cybozu.co.jp/privacy/privacy-policy/
// 参考 第三者提供 ex. GoogleAnalytics
// https://cybozu.co.jp/privacy/use-thirdparty-service/
// 参考 情報収集モジュールの書き方
// http://apps.dmkt-sp.jp/policy/90000000018.html

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
const PrivacyPolicy = () => {
    const classes = useStyles()
    const defineWords = {
        me: '当方',
        myService: '本サービス',
        domain: 'freedocs.herokuapp.com',
        user: '登録ユーザー'
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <Typography style={{ textAlign: 'left' }}>
                            <div>
                                サービス運営者（以下「{defineWords.me}」といいます。）は、{defineWords.me}の提供するサービス（以下「本サービス」といいます。）における、<br />
                                ユーザーについての個人情報を含む利用者情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。<br />
                            </div>
                            <h1>1.	収集する利用者情報及び収集方法</h1>
                            <div>
                                本ポリシーにおいて、「利用者情報」とは、ユーザーの識別に係る情報、通信サービス上の行動履歴、その他ユーザーまたはユーザーの端末に関連して生成または蓄積された情報であって、本ポリシーに基づき{defineWords.me}が収集するものを意味するものとします。<br />
                                本サービスにおいて{defineWords.me}が収集する利用者情報は、その収集方法に応じて、以下のようなものとなります。<br />
                                <h2>(1) ユーザーからご提供いただく情報</h2>
                                本サービスを利用するために、または本サービスの利用を通じてユーザーからご提供いただく情報は以下のとおりです。<br />
                                <div>
                                    <ul>
                                        {/* <li>メールアドレス、電話番号、住所等連絡先に関する情報</li> */}
                                        {/* <li>クレジットカード情報、銀行口座情報、電子マネー情報等決済手段に関する情報</li> */}
                                        {/* <li>ユーザーの肖像を含む静止画情報</li> */}
                                        <li>入力フォームその他{defineWords.me}が定める方法を通じてユーザーが入力または送信する情報</li>
                                    </ul>
                                </div>
                                {/* <h2>(2)ユーザーが本サービスの利用において、他のサービスと連携を許可することにより、当該他のサービスからご提供いただく情報</h2>
                                ユーザーが、本サービスを利用するにあたり、ソーシャルネットワーキングサービス等の他のサービスとの連携を許可した場合には、<br />
                                その許可の際にご同意いただいた内容に基づき、以下の情報を当該外部サービスから収集します。<br />
                                <div>
                                    <ul>
                                        <li>当該外部サービスでユーザーが利用するID</li>
                                        <li>その他当該外部サービスのプライバシー設定によりユーザーが連携先に開示を認めた情報</li>
                                    </ul>
                                </div> */}
                                <h2>(2)ユーザーが本サービスを利用するにあたって、{defineWords.me}が収集する情報</h2>
                                <div>
                                    {defineWords.me}は、本サービスへのアクセス状況やそのご利用方法に関する情報を収集することがあります。これには以下の情報が含まれます。
                                    <div>
                                        <ul>
                                            {/* <li>リファラ</li> */}
                                            <li>IPアドレス</li>
                                            <li>サーバーアクセスログに関する情報</li>
                                            {/* <li>Cookie、ADID、IDFAその他の識別子</li> */}
                                            <li>Cookie</li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <h1>2.	利用目的</h1>
                            <div>
                                本サービスのサービス提供にかかわる利用者情報の具体的な利用目的は以下のとおりです。<br />
                                {/* (1)	本サービスに関する登録の受付、本人確認、ユーザー認証、ユーザー設定の記録、利用料金の決済計算等本サービスの提供、維持、保護及び改善のため<br /> */}
                                (1)	ユーザーのトラフィック測定及び行動測定のため<br />
                                {/* (2)	広告の配信、表示及び効果測定のため<br /> */}
                                (2)	本サービスに関するご案内、お問い合わせ等への対応のため<br />
                                (3)	本サービスに関する{defineWords.me}の規約、ポリシー等（以下「規約等」といいます。）に違反する行為に対する対応のため<br />
                                (4)	本サービスに関する規約等の変更などを通知するため<br />
                            </div>
                            <h1>3. 通知・公表または同意取得の方法、利用中止要請の方法</h1>
                            <div>
                                ユーザーは、本サービスの所定の設定を行うことにより、利用者情報の全部または一部についてその収集又は利用の停止を求めることができ、<br />
                                この場合、{defineWords.me}は速やかに、{defineWords.me}の定めるところに従い、その利用を停止します。<br />
                                なお利用者情報の項目によっては、その収集または利用が本サービスの前提となるため、{defineWords.me}所定の方法により本サービスを退会した場合に限り、{defineWords.me}はその収集又は利用を停止します。<br />
                            </div>
                            <h1>4. 外部送信、第三者提供、情報収集モジュールの有無</h1>
                            <div>
                                4-1	本サービスでは、以下の提携先が、ユーザーの端末にCookieを保存し、これを利用して利用者情報を蓄積及び利用している場合があります。<br />
                                4-2	本サービスには以下の情報収集モジュールが組み込まれています。これに伴い、以下のとおり情報収集モジュール提供者（日本国外にある者を含みます。）への利用者情報の提供を行います。<br />
                            </div>
                            <div>
                                本サービスには以下の情報収集モジュールが組み込まれています。これに伴い、以下のとおり情報収集モジュール提供者（日本国外にある者を含みます。）への利用者情報の提供を行います。<br />
                                <table border='solid 1px'>
                                    <tr>
                                        <td>情報収集モジュール名</td>
                                        <td>GoogleAnalytics</td>
                                    </tr>
                                    <tr>
                                        <td>情報収集モジュール提供者</td>
                                        <td>Google LLC およびその完全子会社</td>
                                    </tr>
                                    <tr>
                                        <td>取得する利用者情報</td>
                                        <td>お客様のアプリケーションご利用状況</td>
                                    </tr>
                                    <tr>
                                        <td> 情報収集モジュール提供者による利用者情報の利用</td>
                                        <td>利用者情報はGoogleの管理するサーバシステムに格納されます。</td>
                                    </tr>
                                </table>
                                なお、Googleは当該利用者情報を、Googleが定める利用目的の範囲で利用します。<br />
                                GoogleAnalyticsの詳細およびGoogleが定める利用目的はhttp://www.google.com/intl/ja/policies/privacy/partners/をご参照ください。<br />
                            </div>
                            <h1>5. 第三者提供</h1>
                            <div>
                                {defineWords.me}は、利用者情報のうち、個人情報については、あらかじめユーザーの同意を得ないで、第三者（日本国外にある者を含みます。）に提供しません。<br />
                                但し、次に掲げる必要があり第三者（日本国外にある者を含みます。）に提供する場合はこの限りではありません。<br />
                                (1)	{defineWords.me}が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合<br />
                                (2)	合併その他の事由による事業の承継に伴って個人情報が提供される場合<br />
                                (3)	第4項の定めに従って、提携先または情報収集モジュール提供者へ個人情報が提供される場合<br />
                                (4)	国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、<br />
                                ユーザーの同意を得ることによって当該事務の遂行に支障を及ぼすおそれがある場合<br />
                                (5)	その他、個人情報の保護に関する法律（以下「個人情報保護法」といいます。）その他の法令で認められる場合<br />
                            </div>
                            {/* <h1>6. 共同利用</h1>
                            <div>
                                {defineWords.me}は、以下のとおりユーザーの個人情報を共同利用します。
                            </div> */}
                            <h1>6. 個人情報の開示</h1>
                            <div>
                                {defineWords.me}は、ユーザーから、個人情報保護法の定めに基づき個人情報の開示を求められたときは、ユーザーご本人からのご請求であることを確認の上で、<br />
                                ユーザーに対し、遅滞なく開示を行います（当該個人情報が存在しないときにはその旨を通知いたします。）。<br />
                                但し、個人情報保護法その他の法令により、{defineWords.me}が開示の義務を負わない場合は、この限りではありません。<br />
                                なお、個人情報の開示につきましては、手数料（1件あたり1,000円）を頂戴しておりますので、あらかじめ御了承ください。<br />
                            </div>
                            <h1>7. 個人情報の訂正及び利用停止等</h1>
                            <div>
                                7-1	{defineWords.me}は、ユーザーから、(1)個人情報が真実でないという理由によって個人情報保護法の定めに基づきその内容の訂正を求められた場合、及び(2)あらかじめ公表された利用目的の範囲を超えて取扱われているという理由または偽りその他不正の手段により収集されたものであるという理由により、個人情報保護法の定めに基づきその利用の停止を求められた場合には、ユーザーご本人からのご請求であることを確認の上で遅滞なく必要な調査を行い、その結果に基づき、個人情報の内容の訂正または利用停止を行い、その旨をユーザーに通知します。<br />
                                なお、訂正または利用停止を行わない旨の決定をしたときは、ユーザーに対しその旨を通知いたします。<br />
                                7-2{defineWords.me}は、ユーザーから、ユーザーの個人情報について消去を求められた場合、{defineWords.me}が当該請求に応じる必要があると判断した場合は、ユーザーご本人からのご請求であることを確認の上で、個人情報の消去を行い、その旨をユーザーに通知します。<br />
                                7-3個人情報保護法その他の法令により、{defineWords.me}が訂正等または利用停止等の義務を負わない場合は、8-1および8-2の規定は適用されません。<br />
                            </div>
                            <h1>9. お問い合わせ窓口</h1>
                            <div>
                                ご意見、ご質問、苦情のお申出その他利用者情報の取扱いに関するお問い合わせは、下記の窓口までお願いいたします。<br />
                                freedocsfordev@gmail.com
                            </div>
                            <h1>10. プライバシーポリシーの変更手続</h1>
                            <div>
                                {defineWords.me}は、必要に応じて、本ポリシーを変更します。但し、法令上ユーザーの同意が必要となるような本ポリシーの変更を行う場合、変更後の本ポリシーは、{defineWords.me}所定の方法で変更に同意したユーザーに対してのみ適用されるものとします。<br />
                                なお、{defineWords.me}は、本ポリシーを変更する場合には、変更後の本ポリシーの施行時期及び内容を{defineWords.me}のウェブサイト上での表示その他の適切な方法により周知し、またはユーザーに通知します。<br />
                            </div>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default PrivacyPolicy