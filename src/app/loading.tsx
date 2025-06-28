import {Spinner} from "@/components/shared/spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full py-10">
      <Spinner className="size-10"  />
    </div>
  )
}