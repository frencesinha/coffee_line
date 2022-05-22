import Script from 'next/script';
import Head from 'next/head';
import '../public/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css'
          rel='stylesheet'
          integrity='sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor'
          crossOrigin='anonymous'
        />
        <link rel='icon' type='image/x-icon' href='favicon.png' />
      </Head>
      <Script
        src='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'
        integrity='sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p'
        crossOrigin='anonymous'
      />
      <Script
        src='https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js'
        integrity='sha384-Xe+8cL9oJa6tN/veChSP7q+mnSPaj5Bcu9mPX5F5xIGE0DVittaqT5lorf0EI7Vk'
        crossOrigin='anonymous'
      />
      <Component {...pageProps} />
    </>
  );
}
