import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useContractKit } from '@celo-tools/use-contractkit';
import { ContractKitProvider } from '@celo-tools/use-contractkit';
import '@celo-tools/use-contractkit/lib/styles.css';

function Intro() {
  const { address, connect, destroy } = useContractKit();
  const router = useRouter();
  // TODO: Use ID to get producer dashboard
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Dashboard Intro</title>
      </Head>

      <div className='container'>
        <nav className='navbar fixed-top'>
          <div className='container'>
            <Link href='/' className='logo'>
              <Image alt='Coffeline' src='/logo.svg' width={100} height={40} />
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

        <section className='main'>
          <h2 className='lora'>Welcome to Coffeeline</h2>

          <h3>What brings you here?</h3>

          <div className='user-type-container'>
            <a href='#' className='user-type-selection'>
              <div className='container_text_box'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='22'
                  height='22'
                  fill='currentColor'
                  className='bi bi-heart'
                  viewBox='0 0 16 16'
                >
                  <path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z' />
                </svg>

                <p>I am a coffee enthusiast</p>
              </div>
            </a>

            <a href='#' className='user-type-selection'>
              <div className='container_text_box'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='22'
                  height='22'
                  fill='currentColor'
                  className='bi bi-gear'
                  viewBox='0 0 16 16'
                >
                  <path d='M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z' />
                  <path d='M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z' />
                </svg>

                <p>I am a roaster</p>
              </div>
            </a>

            <a href='#' className='user-type-selection'>
              <div className='container_text_box'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='22'
                  height='22'
                  fill='currentColor'
                  className='bi bi-eyeglasses'
                  viewBox='0 0 16 16'
                >
                  <path d='M4 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 3 0 0 0-5.584-.953A1.993 1.993 0 0 0 8 6c-.532 0-1.016.208-1.375.547zM14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z' />
                </svg>

                <p>I am a SCA expert</p>
              </div>
            </a>

            <a
              href={'/dashboard/' + address + '/producer'}
              className='user-type-selection'
            >
              <div className='container_text_box'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='22'
                  height='22'
                  fill='currentColor'
                  className='bi bi-bucket'
                  viewBox='0 0 16 16'
                >
                  <path d='M2.522 5H2a.5.5 0 0 0-.494.574l1.372 9.149A1.5 1.5 0 0 0 4.36 16h7.278a1.5 1.5 0 0 0 1.483-1.277l1.373-9.149A.5.5 0 0 0 14 5h-.522A5.5 5.5 0 0 0 2.522 5zm1.005 0a4.5 4.5 0 0 1 8.945 0H3.527zm9.892 1-1.286 8.574a.5.5 0 0 1-.494.426H4.36a.5.5 0 0 1-.494-.426L2.58 6h10.838z' />
                </svg>
                <p>I am a coffee producer</p>
              </div>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

function WrappedIntro() {
  return (
    <ContractKitProvider
      dapp={{
        name: 'My awesome dApp',
        description: 'My awesome description',
        url: 'https://example.com',
      }}
    >
      <Intro />
    </ContractKitProvider>
  );
}
export default WrappedIntro;
