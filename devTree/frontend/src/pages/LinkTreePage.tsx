import { useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";

export default function LinkTreePage() {
  const [devTreeLinks, setDevTreeLinks] = useState(social);
  console.log(devTreeLinks);

  return (
    <div className="space-y-5">
      {devTreeLinks.map((item) => (
        <DevTreeInput key={item.name} item={item} />
      ))}
    </div>
  );
}
