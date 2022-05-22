import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useContractKit } from '@celo-tools/use-contractkit';
import { ContractKitProvider } from '@celo-tools/use-contractkit';
import '@celo-tools/use-contractkit/lib/styles.css';

function App() {
  const { address, connect, destroy } = useContractKit();

  return (
    <>
      <Head>
        <title>Coffeeline</title>
      </Head>

      <div className='container'>
        <nav className='navbar fixed-top'>
          <div className='container'>
            <Link href='/' className='logo'>
              <img src='logo.svg' alt='Coffeline' width={100} height={40} />
            </Link>

            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='offcanvas'
              data-bs-target='#offcanvasNavbar'
              aria-controls='offcanvasNavbar'
            >
              <span className='navbar-toggler-icon' />
            </button>
            <div
              className='offcanvas offcanvas-end'
              tabIndex='-1'
              id='offcanvasNavbar'
              aria-labelledby='offcanvasNavbarLabel'
            >
              <div className='offcanvas-header'>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='offcanvas'
                  aria-label='Close'
                ></button>
              </div>
              <div className='offcanvas-body'>
                <ul className='navbar-nav justify-content-end flex-grow-1 pe-3'>
                  <li className='nav-item'>
                    <a
                      className='nav-link active'
                      aria-current='page'
                      href='index.html'
                    >
                      <h3>Home</h3>
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link' href='#'>
                      <h3>How does it work?</h3>
                    </a>
                  </li>
                </ul>

                <div className='line'></div>

                <>
                  {!address && (
                    <button
                      onClick={() => connect().catch((e) => console.log(e))}
                      data-bs-dismiss='offcanvas'
                      className='primary-button'
                    >
                      Connect Wallet
                    </button>
                  )}

                  {address && (
                    <button
                      onClick={() => destroy().catch((e) => console.log(e))}
                      data-bs-dismiss='offcanvas'
                      className='secondary-button'
                    >
                      Disconnect
                    </button>
                  )}
                </>
              </div>
            </div>
          </div>
        </nav>

        <section id='intro'>
          <h2 className='lora'>
            Check the <span>history</span> of your special coffee.
          </h2>

          <Link href='/scan'>
            <div className='scan' />
          </Link>

          <p className='small-caption'>Scan QR code</p>
        </section>
      </div>
    </>
  );
}

function WrappedApp() {
  return (
    <ContractKitProvider
      dapp={{
        name: 'My awesome dApp',
        description: 'My awesome description',
        url: 'https://example.com',
      }}
    >
      <App />
    </ContractKitProvider>
  );
}
export default WrappedApp;
