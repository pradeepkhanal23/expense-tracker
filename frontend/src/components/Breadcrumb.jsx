import { SlashIcon } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadCrumb() {
  // using use location hook to get the location
  const location = useLocation();

  //   we try to get the path segment only by breaking the location string
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="my-3">
      {pathnames && pathnames.length > 1 ? (
        <>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to={`/dashboard`}>Dashboard</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {" "}
                  <BreadcrumbLink
                    to={`/${pathnames[1]}`}
                    className="capitalize"
                  >
                    {pathnames[1]}
                  </BreadcrumbLink>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </>
      ) : (
        <>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {" "}
                  <BreadcrumbLink to={`/dashboard`}>Dashboard</BreadcrumbLink>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </>
      )}
    </div>
  );
}
