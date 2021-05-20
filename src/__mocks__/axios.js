module.exports = {
    get: jest.fn((_url, _body) => {
        return Promise.resolve({ _url, _body });
    }),
    post: jest.fn((_url, _body) => {
        url = _url
        body = _body
        return Promise.resolve({ _url, _body });
    }),
    put: jest.fn((_url, _body) => {
        url = _url
        body = _body
        return Promise.resolve({ _url, _body });
    }),
    delete: jest.fn((_url, _body) => {
        return Promise.resolve()
    }),
    create: jest.fn(function () {
        return this;
    })
};