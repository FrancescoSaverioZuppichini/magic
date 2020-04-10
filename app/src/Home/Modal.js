import React from 'react'
import { Box, Flex, Card } from 'theme-ui'

export default function Modal(props) {
    return (<div>
        {props.active && (<Flex p={2} sx={{
            position: 'fixed',
            top: '0', left: 0,
            zIndex: 99, width: '100vw', height: '100vh',
            bg: 'rgba(244, 244, 244, 0.8)',
        }} variant={props.variant || 'centering'}>
            {props.children}
        </Flex>)}
    </div>
    )
}
