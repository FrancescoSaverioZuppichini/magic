import React, { useState } from 'react'
import { Box, Flex, Card } from 'theme-ui'
import { CSSTransition } from 'react-transition-group'

export default function Modal(props) {
    return (<Box>
        {props.active && <Flex p={2} sx={{
            flexDirection: 'column',
            position: props.position || 'absolute',
            top: '0', left: 0,
            zIndex: 99, width: '100vw', minHeight: '100vh',
            bg: 'rgba(244, 244, 244, 0.8)',
        }} variant={props.variant || 'centering'}>
            {props.children}
        </Flex>
        }
    </Box>
    )
}
