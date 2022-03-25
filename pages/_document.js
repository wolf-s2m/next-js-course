import Document, { Html, Head, Main, NextScript } from "next/document";

// this document is used to set up all of the html parametes that we need in our project (exp: language...)
// and this divs will be outside of our react/ next tree
class MyDocument extends Document {
    reder() {
        return (
            <Html lang='en'>
                <Head>
                    <body>
                        <Main />
                        <NextScript />
                    </body>
                </Head>
            </Html>
        );
    }
}

export default MyDocument;