import { utils } from "../utils"
import React from "react"

const StarsDisplay = (props) => (
    <>
        {/* TODO: change startArray to count of stars when availability bits built */}
        {utils.range(1, props.stars).map((starId) => (
            <div key={starId} className="star" />
        ))}
    </>
)

export default StarsDisplay
