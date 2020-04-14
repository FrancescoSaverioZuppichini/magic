import React, { useState, useRef } from 'react'
import { Input, Text } from 'theme-ui'

export default function InputWithErrors(props) {
    const [inputError, setInputError] = useState({ hasError: false, msg: 'Cannot be empty!' })

    const onChange = ((el) => {
        const hasError = el.target.value === ''
        setInputError({ ...inputError, ...{ hasError } })
        props.onChange(el)

    })

    return (
        <div>
            {inputError.hasError && <Text variant='error' pb={2} sx={{ fontSize: 1 }}>{inputError.msg}</Text>}
            <Input {...props} onChange={onChange}></Input>
        </div>
    )
}
