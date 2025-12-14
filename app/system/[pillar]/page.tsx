import { notFound } from "next/navigation";
import PillarArrivalClient from "./PillarArrivalClient";
import { PILLARS } from "../../(landing)/_3d/pillars";

export async function generateStaticParams() {
  return PILLARS.map((pillar) => ({
    pillar: pillar.id,
  }));
}

interface PageProps {
  params: Promise<{ pillar: string }>;
}

export default async function PillarPage({ params }: PageProps) {
  const { pillar } = await params;
  
  const pillarData = PILLARS.find((p) => p.id === pillar);
  if (!pillarData) {
    notFound();
  }

  return <PillarArrivalClient pillarId={pillar} pillarData={pillarData} />;
}
