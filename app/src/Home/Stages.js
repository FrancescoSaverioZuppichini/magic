import React, { useState } from 'react'
import { Button, Flex } from 'theme-ui'

export default function Stages({ children, initialStage }) {
    const [stageKey, setStageKey] = useState(initialStage || 0)
    const onBack = () => setStageKey(Math.max(0, stageKey - 1))
    const onNext = () => setStageKey(Math.min(stageKey + 1, children.length - 1))

    const hasBack = stageKey > 0
    const hasNext = stageKey < children.length - 1
    return (
        <div>
            {children[stageKey]({ onBack, onNext, hasBack, hasNext })}
            {/* {(stageKey > 0) &&
                    <Button onClick={onBack}>Back</Button>
                }
                {(stageKey < children.length - 1) &&
                    <Button onClick={onNext}>
                        Next
                </Button>} */}
        </div>
    )
}
