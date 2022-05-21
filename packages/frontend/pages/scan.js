import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { QrReader } from 'react-qr-reader';
import '@celo-tools/use-contractkit/lib/styles.css';

function Scan() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Scan</title>
      </Head>
      <div className='container'>
        <nav className='navbar fixed-top'>
          <div onClick={() => router.back()} className='container back'>
            <i className='bi bi-arrow-left' />
          </div>
        </nav>

        <section className='main'>
          <div id='qrcode-container'>
            <div id='rect'>
              <QrReader
                constraints={{
                  facingMode: 'environment',
                }}
                onResult={(result, error) => {
                  if (!!result) {
                    window.location.href = result?.getText;
                  }

                  if (!!error) {
                    console.info(error);
                  }
                }}
              />
            </div>
            <p>Please scan your QR code.</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Scan;
