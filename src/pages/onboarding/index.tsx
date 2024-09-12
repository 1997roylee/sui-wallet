import { Input } from "@/compoennts/ui/input";

export default function Page() {
  return (
    <div className="flex flex-col gap-3">
      <Input placeholder='password' type='password'/>
      <Input placeholder='password' type='password'/>
    </div>
  );
}
