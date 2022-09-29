/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable linebreak-style */
/* eslint-disable key-spacing */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
// Setting for eslint 

module.exports = {
    env:{
        browser: true,
        node: true,
        es2022: true
    },
    extends: ['airbnb-base','prettier'],
    parserOptions:{
        sourceType: 'module',
        ecmaVersion: 11,
    },
    rules:{
        'no-console': 0,
        'linebreak-style':0,
        'no-unused-vars':0,
        'consistent-return':0,
        'no-nested-ternary':0,
        'import/prefer-default-export':0,

    }
};
// airbnb-base for list of coding rules that makes ur code consistent and intigrity