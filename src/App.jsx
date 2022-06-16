import styles from "./App.module.css";

function DefaultChecked({ text, value, ref }) {
  return (
    <label className={styles.DefaultChecked}>
      <input ref={ref} checked type="checkbox" defaultValue={value} />
      <span>{text}</span>
    </label>
  );
}

function App() {
  let atRef;
  let dotRef;
  let replaceAllRef;

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        <div>
          <div className={styles.Box}>
            <label className={styles.Label}>Enter Value</label>
            <textarea rows="5" className={styles.UserText}></textarea>
          </div>
          <div>
            <div>
              <h3 className={styles.Title}>Top Options</h3>
              <DefaultChecked text="at to @" value="[at]" ref={atRef} />
              <DefaultChecked text="dot to ." value="[dot]" ref={dotRef} />
            </div>
            <div>
              <h3 className={styles.Title}>Custom Options</h3>
              <div className={styles.CustomReplace}>
                <label>
                  Replace <input placeholder="from" />
                </label>
                <label>
                  with <input placeholder="to" />
                </label>
              </div>
            </div>
            <label className={styles.ReplaceAll}>
              <input ref={replaceAllRef} checked type="checkbox" />
              <span>Replace all</span>
            </label>
          </div>
          <div className={styles.Buttons}>
            <button className={styles.BlueButton}>Replace</button>
            <button className={styles.GreenButton}>Replace &amp; Copy</button>
          </div>
          <div>
            <label className={styles.Label}>Output</label>
            <textarea rows="5" className={styles.UserText}></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
