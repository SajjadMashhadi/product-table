import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";

import "./styles/globals.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <section className="p-[50px] ">
            <main className="[direction:rtl] py-[10px] ">{children}</main>
          </section>
        </body>
      </html>
    </StoreProvider>
  );
}
