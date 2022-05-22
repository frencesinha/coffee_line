import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useContractKit } from '@celo-tools/use-contractkit';
import { ContractKitProvider } from '@celo-tools/use-contractkit';
import '@celo-tools/use-contractkit/lib/styles.css';

function Rate() {
  const router = useRouter();
  // TODO: Use ID to post Rate to blockchain
  // if user already has a rate, populate with existing
  const { id } = router.query;
  const { address, connect, destroy } = useContractKit();

  return (
    <>
      <Head>
        <title>Rate</title>
      </Head>
      <div className='container'>
        <nav className='navbar fixed-top'>
          <div className='container'>
            <a href='/' className='logo'>
              <img src='logo.svg' alt='Coffeline' width={100} height={40} />
            </a>

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
          <h2 className='lora'>Rate coffee</h2>
          <p className='name'>Coffee name</p>
          <RateSubjects />
          {!address && (
            <button
              onClick={() => connect().catch((e) => console.log(e))}
              className='primary-button'
            >
              Connect Wallet
            </button>
          )}

          {address && (
            <a href={'/rate/' + id}>
              <button className='primary-button'>Submit Rate</button>
            </a>
          )}
        </section>
      </div>
    </>
  );
}

function RateSubjects() {
  const subjects = ['Aroma', 'Acidity', 'Body', 'Flavor', 'Aftertaste'];
  return subjects.map((subject) => (
    <div key={subject} className='box'>
      <div className='container_text_box'>
        <p>{subject}</p>
        <i className='bi bi-star'></i>
        <i className='bi bi-star'></i>
        <i className='bi bi-star'></i>
        <i className='bi bi-star'></i>
        <i className='bi bi-star'></i>
      </div>
    </div>
  ));
}

function WrappedRate() {
  return (
    <ContractKitProvider
      dapp={{
        name: 'My awesome dApp',
        description: 'My awesome description',
        url: 'https://example.com',
      }}
    >
      <Rate />
    </ContractKitProvider>
  );
}
export default WrappedRate;
