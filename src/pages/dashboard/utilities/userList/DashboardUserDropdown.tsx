import { UserDocument } from "../../../../store/reducers/types";
const UserActionsDropdown = ({
  user,
  setUserScopeModal,
  setRevokeAccess,
}: {
  user: UserDocument;
  setUserScopeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRevokeAccess: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  return (
    <>
      <div className="user-actions-dropdown">
        <a href={`mailto:${user.email}`}>Send Email</a>
        {user.account_type === "contributor" && (
          <button
            onMouseDown={() => setUserScopeModal(true)}
            onTouchStart={() => setUserScopeModal(true)}
          >
            Edit Categories
          </button>
        )}

        <button
          className="user-actions-revoke-access"
          onMouseDown={() => setRevokeAccess(true)}
          onTouchStart={() => setRevokeAccess(true)}
        >
          Revoke Access
        </button>
      </div>
    </>
  );
};
export default UserActionsDropdown;
