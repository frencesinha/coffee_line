import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useContractKit } from '@celo-tools/use-contractkit';
import { ContractKitProvider } from '@celo-tools/use-contractkit';
import '@celo-tools/use-contractkit/lib/styles.css';

function Timeline() {
  const router = useRouter();
  // TODO: Use ID to get timeline from blockchain
  const { id } = router.query;
  const { address, connect, destroy } = useContractKit();

  return (
    <>
      <Head>
        <title>Timeline</title>
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
          <h2 className='lora'>Tropical - Kenya</h2>

          <div className='box'>
            <div className='container_text_box'>
              <p className='small-caption'>Type</p>
              <p>Single origin</p>
            </div>
          </div>

          <div className='box'>
            <div className='container_text_box'>
              <p className='small-caption'>Producer</p>
              <a href='#'>
                <p>Ndumba Embu (PB)</p>
              </a>
            </div>

            <div className='container_text_box'>
              <p className='small-caption'>Country</p>
              <p>Kenya</p>
            </div>

            <div className='container_text_box'>
              <p className='small-caption'>Altitude</p>
              <p>1600 masl</p>
            </div>

            <div className='container_text_box'>
              <p className='small-caption'>Process</p>
              <p>Washed</p>
            </div>

            <div className='container_text_box'>
              <p className='small-caption'>Varietal</p>
              <p>SL 28, Ruiru 11</p>
            </div>
          </div>

          <div className='box'>
            <div className='container_text_box'>
              <p className='small-caption'>SCA Grade</p>
              <p>Specialty Grade</p>
            </div>
          </div>

          <div className='box'>
            <div className='container_text_box'>
              <p className='small-caption'>Roaster</p>
              <a href='#'>
                <p>Tropical Coffee Roasters</p>
              </a>
            </div>

            <div className='container_text_box'>
              <p className='small-caption'>Roast type</p>
              <p>Light roasted</p>
            </div>

            <div className='container_text_box'>
              <p className='small-caption'>Roast date</p>
              <p>20/05/2022</p>
            </div>
          </div>

          {!address && (
            <button
              onClick={() => connect().catch((e) => console.log(e))}
              className='primary-button'
            >
              Connect Wallet
            </button>
          )}

          {address && (
            <Link href={'/rate/' + id}>
              <button className='primary-button'>Rate coffee</button>
            </Link>
          )}
        </section>
      </div>
    </>
  );
}

function WrappedTimeline() {
  return (
    <ContractKitProvider
      dapp={{
        name: 'My awesome dApp',
        description: 'My awesome description',
        url: 'https://example.com',
      }}
    >
      <Timeline />
    </ContractKitProvider>
  );
}
export default WrappedTimeline;
