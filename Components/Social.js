export default function social({socials}) {
    return (
        <div className="social">
            <ul>
                {socials.map((s) => {
                    return (<li><a className="ukie-icons hover-animate" href={s.url}
                           target={'_blank'}><i
                        className={s.icon}></i></a></li>)
                })}
            </ul>
        </div>
    )
}