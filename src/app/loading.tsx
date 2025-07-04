import {Spinner} from "@/components/shared/spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen py-10 w-full">
      <Spinner className="size-10"  />
    </div>
  )
}