import styles from "./style.module.css"
import cx from "classnames"
function ClipLoader() {
    return <div className={cx(styles.loading,"w-8 h-8 border-2")}></div>
}

export default ClipLoader
