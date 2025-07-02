import {ComponentPropsWithoutRef} from "react";

export function FigImage({...props}: ComponentPropsWithoutRef<"img">){
  return (
    <figure className="mb-0">
      <img
        className="rounded-lg shadow-lg w-full h-auto"
        loading="lazy"
        {...props}
      />
      <figcaption className="text-center text-sm text-secondary mt-2">{props.alt}</figcaption>
    </figure>
  )
}