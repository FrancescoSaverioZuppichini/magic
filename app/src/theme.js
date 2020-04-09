const theme = {
  colors: {
    text: '#000',
    textLight: 'white',
    background: '#F4F4F4',
    primary: '#6A66F2',
    dark: '#413BFF',
    gray: 'C4C4C4',

    active: '#9B66F2'
  },
  fonts: {
    body: "'Roboto', sans-serif",
    heading: "'Roboto', sans-serif",
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    thin: 200,
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
    },
    container: {
      padding: [2, 4]
    },
    modal: {
      padding: 2,
      bg: 'background',
      width: ['100%', '66%']
    },
    selected: {
      borderColor: 'primary',
      borderWidth: '4px',
      borderStyle: 'solid',
    }
  },
  spacer: {
    flex: '1 1'
  },
  centering: {
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  forms: {
    input: {
      borderColor: 'primary',
      borderRadius: '28px',
      borderWidth: '2px',
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
      borderWidth: '2px',
      borderColor: 'primary',
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
      borderWidth: '2px',
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
      borderWidth: '2px',
      outline: 'none',
      '&:active': {
        borderColor: 'active',
        color: 'active',
        // outline:'none'
      }
    },
    circle: {
      borderRadius: '50%',
      outline: 'none',
      bg: 'primary',
      '&:active': {
        backgroundColor: 'active',
        borderColor: 'active',
        // outline:'none'
      }
    },
    circleSmall: {
      borderRadius: '50%',
      paddingTop: '4px',
      paddingBottom: '4px',
      paddingLeft: '4px',
      paddingRight: '4px',

      outline: 'none',
      bg: 'primary',
      '&:active': {
        backgroundColor: 'active',
        borderColor: 'active',
        // outline:'none'
      }
    }
  }
}

export default theme