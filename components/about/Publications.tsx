import Link from "next/link";
import type { Publication } from "@/types";

const publications: Publication[] = [
  {
    title:
      "A closer look at the host-galaxy environment of high-velocity Type Ia supernovae",
    authors: ["Lin, Han-Tang", "Pan, Yen-Chen", "Abdurro'uf"],
    journal: "Volume 531, Issue 1, pp.1988-1997",
    year: 2024,
    link: "https://ui.adsabs.harvard.edu/abs/2024MNRAS.531.1988L/abstract",
  },
  {
    title:
      "Simultaneous Detection of Optical Flares of the Magnetically Active M-dwarf Wolf359",
    authors: [
      "Han-Tang Lin",
      "Chen, Wen-Ping",
      "Jinzhong Liu",
      "Xuan Zhang",
      "Yu Zhang",
      "Andrew Wang",
      "Shiang-Yu Wang",
      "Matthew J. Lehner",
      "C. Y. Wen",
      "J. K. Guo",
      "Y. H. Chang",
      "M. H. Chang",
      "Tsai, Anli",
      "Chia-Lung Lin",
      "C. Y. Hsu",
      "Ip, Wing",
    ],
    journal: "Volume 163, Number 4 (2022/03)",
    year: 2022,
    link: "https://ui.adsabs.harvard.edu/abs/2022AJ....163..164L/abstract",
  },
];

const Publication = ({
  title,
  authors,
  journal,
  year,
  link,
}: Publication) => (
  <li className="mb-4">
    <Link href={link} target="_blank" className="hover:underline">
      <div className="text-lg font-semibold">{title}</div>
    </Link>
    <div className="text-base text-muted-foreground">
      {authors.join(", ")} ({year})
    </div>
    <div className="text-base italic">{journal}</div>
  </li>
);

export const Publications = () => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Publications</h2>
      <ul>
        {publications.map((pub) => (
          <Publication key={pub.title} {...pub} />
        ))}
      </ul>
    </section>
  );
};
