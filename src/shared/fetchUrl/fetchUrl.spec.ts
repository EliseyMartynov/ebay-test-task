import chai, { expect } from 'chai';
import fetchUrl from './fetchUrl';
import sinon from 'sinon';
import assert from 'assert';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

declare global {
  namespace NodeJS {
    interface Global {
      fetch: any;
    }
  }
}

describe('Testing FetchUrl - Wrapper over fetch', () => {
  const res = [
    {
      id: '1',
      name: 'Abc',
    },
  ];
  it('should perform basic fetch functions', () => {
    const mockFetch = sinon.fake.resolves({
      ok: true,
      json: () => res,
    });
    // Inject mock fetch into global
    global.fetch = mockFetch;
    fetchUrl('/api/v1/someUrl');
    assert(mockFetch.calledWith('/api/v1/someUrl'));
    assert(mockFetch.calledOnce, 'Fn was called once');
    delete global.fetch;
  });

  // to.eventually.equal is not working for me
  // may be something happens with chai
  // just did the async/await..
  it('should resolve with data for valid request', async () => {
    const mockFetch = sinon.fake.resolves({
      ok: true,
      json: () => res,
    });
    // Inject mock fetch into global
    global.fetch = mockFetch;
    const fetchResponse = await fetchUrl('/api/v1/someUrl');
    expect(fetchResponse).to.equal(res);
    delete global.fetch;
  });

  // https://github.com/domenic/chai-as-promised/issues/272
  // rejectedWith doesn't work properly
  it(`TEST IS NOT WORKING // should reject with data for fetch status returns ok false`, () => {
    const mockFetch = sinon.fake.resolves({
      ok: false,
      json: () => '123',
    });
    // Inject mock fetch into global
    global.fetch = mockFetch;
    const fetchResponse = fetchUrl('/api/v1/someUrl');
    expect(fetchResponse).to.eventually.be.rejectedWith(res);
    delete global.fetch;
  });
});
