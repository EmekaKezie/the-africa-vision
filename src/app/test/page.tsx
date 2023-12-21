import { getDogs } from "@/component/api/testApi";
import Image from "next/image";

export default async function TestPage() {
  const dogs = await getDogs();
  return (
    <div>
      <Image src={dogs.message} alt="dogs" width={300} height={300}/>
    </div>
  );
}
