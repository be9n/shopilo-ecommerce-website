"use client";

import { Button } from "@/components/ui/button";
import { getUser } from "@/api-services/auth";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [data, setData] = useState();

  const fetchData = async () => {
    const response = await getUser();
    console.log(response);

    setData(response);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <Button onClick={() => fetchData()}>Click me</Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
