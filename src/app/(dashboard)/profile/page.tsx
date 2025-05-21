import PageBreadcrumb from "../components/PageBreadCrumb";
import UserInfoCard from "./UserProfile/UserInfoCard";
import UserMetaCard from "./UserProfile/UserMetaCard";

export default function UserProfiles() {
  return (
    <>
      <PageBreadcrumb pageTitle="Profile" />
        <div className="space-y-6">
          <UserMetaCard />
          <UserInfoCard />
        </div>
    </>
  );
}
