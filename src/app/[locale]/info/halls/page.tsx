"use client";
import {
  APIProvider,
  AdvancedMarker,
  Map,
  Pin,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { env } from "@/env.mjs";
import { HALL_LOCATIONS } from "@/lib/conts";
import { useScopedI18n } from "locales/client";
import { HallMark } from "@/components/hallMark";
import { useEffect } from "react";

const getPinColors = (color: string) => {
  switch (color) {
    case "yellow":
      return { background: "#ffed03", glyphColor: "#000" };
    case "red":
      return { background: "#FF0000", glyphColor: "#fff" };
    case "blue":
      return { background: "#213a8f", glyphColor: "#fff" };
    default:
      return { background: "#121212", glyphColor: "#fff" };
  }
};

const MAP_DEFAULT_CENTER = { lat: 49.39576264866427, lng: 13.293526019268224 };

export default function Halls() {
  return (
    <div className="flex flex-col space-y-2">
      <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_TOKEN}>
        <div style={{ height: "50vh", width: "100%" }}>
          <Map
            className="h-full w-full"
            styles={[
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [
                  {
                    visibility: "off",
                  },
                ],
              },
            ]}
            defaultZoom={13}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            style={{ height: "100%", width: "100%" }}
            defaultCenter={MAP_DEFAULT_CENTER}
            mapId="bef3616b123765e8"
          >
            {HALL_LOCATIONS.map((hall) => {
              const { background, glyphColor } = getPinColors(hall.color);
              return (
                <AdvancedMarker
                  key={hall.name}
                  position={{ lat: hall.loc.lat, lng: hall.loc.lng }}
                  title={hall.name}
                >
                  <Pin
                    background={background}
                    glyphColor={glyphColor}
                    borderColor={"#000"}
                    glyph={hall.tag}
                  />
                </AdvancedMarker>
              );
            })}
          </Map>
        </div>
      </APIProvider>
      <div className="flex flex-col items-center justify-center space-y-4 overflow-y-scroll pt-4 md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-4 md:space-y-0">
        {HALL_LOCATIONS.map((hall) => (
          <HallMark
            key={hall.name}
            placeLink={hall.link}
            color={hall.color}
            tag={hall.tag}
            address={hall.address}
            name={hall.name}
          />
        ))}
      </div>
    </div>
  );
}
