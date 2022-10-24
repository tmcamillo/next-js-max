import Link from "next/link";
import classes from './button.module.css'

function Button(props) {
    const { link, children } = props
    return (
        <Link href={link}>
            <a className={classes.btn}>{children}</a>
        </Link>
    )
}
export default Button;
