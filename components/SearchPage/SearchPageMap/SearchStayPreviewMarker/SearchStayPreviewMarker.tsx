import { Marker, OverlayView } from "@react-google-maps/api";
import styles from "./SearchStayPreviewMarker.module.scss";
import { useRef } from "react";
import { useModal } from "@/hooks/useModal";
import { StaySmallModel } from "@/model/stay.model";
import StayPreview from "@/components/StayPreview/StayPreview";
import { set } from "zod";

interface Props {
  stay: StaySmallModel;
}
export default function SearchStayPreviewMarker({ stay }: Props) {
  const previewStayModelRef = useRef<HTMLDivElement | null>(null);
  const [isPreviewModelOpen, setIsPreviewModelOpen] =
    useModal(previewStayModelRef);

  const position = { lat: stay.location.lng, lng: stay.location.lat };
  return (
    <div className={styles.markerCon} ref={previewStayModelRef}>
      <OverlayView
        position={position}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={(width, height) => ({
          x: -(width / 2),
          y: -height / 2,
        })}
      >
        <>
          <button
            style={{
              background: "white",
              border: "1px solid black",
              borderRadius: "50%",
              padding: "10px",
            }}
            onClick={(ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              setIsPreviewModelOpen(true);
            }}
          >
            ${stay.price}
          </button>
          {isPreviewModelOpen && (
            <div className={styles.previewModel}>
              <StayPreview stay={stay} />
            </div>
          )}
        </>
      </OverlayView>
    </div>
  );
}
