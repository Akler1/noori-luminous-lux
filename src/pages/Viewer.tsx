import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Viewer = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const url = searchParams.get("url") || "";
  const title = searchParams.get("title") || "3D Viewer";

  return (
    <div className="fixed inset-0 bg-background">
      <Button
        variant="secondary"
        size="sm"
        className="absolute top-4 left-4 z-50 bg-background/80 backdrop-blur-sm"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      <iframe
        src={url}
        title={title}
        className="w-screen h-screen border-0"
        allow="xr-spatial-tracking; accelerometer; gyroscope"
        allowFullScreen
      />
    </div>
  );
};

export default Viewer;
