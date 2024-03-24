import { GoogleMapsContext } from "@vis.gl/react-google-maps";
import {
  PropsWithChildren,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import { createPortal } from "react-dom";

/**
 * Props for the Info Window Component
 */
export type InfoWindowProps = google.maps.InfoWindowOptions & {
  onCloseClick?: () => void;
  anchor?: google.maps.Marker | google.maps.marker.AdvancedMarkerElement | null;
};

/**
 * Component to render a Google Maps Info Window
 */
export const InfoWindow = (props: PropsWithChildren<IMyInfoWindowProps>) => {
  const { children, anchor, onCloseClick, ...infoWindowOptions } = props;
  const map = useContext(GoogleMapsContext)?.map;

  const infoWindowRef = useRef<google.maps.InfoWindow | null>();

  const [contentContainer, setContentContainer] =
    useState<HTMLDivElement | null>(null);

  // create infowindow once map is available
  useEffect(() => {
    if (!map) return;

    if (!infoWindowRef.current) {
      infoWindowRef.current = new google.maps.InfoWindow(infoWindowOptions);
    }

    // Add content to info window
    const el = document.createElement("div");
    infoWindowRef.current.setContent(el);

    if (onCloseClick) {
      infoWindowRef.current.addListener("closeclick", () => {
        onCloseClick();
      });
    }

    setContentContainer(el);

    // Cleanup info window and event listeners on unmount
    return () => {
      if (infoWindowRef.current) {
        google.maps.event.clearInstanceListeners(infoWindowRef.current);
        infoWindowRef.current.close();
      }
      infoWindowRef.current = null;
      el.remove();

      setContentContainer(null);
    };
  }, [map, children, anchor]);

  // Open info window after content container is set
  useEffect(() => {
    if (contentContainer && infoWindowRef.current && anchor) {
      infoWindowRef.current.open({ map, anchor });
    }
  }, [contentContainer, infoWindowRef, anchor, map]);

  return (
    <>{contentContainer !== null && createPortal(children, contentContainer)}</>
  );
};
