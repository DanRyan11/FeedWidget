import { Camera, Trash } from "phosphor-react";
import html2canvas from "html2canvas";
import { useState } from "react";
import { Loading } from '../Loading';

interface ScreenshotButtonProps {
  screenshot: string | null;
  onScreenshotTaken: (screenshot: string | null) => void;
  setStillTakingScreenshoot: (value: boolean) => void;
}

export function ScreenshotButton({
  onScreenshotTaken,
  screenshot,
  setStillTakingScreenshoot,
}: ScreenshotButtonProps) {
  const [isTakingScreenshoot, setIsTakingScreenshoot] = useState(false);

  async function handleTakeScreenshot() {
    if(isTakingScreenshoot) return

    setStillTakingScreenshoot(true);
    setIsTakingScreenshoot(true);

    const canvas = await html2canvas(document.querySelector('html')!);
    const base64image = canvas.toDataURL('image/png');

    onScreenshotTaken(base64image);

    setStillTakingScreenshoot(false);
    setIsTakingScreenshoot(false);
  }

  function clearImage() {
    onScreenshotTaken(null);
  }

  if (screenshot) {
    return (
      <button 
        type="button"
        className="p-1 w-10 h-10 rounded-md border-trasparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        onClick={clearImage}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180,
        }}
      >
        <Trash weight="fill" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 focus:outline-none focus:ring-2 
                        focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors"
    >
      {isTakingScreenshoot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  )
}