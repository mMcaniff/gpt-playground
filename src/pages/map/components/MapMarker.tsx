import { EnvironmentOutlined } from "@ant-design/icons";

export interface MarkerProps {
  text: string;
  lat: number;
  lng: number;
  key: string;
}

export const MapMarker: React.FC<MarkerProps> = ({ text, lat, lng }) => (
  <div
    style={{
      width: "80px",
      height: "80px",
      borderRadius: "50px",
      fontWeight: 700,
      fontSize: "15px",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {text}
    <EnvironmentOutlined style={{ fontSize: "300%", backgroundColor:"lightBlue" }} />
  </div>
);