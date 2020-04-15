import React from 'react'
import { Provider, Subscribe, Container } from 'unstated';
import RoomContainer from '../../containers/RoomContainer'
export default function Room() {
    return (
            <Subscribe to={[RoomContainer]}>
                {ws => (
                    <Box>Room</Box>

                )}
            </Subscribe>
    )
}
