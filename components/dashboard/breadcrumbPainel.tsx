import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

interface BreadcrumbProps {
  path: {
    title: string;
    link: string;
  }[];
}

export function BreadcrumbPainel({ path }: BreadcrumbProps) {
  return (
    <Breadcrumb className="mt-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Início</BreadcrumbLink>
        </BreadcrumbItem>
        {path.map((e, index) => (
          <Fragment key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={e.link}>{e.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
