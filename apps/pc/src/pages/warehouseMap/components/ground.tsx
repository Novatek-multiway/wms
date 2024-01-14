import { observer } from "mobx-react-lite";
import { Canvas } from "@react-three/fiber";

function Ground() {
    return <>
        <gridHelper args={[20000, 150,'#fff','#fff' ]} position={[0, -24, 0]} />
    </>
}

export default observer(Ground)