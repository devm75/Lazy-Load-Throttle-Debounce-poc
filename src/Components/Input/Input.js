import { ProgressBar } from "../ProgressBar/ProgressBar";
import styles from "./Input.module.css";


export const Input = ({ onChange, value, scrollProgress }) => {
    return (
        <div className={styles['outer-container']}>
            <h1>Search For Movies </h1>
            <input
                onChange={onChange}
                value={value}
                className={styles.input}
                type="text"
                placeholder="Search Movies"
            ></input>
        </div>
    );
};
