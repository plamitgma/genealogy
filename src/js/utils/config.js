const isProduction = process.env.NODE_ENV === 'production';

let config = {};

if (isProduction) {
    config = {
        facebookAppId: '234964750345407',
        googleClientId: '118630867158-en1ve6civp6bpspsuuvir9ql5koiucvc.apps.googleusercontent.com'
    }
} else {
    config = {
        facebookAppId: '234964750345407',
        googleClientId: '118630867158-en1ve6civp6bpspsuuvir9ql5koiucvc.apps.googleusercontent.com'
    }
}

export default config;
