import UserInfoCard from "./UserProfile/UserInfoCard";
import UserMetaCard from "./UserProfile/UserMetaCard";

export default function UserProfiles() {
  return (
    <>
      <div className="space-y-6">
        <UserMetaCard />
        <UserInfoCard />
      </div>
    </>
  );
}
