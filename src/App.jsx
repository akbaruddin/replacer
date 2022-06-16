import { createSignal } from "solid-js";
import styles from "./App.module.css";

function DefaultChecked({ text, ref }) {
  return (
    <label className={styles.DefaultChecked}>
      <input ref={ref} checked type="checkbox" />
      <span>{text}</span>
    </label>
  );
}

function App() {
  let atRef;
  let dotRef;
  let replaceAllRef;
  let outputRef;
  const [userText, setUserText] = createSignal("");
  const [fromText, setFromText] = createSignal("");
  const [toText, setToText] = createSignal("");

  const textChangeEvent = (e) => {
    setUserText(e.target.value);
    replacer(e.target.value);
  };

  const atReplace = async (text) =>
    Promise.resolve(
      text.replace(replaceAllRef.checked ? /\[at\]/g : /\[at\]/, "@")
    );
  const dotReplace = async (text) =>
    Promise.resolve(
      text.replace(replaceAllRef.checked ? /\[dot\]/g : /\[dot\]/, ".")
    );

  const otherReplace = async (text, from, to) =>
    Promise.resolve(
      text.replace(
        replaceAllRef.checked ? new RegExp(from, "g") : new RegExp(from),
        to
      )
    );

  const replacer = async (initText = "") => {
    let text = initText;
    if (atRef.checked) {
      text = await atReplace(userText());
    }
    if (dotRef.checked) {
      text = await dotReplace(text);
    }
    if (fromText() && toText()) {
      text = await otherReplace(text, fromText(), toText());
    }
    outputRef.value = text;
  };

  const replaceEvent = () => {
    replacer();
  };

  const replaceAndCopyEvent = async () => {
    await replacer();
    outputRef.select();
    document.execCommand("copy");
  };

  const fromEvent = (e) => {
    setFromText(e.target.value);
    replacer(e.target.value);
  };

  const toEvent = (e) => {
    setToText(e.target.value);
    replacer(e.target.value);
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        <div>
          <div className={styles.Box}>
            <label className={styles.Label}>Enter Value</label>
            <textarea
              rows="5"
              className={styles.UserText}
              onKeyUp={textChangeEvent}
            ></textarea>
          </div>
          <div>
            <div>
              <h3 className={styles.Title}>Top Options</h3>
              <DefaultChecked text="at to @" ref={atRef} />
              <DefaultChecked text="dot to ." ref={dotRef} />
            </div>
            <div>
              <h3 className={styles.Title}>Custom Options</h3>
              <div className={styles.CustomReplace}>
                <label>
                  Replace <input placeholder="from" onKeyUp={fromEvent} />
                </label>
                <label>
                  with <input placeholder="to" onKeyUp={toEvent} />
                </label>
              </div>
            </div>
            <label className={styles.ReplaceAll}>
              <input ref={replaceAllRef} checked type="checkbox" />
              <span>Replace all</span>
            </label>
          </div>
          <div className={styles.Buttons}>
            <button className={styles.BlueButton} onClick={replaceEvent}>
              Replace
            </button>
            <button
              className={styles.GreenButton}
              onClick={replaceAndCopyEvent}
            >
              Replace &amp; Copy
            </button>
          </div>
          <div>
            <label className={styles.Label}>Output</label>
            <textarea
              rows="5"
              className={styles.UserText}
              ref={outputRef}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
