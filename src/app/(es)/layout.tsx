import type { Metadata } from "next";
import { RootShell, rootMetadata } from "@/components/layout/root-shell";
import "../globals.css";

export { viewport } from "@/components/layout/root-shell";

export const metadata: Metadata = rootMetadata("es");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="es">{children}</RootShell>;
}
