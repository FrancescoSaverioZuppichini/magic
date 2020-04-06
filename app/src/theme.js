const theme = {
  colors: {
    text: '#000',
    textLight: 'white',
    background: '#F4F4F4',
    primary: '#6A66F2',
    dark: '#413BFF',

    active: '#9B66F2'
  },
  fonts: {
    body: "'Roboto', sans-serif",
    heading: "'Roboto', sans-serif",
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  links: {
    bold: {
      fontWeight: 'bold',
      textDecoration: 'underline'
    }
  },
  fontSizes: [
    14, 16, 20, 24, 28, 48, 64,
  ],
  app: {
    margin: 0,
    width: '100vw',
    height: '100vh'
  },
  cards: {
    viewport: {
      height: ['50vh', '50vh', '100vh'],
      padding: [2, 4]
    }
  },
  spacer: {
    flex: '1 1'
  },
  forms: {
    input: {
      borderColor: 'primary',
      borderRadius: '28px',
      borderWidth: '3px',
      outline:'none',
      padding: '14px',
      fontSize: 1,
      '&:active': {
        // backgroundColor: 'active',
        borderColor: 'active',
        outline:'none'
      },
      '&:focus': {
        // backgroundColor: 'active',
        borderColor: 'active',
        outline:'none'
      }
    },
    searchbar: {
      backgroundColor: 'background',
      color: 'text',
      borderRadius: '28px',
      outline:'none',
      padding: '14px',
      borderWidth: '0px',
      fontSize: 1,
      '&:active': {
        // backgroundColor: 'active',
        outline:'none'
      },
      '&:focus': {
        // backgroundColor: 'active',
        outline:'none'
      }
    },
  },
  buttons: {
    primary: {
      borderRadius: '20px',
      borderStyle: 'solid',
      borderColor: 'primary',
      borderWidth: '3px',
      outline: 'none',
      '&:active': {
        backgroundColor: 'active',
        borderColor: 'active',
        // outline:'none'
      }

    },
    outline: {
      borderRadius: '20px',
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'primary',
      color: 'primary',
      borderStyle: 'solid',
      borderWidth: '3px',
      outline: 'none',
      '&:active': {
        borderColor: 'active',
        color: 'active',
        // outline:'none'
      }
    }
  }
}

export default theme