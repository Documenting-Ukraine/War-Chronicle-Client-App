import { PopUpProps, GeneralDashboardPopUp } from "./general";
import PopUpBg from "../../../utilityComponents/popUpBg/PopUpBg";
import { useDispatch, batch } from "react-redux";
import { updateUserScope } from "../../../../store/reducers/asyncActions/userActions/updateUserScope";
import categoryIconMap, {
  isCategoryScope,
  categoryPermissions,
} from "../../../../types/dataTypes/CategoryIconMap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRealmApp } from "../../../../realm/RealmApp";
const CategoryListItem = ({
  category,
  listType,
  onReassignCategory,
}: {
  category: string;
  listType: "assigned" | "unassigned";
  onReassignCategory: (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => void;
}) => {
  return (
    <div className="user-scope-category-row">
      <div className="user-scope-category-name">
        <div className="user-scope-category-icon">
          {isCategoryScope(category) && (
            <FontAwesomeIcon icon={categoryIconMap[category]} />
          )}
        </div>

        <div>{category}</div>
      </div>
      <button
        onClick={onReassignCategory}
        className="user-scope-category-action-btn"
        data-category={category}
        data-action-type={listType === "assigned" ? "unassign" : "assign"}
      >
        {listType === "assigned" ? "Unassign" : "Assign"}
      </button>
    </div>
  );
};
export const UserScopePopUp = ({ user, index, closePopUp }: PopUpProps) => {
  const dispatch = useDispatch();
  const app = useRealmApp()
  const permissions = { ...categoryPermissions };
  if (user.category_scopes) {
    for (let scope of user.category_scopes) {
      permissions[scope] = true;
    }
  }
  const [categories, setCategories] = useState(permissions);
  const onSaveCategories = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    const data = e.currentTarget.dataset;
    const actionType = data.actionType;
    switch (actionType) {
      case "close-pop-up":
        if (e.target === e.currentTarget) closePopUp(false);
        if (
          (e.target instanceof HTMLElement || e.target instanceof SVGElement) &&
          e.target.closest("button")?.dataset.actionType === "close-pop-up"
        )
          closePopUp(false);
        break;
      case "save-scope":
        const userId = user._id;
        const userIdx = index;
        batch(() => {
          dispatch(updateUserScope({
            app: app,
            input: {
              user_id: userId,
              categories: categories,
              user_list_idx: userIdx
            }
          }))
          closePopUp(false);
        });
        break;
      default:
        break;
    }
  };
  const onReassignCategory = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    const data = e.currentTarget.dataset;
    const actionType = data.actionType;
    const category = data.category;
    switch (actionType) {
      case "assign":
        if (isCategoryScope(category))
          setCategories((state) => {
            return { ...state, [category]: true };
          });
        break;
      case "unassign":
        if (isCategoryScope(category))
          setCategories((state) => {
            return { ...state, [category]: false };
          });
        break;
      default:
        break;
    }
  };

  const categoriesArr = Object.keys(categories);
  const assignedCategoryArr = categoriesArr.filter(
    (category) => isCategoryScope(category) && categories[category]
  );
  const unassignedCategoryArr = categoriesArr.filter(
    (category) => isCategoryScope(category) && !categories[category]
  );

  const alertContent = (
    <>
      <p>
        For secruity reasons, contributors can only add records to their
        assigned categories and will be denied access to unassigned categories.
      </p>
      <p>
        Only assign new category scopes to trusted contributors, or have
        contributors submit a request through their dashboard.
      </p>
    </>
  );
  return (
    <PopUpBg fullViewport={true} onClick={onSaveCategories}>
      <GeneralDashboardPopUp
        onClick={onSaveCategories}
        index={index}
        overallClassName={"edit-user-scope-popup"}
        heading={`Edit ${user.first_name}'s Categories`}
        btnActionType="save-scope"
        btnText="Save Changes"
        btnClass="save-scope-changes-btn"
        alertClass="edit-user-scope-alert"
        alertContent={alertContent}
      >
        <>
          <div className="assigned-category-list">
            <h3 className="user-scope-category-list-header">
              Assigned Category Scopes
            </h3>
            {assignedCategoryArr.map((category) => (
              <CategoryListItem
                key={category}
                category={category}
                listType="assigned"
                onReassignCategory={onReassignCategory}
              />
            ))}
          </div>
          <div className="unassigned-category-list">
            <h3 className="user-scope-category-list-header">
              Unassigned Category Scopes
            </h3>
            {unassignedCategoryArr.map((category) => (
              <CategoryListItem
                key={category}
                category={category}
                listType="unassigned"
                onReassignCategory={onReassignCategory}
              />
            ))}
          </div>
        </>
      </GeneralDashboardPopUp>
    </PopUpBg>
  );
};
