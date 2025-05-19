"use client";

import { Button } from "@/components/ui/button";
import api from "@/lib/auth/api";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [data, setData] = useState();

  const fetchData = async () => {
    const response = await api.get("/auth/me");
    console.log(response);
    
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Button onClick={() => fetchData()}>Click me</Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
