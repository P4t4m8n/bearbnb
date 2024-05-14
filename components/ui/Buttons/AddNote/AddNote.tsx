"use client";
import { useModal } from "@/components/hooks/useModal";
import styles from "./AddNote.module.scss";
import { useRef, useState } from "react";

interface Props {
  txt: string;
  onSaveNote: (txt: string) => void;
}

export default function AddNote({ txt, onSaveNote }: Props) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useModal(modelRef, null);
  const [text, setText] = useState(txt);

  const onChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = ev.target.value;
    setText(value);
  };

  const saveNote = () => {
    onSaveNote(text);
    setOpen(false);
  };

  return (
    <>
      <div className={styles.addNote}>
        <span className={styles.text}>{text}</span>
        <button onClick={() => setOpen(true)}>
          {text ? "Edit" : "Add Note"}
        </button>
      </div>
      {open && (
        <section ref={modelRef} className={styles.modal}>
          <div className={styles.hero}>
            <button onClick={() => setOpen(false)}>X</button>
            <h2>Notes</h2>
          </div>
          <div className={styles.textCon}>
            <textarea
              value={text}
              onChange={onChange}
              name="txt"
              rows={5}
              cols={50}
              maxLength={250}
              placeholder="Add note"
              autoFocus={true}
            ></textarea>
            <h5>{txt.length}/250 characters</h5>
          </div>
          <div className={styles.actions}>
            <button onClick={() => setOpen(false)}>Cancel</button>
            <button onClick={saveNote}>Save</button>
          </div>
        </section>
      )}
    </>
  );
}
