import React from 'react'
import { ReunionContext } from '../../Context/Reunionctx1'

const Member1 = props => (
    <div>
        <ReunionContext.Consumer>
            {
                (data) => (
                    data.map((member,i) => (
                        <li key={i}>{member}</li>
                    ))
                )
            }
        </ReunionContext.Consumer>
    </div>
)

export default Member1