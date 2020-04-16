import React, { useState } from 'react'
import { Box } from 'theme-ui'


const Stage = ({ visible, children }) => (

    <div style={{ transform: visible ? '' : 'scale(0)', height: visible ? 'auto' : '0px', width:'inherit' }}>{children}</div>
)

export default function Stages({ children, initialStage }) {
    /***
     * A stage component to "stage" each children component. 
     * Useful when guiding the user in a process. 
     * The children are hidden and not delete, thus the state of each component is maintained
     */
    const [stageKey, setStageKey] = useState(initialStage || 0)
    const onBack = () => setStageKey(Math.max(0, stageKey - 1))
    const onNext = () => setStageKey(Math.min(stageKey + 1, children.length - 1))

    const hasBack = stageKey > 0
    const hasNext = stageKey < children.length - 1

    return (
        <Box variant='vCentering'>
            {children.map((el, i) => <Stage key={i} visible={i === stageKey}>
                {el({ onBack, onNext, hasBack, hasNext })}
            </Stage>)}
        </Box>
    )
}
