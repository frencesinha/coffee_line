import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useContractKit } from '@celo-tools/use-contractkit';
import { ContractKitProvider } from '@celo-tools/use-contractkit';
import '@celo-tools/use-contractkit/lib/styles.css';

function CoffeeNew() {
  const router = useRouter();
  // TODO: Use ID to get timeline from blockchain
  const { id } = router.query;
  const { address, connect, destroy } = useContractKit();

  return (
    <>
      <Head>
        <title>New Coffee</title>
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
          <h2 className='lora'>New coffee</h2>

          <div className='box'>
            <div className='container_text_box'>
              <form className='form-info'>
                <div className='form-group'>
                  <label htmlFor='Date'>Harvest date</label>
                  <input
                    type='date'
                    className='form-control'
                    id='exampleFormControlSelect1'
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='Process'>Process</label>
                  <select
                    className='form-control'
                    id='exampleFormControlSelect1'
                  >
                    <option>Select process</option>
                    <option>Natural</option>
                    <option>Washed</option>
                    <option>Wet hulled</option>
                    <option>Honey processed</option>
                  </select>
                </div>

                <div className='form-group'>
                  <label htmlFor='CoffeeBean'>Coffee Bean</label>
                  <select
                    className='form-control'
                    id='exampleFormControlSelect1'
                  >
                    <option>Select type of bean</option>
                    <option>Arabica</option>
                    <option>Robusta</option>
                    <option>Liberica</option>
                    <option>Excelsea</option>
                  </select>
                </div>

                <div className='form-group'>
                  <label htmlFor='Varietal'>Specific varietal</label>
                  <input
                    type='word'
                    className='form-control'
                    id='exampleFormControlInput1'
                    placeholder='Varietal'
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='Weight'>Weight (in kg)</label>
                  <input
                    type='number'
                    className='form-control'
                    id='exampleFormControlInput1'
                    placeholder='Weight (in kg)'
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='exampleFormControlTextarea1'>Notes</label>
                  <textarea
                    className='form-control'
                    id='exampleFormControlTextarea1'
                    rows='3'
                  ></textarea>
                </div>
              </form>
            </div>
          </div>

          <div className='box'>
            <div className='container_text_box'>
              <p style={{ paddingBottom: '12px' }}>
                Upload pictures of the process
              </p>

              <p className='small-caption'>
                This will make your coffee taste even better!
              </p>

              <form className='form-info'>
                <div className='form-group'>
                  <input
                    type='file'
                    className='form-control-file'
                    id='upload'
                  />
                </div>
              </form>
            </div>
          </div>

          {!address && (
            <button
              onClick={() => connect().catch((e) => console.log(e))}
              className='primary-button col-12'
            >
              Connect Wallet
            </button>
          )}

          {address && (
            // TODO: This link should redirect to the newly created coffee qr code
            <a href={'/qr/' + id}>
              <button className='primary-button col-12'>Submit</button>
            </a>
          )}
        </section>
      </div>
    </>
  );
}

function WrappedCoffeeNew() {
  return (
    <ContractKitProvider
      dapp={{
        name: 'My awesome dApp',
        description: 'My awesome description',
        url: 'https://example.com',
      }}
    >
      <CoffeeNew />
    </ContractKitProvider>
  );
}
export default WrappedCoffeeNew;
