import { redirect } from "next/navigation";

import type { Metadata } from "next";

export default async function IndexPage() {
  redirect("/products");
  return <div>Product Task</div>;
}

export const metadata: Metadata = {
  title: "Product Task",
};
