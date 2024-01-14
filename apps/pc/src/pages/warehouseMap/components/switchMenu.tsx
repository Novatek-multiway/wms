interface Iprops {
    type: '3d' | '2d',
    handleChange(type: '3d' | '2d'): void
}

function SwitchMenu(props: Iprops) {
    return <div className="switch-menu-wrap">
        <div className={["menu-item", props.type === '3d' ? 'active' : ''].join(' ')} onClick={() => props.handleChange('3d')}>3D</div>
        <div className={["menu-item", props.type === '2d' ? 'active' : ''].join(' ')} onClick={() => props.handleChange('2d')}>2D</div>
    </div>
}

export default SwitchMenu