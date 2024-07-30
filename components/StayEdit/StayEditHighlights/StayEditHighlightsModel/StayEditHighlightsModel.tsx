import { HighlightModel } from "@/model/highlight.model";
import styles from "./StayEditHighlightsModel.module.scss";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { DynamicSVGByName, PlusSVG } from "@/components/svgs/svgs";
import { SvgsNameTypes } from "@/model/icons.model";
import { getEmptyHighlight } from "@/service/highlight.service";

interface Props {
  highlight: HighlightModel;
  handleHighlights: (
    highlights: HighlightModel,
    isAdd: boolean,
    idx?: number
  ) => void;
  idx?: number;
}
export default function StayEditHighlightsModel({
  highlight,
  handleHighlights,
  idx,
}: Props) {
  const highlightModelRef = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModal(highlightModelRef);
  const [highlightState, setHighlightState] =
    useState<HighlightModel>(highlight);

  const handleChange = (ev: ChangeEvent) => {
    const { name, value } = ev.target as HTMLInputElement;
    if (name === "title" && value.length > 32) return;
    if (name === "description" && value.length > 132) return;
    setHighlightState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIcon = (icon: SvgsNameTypes) => {
    setHighlightState((prev) => ({ ...prev, icon }));
  };

  const saveHighlight = () => {
    if (highlightState.title.length > 32) {
      alert("Title is too long, max 32 characters");
      return;
    }
    if (highlightState.description.length > 255) {
      alert("Description is too long, max 255 characters");
      return;
    }
    handleHighlights(highlightState, true, idx);
    // setHighlightState(getEmptyHighlight());
    setIsModelOpen(false);
  };
  const iconList: SvgsNameTypes[] = useMemo(
    () => Array.from(SvgsNameTypes),
    []
  );

  const disabled =
    !highlightState.title ||
    !highlightState.description ||
    !highlightState.icon ||
    highlightState.title.length > 32 ||
    highlightState.description.length > 132;
  return (
    <li className={styles.highlightCon}>
      <button className={styles.modelBtn} onClick={() => setIsModelOpen(true)}>
        <DynamicSVGByName name={highlight.icon} />
        <div className={styles.text}>
          {highlight.title ? (
            <>
              <h3>{highlight.title}</h3>
              <h4>{highlight.description}</h4>
            </>
          ) : (
            <h2>Click to edit</h2>
          )}
        </div>
      </button>

      {isModelOpen && (
        <div ref={highlightModelRef} className={styles.editHighlightModel}>
          <h3>Edit highlight</h3>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={highlightState.title}
            onChange={handleChange}
          />
          <p
            className={highlightState.title.length > 32 ? styles.red : ""}
          >{`${highlightState.title.length} / 32`}</p>
          <label>Description:</label>
          <textarea
            name="description"
            value={highlightState.description}
            onChange={handleChange}
          />
          <p
            className={
              highlightState.description.length > 132 ? styles.red : ""
            }
          >{`${highlightState.description.length} /132`}</p>

          <label>Icon:</label>
          <ul className={styles.iconPicker}>
            {iconList.map((icon) => (
              <li
                className={icon === highlightState.icon ? styles.selected : ""}
                key={icon}
                onClick={() => handleIcon(icon)}
              >
                <DynamicSVGByName name={icon} />
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <button onClick={() => setIsModelOpen(false)}>Cancel</button>
            <button
              disabled={disabled}
              className={disabled ? styles.disabled : ""}
              onClick={saveHighlight}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
