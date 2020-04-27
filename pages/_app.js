import App from 'next/app';
import Head from 'next/head';
import '../style/app.css';

export default function MyApp({ Component, pageProps }) {
    
    const siteTitle = process.env.siteTitle || 'React/Next Sample Game';
    const props = {
        ...pageProps
    }
    
    return (
        <>
        <Head>
            <title>{ siteTitle }</title>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <link rel="manifest" href="/manifest.json"></link>
        </Head>
        <Component { ...props } />   
        </>
    )
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);
    return {
        ...appProps
    }
}